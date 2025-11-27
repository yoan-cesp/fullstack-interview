import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { CODING_EXERCISES, getExerciseById, getExercisesByDifficulty } from '../data/codingExercises.js';
import { evaluateCode, validateCodeSafety } from '../utils/codeEvaluator.js';
import TestResults from '../components/TestResults.jsx';

function CodeEditor() {
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [code, setCode] = useState('');
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [theme, setTheme] = useState('vs-light');

  const selectedExercise = selectedExerciseId 
    ? getExerciseById(selectedExerciseId) 
    : null;

  const filteredExercises = difficultyFilter === 'all'
    ? CODING_EXERCISES
    : getExercisesByDifficulty(difficultyFilter);

  // Cargar ejercicio seleccionado
  useEffect(() => {
    if (selectedExerciseId) {
      const exercise = getExerciseById(selectedExerciseId);
      if (exercise) {
        // Cargar código guardado o usar starter code
        const savedCode = localStorage.getItem(`code-exercise-${selectedExerciseId}`);
        setCode(savedCode || exercise.starterCode);
        setEvaluationResults(null);
        setShowSolution(false);
        setCurrentHint(0);
      }
    }
  }, [selectedExerciseId]);

  // Guardar código automáticamente
  useEffect(() => {
    if (selectedExerciseId && code) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`code-exercise-${selectedExerciseId}`, code);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [code, selectedExerciseId]);

  const handleRunCode = () => {
    if (!selectedExercise || !code.trim()) {
      return;
    }

    setIsEvaluating(true);
    setEvaluationResults(null);

    // Validar seguridad del código
    const safetyCheck = validateCodeSafety(code);
    if (!safetyCheck.isValid) {
      setEvaluationResults({
        success: false,
        error: safetyCheck.errors.join(', '),
        testResults: [],
        allPassed: false,
        passedCount: 0,
        totalCount: selectedExercise.tests.length
      });
      setIsEvaluating(false);
      return;
    }

    // Ejecutar evaluación
    try {
      const results = evaluateCode(code, selectedExercise.tests);
      setEvaluationResults(results);
      
      // Si todos los tests pasaron, guardar como completado
      if (results.allPassed) {
        const completed = JSON.parse(localStorage.getItem('completed-exercises') || '[]');
        if (!completed.includes(selectedExerciseId)) {
          completed.push(selectedExerciseId);
          localStorage.setItem('completed-exercises', JSON.stringify(completed));
        }
      }
    } catch (error) {
      setEvaluationResults({
        success: false,
        error: error.message || 'Error al evaluar el código',
        testResults: [],
        allPassed: false,
        passedCount: 0,
        totalCount: selectedExercise.tests.length
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleResetCode = () => {
    if (selectedExercise) {
      setCode(selectedExercise.starterCode);
      setEvaluationResults(null);
      setShowSolution(false);
      setCurrentHint(0);
    }
  };

  const handleShowHint = () => {
    if (selectedExercise && selectedExercise.hints) {
      const nextHint = currentHint + 1;
      if (nextHint <= selectedExercise.hints.length) {
        setCurrentHint(nextHint);
      }
    }
  };

  const handleShowSolution = () => {
    if (selectedExercise) {
      setShowSolution(true);
      setCode(selectedExercise.solution);
    }
  };

  const getCompletedExercises = () => {
    return JSON.parse(localStorage.getItem('completed-exercises') || '[]');
  };

  const completedExercises = getCompletedExercises();

  return (
    <section className="code-editor-container">
      <div className="code-editor-header">
        <h2>💻 Editor de Código</h2>
        <p>Resuelve ejercicios de programación escribiendo código JavaScript</p>
      </div>

      <div className="code-editor-layout">
        {/* Sidebar - Lista de Ejercicios */}
        <div className="code-editor-sidebar">
          <div className="card">
            <h3>📚 Ejercicios</h3>
            
            <div className="exercise-filters">
              <select 
                value={difficultyFilter} 
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todas las dificultades</option>
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <div className="exercise-list">
              {filteredExercises.map((exercise) => {
                const isCompleted = completedExercises.includes(exercise.id);
                const isSelected = selectedExerciseId === exercise.id;
                
                return (
                  <button
                    key={exercise.id}
                    className={`exercise-item ${isSelected ? 'exercise-item--selected' : ''} ${isCompleted ? 'exercise-item--completed' : ''}`}
                    onClick={() => setSelectedExerciseId(exercise.id)}
                  >
                    <div className="exercise-item-header">
                      <span className="exercise-number">#{exercise.id}</span>
                      {isCompleted && <span className="exercise-completed-badge">✅</span>}
                    </div>
                    <div className="exercise-title">{exercise.title}</div>
                    <div className="exercise-meta">
                      <span className="exercise-difficulty">{exercise.difficulty}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Editor y Ejercicio */}
        <div className="code-editor-main">
          {selectedExercise ? (
            <>
              {/* Exercise Description */}
              <div className="card exercise-description">
                <div className="exercise-description-header">
                  <h3>{selectedExercise.title}</h3>
                  <span className={`difficulty-badge difficulty-${selectedExercise.difficulty.toLowerCase()}`}>
                    {selectedExercise.difficulty}
                  </span>
                </div>
                <p className="exercise-description-text">{selectedExercise.description}</p>
                
                {selectedExercise.hints && selectedExercise.hints.length > 0 && currentHint > 0 && (
                  <div className="exercise-hints">
                    <h4>💡 Pistas:</h4>
                    {selectedExercise.hints.slice(0, currentHint).map((hint, index) => (
                      <div key={index} className="hint-item">
                        {index + 1}. {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="card code-editor-wrapper">
                <div className="code-editor-toolbar">
                  <div className="toolbar-left">
                    <span className="language-badge">JavaScript</span>
                    <button
                      className="btn-toolbar"
                      onClick={() => setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light')}
                    >
                      {theme === 'vs-light' ? '🌙' : '☀️'} {theme === 'vs-light' ? 'Oscuro' : 'Claro'}
                    </button>
                  </div>
                  <div className="toolbar-right">
                    <button className="btn-toolbar" onClick={handleResetCode}>
                      🔄 Limpiar
                    </button>
                    {selectedExercise.hints && currentHint < selectedExercise.hints.length && (
                      <button className="btn-toolbar" onClick={handleShowHint}>
                        💡 Pista ({currentHint}/{selectedExercise.hints.length})
                      </button>
                    )}
                    <button className="btn-toolbar" onClick={handleShowSolution}>
                      👁️ Ver Solución
                    </button>
                  </div>
                </div>
                
                <div className="monaco-editor-container">
                  <Editor
                    height="400px"
                    language="javascript"
                    theme={theme}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on'
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="code-editor-actions">
                <button
                  className="btn-run"
                  onClick={handleRunCode}
                  disabled={isEvaluating || !code.trim()}
                >
                  {isEvaluating ? '⏳ Ejecutando...' : '▶️ Ejecutar Tests'}
                </button>
              </div>

              {/* Test Results */}
              <TestResults results={evaluationResults} isLoading={isEvaluating} />
            </>
          ) : (
            <div className="card no-exercise-selected">
              <h3>👈 Selecciona un ejercicio</h3>
              <p>Elige un ejercicio de la lista para comenzar a programar</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CodeEditor;

