import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildQuestionSet } from "../data/exercises";
import { TECH_STACKS, STACK_DICTIONARY, LEVEL_DICTIONARY, LEVELS, getQuestionTargetByStacks } from "../data/stackConfig.js";

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

function NuevosEjercicios() {
  const navigate = useNavigate();
  const [evaluationConfig, setEvaluationConfig] = useState(DEFAULT_CONFIG);
  const [questionSet, setQuestionSet] = useState(() => buildQuestionSet(DEFAULT_CONFIG));
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('interview-answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [optionOrder, setOptionOrder] = useState({});

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

  useEffect(() => {
    const config = hydrateConfig();
    setEvaluationConfig(config);
    setQuestionSet(buildQuestionSet(config));
  }, []);

  useEffect(() => {
    if (!questionSet.length) return;
    localStorage.setItem(
      'interview-question-set',
      JSON.stringify(questionSet.map((exercise) => exercise.id))
    );
    setCurrentStep(0);
    const orderMap = {};
    questionSet.forEach((exercise) => {
      const shuffled = [...exercise.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      orderMap[exercise.id] = shuffled;
    });
    setOptionOrder(orderMap);
  }, [questionSet]);

  useEffect(() => {
    if (!currentExercise) return;
    // Cargar la respuesta previamente seleccionada si existe
    if (answers[currentExercise.id]) {
      setSelectedOption(answers[currentExercise.id]);
    } else {
      setSelectedOption(null);
    }
    
    // Reiniciar el timer
    setTimeLeft(currentExercise.timeLimit);
    setTimerActive(true);
  }, [currentStep, currentExercise, answers]);

  // Timer countdown
  useEffect(() => {
    if (!currentExercise || !timerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          // Auto-avanzar cuando se acaba el tiempo
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft, currentExercise]);

  const handleTimeOut = () => {
    if (!currentExercise) return;
    // Guardar como "timeout" si no hay respuesta seleccionada
    const newAnswers = {
      ...answers,
      [currentExercise.id]: selectedOption || 'timeout'
    };
    setAnswers(newAnswers);
    localStorage.setItem('interview-answers', JSON.stringify(newAnswers));

    // Avanzar a la siguiente pregunta
    if (isLastStep) {
      navigate('/respuestas');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!currentExercise || !selectedOption) {
      return;
    }
    const newAnswers = {
      ...answers,
      [currentExercise.id]: selectedOption
    };
    setAnswers(newAnswers);
    localStorage.setItem('interview-answers', JSON.stringify(newAnswers));

    if (isLastStep) {
      navigate('/respuestas');
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
      navigate('/respuestas');
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

      {/* Timer */}
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
            <h3>Selecciona la respuesta correcta:</h3>
            <div className="options-list">
              {(optionOrder[currentExercise.id] || currentExercise.options).map((option) => (
                <label
                  key={option.id}
                  className={`option-item ${selectedOption === option.id ? 'option-item--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => handleOptionSelect(option.id)}
                  />
                  <span className="option-label">{option.id.toUpperCase()}</span>
                  <span className="option-text">{option.text}</span>
                </label>
              ))}
            </div>
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
        
        <button
          className="btn-nav btn-nav--tertiary"
          onClick={handleSkip}
        >
          {isLastStep ? 'Finalizar' : 'Saltar'}
        </button>

        <button
          className="btn-nav btn-nav--primary"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {isLastStep ? 'Ver Resultados →' : 'Siguiente →'}
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

export default NuevosEjercicios;
