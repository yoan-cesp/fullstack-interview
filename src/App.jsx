import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import Exercises from './pages/Exercises.jsx';
import Results from './pages/Results.jsx';
import Monitor from './pages/Monitor.jsx';
import CodeEditor from './pages/CodeEditor.jsx';

// Componente para manejar redirecciones desde 404.html
function RedirectHandler() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // Extraer solo el path sin el base y sin /index.html
      let path = redirectPath.replace(/^\/fullstack-interview/, '').replace(/\/index\.html$/, '');
      if (!path) path = '/';
      // Navegar a la ruta correcta
      navigate(path, { replace: true });
    }
  }, [navigate]);
  
  return null;
}

function App() {
  // Para GitHub Pages, usa el basename del repo
  const basename = import.meta.env.PROD ? '/fullstack-interview' : '';
  
  return (
    <BrowserRouter basename={basename}>
      <RedirectHandler />
      <header className="toolbar">
        <nav className="container">
          <h1>🎯 Evaluación Técnica</h1>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/exercises">Ejercicios</Link>
            <Link to="/editor">Editor de Código</Link>
            <Link to="/results">Resultados</Link>
          </div>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/test/:sessionId" element={<Exercises />} />
          <Route path="/monitor/:sessionId" element={<Monitor />} />
          <Route path="/editor" element={<CodeEditor />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
