import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { buildQuestionSet, getExercisesByIds } from "../data/exercises";
import { TECH_STACKS, STACK_DICTIONARY, LEVEL_DICTIONARY, LEVELS, getQuestionTargetByStacks } from "../data/stackConfig.js";
import { useSessionBroadcast } from "../hooks/useSessionBroadcast.js";

const DEFAULT_STACKS = [TECH_STACKS[0].id];

const DEFAULT_CONFIG = {
  stacks: DEFAULT_STACKS,
  level: LEVELS[0].id,
  questionCount: getQuestionTargetByStacks(DEFAULT_STACKS),
};

const hydrateConfig = () => {
  try {
    const raw = localStorage.getItem("interview-config");
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    const stacks = Array.isArray(parsed.stacks) && parsed.stacks.length ? parsed.stacks : DEFAULT_CONFIG.stacks;
    const level = parsed.level && LEVEL_DICTIONARY[parsed.level] ? parsed.level : DEFAULT_CONFIG.level;
    const questionCount = getQuestionTargetByStacks(stacks);
    return { stacks, level, questionCount };
  } catch {
    return DEFAULT_CONFIG;
  }
};

function Exercises() {
  const navigate = useNavigate();
  const { sessionId } = useParams(); // Obtener sessionId de la URL si existe
  const [searchParams] = useSearchParams();
  
  // Detectar modo consulta (review=true en la URL)
  const isReviewMode = searchParams.get('review') === 'true';
  
  // En modo consulta, cargar las preguntas del examen anterior
  const loadReviewData = () => {
    if (isReviewMode) {
      try {
        const savedQuestionSet = localStorage.getItem('interview-question-set');
        const savedOptionOrder = localStorage.getItem('option-order');
        const savedAnswers = localStorage.getItem('interview-answers');
        
        if (savedQuestionSet) {
          const questionIds = JSON.parse(savedQuestionSet);
          const questions = getExercisesByIds(questionIds);
          return {
            questionSet: questions,
            optionOrder: savedOptionOrder ? JSON.parse(savedOptionOrder) : {},
            answers: savedAnswers ? JSON.parse(savedAnswers) : {}
          };
        }
      } catch (e) {
        console.warn('Error loading review data:', e);
      }
    }
    return null;
  };
  
  const reviewData = loadReviewData();
  
  // Inicializar con la config guardada en localStorage, no con DEFAULT_CONFIG
  const [evaluationConfig, setEvaluationConfig] = useState(() => hydrateConfig());
  const [questionSet, setQuestionSet] = useState(() => {
    if (reviewData) return reviewData.questionSet;
    return buildQuestionSet(hydrateConfig());
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    if (reviewData) return reviewData.answers;
    const saved = localStorage.getItem('interview-answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(!isReviewMode); // Desactivar timer en modo consulta
  const [optionOrder, setOptionOrder] = useState(() => {
    if (reviewData) return reviewData.optionOrder;
    return {};
  });
  
  // Obtener la respuesta correcta mapeada para modo consulta
  const [correctAnswerMap, setCorrectAnswerMap] = useState(() => {
    try {
      const saved = localStorage.getItem('correct-answer-map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  
  // Hook para emitir eventos de sesión
  const { emit } = useSessionBroadcast(sessionId || null);

  const currentExercise =
    questionSet[currentStep] || questionSet[questionSet.length - 1];
  const totalQuestions = questionSet.length || 1;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const isLastStep = currentStep === questionSet.length - 1;
  const stackNames = evaluationConfig.stacks
    .map((id) => STACK_DICTIONARY[id]?.label || id)
    .join(", ");
  const levelDefinition =
    LEVEL_DICTIONARY[evaluationConfig.level] || LEVEL_DICTIONARY[LEVELS[0].id];
  const targetQuestionCount =
    evaluationConfig.questionCount ||
    getQuestionTargetByStacks(evaluationConfig.stacks);
  const shortage =
    targetQuestionCount && questionSet.length < targetQuestionCount;

  // Efecto para manejar sessionId en la URL
  useEffect(() => {
    if (sessionId) {
      const config = hydrateConfig();
      config.sessionId = sessionId;
      const questions = buildQuestionSet(config);
      setEvaluationConfig(config);
      setQuestionSet(questions);
      
      // Emitir evento de inicio de test si hay sesión (solo una vez)
      if (emit) {
        console.log('📤 Emitiendo inicio de test, sessionId:', sessionId);
        // Múltiples intentos para asegurar que el monitor reciba el mensaje
        const emitStart = () => {
          emit({
            status: 'in_progress',
            currentQuestion: 1,
            currentQuestionId: questions[0]?.id || null,
            totalQuestions: questions.length,
            config: config,
            answers: {},
            timeLeft: questions[0]?.timeLimit || 0,
            progress: 0,
            timestamp: Date.now()
          });
        };
        
        // Emitir inmediatamente
        emitStart();
        
        // Y también después de un delay por si el monitor aún no está listo
        setTimeout(emitStart, 500);
        setTimeout(emitStart, 1000);
      }
    }
  }, [sessionId]); // Solo se ejecuta si hay sessionId

  // Crear un identificador único basado en los IDs del questionSet
  const questionSetKey = questionSet.map((ex) => ex.id).join(',');
  
  useEffect(() => {
    if (!questionSet.length) return;
    
    // En modo consulta, NO regenerar opciones ni limpiar respuestas
    // Solo cargar el orden guardado
    if (isReviewMode) {
      const savedOrder = localStorage.getItem('option-order');
      if (savedOrder) {
        try {
          setOptionOrder(JSON.parse(savedOrder));
        } catch (e) {
          console.warn('Error loading option order:', e);
        }
      }
      return; // Salir del efecto sin hacer nada más
    }
    
    const questionIds = questionSet.map((exercise) => exercise.id);
    const questionIdsString = JSON.stringify(questionIds);
    
    // Siempre guardar los IDs de las preguntas actuales
    localStorage.setItem('interview-question-set', questionIdsString);
    
    // Verificar si necesitamos regenerar el orden de opciones
    const savedIds = localStorage.getItem('interview-question-set-key');
    const currentKey = questionSetKey;
    
    // Solo regenerar orden si el set de preguntas cambió
    if (savedIds !== currentKey) {
      localStorage.setItem('interview-question-set-key', currentKey);
      setCurrentStep(0);
      
      const orderMap = {};
      const correctAnswerMap = {}; // Mapeo: exerciseId -> ID de la opción correcta (A, B, C, D)
      
      questionSet.forEach((exercise) => {
        // Crear un array con las opciones originales
        const originalOptions = [...exercise.options];
        const correctAnswerId = exercise.correctAnswer;
        
        // Encontrar la opción correcta
        const correctOption = originalOptions.find(opt => opt.id === correctAnswerId);
        const otherOptions = originalOptions.filter(opt => opt.id !== correctAnswerId);
        
        // Mezclar las opciones incorrectas
        for (let i = otherOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [otherOptions[i], otherOptions[j]] = [otherOptions[j], otherOptions[i]];
        }
        
        // Elegir una posición aleatoria para la respuesta correcta (0-3)
        const correctPosition = Math.floor(Math.random() * 4);
        const correctDisplayId = String.fromCharCode(65 + correctPosition); // A, B, C, D
        
        // Guardar el mapeo de la respuesta correcta
        correctAnswerMap[exercise.id] = correctDisplayId;
        
        // Crear el array final con A, B, C, D en orden secuencial
        // pero con la respuesta correcta en posición aleatoria
        const finalOptions = [];
        let otherIndex = 0;
        
        for (let i = 0; i < 4; i++) {
          const displayId = String.fromCharCode(65 + i); // A, B, C, D
          
          if (i === correctPosition) {
            // En esta posición va la respuesta correcta
            finalOptions.push({
              ...correctOption,
              id: displayId,
              originalId: correctOption.id // Guardar el ID original para referencia
            });
          } else {
            // En las demás posiciones van las opciones incorrectas
            finalOptions.push({
              ...otherOptions[otherIndex],
              id: displayId,
              originalId: otherOptions[otherIndex].id // Guardar el ID original
            });
            otherIndex++;
          }
        }
        
        orderMap[exercise.id] = finalOptions;
      });
      
      setOptionOrder(orderMap);
      // Guardar el mapeo de respuestas correctas en localStorage
      localStorage.setItem('correct-answer-map', JSON.stringify(correctAnswerMap));
      // También guardar el orden de opciones para los resultados
      localStorage.setItem('option-order', JSON.stringify(orderMap));
      
      // Limpiar respuestas anteriores cuando cambia el set de preguntas
      localStorage.removeItem('interview-answers');
      setAnswers({});
    } else {
      // Si el set no cambió, cargar el orden guardado
      const savedOrder = localStorage.getItem('option-order');
      if (savedOrder) {
        try {
          setOptionOrder(JSON.parse(savedOrder));
        } catch (e) {
          console.warn('Error loading option order:', e);
        }
      }
    }
  }, [questionSetKey, isReviewMode]); // Ahora depende de los IDs reales y del modo consulta

  useEffect(() => {
    if (!currentExercise) return;
    // Cargar la respuesta previamente seleccionada si existe
    if (answers[currentExercise.id]) {
      setSelectedOption(answers[currentExercise.id]);
    } else {
      setSelectedOption(null);
    }
    
    // En modo consulta, no activar el timer
    if (isReviewMode) {
      setTimeLeft(currentExercise.timeLimit);
      setTimerActive(false);
      return;
    }
    
    // Reiniciar el timer
    setTimeLeft(currentExercise.timeLimit);
    setTimerActive(true);
    
    // Emitir evento de cambio de pregunta si hay sesión (solo cuando cambia currentStep o currentExercise)
    if (sessionId && emit && currentExercise) {
      console.log('📤 Emitiendo cambio de pregunta:', currentStep + 1);
      emit({
        status: 'in_progress',
        currentQuestion: currentStep + 1,
        currentQuestionId: currentExercise.id,
        totalQuestions: questionSet.length,
        selectedAnswer: answers[currentExercise.id] || null,
        timeLeft: currentExercise.timeLimit,
        progress: Math.round(((currentStep + 1) / questionSet.length) * 100),
        answers: answers,
        config: evaluationConfig,
        timestamp: Date.now()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, currentExercise?.id]); // Solo cuando cambia el paso o el ejercicio

  // Timer countdown
  useEffect(() => {
    if (!currentExercise || !timerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev <= 1 ? 0 : prev - 1;
        
        // Emitir actualización de timer cada 2 segundos si hay sesión (para no saturar)
        if (sessionId && prev > 0 && prev % 2 === 0 && emit && currentExercise) {
          // Usar valores actuales sin depender de ellos
          const currentAnswers = JSON.parse(localStorage.getItem('interview-answers') || '{}');
          emit({
            status: 'in_progress',
            currentQuestion: currentStep + 1,
            currentQuestionId: currentExercise.id,
            totalQuestions: questionSet.length,
            selectedAnswer: selectedOption || currentAnswers[currentExercise.id] || null,
            timeLeft: newTime,
            progress: Math.round(((currentStep + 1) / questionSet.length) * 100),
            answers: currentAnswers,
            config: evaluationConfig,
            timestamp: Date.now()
          });
        }
        
        if (prev <= 1) {
          setTimerActive(false);
          // Auto-avanzar cuando se acaba el tiempo
          handleTimeOut();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive, currentExercise?.id, sessionId]); // Dependencias mínimas, timeLeft se maneja internamente

  const handleTimeOut = () => {
    if (!currentExercise) return;
    // Guardar como "timeout" si no hay respuesta seleccionada
    const newAnswers = {
      ...answers,
      [currentExercise.id]: selectedOption || 'timeout'
    };
    setAnswers(newAnswers);
    localStorage.setItem('interview-answers', JSON.stringify(newAnswers));

    // Emitir evento de timeout
    if (sessionId) {
      emit({
        status: isLastStep ? 'completed' : 'in_progress',
        currentQuestion: isLastStep ? currentStep + 1 : currentStep + 2,
        currentQuestionId: isLastStep ? null : questionSet[currentStep + 1]?.id,
        totalQuestions: questionSet.length,
        selectedAnswer: 'timeout',
        timeLeft: 0,
        progress: isLastStep ? 100 : Math.round(((currentStep + 2) / questionSet.length) * 100),
        answers: newAnswers,
        config: evaluationConfig,
        timestamp: Date.now()
      });
    }

    // Avanzar a la siguiente pregunta
    if (isLastStep) {
      navigate('/results');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    
    // Emitir evento de selección de respuesta si hay sesión
    if (sessionId && currentExercise && emit) {
      console.log('📤 Emitiendo selección de respuesta:', optionId);
      emit({
        status: 'in_progress',
        currentQuestion: currentStep + 1,
        currentQuestionId: currentExercise.id,
        totalQuestions: questionSet.length,
        selectedAnswer: optionId,
        timeLeft: timeLeft,
        progress: Math.round(((currentStep + 1) / questionSet.length) * 100),
        answers: answers,
        config: evaluationConfig,
        timestamp: Date.now()
      });
    }
  };

  const handleNext = () => {
    if (!currentExercise || !selectedOption) {
      return;
    }
    
    // Obtener el mapeo de respuestas correctas
    const correctAnswerMap = JSON.parse(localStorage.getItem('correct-answer-map') || '{}');
    const correctDisplayId = correctAnswerMap[currentExercise.id];
    
    // Guardar la respuesta del usuario (A, B, C, D) y también el mapeo para verificación
    const newAnswers = {
      ...answers,
      [currentExercise.id]: selectedOption // Guardamos A, B, C, D
    };
    
    // También guardar el mapeo para verificación posterior
    const answerMapping = JSON.parse(localStorage.getItem('answer-mapping') || '{}');
    answerMapping[currentExercise.id] = {
      userAnswer: selectedOption,
      correctAnswer: correctDisplayId,
      originalCorrectAnswer: currentExercise.correctAnswer
    };
    localStorage.setItem('answer-mapping', JSON.stringify(answerMapping));
    
    setAnswers(newAnswers);
    localStorage.setItem('interview-answers', JSON.stringify(newAnswers));

    // Emitir evento de respuesta guardada
    if (sessionId) {
      emit({
        status: isLastStep ? 'completed' : 'in_progress',
        currentQuestion: isLastStep ? currentStep + 1 : currentStep + 2,
        currentQuestionId: isLastStep ? null : questionSet[currentStep + 1]?.id,
        totalQuestions: questionSet.length,
        selectedAnswer: null,
        timeLeft: 0,
        progress: isLastStep ? 100 : Math.round(((currentStep + 2) / questionSet.length) * 100),
        answers: newAnswers,
        config: evaluationConfig,
        timestamp: Date.now()
      });
    }

    if (isLastStep) {
      navigate('/results');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (!currentExercise) return;
    if (isLastStep) {
      navigate('/results');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const getDifficultyClass = (difficulty) => {
    const classes = {
      'Básico': 'badge-easy',
      'Intermedio': 'badge-medium',
      'Avanzado': 'badge-hard'
    };
    return classes[difficulty] || '';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (!currentExercise) return 'timer--normal';
    const percentage = (timeLeft / currentExercise.timeLimit) * 100;
    if (percentage <= 25) return 'timer--critical';
    if (percentage <= 50) return 'timer--warning';
    return 'timer--normal';
  };

  const getCodeLanguage = (category) => {
    switch (category) {
      case 'Backend':
        return 'JavaScript (Node.js)';
      case 'NestJS':
        return 'TypeScript (NestJS)';
      case 'Next.js':
        return 'TypeScript (Next.js)';
      case 'Relacional':
        return 'SQL';
      case 'NoSQL':
        return 'Mongo/Cassandra';
      case 'Arquitectura':
        return 'System Design';
      case 'Git':
        return 'Bash';
      case 'CSS':
        return 'CSS';
      case 'AWS':
        return 'JavaScript (AWS)';
      case 'QA Automation':
        return 'Testing / QA';
      default:
        return 'JavaScript (React)';
    }
  };

  if (!questionSet.length) {
    return (
      <section className="card">
        <h2>⚠️ Sin preguntas disponibles</h2>
        <p>No encontramos preguntas para la configuración seleccionada.</p>
        <button className="button" onClick={() => navigate('/')}>
          Configurar nuevamente
        </button>
      </section>
    );
  }

  return (
    <section className="exercises-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Review Mode Banner */}
      {isReviewMode && (
        <div className="review-mode-banner">
          <span className="review-mode-icon">📖</span>
          <span className="review-mode-text">Modo Consulta - Revisando respuestas del examen</span>
          <button className="btn-back-results" onClick={() => navigate('/results')}>
            ← Volver a Resultados
          </button>
        </div>
      )}

      {/* Timer - Solo mostrar si NO es modo consulta */}
      {!isReviewMode && (
        <div className={`timer-container ${getTimerClass()}`}>
          <div className="timer-icon">⏱️</div>
          <div className="timer-text">
            <span className="timer-label">Tiempo restante:</span>
            <span className="timer-value">{formatTime(timeLeft)}</span>
          </div>
          <div className="timer-bar">
            <div 
              className="timer-bar__fill" 
              style={{ width: `${(timeLeft / currentExercise.timeLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="card exam-config-card">
        <div className="exam-config-item">
          <span className="exam-config-label">Stacks</span>
          <span className="exam-config-value">{stackNames || 'General'}</span>
        </div>
        <div className="exam-config-item">
          <span className="exam-config-label">Nivel</span>
          <span className="exam-config-value">{levelDefinition.label}</span>
          <small className="exam-config-note">
            Dificultades: {levelDefinition.difficulties.join(' · ')}
          </small>
        </div>
        <div className="exam-config-item">
          <span className="exam-config-label">Preguntas activas</span>
          <span className="exam-config-value">
            {questionSet.length}
            {targetQuestionCount ? ` / ${targetQuestionCount}` : ''}
          </span>
          {shortage && (
            <small className="config-warning">
              No hay suficientes preguntas para alcanzar el objetivo del stack seleccionado.
            </small>
          )}
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="exercise-main">
        {/* Left Column - Question and Options */}
        <div className="exercise-left">
          <div className="card exercise-header">
            <div className="exercise-header__top">
              <span className="exercise-number">
                Pregunta {currentStep + 1} de {questionSet.length}
              </span>
              <div className="exercise-badges">
                <span className={`badge ${getDifficultyClass(currentExercise.difficulty)}`}>
                  {currentExercise.difficulty}
                </span>
                <span className="badge badge-category">{currentExercise.category}</span>
              </div>
            </div>
            <h2>{currentExercise.title}</h2>
            <p className="exercise-question">{currentExercise.question}</p>
          </div>

          {/* Options */}
          <div className="card options-card">
            <h3>{isReviewMode ? 'Respuestas:' : 'Selecciona la respuesta correcta:'}</h3>
            <div className="options-list">
              {(optionOrder[currentExercise.id] || currentExercise.options).map((option) => {
                const userAnswer = answers[currentExercise.id];
                const correctAnswer = correctAnswerMap[currentExercise.id];
                const isUserAnswer = option.id === userAnswer;
                const isCorrectAnswer = option.id === correctAnswer;
                const isUserWrong = isUserAnswer && !isCorrectAnswer && userAnswer !== 'timeout';
                
                // Clases para modo consulta
                let reviewClass = '';
                if (isReviewMode) {
                  if (isCorrectAnswer) {
                    reviewClass = 'option-item--correct';
                  }
                  if (isUserWrong) {
                    reviewClass = 'option-item--wrong';
                  }
                  if (isUserAnswer && isCorrectAnswer) {
                    reviewClass = 'option-item--user-correct';
                  }
                }
                
                return (
                  <label
                    key={option.id}
                    className={`option-item ${selectedOption === option.id && !isReviewMode ? 'option-item--selected' : ''} ${reviewClass}`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => !isReviewMode && handleOptionSelect(option.id)}
                      disabled={isReviewMode}
                    />
                    <span className="option-label">{option.id.toUpperCase()}</span>
                    <span className="option-text">{option.text}</span>
                    {isReviewMode && (
                      <div className="option-indicators">
                        {isUserWrong && <span className="option-indicator option-indicator--wrong">❌ Tu respuesta</span>}
                        {isCorrectAnswer && <span className="option-indicator option-indicator--correct">✅ Correcta</span>}
                        {isUserAnswer && isCorrectAnswer && <span className="option-indicator option-indicator--user-correct">🎉 ¡Acertaste!</span>}
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
            
            {/* Explicación en modo consulta */}
            {isReviewMode && currentExercise.explanation && (
              <div className="review-explanation">
                <h4>💡 Explicación:</h4>
                <p>{currentExercise.explanation}</p>
              </div>
            )}
            
            {/* Mostrar si se agotó el tiempo */}
            {isReviewMode && answers[currentExercise.id] === 'timeout' && (
              <div className="review-timeout">
                <span className="timeout-icon">⏱️</span>
                <span>No se respondió a tiempo</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Code Block */}
        <div className="exercise-right">
          <div className="card code-card">
            <div className="code-header">
              <span className="code-language">
                {getCodeLanguage(currentExercise.category)}
              </span>
              <button
                className="btn-copy"
                onClick={() => {
                  navigator.clipboard.writeText(currentExercise.code);
                }}
              >
                📋 Copiar
              </button>
            </div>
            <pre className="code-block">
              <code>{currentExercise.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="exercise-navigation">
        <button
          className="btn-nav btn-nav--secondary"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          ← Anterior
        </button>
        
        {isReviewMode ? (
          <button
            className="btn-nav btn-nav--tertiary"
            onClick={() => navigate('/results')}
          >
            📊 Ver Resultados
          </button>
        ) : (
          <button
            className="btn-nav btn-nav--tertiary"
            onClick={handleSkip}
          >
            {isLastStep ? 'Finalizar' : 'Saltar'}
          </button>
        )}

        <button
          className="btn-nav btn-nav--primary"
          onClick={isReviewMode 
            ? (isLastStep ? () => navigate('/results') : () => setCurrentStep(currentStep + 1))
            : handleNext
          }
          disabled={!isReviewMode && !selectedOption}
        >
          {isLastStep ? (isReviewMode ? '📊 Ver Resultados' : 'Ver Resultados →') : 'Siguiente →'}
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="step-indicators">
        {questionSet.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`step-indicator ${index === currentStep ? 'step-indicator--active' : ''} ${answers[exercise.id] ? 'step-indicator--completed' : ''}`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Exercises;
