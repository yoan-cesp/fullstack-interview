import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { exercises, calculateScore, getDetailedResults } from "../data/exercises";
import { TECH_STACKS, STACK_DICTIONARY, LEVEL_DICTIONARY, LEVELS, getQuestionTargetByStacks } from "../data/stackConfig.js";

const FALLBACK_STACKS = [TECH_STACKS[0].id];

const FALLBACK_CONFIG = {
  stacks: FALLBACK_STACKS,
  level: LEVELS[0].id,
  questionCount: getQuestionTargetByStacks(FALLBACK_STACKS),
};

function NuevosResultados() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all'); // all, correct, incorrect, timeout
  const [expandedId, setExpandedId] = useState(null);
  const [evaluationConfig, setEvaluationConfig] = useState(FALLBACK_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('interview-answers');
    const savedConfig = localStorage.getItem('interview-config');
    const savedQuestionSet = localStorage.getItem('interview-question-set');

    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        const stacks = Array.isArray(parsed.stacks) && parsed.stacks.length ? parsed.stacks : FALLBACK_CONFIG.stacks;
        const level = parsed.level && LEVEL_DICTIONARY[parsed.level] ? parsed.level : FALLBACK_CONFIG.level;
        const questionCount = getQuestionTargetByStacks(stacks);
        setEvaluationConfig({ stacks, level, questionCount });
      } catch {
        setEvaluationConfig(FALLBACK_CONFIG);
      }
    }

    if (saved) {
      const userAnswers = JSON.parse(saved);
      setAnswers(userAnswers);
      let questionIds;
      try {
        questionIds = savedQuestionSet ? JSON.parse(savedQuestionSet) : null;
      } catch {
        questionIds = null;
      }
      const normalizedIds = questionIds && questionIds.length ? questionIds : exercises.map((exercise) => exercise.id);
      setScore(calculateScore(userAnswers, { questionIds: normalizedIds }));
      const detailedResults = getDetailedResults(userAnswers, { questionIds: normalizedIds });
      // Asegurar que todas las explicaciones estén presentes
      const resultsWithExplanations = detailedResults.map(result => {
        if (!result.explanation) {
          // Buscar la explicación en el ejercicio original si no está presente
          const originalExercise = exercises.find(ex => ex.id === result.id);
          return {
            ...result,
            explanation: originalExercise?.explanation || ''
          };
        }
        return result;
      });
      setResults(resultsWithExplanations);
    }
  }, []);

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar el examen? Se perderán todas tus respuestas.')) {
      localStorage.removeItem('interview-answers');
      localStorage.removeItem('interview-question-set');
      setAnswers({});
      setScore(null);
      setResults([]);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredResults = results.filter(result => {
    if (filter === 'correct') return result.isCorrect;
    if (filter === 'incorrect') return !result.isCorrect && result.userAnswer && result.userAnswer !== 'timeout';
    if (filter === 'timeout') return result.userAnswer === 'timeout';
    return true;
  });

  const timeoutCount = results.filter(r => r.userAnswer === 'timeout').length;
  const stackNames = evaluationConfig.stacks
    .map((id) => STACK_DICTIONARY[id]?.label || id)
    .join(", ");
  const levelDefinition =
    LEVEL_DICTIONARY[evaluationConfig.level] || LEVEL_DICTIONARY[FALLBACK_CONFIG.level];
  const targetQuestionCount =
    evaluationConfig.questionCount ||
    getQuestionTargetByStacks(evaluationConfig.stacks);
  const shortage =
    score &&
    targetQuestionCount &&
    score.total < targetQuestionCount;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 60) return 'score-good';
    if (percentage >= 40) return 'score-average';
    return 'score-poor';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return '¡Excelente! Dominas muy bien estos conceptos.';
    if (percentage >= 60) return '¡Buen trabajo! Tienes una base sólida.';
    if (percentage >= 40) return 'Vas por buen camino, pero hay áreas por mejorar.';
    return 'Te recomendamos repasar estos conceptos y volver a intentarlo.';
  };

  if (!score) {
    return (
      <section>
        <div className="card">
          <h2>📊 Resultados</h2>
          <p>No hay resultados disponibles todavía.</p>
          <Link to="/ejercicios" className="button">
            Comenzar ejercicios
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="results-container">
      {/* Score Card */}
      <div className={`card score-card ${getScoreColor(score.percentage)}`}>
        <h2>🎯 Tu Puntuación</h2>
        <div className="score-display">
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                opacity="0.2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${score.percentage * 2.827} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="score-text">
              <span className="score-percentage">{score.percentage}%</span>
              <span className="score-fraction">{score.correct}/{score.total}</span>
            </div>
          </div>
        </div>
        <p className="score-message">{getScoreMessage(score.percentage)}</p>
        <div className="score-stats">
          <div className="stat">
            <span className="stat-icon">✅</span>
            <span className="stat-label">Correctas</span>
            <span className="stat-value">{score.correct}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">❌</span>
            <span className="stat-label">Incorrectas</span>
            <span className="stat-value">{score.total - score.correct - timeoutCount}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">⏱️</span>
            <span className="stat-label">Tiempo agotado</span>
            <span className="stat-value">{timeoutCount}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📝</span>
            <span className="stat-label">Total</span>
            <span className="stat-value">{score.total}</span>
          </div>
        </div>
        <div className="score-config">
          <div>
            <span className="score-config__label">Stack(s)</span>
            <span className="score-config__value">{stackNames || 'General'}</span>
          </div>
          <div>
            <span className="score-config__label">Nivel</span>
            <span className="score-config__value">{levelDefinition.label}</span>
            <small className="exam-config-note">
              Dificultades: {levelDefinition.difficulties.join(' · ')}
            </small>
          </div>
          <div>
            <span className="score-config__label">Preguntas evaluadas</span>
            <span className="score-config__value">
              {score.total}
              {targetQuestionCount ? ` / ${targetQuestionCount}` : ''}
            </span>
            {shortage && (
              <small className="config-warning">
                El banco del stack seleccionado aún no alcanza el objetivo.
              </small>
            )}
          </div>
        </div>
        <div className="score-actions">
          <button className="button" onClick={handleReset}>
            🔄 Reiniciar Examen
          </button>
          <Link to="/ejercicios" className="button secondary">
            📝 Revisar Preguntas
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card filters-card">
        <h3>Filtrar resultados:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas ({results.length})
          </button>
          <button
            className={`filter-btn ${filter === 'correct' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('correct')}
          >
            ✅ Correctas ({results.filter(r => r.isCorrect).length})
          </button>
          <button
            className={`filter-btn ${filter === 'incorrect' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('incorrect')}
          >
            ❌ Incorrectas ({results.filter(r => !r.isCorrect && r.userAnswer && r.userAnswer !== 'timeout').length})
          </button>
          <button
            className={`filter-btn ${filter === 'timeout' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('timeout')}
          >
            ⏱️ Tiempo agotado ({timeoutCount})
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="results-list">
        {filteredResults.map((result, index) => {
          const isTimeout = result.userAnswer === 'timeout';
          return (
            <div
              key={result.id}
              className={`card result-item ${result.isCorrect ? 'result-item--correct' : isTimeout ? 'result-item--timeout' : result.userAnswer ? 'result-item--incorrect' : 'result-item--skipped'}`}
            >
              <div className="result-header" onClick={() => toggleExpanded(result.id)}>
                <div className="result-header__left">
                  <span className="result-number">#{result.id}</span>
                  <h3>{result.title}</h3>
                  <span className="badge badge-category">{result.category}</span>
                </div>
                <div className="result-header__right">
                  <span className="result-status">
                    {result.isCorrect ? '✅ Correcto' : isTimeout ? '⏱️ Tiempo agotado' : result.userAnswer ? '❌ Incorrecto' : '⊘ Sin respuesta'}
                  </span>
                  <button className="expand-btn">
                    {expandedId === result.id ? '▼' : '▶'}
                  </button>
                </div>
              </div>

              {expandedId === result.id && (
                <div className="result-details">
                  <p className="result-question">{result.question}</p>
                  
                  <div className="result-code">
                    <pre><code>{result.code}</code></pre>
                  </div>

                  <div className="result-answers">
                    {result.options.map((option) => {
                      const isUserAnswer = option.id === result.userAnswer;
                      const isCorrectAnswer = option.id === result.correctAnswer;
                      
                      return (
                        <div
                          key={option.id}
                          className={`answer-option ${isUserAnswer && !isTimeout ? 'answer-option--user' : ''} ${isCorrectAnswer ? 'answer-option--correct' : ''}`}
                        >
                          <span className="answer-label">{option.id.toUpperCase()}</span>
                          <span className="answer-text">{option.text}</span>
                          {isUserAnswer && !isCorrectAnswer && !isTimeout && <span className="answer-badge">Tu respuesta</span>}
                          {isCorrectAnswer && <span className="answer-badge answer-badge--correct">Correcta</span>}
                        </div>
                      );
                    })}
                    {isTimeout && (
                      <div className="timeout-message">
                        <span className="timeout-icon">⏱️</span>
                        <span>No se respondió a tiempo. El tiempo límite para esta pregunta era de {Math.floor(result.timeLimit / 60)}:{(result.timeLimit % 60).toString().padStart(2, '0')} minutos.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Explicación siempre visible */}
              <div className="result-explanation">
                <h4>💡 Explicación:</h4>
                {result.explanation ? (
                  <p>{result.explanation}</p>
                ) : (
                  <p className="explanation-placeholder">No hay explicación disponible para esta pregunta.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NuevosResultados;
