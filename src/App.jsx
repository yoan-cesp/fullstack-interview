import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NuevosEjercicios from "./pages/NuevosEjercicios.jsx";
import NuevosResultados from "./pages/NuevosResultados.jsx";
import Monitor from "./pages/Monitor.jsx";

function App() {
  // Para GitHub Pages, usa el basename del repo
  const basename = import.meta.env.PROD ? '/fullstack-interview' : '';
  
  return (
    <BrowserRouter basename={basename}>
      <header className="toolbar">
        <nav className="container">
          <h1>🎯 Evaluación Técnica</h1>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/ejercicios">Ejercicios</Link>
            <Link to="/respuestas">Resultados</Link>
          </div>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ejercicios" element={<NuevosEjercicios />} />
          <Route path="/test/:sessionId" element={<NuevosEjercicios />} />
          <Route path="/monitor/:sessionId" element={<Monitor />} />
          <Route path="/respuestas" element={<NuevosResultados />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
