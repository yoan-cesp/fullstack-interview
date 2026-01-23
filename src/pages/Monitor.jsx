import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subscribeToCandidate, getSessionConfig } from '../utils/firebaseSession.js';
import { exercises, getExercisesByIds } from '../data/exercises.js';
import { STACK_DICTIONARY, LEVEL_DICTIONARY } from '../data/stackConfig.js';

function Monitor() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionCorrectAnswerMap, setSessionCorrectAnswerMap] = useState({});
  const [sessionConfig, setSessionConfig] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);
  const [activeTab, setActiveTab] = useState('live'); // 'live', 'questions', 'score'
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }

    let unsubscribe = null;
    let isMounted = true;

    console.log('🔍 Monitor iniciando suscripción para sesión:', sessionId);

    // Cargar configuración completa de Firebase para esta sesión
    getSessionConfig(sessionId).then((config) => {
      if (config) {
        console.log('✅ Monitor: Configuración cargada de Firebase:', config);
        setSessionConfig(config);
        
        if (config.correctAnswerMap) {
          setSessionCorrectAnswerMap(config.correctAnswerMap);
        }
        
        // Cargar las preguntas del test
        if (config.questionIds && config.questionIds.length > 0) {
          const questions = getExercisesByIds(config.questionIds);
          setQuestionSet(questions);
        }
      }
    }).catch((error) => {
      console.warn('⚠️ Monitor: Error cargando configuración:', error);
    });

    // Suscribirse a actualizaciones del candidato
    subscribeToCandidate(sessionId, (data) => {
      if (isMounted) {
        console.log('📡 Monitor callback ejecutado con datos:', data);
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          console.log('📡 Monitor: Datos válidos, actualizando estado');
          setCandidateData(data);
          setIsConnected(true);
        } else {
          console.log('📡 Monitor: Datos vacíos o inválidos, ignorando');
        }
      }
    }).then((unsubFn) => {
      unsubscribe = unsubFn;
      console.log('✅ Monitor suscrito correctamente, función cleanup:', typeof unsubFn);
    }).catch((error) => {
      console.error('❌ Error suscribiéndose a sesión:', error);
    });

    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [sessionId, navigate]);

  if (!candidateData) {
    return (
      <div className="monitor-container">
        <div className="monitor-header">
          <h2>🔍 Monitor de Sesión</h2>
          <p>Sesión ID: <strong>{sessionId}</strong></p>
        </div>
        <div className="monitor-status">
          <div className={`status-indicator ${isConnected ? 'status-connected' : 'status-waiting'}`}>
            {isConnected ? '🟢 Conectado' : '🟡 Esperando candidato...'}
          </div>
          <p>Comparte esta URL con el candidato: <code>/test/{sessionId}</code></p>
          <p>O espera a que el candidato inicie el test para ver los datos en tiempo real.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = candidateData.currentQuestionId 
    ? exercises.find(e => e.id === candidateData.currentQuestionId)
    : null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calcular score en tiempo real
  const calculateLiveScore = () => {
    if (!candidateData?.answers || Object.keys(candidateData.answers).length === 0) {
      return { correct: 0, incorrect: 0, timeout: 0, total: 0, percentage: 0 };
    }

    let correct = 0;
    let incorrect = 0;
    let timeout = 0;

    // Obtener el correctAnswerMap más confiable
    let correctAnswerMap = sessionCorrectAnswerMap;
    if (!correctAnswerMap || Object.keys(correctAnswerMap).length === 0) {
      correctAnswerMap = candidateData?.config?.correctAnswerMap || {};
    }

    Object.entries(candidateData.answers).forEach(([questionId, answer]) => {
      if (answer === 'timeout') {
        timeout++;
      } else {
        const correctDisplayId = correctAnswerMap[questionId];
        if (correctDisplayId && answer === correctDisplayId) {
          correct++;
        } else if (!correctDisplayId) {
          // Fallback: usar respuesta original del ejercicio
          const question = exercises.find(e => e.id === parseInt(questionId));
          if (question && answer === question.correctAnswer) {
            correct++;
          } else {
            incorrect++;
          }
        } else {
          incorrect++;
        }
      }
    });

    const total = correct + incorrect + timeout;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { correct, incorrect, timeout, total, percentage };
  };

  const score = calculateLiveScore();
  const totalQuestions = candidateData?.totalQuestions || questionSet.length || 0;
  
  // Determinar color del score
  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 60) return 'score-good';
    if (percentage >= 40) return 'score-average';
    return 'score-poor';
  };

  // Obtener nombre de stacks
  const getStackNames = () => {
    const stacks = sessionConfig?.stacks || candidateData?.config?.stacks || [];
    return stacks.map(id => STACK_DICTIONARY[id]?.label || id).join(', ') || 'N/A';
  };

  // Obtener nivel
  const getLevelName = () => {
    const level = sessionConfig?.level || candidateData?.config?.level;
    return LEVEL_DICTIONARY[level]?.label || level || 'N/A';
  };

  return (
    <div className="monitor-container">
      <div className="monitor-header">
        <h2>🔍 Monitor de Sesión</h2>
        <div className="monitor-header-info">
          <span>Sesión: <strong>{sessionId}</strong></span>
          <span className={`status-badge ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
            {isConnected ? '🟢 Activo' : '🔴 Desconectado'}
          </span>
        </div>
      </div>

      {/* Score Card - Siempre visible */}
      <div className={`monitor-score-card ${getScoreColor(score.percentage)}`}>
        <div className="score-main">
          <div className="score-circle-mini">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.2" />
              <circle 
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                strokeDasharray={`${score.percentage * 2.827} 283`}
                strokeLinecap="round" transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="score-percentage-mini">{score.percentage}%</span>
          </div>
          <div className="score-details">
            <h3>Score en Tiempo Real</h3>
            <div className="score-breakdown">
              <span className="score-stat score-stat--correct">✅ {score.correct} correctas</span>
              <span className="score-stat score-stat--incorrect">❌ {score.incorrect} incorrectas</span>
              <span className="score-stat score-stat--timeout">⏱️ {score.timeout} sin tiempo</span>
              <span className="score-stat score-stat--pending">📝 {totalQuestions - score.total} pendientes</span>
            </div>
          </div>
        </div>
        <div className="score-config-mini">
          <span><strong>Stack:</strong> {getStackNames()}</span>
          <span><strong>Nivel:</strong> {getLevelName()}</span>
          <span><strong>Progreso:</strong> {score.total}/{totalQuestions}</span>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="monitor-tabs">
        <button 
          className={`monitor-tab ${activeTab === 'live' ? 'monitor-tab--active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          📡 En Vivo
        </button>
        <button 
          className={`monitor-tab ${activeTab === 'questions' ? 'monitor-tab--active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          📋 Preguntas ({questionSet.length})
        </button>
        <button 
          className={`monitor-tab ${activeTab === 'history' ? 'monitor-tab--active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📊 Historial ({score.total})
        </button>
      </div>

      {/* Tab: En Vivo */}
      {activeTab === 'live' && (
        <div className="monitor-grid">
          {/* Panel de Resumen */}
          <div className="monitor-card monitor-summary">
            <h3>📊 Estado Actual</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Pregunta</span>
                <span className="stat-value">
                  {candidateData.currentQuestion || 0} / {totalQuestions}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progreso</span>
                <span className="stat-value">{candidateData.progress || 0}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Tiempo</span>
                <span className="stat-value">
                  {candidateData.timeLeft ? formatTime(candidateData.timeLeft) : '--:--'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Estado</span>
                <span className="stat-value">
                  {candidateData.status === 'completed' ? '✅ Completado' : 
                   candidateData.status === 'paused' ? '⏸️ Pausado' : 
                   '▶️ En progreso'}
                </span>
              </div>
            </div>
          </div>

          {/* Pregunta Actual */}
          {currentQuestion && (
            <div className="monitor-card monitor-question">
              <h3>📝 Pregunta Actual</h3>
              <div className="question-header">
                <span className="question-number">Pregunta {candidateData.currentQuestion || 0}</span>
                <span className={`difficulty-badge ${currentQuestion.difficulty.toLowerCase().replace('á', 'a')}`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              <h4>{currentQuestion.title}</h4>
              <p className="question-text">{currentQuestion.question}</p>
              
              {currentQuestion.code && (
                <pre className="question-code"><code>{currentQuestion.code}</code></pre>
              )}

              <div className="question-options">
                <h5>Opciones:</h5>
                {(sessionConfig?.optionOrder?.[currentQuestion.id] || currentQuestion.options).map((opt) => {
                  const isSelected = candidateData.selectedAnswer === opt.id;
                  const correctDisplayId = sessionCorrectAnswerMap[currentQuestion.id] || currentQuestion.correctAnswer;
                  const isCorrect = opt.id === correctDisplayId;
                  return (
                    <div 
                      key={opt.id} 
                      className={`option-item ${isSelected ? 'option-selected' : ''} ${isCorrect ? 'option-correct' : ''}`}
                    >
                      <span className="option-id">{opt.id.toUpperCase()}</span>
                      <span className="option-text">{opt.text}</span>
                      {isSelected && <span className="option-marker">✓ Seleccionada</span>}
                      {isCorrect && <span className="option-marker option-marker--correct">✓ Correcta</span>}
                    </div>
                  );
                })}
              </div>
              
              {currentQuestion.explanation && (
                <div className="answer-explanation">
                  <h5>💡 Explicación:</h5>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Todas las Preguntas */}
      {activeTab === 'questions' && (
        <div className="monitor-questions-list">
          <div className="monitor-card">
            <h3>📋 Todas las Preguntas del Test</h3>
            <p className="questions-intro">
              Revisa todas las preguntas, respuestas correctas y explicaciones.
            </p>
          </div>
          
          {questionSet.map((question, index) => {
            const isExpanded = expandedQuestionId === question.id;
            const answer = candidateData?.answers?.[question.id];
            const correctDisplayId = sessionCorrectAnswerMap[question.id] || question.correctAnswer;
            const isAnswered = answer && answer !== 'timeout';
            const isCorrect = answer === correctDisplayId;
            const isTimeout = answer === 'timeout';
            
            return (
              <div 
                key={question.id} 
                className={`monitor-card question-review-card ${isAnswered ? (isCorrect ? 'question-review--correct' : 'question-review--incorrect') : isTimeout ? 'question-review--timeout' : 'question-review--pending'}`}
              >
                <div 
                  className="question-review-header"
                  onClick={() => setExpandedQuestionId(isExpanded ? null : question.id)}
                >
                  <div className="question-review-left">
                    <span className="question-review-number">#{index + 1}</span>
                    <div className="question-review-info">
                      <h4>{question.title}</h4>
                      <div className="question-review-badges">
                        <span className={`difficulty-badge ${question.difficulty.toLowerCase().replace('á', 'a')}`}>
                          {question.difficulty}
                        </span>
                        <span className="badge badge-category">{question.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="question-review-right">
                    {isAnswered && (
                      <span className={`answer-badge ${isCorrect ? 'answer-badge--correct' : 'answer-badge--incorrect'}`}>
                        {isCorrect ? '✅ Correcta' : '❌ Incorrecta'}
                      </span>
                    )}
                    {isTimeout && <span className="answer-badge answer-badge--timeout">⏱️ Sin tiempo</span>}
                    {!answer && <span className="answer-badge answer-badge--pending">⏳ Pendiente</span>}
                    <button className="expand-btn">{isExpanded ? '▼' : '▶'}</button>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="question-review-content">
                    <p className="question-text">{question.question}</p>
                    
                    {question.code && (
                      <pre className="question-code"><code>{question.code}</code></pre>
                    )}
                    
                    <div className="question-options">
                      <h5>Opciones:</h5>
                      {(sessionConfig?.optionOrder?.[question.id] || question.options).map((opt) => {
                        const isUserAnswer = opt.id === answer;
                        const isCorrectOpt = opt.id === correctDisplayId;
                        return (
                          <div 
                            key={opt.id} 
                            className={`option-item ${isCorrectOpt ? 'option-correct' : ''} ${isUserAnswer && !isCorrectOpt ? 'option-incorrect' : ''}`}
                          >
                            <span className="option-id">{opt.id.toUpperCase()}</span>
                            <span className="option-text">{opt.text}</span>
                            {isCorrectOpt && <span className="option-marker option-marker--correct">✓ Correcta</span>}
                            {isUserAnswer && !isCorrectOpt && <span className="option-marker option-marker--wrong">✗ Respuesta del candidato</span>}
                            {isUserAnswer && isCorrectOpt && <span className="option-marker option-marker--success">🎉 ¡Acertó!</span>}
                          </div>
                        );
                      })}
                    </div>
                    
                    {question.explanation && (
                      <div className="answer-explanation">
                        <h5>💡 Explicación:</h5>
                        <p>{question.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Historial de Respuestas */}
      {activeTab === 'history' && (
        <div className="monitor-grid">
          {candidateData.answers && Object.keys(candidateData.answers).length > 0 ? (
            <div className="monitor-card monitor-history">
              <h3>📋 Historial de Respuestas ({score.total} respondidas)</h3>
              <div className="history-summary">
                <span className="history-stat history-stat--correct">✅ {score.correct} correctas ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)</span>
                <span className="history-stat history-stat--incorrect">❌ {score.incorrect} incorrectas</span>
                <span className="history-stat history-stat--timeout">⏱️ {score.timeout} sin tiempo</span>
              </div>
              <div className="answers-list">
                {Object.entries(candidateData.answers).map(([questionId, answer]) => {
                  const question = exercises.find(e => e.id === parseInt(questionId));
                  if (!question) return null;
                  
                  let correctAnswerMap = sessionCorrectAnswerMap;
                  if (!correctAnswerMap || Object.keys(correctAnswerMap).length === 0) {
                    correctAnswerMap = candidateData?.config?.correctAnswerMap || {};
                  }
                  
                  const correctDisplayId = correctAnswerMap[questionId] || question.correctAnswer;
                  const isCorrect = answer === correctDisplayId;
                  const isTimeout = answer === 'timeout';
                  
                  return (
                    <div key={questionId} className={`answer-item ${isCorrect ? 'answer-correct' : isTimeout ? 'answer-timeout' : 'answer-incorrect'}`}>
                      <div className="answer-header">
                        <span className="answer-question-id">Pregunta {questionId}</span>
                        <span className={`answer-status ${isCorrect ? 'status-correct' : isTimeout ? 'status-timeout' : 'status-incorrect'}`}>
                          {isCorrect ? '✅' : isTimeout ? '⏱️' : '❌'}
                        </span>
                      </div>
                      <div className="answer-title">{question.title}</div>
                      <div className="answer-details">
                        <span>Respuesta: <strong>{answer?.toUpperCase() || 'Sin respuesta'}</strong></span>
                        {!isTimeout && (
                          <span>Correcta: <strong>{correctDisplayId.toUpperCase()}</strong></span>
                        )}
                      </div>
                      {question.explanation && (
                        <div className="answer-explanation">
                          <h5>💡 Explicación:</h5>
                          <p>{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="monitor-card">
              <h3>📋 Historial de Respuestas</h3>
              <p className="empty-state">El candidato aún no ha respondido ninguna pregunta.</p>
            </div>
          )}
        </div>
      )}

      <div className="monitor-footer">
        <button onClick={() => navigate('/')} className="btn-secondary">
          ← Volver al inicio
        </button>
        <p className="monitor-note">
          💡 Los datos se actualizan automáticamente cada vez que el candidato interactúa con el test.
        </p>
      </div>
    </div>
  );
}

export default Monitor;
