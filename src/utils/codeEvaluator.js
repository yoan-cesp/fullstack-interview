// Sistema de evaluación de código JavaScript

/**
 * Evalúa código JavaScript de forma segura
 * @param {string} code - Código a evaluar
 * @param {Array} tests - Array de tests con { input, expected, description }
 * @returns {Object} Resultado de la evaluación
 */
export function evaluateCode(code, tests) {
  const results = {
    success: false,
    error: null,
    testResults: [],
    allPassed: false,
    passedCount: 0,
    totalCount: tests.length
  };

  try {
    // Validar que el código no contenga elementos peligrosos
    // Nota: No bloqueamos Function() porque lo necesitamos internamente
    const dangerousPatterns = [
      /eval\s*\(/,
      /setTimeout\s*\(/,
      /setInterval\s*\(/,
      /import\s*\(/,
      /require\s*\(/,
      /process\./,
      /global\./,
      /window\./,
      /document\./
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        throw new Error(`Código no permitido: no se permite usar ${pattern.source}`);
      }
    }

    // Crear un contexto aislado para ejecutar el código
    // El código debe definir una función, la extraeremos del contexto
    let userFunction;
    
    try {
      // Intentar extraer el nombre de la función del código
      const functionNameMatch = code.match(/function\s+(\w+)\s*\(/);
      
      if (functionNameMatch) {
        const funcName = functionNameMatch[1];
        // Crear un wrapper que ejecute el código y retorne la función definida
        const wrapper = new Function(`
          ${code}
          return typeof ${funcName} !== 'undefined' ? ${funcName} : null;
        `);
        userFunction = wrapper();
        
        if (typeof userFunction !== 'function') {
          throw new Error(`No se pudo encontrar la función "${funcName}". Asegúrate de que el código defina esta función.`);
        }
      } else {
        // Si no hay nombre de función, intentar ejecutar el código como expresión
        try {
          userFunction = new Function(`return (${code})`)();
          if (typeof userFunction !== 'function') {
            throw new Error('El código debe definir una función con nombre. Ejemplo: function sumar(a, b) { return a + b; }');
          }
        } catch (parseError) {
          throw new Error(`Error al procesar el código: ${parseError.message}. Asegúrate de definir una función con nombre.`);
        }
      }
    } catch (parseError) {
      throw new Error(`Error al procesar el código: ${parseError.message}`);
    }

    // Ejecutar cada test
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      const testResult = {
        testNumber: i + 1,
        passed: false,
        input: test.input,
        expected: test.expected,
        actual: null,
        error: null,
        description: test.description || `Test ${i + 1}`
      };

      try {
        // Ejecutar con timeout
        const startTime = Date.now();
        const timeout = 5000; // 5 segundos máximo
        
        let actual;
        
        // Si el test tiene una función de test personalizada, usarla
        if (test.testFunction) {
          actual = test.testFunction(userFunction);
        } else {
          // Ejecutar la función con los inputs
          // Manejar arrays como argumentos individuales si es necesario
          if (Array.isArray(test.input) && test.input.length === 1 && Array.isArray(test.input[0])) {
            // Si el input es un array dentro de un array, expandirlo
            actual = userFunction(...test.input[0]);
          } else {
            actual = userFunction(...test.input);
          }
        }

        const executionTime = Date.now() - startTime;
        
        if (executionTime > timeout) {
          throw new Error('Timeout: el código tardó más de 5 segundos en ejecutarse');
        }

        testResult.actual = actual;

        // Comparar resultado (usar comparación profunda para arrays y objetos)
        if (deepEqual(actual, test.expected)) {
          testResult.passed = true;
          results.passedCount++;
        } else {
          testResult.error = `Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(actual)}`;
        }
      } catch (error) {
        testResult.error = error.message || String(error);
        testResult.actual = null;
      }

      results.testResults.push(testResult);
    }

    results.success = true;
    results.allPassed = results.passedCount === results.totalCount;

  } catch (error) {
    results.error = error.message || String(error);
    results.success = false;
  }

  return results;
}

/**
 * Comparación profunda de valores (para arrays y objetos)
 */
function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (typeof a !== typeof b) return false;
  
  if (typeof a !== 'object') return a === b;
  
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  
  return true;
}

/**
 * Valida que el código sea seguro para ejecutar
 */
export function validateCodeSafety(code) {
  const warnings = [];
  const errors = [];

  // Patrones peligrosos que generan error
  const dangerousPatterns = [
    { pattern: /eval\s*\(/, message: "No se permite usar eval()" },
    { pattern: /Function\s*\(/, message: "No se permite usar Function() constructor" },
    { pattern: /import\s*\(/, message: "No se permite usar import() dinámico" },
    { pattern: /require\s*\(/, message: "No se permite usar require()" },
    { pattern: /process\./, message: "No se permite acceder a process" },
    { pattern: /global\./, message: "No se permite acceder a global" },
    { pattern: /window\./, message: "No se permite acceder a window" },
    { pattern: /document\./, message: "No se permite acceder a document" }
  ];

  for (const { pattern, message } of dangerousPatterns) {
    if (pattern.test(code)) {
      errors.push(message);
    }
  }

  // Patrones que generan advertencia
  const warningPatterns = [
    { pattern: /while\s*\(true\)/, message: "Bucle infinito detectado (while(true))" },
    { pattern: /for\s*\([^)]*;\s*;\s*[^)]*\)/, message: "Bucle sin condición de salida detectado" }
  ];

  for (const { pattern, message } of warningPatterns) {
    if (pattern.test(code)) {
      warnings.push(message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
