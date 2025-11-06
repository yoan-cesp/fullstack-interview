import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exercises } from "../data/exercises";

function NuevosEjercicios() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('interview-answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const currentExercise = exercises[currentStep];
  const progress = ((currentStep + 1) / exercises.length) * 100;
  const isLastStep = currentStep === exercises.length - 1;

  useEffect(() => {
    // Cargar la respuesta previamente seleccionada si existe
    if (answers[currentExercise.id]) {
      setSelectedOption(answers[currentExercise.id]);
    } else {
      setSelectedOption(null);
    }
    
    // Reiniciar el timer
    setTimeLeft(currentExercise.timeLimit);
    setTimerActive(true);
  }, [currentStep, currentExercise.id, currentExercise.timeLimit, answers]);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

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
  }, [timerActive, timeLeft]);

  const handleTimeOut = () => {
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
    if (selectedOption) {
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
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
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
    const percentage = (timeLeft / currentExercise.timeLimit) * 100;
    if (percentage <= 25) return 'timer--critical';
    if (percentage <= 50) return 'timer--warning';
    return 'timer--normal';
  };

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

      {/* Main Content - Two Column Layout */}
      <div className="exercise-main">
        {/* Left Column - Question and Options */}
        <div className="exercise-left">
          <div className="card exercise-header">
            <div className="exercise-header__top">
              <span className="exercise-number">
                Pregunta {currentStep + 1} de {exercises.length}
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
              {currentExercise.options.map((option) => (
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
                {currentExercise.category === 'Backend' ? 'JavaScript (Node.js)' : currentExercise.category === 'Git' ? 'Bash' : currentExercise.category === 'CSS' ? 'CSS' : currentExercise.category === 'AWS' ? 'JavaScript (AWS)' : 'JavaScript (React)'}
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
        {exercises.map((_, index) => (
          <div
            key={index}
            className={`step-indicator ${index === currentStep ? 'step-indicator--active' : ''} ${answers[exercises[index].id] ? 'step-indicator--completed' : ''}`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default NuevosEjercicios;

