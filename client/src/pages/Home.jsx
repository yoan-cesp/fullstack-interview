import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <div className="card">
        <h2>🎯 Evaluación Técnica - React & Node.js</h2>
        <p>
          Bienvenido a la prueba técnica. Este sistema evalúa tus conocimientos en
          React Hooks, manejo de estado, efectos secundarios y conceptos de backend con Node.js.
        </p>
        <p>
          Responde las preguntas seleccionando la opción correcta. Al finalizar podrás 
          ver tus resultados con explicaciones detalladas.
        </p>
      </div>

      <div className="home-actions">
        <Link to="/ejercicios" className="home-card home-card--primary">
          <div className="home-card__icon">📝</div>
          <h3>Comenzar Ejercicios</h3>
          <p>21 preguntas técnicas sobre React, Node.js, Git, CSS y AWS</p>
          <span className="home-card__button">Iniciar evaluación →</span>
        </Link>

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
          <li>Puedes navegar entre preguntas usando los botones de navegación</li>
          <li>Al finalizar, podrás ver tus resultados y explicaciones detalladas</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
