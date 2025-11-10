import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TECH_STACKS, LEVELS, DEFAULT_QUESTION_COUNT, MULTI_STACK_QUESTION_COUNT, getQuestionTargetByStacks } from "../data/stackConfig.js";

function Home() {
  const navigate = useNavigate();
  const [selectedStacks, setSelectedStacks] = useState([TECH_STACKS[0].id]);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0].id);
  const [formError, setFormError] = useState("");
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

  const handleStart = () => {
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
    navigate("/ejercicios");
  };

  const levelInfo = LEVELS.find((level) => level.id === selectedLevel);
  const selectedStackDetails = TECH_STACKS.filter((stack) =>
    selectedStacks.includes(stack.id)
  );

  return (
    <section>
      <div className="card">
        <h2>🎯 Evaluación Técnica Fullstack</h2>
        <p>
          Bienvenido a la prueba técnica. Configura el stack que quieres evaluar
          (React, Next.js, NestJS, bases de datos, CSS, Git y diseño de sistemas)
          y el nivel que mejor describe tu seniority.
        </p>
        <p>
          Responde las preguntas seleccionando la opción correcta. Al finalizar podrás
          ver tus resultados con explicaciones detalladas y reforzar los conceptos clave.
        </p>
      </div>

      <div className="card home-config-card">
        <div className="home-config-card__head">
          <h3>Configura tu evaluación</h3>
          <p>
            Selecciona los stacks que quieres practicar y el nivel esperado.
            Obtendrás {questionTarget} preguntas ({DEFAULT_QUESTION_COUNT} si eliges un único stack o {MULTI_STACK_QUESTION_COUNT} combinando varios) mezclando conceptos desde lo básico hasta escenarios avanzados.
          </p>
        </div>

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
            <p>
              {questionTarget} ejercicios por iteración
            </p>
          </div>
        </div>

        {formError && <p className="form-error">{formError}</p>}

        <button
          type="button"
          className="home-card__button home-card__button--cta"
          onClick={handleStart}
        >
          Generar evaluación →
        </button>
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
