import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TECH_STACKS, LEVELS, DEFAULT_QUESTION_COUNT, MULTI_STACK_QUESTION_COUNT, getQuestionTargetByStacks } from "../data/stackConfig.js";
import { generateSessionId } from "../utils/firebaseSession.js";

function Home() {
  const navigate = useNavigate();
  const [selectedStacks, setSelectedStacks] = useState([TECH_STACKS[0].id]);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0].id);
  const [formError, setFormError] = useState("");
  const [createdSessionId, setCreatedSessionId] = useState(null);
  const questionTarget = getQuestionTargetByStacks(selectedStacks);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("interview-config");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.stacks) && parsed.stacks.length) {
          setSelectedStacks(parsed.stacks);
        }
        if (parsed.level) {
          setSelectedLevel(parsed.level);
        }
      }
    } catch {
      // Ignorar errores de parseo y continuar con valores por defecto
    }
  }, []);

  const toggleStack = (stackId) => {
    setSelectedStacks((prev) => {
      if (prev.includes(stackId)) {
        return prev.filter((id) => id !== stackId);
      }
      return [...prev, stackId];
    });
    setFormError("");
  };

  const handleLevelChange = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleStart = (withSession = false) => {
    if (!selectedStacks.length) {
      setFormError("Selecciona al menos una tecnología para continuar.");
      return;
    }

    const questionCount = getQuestionTargetByStacks(selectedStacks);
    const config = {
      stacks: selectedStacks,
      level: selectedLevel,
      questionCount,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("interview-config", JSON.stringify(config));
    localStorage.removeItem("interview-question-set");
    localStorage.removeItem("interview-answers");
    
    if (withSession) {
      // Crear sesión con ID para monitoreo
      const sessionId = generateSessionId();
      config.sessionId = sessionId;
      localStorage.setItem("interview-config", JSON.stringify(config));
      setCreatedSessionId(sessionId);
      setFormError(""); // Limpiar errores
      // No navegar inmediatamente, mostrar URL para compartir
    } else {
      navigate("/ejercicios");
    }
  };

  const handleStartTest = () => {
    if (createdSessionId) {
      navigate(`/test/${createdSessionId}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // URL copiada silenciosamente
      console.log('✅ URL copiada:', text);
    }).catch(() => {
      console.warn('⚠️ Error al copiar. URL:', text);
    });
  };

  const getFullUrl = (path) => {
    return `${window.location.origin}${path}`;
  };

  const levelInfo = LEVELS.find((level) => level.id === selectedLevel);
  const selectedStackDetails = TECH_STACKS.filter((stack) =>
    selectedStacks.includes(stack.id)
  );

  return (
    <section>
      {/* Sección Principal: Crear Sesión Monitoreada */}
      <div className="card home-session-creator">
        <h2>🔍 Crear Sesión de Monitoreo</h2>
        <p>
          Crea una sesión con ID único para monitorear en tiempo real las respuestas del candidato.
          Comparte la URL con el candidato y observa su progreso desde el dashboard.
        </p>
        
        {!createdSessionId ? (
          <>
            <div className="home-config-section">
              <h4>Stacks disponibles</h4>
              <div className="stack-grid">
                {TECH_STACKS.map((stack) => {
                  const isSelected = selectedStacks.includes(stack.id);
                  return (
                    <button
                      type="button"
                      key={stack.id}
                      className={`stack-chip ${isSelected ? "stack-chip--selected" : ""}`}
                      onClick={() => toggleStack(stack.id)}
                      aria-pressed={isSelected}
                    >
                      <div className="stack-chip__icon">{stack.icon}</div>
                      <div className="stack-chip__body">
                        <span className="stack-chip__title">{stack.label}</span>
                        <span className="stack-chip__desc">{stack.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="home-config-section">
              <h4>Nivel del candidato</h4>
              <div className="level-grid">
                {LEVELS.map((level) => (
                  <label
                    key={level.id}
                    className={`level-card ${selectedLevel === level.id ? "level-card--active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="candidate-level"
                      value={level.id}
                      checked={selectedLevel === level.id}
                      onChange={() => handleLevelChange(level.id)}
                    />
                    <div>
                      <strong>{level.label}</strong>
                      <p>{level.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <button
              type="button"
              className="home-card__button home-card__button--cta home-card__button--large"
              onClick={() => handleStart(true)}
            >
              🔍 Crear Sesión Monitoreada
            </button>
          </>
        ) : (
          <div className="session-created">
            <div className="session-success">
              <h3>✅ Sesión Creada Exitosamente</h3>
              <p>ID de Sesión: <strong>{createdSessionId}</strong></p>
            </div>
            
            <div className="session-urls">
              <div className="url-box">
                <label>URL para el Candidato:</label>
                <div className="url-input-group">
                  <input 
                    type="text" 
                    readOnly 
                    value={getFullUrl(`/test/${createdSessionId}`)}
                    className="url-input"
                  />
                  <button 
                    type="button"
                    className="btn-copy"
                    onClick={() => copyToClipboard(getFullUrl(`/test/${createdSessionId}`))}
                  >
                    📋 Copiar
                  </button>
                </div>
              </div>

              <div className="url-box">
                <label>URL para el Entrevistador (Monitor):</label>
                <div className="url-input-group">
                  <input 
                    type="text" 
                    readOnly 
                    value={getFullUrl(`/monitor/${createdSessionId}`)}
                    className="url-input"
                  />
                  <button 
                    type="button"
                    className="btn-copy"
                    onClick={() => copyToClipboard(getFullUrl(`/monitor/${createdSessionId}`))}
                  >
                    📋 Copiar
                  </button>
                </div>
              </div>
            </div>

            <div className="session-actions">
              <button
                type="button"
                className="home-card__button home-card__button--cta"
                onClick={handleStartTest}
              >
                Ir al Test del Candidato →
              </button>
              <button
                type="button"
                className="home-card__button home-card__button--secondary"
                onClick={() => navigate(`/monitor/${createdSessionId}`)}
              >
                Abrir Monitor (Entrevistador) 🔍
              </button>
              <button
                type="button"
                className="home-card__button home-card__button--secondary"
                onClick={() => setCreatedSessionId(null)}
              >
                Crear Nueva Sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sección Secundaria: Evaluación Normal (sin monitoreo) */}
      {!createdSessionId && (
        <div className="card home-config-card">
          <div className="home-config-card__head">
            <h3>O: Iniciar Evaluación Sin Monitoreo</h3>
            <p>
              Si prefieres hacer el test sin monitoreo en tiempo real, usa esta opción.
            </p>
          </div>

          <div className="home-config-summary">
            <div>
              <strong>Stacks seleccionados:</strong>
              <p>
                {selectedStackDetails.length
                  ? selectedStackDetails.map((stack) => stack.label).join(", ")
                  : "Selecciona al menos una tecnología"}
              </p>
            </div>
            <div>
              <strong>Nivel objetivo:</strong>
              <p>{levelInfo?.label}</p>
            </div>
            <div>
              <strong>Preguntas:</strong>
              <p>{questionTarget} ejercicios</p>
            </div>
          </div>

          <button
            type="button"
            className="home-card__button home-card__button--secondary"
            onClick={() => handleStart(false)}
          >
            Iniciar evaluación sin monitoreo →
          </button>
        </div>
      )}

      <div className="card">
        <h2>🎯 Evaluación Técnica Fullstack</h2>
        <p>
          Sistema de evaluación técnica con monitoreo en tiempo real. 
          Observa las respuestas del candidato mientras realiza el test.
        </p>
      </div>


      <div className="home-actions">
        <div className="home-card home-card--primary">
          <div className="home-card__icon">📝</div>
          <h3>Resumen de tu práctica</h3>
          <p>
            {questionTarget} pregunta(s) adaptadas a{" "}
            {selectedStackDetails.length || 0} stack(s) y nivel {levelInfo?.label}.
          </p>
          <ul className="summary-list">
            {selectedStackDetails.slice(0, 3).map((stack) => (
              <li key={stack.id}>
                {stack.icon} {stack.label} · {stack.focus}
              </li>
            ))}
            {selectedStackDetails.length > 3 && (
              <li>+{selectedStackDetails.length - 3} stack(s) adicionales</li>
            )}
            {selectedStackDetails.length === 0 && (
              <li>Selecciona un stack para personalizar la práctica.</li>
            )}
          </ul>
        </div>

        <Link to="/respuestas" className="home-card home-card--secondary">
          <div className="home-card__icon">📊</div>
          <h3>Ver Resultados</h3>
          <p>Revisa tus respuestas y aprende de las explicaciones</p>
          <span className="home-card__button">Ver resultados →</span>
        </Link>
      </div>

      <div className="card home-info">
        <h3>📋 Instrucciones</h3>
        <ul>
          <li>Lee cada pregunta y analiza el código cuidadosamente</li>
          <li>Selecciona la respuesta que consideres correcta</li>
          <li>
            Siempre son {questionTarget} preguntas con temporizador individual (20 si practicas un stack, 30 al combinar varios)
          </li>
          <li>Puedes navegar entre preguntas usando los botones de navegación</li>
          <li>Al finalizar, podrás ver tus resultados y explicaciones detalladas</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
