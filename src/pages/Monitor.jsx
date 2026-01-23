import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subscribeToCandidate, getSessionConfig } from '../utils/firebaseSession.js';
import { exercises } from '../data/exercises.js';

function Monitor() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionCorrectAnswerMap, setSessionCorrectAnswerMap] = useState({});

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }

    let unsubscribe = null;
    let isMounted = true;

    console.log('🔍 Monitor iniciando suscripción para sesión:', sessionId);

    // Cargar correctAnswerMap directamente de Firebase para esta sesión
    getSessionConfig(sessionId).then((config) => {
      if (config?.correctAnswerMap) {
        console.log('✅ Monitor: correctAnswerMap cargado de Firebase:', config.correctAnswerMap);
        setSessionCorrectAnswerMap(config.correctAnswerMap);
      }
    }).catch((error) => {
      console.warn('⚠️ Monitor: Error cargando correctAnswerMap:', error);
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

      <div className="monitor-grid">
        {/* Panel de Resumen */}
        <div className="monitor-card monitor-summary">
          <h3>📊 Resumen</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Progreso</span>
              <span className="stat-value">
                {candidateData.currentQuestion || 0} / {candidateData.totalQuestions || 0}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completado</span>
              <span className="stat-value">
                {candidateData.progress || 0}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tiempo restante</span>
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
              {currentQuestion.options.map((opt) => {
                const isSelected = candidateData.selectedAnswer === opt.id;
                const isCorrect = opt.id === currentQuestion.correctAnswer;
                return (
                  <div 
                    key={opt.id} 
                    className={`option-item ${isSelected ? 'option-selected' : ''} ${isCorrect ? 'option-correct' : ''}`}
                  >
                    <span className="option-id">{opt.id.toUpperCase()}</span>
                    <span className="option-text">{opt.text}</span>
                    {isSelected && <span className="option-marker">✓ Seleccionada</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Historial de Respuestas */}
        {candidateData.answers && Object.keys(candidateData.answers).length > 0 && (
          <div className="monitor-card monitor-history">
            <h3>📋 Historial de Respuestas</h3>
            <div className="answers-list">
              {Object.entries(candidateData.answers).map(([questionId, answer]) => {
                const question = exercises.find(e => e.id === parseInt(questionId));
                if (!question) return null;
                
                // Obtener el mapeo de respuestas correctas - prioridad:
                // 1. Desde Firebase (sessionCorrectAnswerMap) - más confiable
                // 2. Desde candidateData.config.correctAnswerMap
                // 3. Desde localStorage (fallback para compatibilidad)
                let correctAnswerMap = sessionCorrectAnswerMap;
                
                if (!correctAnswerMap || Object.keys(correctAnswerMap).length === 0) {
                  correctAnswerMap = candidateData?.config?.correctAnswerMap || {};
                }
                
                if (!correctAnswerMap || Object.keys(correctAnswerMap).length === 0) {
                  try {
                    const storedMap = localStorage.getItem('correct-answer-map');
                    if (storedMap) {
                      correctAnswerMap = JSON.parse(storedMap);
                    }
                  } catch (e) {
                    // Si no hay mapeo, usar comparación original
                  }
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
                    {/* Explicación siempre visible */}
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
        )}

        {/* Configuración del Test */}
        {candidateData.config && (
          <div className="monitor-card monitor-config">
            <h3>⚙️ Configuración</h3>
            <div className="config-details">
              <div><strong>Stacks:</strong> {candidateData.config.stacks?.join(', ') || 'N/A'}</div>
              <div><strong>Nivel:</strong> {candidateData.config.level || 'N/A'}</div>
              <div><strong>Total preguntas:</strong> {candidateData.config.questionCount || 'N/A'}</div>
            </div>
          </div>
        )}
      </div>

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
