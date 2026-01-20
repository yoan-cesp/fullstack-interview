import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { CODING_EXERCISES, CODE_LANGUAGES, getExerciseById, getExercisesByLanguage } from '../data/codingExercises.js';
import { evaluateCode, validateCodeSafety } from '../utils/codeEvaluator.js';
import TestResults from '../components/TestResults.jsx';

function CodeEditor() {
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [code, setCode] = useState('');
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [theme, setTheme] = useState('vs-light');

  const clearEditorStorage = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('code-exercise-') || key === 'completed-exercises') {
        localStorage.removeItem(key);
      }
    });
  };

  const selectedExercise = selectedExerciseId 
    ? getExerciseById(selectedExerciseId) 
    : null;

  const filteredExercises = getExercisesByLanguage(languageFilter);

  const languageConfig = CODE_LANGUAGES.find((lang) => lang.id === selectedExercise?.language) || CODE_LANGUAGES[0];

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

  useEffect(() => {
    clearEditorStorage();
    setSelectedExerciseId(null);
    setCode('');
    setEvaluationResults(null);
    setIsEvaluating(false);
    setShowSolution(false);
    setCurrentHint(0);
  }, [languageFilter]);

  const REMOTE_EXEC_URL = 'https://emkc.org/api/v2/piston/execute';

  const buildPythonProgram = (exercise, userCode) => {
    const testsJson = JSON.stringify(exercise.tests);
    return `import json

${userCode}

_tests = json.loads('''${testsJson}''')

results = []
passed_count = 0
for i, t in enumerate(_tests, start=1):
    try:
        res = ${exercise.functionName}(*t['input'])
        ok = res == t['expected']
        if ok:
            passed_count += 1
        results.append({
            'testNumber': i,
            'passed': ok,
            'input': t['input'],
            'expected': t['expected'],
            'actual': res,
            'error': None if ok else f"Expected: {t['expected']}, Got: {res}"
        })
    except Exception as e:
        results.append({
            'testNumber': i,
            'passed': False,
            'input': t['input'],
            'expected': t['expected'],
            'actual': None,
            'error': str(e)
        })

output = {
    'results': results,
    'passedCount': passed_count,
    'totalCount': len(_tests)
}
print(json.dumps(output))
`;
  };

  const buildDartProgram = (exercise, userCode) => {
    const testsJson = JSON.stringify(exercise.tests);
    return `import 'dart:convert';

${userCode}

  dynamic _coerce(dynamic value) {
    if (value is List) {
      return value.map(_coerce).toList();
    }
    if (value is Map) {
      return Map<String, dynamic>.from(value)
        .map((k, v) => MapEntry(k.toString(), _coerce(v)));
    }
    return value;
  }

  dynamic _coerceTyped(dynamic value, String? typeHint) {
    if (typeHint == 'List<String>') {
      return (value as List).map((item) => item.toString()).toList();
    }
    if (typeHint == 'List<int>') {
      return (value as List).map((item) => (item as num).toInt()).toList();
    }
    if (typeHint == 'List<List<int>>') {
      return (value as List)
        .map((inner) => (inner as List).map((item) => (item as num).toInt()).toList())
        .toList();
    }
    if (typeHint == 'List<Map<String, dynamic>>') {
      return (value as List)
        .map((item) => Map<String, dynamic>.from(item as Map))
        .toList();
    }
    return _coerce(value);
  }

void main() {
  final tests = jsonDecode('''${testsJson}''') as List<dynamic>;
  final results = <Map<String, dynamic>>[];
  var passedCount = 0;

  for (var i = 0; i < tests.length; i++) {
    final t = tests[i] as Map<String, dynamic>;
    try {
      final input = List<dynamic>.from(t['input'] as List<dynamic>);
      final expected = t['expected'];
      final inputTypes = (t['inputTypes'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [];
      final coercedInput = input.asMap().entries.map((entry) {
        final idx = entry.key;
        final value = entry.value;
        final typeHint = idx < inputTypes.length ? inputTypes[idx] : null;
        return _coerceTyped(value, typeHint);
      }).toList();
      final actual = Function.apply(${exercise.functionName}, coercedInput);
      final ok = jsonEncode(actual) == jsonEncode(expected);
      if (ok) passedCount++;
      results.add({
        'testNumber': i + 1,
        'passed': ok,
        'input': input,
        'expected': expected,
        'actual': actual,
        'error': ok ? null : 'Expected: $expected, Got: $actual'
      });
    } catch (e) {
      results.add({
        'testNumber': i + 1,
        'passed': false,
        'input': t['input'],
        'expected': t['expected'],
        'actual': null,
        'error': e.toString()
      });
    }
  }

  final output = {
    'results': results,
    'passedCount': passedCount,
    'totalCount': tests.length
  };
  print(jsonEncode(output));
}
`;
  };

  const escapeJavaString = (value) => String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

  const toJavaLiteral = (value) => {
    if (Array.isArray(value)) {
      const isStringArray = value.some((v) => typeof v === 'string');
      const items = value.map((v) => (isStringArray ? `"${escapeJavaString(v)}"` : v)).join(', ');
      return isStringArray ? `new String[]{${items}}` : `new int[]{${items}}`;
    }
    if (typeof value === 'string') return `"${escapeJavaString(value)}"`;
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  const renameJavaSolutionClass = (code) => {
    const lines = code.split('\n');
    const imports = [];
    const bodyLines = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('import ')) {
        imports.push(trimmed);
      } else if (!trimmed.startsWith('package ')) {
        bodyLines.push(line);
      }
    }
    const body = bodyLines.join('\n');
    const classRegex = /\b(public\s+)?(final\s+)?(abstract\s+)?class\s+Solution\b/;
    if (!classRegex.test(body)) {
      return { code: body, className: 'Solution', imports };
    }
    return {
      code: body.replace(classRegex, 'class UserSolution'),
      className: 'UserSolution',
      imports
    };
  };

  const buildJavaProgram = (exercise, userCode) => {
    const renamed = renameJavaSolutionClass(userCode);
    const calls = exercise.tests.map((test, index) => {
      const args = test.input.map((val) => toJavaLiteral(val)).join(', ');
      const expected = toJavaLiteral(test.expected);
      const testNumber = index + 1;
      const methodCall = `${exercise.functionName}(${args})`;
      const isArrayReturn = exercise.returnType === 'int[]' || exercise.returnType === 'String[]';
      const compare = isArrayReturn
        ? `java.util.Arrays.equals(actual, ${expected})`
        : `java.util.Objects.equals(actual, ${expected})`;
      const actualString = isArrayReturn
        ? `java.util.Arrays.toString(actual)`
        : `String.valueOf(actual)`;
      const expectedString = isArrayReturn
        ? `java.util.Arrays.toString(${expected})`
        : `String.valueOf(${expected})`;

      return `    try {
      ${exercise.returnType} actual = ${renamed.className}.${methodCall};
      boolean ok = ${compare};
      if (ok) passedCount++;
      System.out.println("TEST|${testNumber}|" + (ok ? "PASS" : "FAIL") + "|" + ${actualString} + "|" + ${expectedString});
    } catch (Exception e) {
      String err = String.valueOf(e.getMessage()).replace("|", "/");
      System.out.println("TEST|${testNumber}|FAIL|ERROR:" + e.getClass().getSimpleName() + ":" + err + "|" + ${expectedString});
    }`;
    }).join('\n');

    const imports = ['import java.util.*;', ...new Set(renamed.imports)].join('\n');

    return `${imports}

public class Solution {
  public static void main(String[] args) {
    int passedCount = 0;
    int totalCount = ${exercise.tests.length};
${calls}
    System.out.println("SUMMARY|" + passedCount + "|" + totalCount);
  }
}

${renamed.code}
`;
  };

  const parseJavaOutput = (stdout, exercise) => {
    const lines = stdout.trim().split(/[\r\n]+/).map((line) => line.trim()).filter(Boolean);
    const testResults = [];
    let passedCount = 0;
    let totalCount = exercise.tests.length;

    lines.forEach((line) => {
      if (line.startsWith('TEST|')) {
        const parts = line.split('|');
        const testNumber = Number(parts[1]);
        const passed = parts[2] === 'PASS';
        const actual = parts[3];
        const expected = parts[4];
        const test = exercise.tests[testNumber - 1];
        testResults.push({
          testNumber,
          passed,
          input: test?.input,
          expected: test?.expected,
          actual,
          error: passed ? null : `Expected: ${expected}, Got: ${actual}`,
          description: test?.description || `Test ${testNumber}`
        });
        if (passed) passedCount++;
      }
      if (line.startsWith('SUMMARY|')) {
        const parts = line.split('|');
        passedCount = Number(parts[1]);
        totalCount = Number(parts[2]);
      }
    });

    return {
      success: true,
      error: null,
      testResults,
      allPassed: passedCount === totalCount,
      passedCount,
      totalCount
    };
  };

  const evaluateRemoteCode = async (exercise, userCode) => {
    const parseRunnerJson = (output) => {
      const lines = output.split('\n').map((line) => line.trim()).filter(Boolean);
      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          return JSON.parse(lines[i]);
        } catch (error) {
          // keep searching
        }
      }
      return null;
    };

    let program = '';
    if (exercise.language === 'python') {
      program = buildPythonProgram(exercise, userCode);
    } else if (exercise.language === 'flutter') {
      program = buildDartProgram(exercise, userCode);
    } else if (exercise.language === 'java') {
      program = buildJavaProgram(exercise, userCode);
    } else {
      return {
        success: false,
        error: 'Lenguaje no soportado para ejecucion remota.',
        testResults: [],
        allPassed: false,
        passedCount: 0,
        totalCount: exercise.tests.length
      };
    }

    const languageConfig = CODE_LANGUAGES.find((lang) => lang.id === exercise.language);
    const files = exercise.language === 'java'
      ? [{ name: 'Solution.java', content: program }]
      : [{ content: program }];

    const response = await fetch(REMOTE_EXEC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: languageConfig?.runtime || exercise.language,
        version: languageConfig?.version || undefined,
        files
      })
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Error remoto: ${response.status}`,
        testResults: [],
        allPassed: false,
        passedCount: 0,
        totalCount: exercise.tests.length
      };
    }

    const payload = await response.json();
    const stdout = payload?.run?.stdout || '';
    const stderr = payload?.run?.stderr || '';

    if (exercise.language === 'java') {
      if (stderr) {
        return {
          success: false,
          error: stderr,
          testResults: [],
          allPassed: false,
          passedCount: 0,
          totalCount: exercise.tests.length
        };
      }
      return parseJavaOutput(stdout, exercise);
    }

    if (stderr) {
      return {
        success: false,
        error: stderr,
        testResults: [],
        allPassed: false,
        passedCount: 0,
        totalCount: exercise.tests.length
      };
    }

    try {
      const parsed = parseRunnerJson(stdout || '');
      if (!parsed) {
        throw new Error('Invalid JSON');
      }
      const passedCount = parsed.passedCount || 0;
      const totalCount = parsed.totalCount || exercise.tests.length;
      const testResults = (parsed.results || []).map((result, index) => ({
        ...result,
        description: exercise.tests[index]?.description || `Test ${index + 1}`
      }));
      return {
        success: true,
        error: null,
        testResults,
        allPassed: passedCount === totalCount,
        passedCount,
        totalCount
      };
    } catch (error) {
      return {
        success: false,
        error: 'No se pudo parsear la respuesta del runner remoto.',
        testResults: [],
        allPassed: false,
        passedCount: 0,
        totalCount: exercise.tests.length
      };
    }
  };

  const handleRunCode = async () => {
    if (!selectedExercise || !code.trim()) {
      return;
    }

    setIsEvaluating(true);
    setEvaluationResults(null);

    if (selectedExercise.language === 'javascript') {
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
    }

    try {
      const results = selectedExercise.language === 'javascript'
        ? evaluateCode(code, selectedExercise.tests)
        : await evaluateRemoteCode(selectedExercise, code);
      setEvaluationResults(results);

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
        error: error.message || 'Error al evaluar el codigo',
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
        <p>Resuelve ejercicios de programación en JavaScript, Python, Java y Flutter</p>
      </div>

      <div className="code-editor-layout">
        {/* Sidebar - Lista de Ejercicios */}
        <div className="code-editor-sidebar">
          <div className="card">
            <h3>📚 Ejercicios</h3>
            
            <div className="exercise-filters">
              <select 
                value={languageFilter} 
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todos los lenguajes</option>
                {CODE_LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.label}</option>
                ))}
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
                      <span className="exercise-language">{CODE_LANGUAGES.find((lang) => lang.id === exercise.language)?.label}</span>
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
                    <span className="language-badge">{languageConfig.label}</span>
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
                    language={languageConfig.monaco}
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
