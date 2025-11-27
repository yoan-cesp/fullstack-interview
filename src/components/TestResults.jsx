import React from 'react';

function TestResults({ results, isLoading }) {
  if (isLoading) {
    return (
      <div className="test-results">
        <div className="test-results-header">
          <h3>🧪 Resultados de Tests</h3>
          <div className="test-loading">Ejecutando tests...</div>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const { success, error, testResults, allPassed, passedCount, totalCount } = results;

  return (
    <div className="test-results">
      <div className="test-results-header">
        <h3>🧪 Resultados de Tests</h3>
        <div className={`test-summary ${allPassed ? 'test-summary--passed' : 'test-summary--failed'}`}>
          {allPassed ? '✅' : '❌'} {passedCount} / {totalCount} tests pasados
        </div>
      </div>

      {error && (
        <div className="test-error">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {success && testResults.length > 0 && (
        <div className="test-list">
          {testResults.map((test, index) => (
            <div
              key={index}
              className={`test-item ${test.passed ? 'test-item--passed' : 'test-item--failed'}`}
            >
              <div className="test-item-header">
                <span className="test-icon">{test.passed ? '✅' : '❌'}</span>
                <span className="test-description">
                  {test.description || `Test ${test.testNumber}`}
                </span>
              </div>
              
              {!test.passed && (
                <div className="test-details">
                  <div className="test-detail">
                    <strong>Input:</strong> {JSON.stringify(test.input)}
                  </div>
                  <div className="test-detail">
                    <strong>Expected:</strong> <code>{JSON.stringify(test.expected)}</code>
                  </div>
                  <div className="test-detail">
                    <strong>Got:</strong> <code>{test.actual !== null ? JSON.stringify(test.actual) : 'null'}</code>
                  </div>
                  {test.error && (
                    <div className="test-detail test-error-message">
                      <strong>Error:</strong> {test.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {allPassed && (
        <div className="test-success-message">
          🎉 ¡Excelente! Todos los tests pasaron correctamente.
        </div>
      )}
    </div>
  );
}

export default TestResults;

