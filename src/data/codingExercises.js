// Ejercicios de programación para el editor de código

export const CODING_EXERCISES = [
  // BÁSICOS
  {
    id: 1,
    title: "Función que suma dos números",
    description: "Crea una función llamada `sumar` que reciba dos números como parámetros y retorne su suma.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function sumar(a, b) {
  // Tu código aquí
  return;
}`,
    solution: `function sumar(a, b) {
  return a + b;
}`,
    tests: [
      { input: [2, 3], expected: 5, description: "sumar(2, 3) debe retornar 5" },
      { input: [0, 0], expected: 0, description: "sumar(0, 0) debe retornar 0" },
      { input: [-1, 1], expected: 0, description: "sumar(-1, 1) debe retornar 0" },
      { input: [10, -5], expected: 5, description: "sumar(10, -5) debe retornar 5" },
      { input: [100, 200], expected: 300, description: "sumar(100, 200) debe retornar 300" }
    ],
    hints: [
      "Usa el operador + para sumar los dos números",
      "Recuerda usar return para retornar el resultado"
    ]
  },
  {
    id: 2,
    title: "Encontrar el máximo de un array",
    description: "Crea una función llamada `encontrarMaximo` que reciba un array de números y retorne el número más grande.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function encontrarMaximo(arr) {
  // Tu código aquí
  return;
}`,
    solution: `function encontrarMaximo(arr) {
  return Math.max(...arr);
}`,
    tests: [
      { input: [[1, 5, 3, 9, 2]], expected: 9, description: "encontrarMaximo([1, 5, 3, 9, 2]) debe retornar 9" },
      { input: [[-1, -5, -3]], expected: -1, description: "encontrarMaximo([-1, -5, -3]) debe retornar -1" },
      { input: [[10]], expected: 10, description: "encontrarMaximo([10]) debe retornar 10" },
      { input: [[0, 0, 0]], expected: 0, description: "encontrarMaximo([0, 0, 0]) debe retornar 0" }
    ],
    hints: [
      "Puedes usar Math.max() con el spread operator",
      "O puedes iterar el array y comparar cada elemento"
    ]
  },
  {
    id: 3,
    title: "Invertir un string",
    description: "Crea una función llamada `invertirString` que reciba un string y retorne el string invertido.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function invertirString(str) {
  // Tu código aquí
  return;
}`,
    solution: `function invertirString(str) {
  return str.split('').reverse().join('');
}`,
    tests: [
      { input: ["hola"], expected: "aloh", description: 'invertirString("hola") debe retornar "aloh"' },
      { input: ["mundo"], expected: "odnum", description: 'invertirString("mundo") debe retornar "odnum"' },
      { input: [""], expected: "", description: 'invertirString("") debe retornar ""' },
      { input: ["a"], expected: "a", description: 'invertirString("a") debe retornar "a"' }
    ],
    hints: [
      "Usa split('') para convertir el string en array",
      "Usa reverse() para invertir el array",
      "Usa join('') para convertir el array de vuelta a string"
    ]
  },
  {
    id: 4,
    title: "Contar palabras en un string",
    description: "Crea una función llamada `contarPalabras` que reciba un string y retorne el número de palabras que contiene.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function contarPalabras(str) {
  // Tu código aquí
  return;
}`,
    solution: `function contarPalabras(str) {
  return str.trim().split(/\\s+/).filter(word => word.length > 0).length;
}`,
    tests: [
      { input: ["hola mundo"], expected: 2, description: 'contarPalabras("hola mundo") debe retornar 2' },
      { input: ["uno dos tres"], expected: 3, description: 'contarPalabras("uno dos tres") debe retornar 3' },
      { input: [""], expected: 0, description: 'contarPalabras("") debe retornar 0' },
      { input: ["  espacios  multiples  "], expected: 2, description: 'contarPalabras("  espacios  multiples  ") debe retornar 2' }
    ],
    hints: [
      "Usa split() para dividir el string por espacios",
      "Filtra los elementos vacíos",
      "Retorna la longitud del array resultante"
    ]
  },
  {
    id: 5,
    title: "Verificar si un número es par",
    description: "Crea una función llamada `esPar` que reciba un número y retorne true si es par, false si es impar.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function esPar(num) {
  // Tu código aquí
  return;
}`,
    solution: `function esPar(num) {
  return num % 2 === 0;
}`,
    tests: [
      { input: [2], expected: true, description: "esPar(2) debe retornar true" },
      { input: [3], expected: false, description: "esPar(3) debe retornar false" },
      { input: [0], expected: true, description: "esPar(0) debe retornar true" },
      { input: [-2], expected: true, description: "esPar(-2) debe retornar true" },
      { input: [-3], expected: false, description: "esPar(-3) debe retornar false" }
    ],
    hints: [
      "Usa el operador módulo (%)",
      "Un número es par si el resto de dividirlo entre 2 es 0"
    ]
  },
  {
    id: 6,
    title: "Filtrar números mayores a X",
    description: "Crea una función llamada `filtrarMayores` que reciba un array de números y un número límite, y retorne un nuevo array con solo los números mayores al límite.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function filtrarMayores(arr, limite) {
  // Tu código aquí
  return;
}`,
    solution: `function filtrarMayores(arr, limite) {
  return arr.filter(num => num > limite);
}`,
    tests: [
      { input: [[1, 5, 3, 9, 2], 5], expected: [9], description: "filtrarMayores([1, 5, 3, 9, 2], 5) debe retornar [9]" },
      { input: [[10, 20, 30], 15], expected: [20, 30], description: "filtrarMayores([10, 20, 30], 15) debe retornar [20, 30]" },
      { input: [[1, 2, 3], 10], expected: [], description: "filtrarMayores([1, 2, 3], 10) debe retornar []" },
      { input: [[-5, -2, 0, 3], -1], expected: [0, 3], description: "filtrarMayores([-5, -2, 0, 3], -1) debe retornar [0, 3]" }
    ],
    hints: [
      "Usa el método filter() del array",
      "La condición debe ser num > limite"
    ]
  },
  {
    id: 7,
    title: "Calcular el factorial",
    description: "Crea una función llamada `factorial` que reciba un número n y retorne el factorial de n (n!). El factorial de 0 es 1.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function factorial(n) {
  // Tu código aquí
  return;
}`,
    solution: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}`,
    tests: [
      { input: [0], expected: 1, description: "factorial(0) debe retornar 1" },
      { input: [1], expected: 1, description: "factorial(1) debe retornar 1" },
      { input: [5], expected: 120, description: "factorial(5) debe retornar 120" },
      { input: [3], expected: 6, description: "factorial(3) debe retornar 6" },
      { input: [4], expected: 24, description: "factorial(4) debe retornar 24" }
    ],
    hints: [
      "El factorial de n es n * factorial(n-1)",
      "El caso base es factorial(0) = 1 y factorial(1) = 1",
      "Puedes usar recursión o un bucle"
    ]
  },
  {
    id: 8,
    title: "Eliminar duplicados de un array",
    description: "Crea una función llamada `eliminarDuplicados` que reciba un array y retorne un nuevo array sin elementos duplicados.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function eliminarDuplicados(arr) {
  // Tu código aquí
  return;
}`,
    solution: `function eliminarDuplicados(arr) {
  return [...new Set(arr)];
}`,
    tests: [
      { input: [[1, 2, 2, 3, 3, 3]], expected: [1, 2, 3], description: "eliminarDuplicados([1, 2, 2, 3, 3, 3]) debe retornar [1, 2, 3]" },
      { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"], description: 'eliminarDuplicados(["a", "b", "a", "c"]) debe retornar ["a", "b", "c"]' },
      { input: [[1, 1, 1, 1]], expected: [1], description: "eliminarDuplicados([1, 1, 1, 1]) debe retornar [1]" },
      { input: [[]], expected: [], description: "eliminarDuplicados([]) debe retornar []" }
    ],
    hints: [
      "Puedes usar Set para eliminar duplicados",
      "O puedes usar filter() con indexOf()",
      "Recuerda retornar un nuevo array, no modificar el original"
    ]
  },
  {
    id: 9,
    title: "Capitalizar primera letra de cada palabra",
    description: "Crea una función llamada `capitalizarPalabras` que reciba un string y retorne el string con la primera letra de cada palabra en mayúscula.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function capitalizarPalabras(str) {
  // Tu código aquí
  return;
}`,
    solution: `function capitalizarPalabras(str) {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}`,
    tests: [
      { input: ["hola mundo"], expected: "Hola Mundo", description: 'capitalizarPalabras("hola mundo") debe retornar "Hola Mundo"' },
      { input: ["javascript es genial"], expected: "Javascript Es Genial", description: 'capitalizarPalabras("javascript es genial") debe retornar "Javascript Es Genial"' },
      { input: ["a"], expected: "A", description: 'capitalizarPalabras("a") debe retornar "A"' },
      { input: [""], expected: "", description: 'capitalizarPalabras("") debe retornar ""' }
    ],
    hints: [
      "Divide el string en palabras con split(' ')",
      "Para cada palabra, convierte la primera letra a mayúscula",
      "Une las palabras de nuevo con join(' ')"
    ]
  },
  {
    id: 10,
    title: "Encontrar el elemento más común",
    description: "Crea una función llamada `elementoMasComun` que reciba un array y retorne el elemento que aparece más veces. Si hay empate, retorna cualquiera.",
    difficulty: "Básico",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function elementoMasComun(arr) {
  // Tu código aquí
  return;
}`,
    solution: `function elementoMasComun(arr) {
  const frecuencia = {};
  let maxFreq = 0;
  let elemento = arr[0];
  
  for (const item of arr) {
    frecuencia[item] = (frecuencia[item] || 0) + 1;
    if (frecuencia[item] > maxFreq) {
      maxFreq = frecuencia[item];
      elemento = item;
    }
  }
  
  return elemento;
}`,
    tests: [
      { input: [[1, 2, 2, 3, 3, 3]], expected: 3, description: "elementoMasComun([1, 2, 2, 3, 3, 3]) debe retornar 3" },
      { input: [["a", "b", "a", "c", "a"]], expected: "a", description: 'elementoMasComun(["a", "b", "a", "c", "a"]) debe retornar "a"' },
      { input: [[1, 1, 2, 2]], expected: 1, description: "elementoMasComun([1, 1, 2, 2]) puede retornar 1 o 2" },
      { input: [[5]], expected: 5, description: "elementoMasComun([5]) debe retornar 5" }
    ],
    hints: [
      "Usa un objeto para contar la frecuencia de cada elemento",
      "Itera el array y cuenta cuántas veces aparece cada elemento",
      "Mantén registro del elemento con mayor frecuencia"
    ]
  },
  
  // INTERMEDIOS
  {
    id: 11,
    title: "Implementar map() manualmente",
    description: "Crea una función llamada `miMap` que reciba un array y una función callback, y retorne un nuevo array con los resultados de aplicar la función a cada elemento.",
    difficulty: "Intermedio",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function miMap(arr, callback) {
  // Tu código aquí
  return;
}`,
    solution: `function miMap(arr, callback) {
  const resultado = [];
  for (let i = 0; i < arr.length; i++) {
    resultado.push(callback(arr[i], i, arr));
  }
  return resultado;
}`,
    tests: [
      { 
        input: [[1, 2, 3], (x) => x * 2], 
        expected: [2, 4, 6], 
        description: "miMap([1, 2, 3], x => x * 2) debe retornar [2, 4, 6]",
        testFunction: (func) => {
          const result = func([1, 2, 3], (x) => x * 2);
          return JSON.stringify(result) === JSON.stringify([2, 4, 6]);
        }
      },
      { 
        input: [["a", "b"], (x) => x.toUpperCase()], 
        expected: ["A", "B"], 
        description: 'miMap(["a", "b"], x => x.toUpperCase()) debe retornar ["A", "B"]',
        testFunction: (func) => {
          const result = func(["a", "b"], (x) => x.toUpperCase());
          return JSON.stringify(result) === JSON.stringify(["A", "B"]);
        }
      }
    ],
    hints: [
      "Crea un nuevo array vacío",
      "Itera el array original",
      "Aplica la función callback a cada elemento y agrega el resultado al nuevo array"
    ]
  },
  {
    id: 12,
    title: "Implementar filter() manualmente",
    description: "Crea una función llamada `miFilter` que reciba un array y una función callback, y retorne un nuevo array con solo los elementos que pasen la prueba del callback.",
    difficulty: "Intermedio",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function miFilter(arr, callback) {
  // Tu código aquí
  return;
}`,
    solution: `function miFilter(arr, callback) {
  const resultado = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      resultado.push(arr[i]);
    }
  }
  return resultado;
}`,
    tests: [
      { 
        input: [[1, 2, 3, 4, 5], (x) => x > 2], 
        expected: [3, 4, 5], 
        description: "miFilter([1, 2, 3, 4, 5], x => x > 2) debe retornar [3, 4, 5]",
        testFunction: (func) => {
          const result = func([1, 2, 3, 4, 5], (x) => x > 2);
          return JSON.stringify(result) === JSON.stringify([3, 4, 5]);
        }
      },
      { 
        input: [["hola", "mundo", "test"], (x) => x.length > 4], 
        expected: ["mundo"], 
        description: 'miFilter(["hola", "mundo", "test"], x => x.length > 4) debe retornar ["mundo"]',
        testFunction: (func) => {
          const result = func(["hola", "mundo", "test"], (x) => x.length > 4);
          return JSON.stringify(result) === JSON.stringify(["mundo"]);
        }
      }
    ],
    hints: [
      "Crea un nuevo array vacío",
      "Itera el array original",
      "Si el callback retorna true para un elemento, agrégalo al nuevo array"
    ]
  },
  {
    id: 13,
    title: "Validar email",
    description: "Crea una función llamada `validarEmail` que reciba un string y retorne true si es un email válido, false en caso contrario.",
    difficulty: "Intermedio",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function validarEmail(email) {
  // Tu código aquí
  return;
}`,
    solution: `function validarEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}`,
    tests: [
      { input: ["test@example.com"], expected: true, description: 'validarEmail("test@example.com") debe retornar true' },
      { input: ["invalid"], expected: false, description: 'validarEmail("invalid") debe retornar false' },
      { input: ["test@"], expected: false, description: 'validarEmail("test@") debe retornar false' },
      { input: ["@example.com"], expected: false, description: 'validarEmail("@example.com") debe retornar false' },
      { input: ["user.name@domain.co.uk"], expected: true, description: 'validarEmail("user.name@domain.co.uk") debe retornar true' }
    ],
    hints: [
      "Usa una expresión regular (regex)",
      "Un email válido tiene: texto@texto.texto",
      "Puedes usar el método test() de regex"
    ]
  },
  {
    id: 14,
    title: "Encontrar anagramas",
    description: "Crea una función llamada `sonAnagramas` que reciba dos strings y retorne true si son anagramas (mismas letras en diferente orden), false en caso contrario.",
    difficulty: "Intermedio",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function sonAnagramas(str1, str2) {
  // Tu código aquí
  return;
}`,
    solution: `function sonAnagramas(str1, str2) {
  const normalize = (str) => str.toLowerCase().replace(/\\s/g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}`,
    tests: [
      { input: ["listen", "silent"], expected: true, description: 'sonAnagramas("listen", "silent") debe retornar true' },
      { input: ["hello", "world"], expected: false, description: 'sonAnagramas("hello", "world") debe retornar false' },
      { input: ["a", "a"], expected: true, description: 'sonAnagramas("a", "a") debe retornar true' },
      { input: ["rail safety", "fairy tales"], expected: true, description: 'sonAnagramas("rail safety", "fairy tales") debe retornar true' }
    ],
    hints: [
      "Normaliza ambos strings (minúsculas, sin espacios)",
      "Ordena las letras de cada string",
      "Compara los strings ordenados"
    ]
  },
  {
    id: 15,
    title: "Rotar array N posiciones",
    description: "Crea una función llamada `rotarArray` que reciba un array y un número n, y retorne el array rotado n posiciones a la derecha.",
    difficulty: "Intermedio",
    category: "JavaScript",
    language: "javascript",
    starterCode: `function rotarArray(arr, n) {
  // Tu código aquí
  return;
}`,
    solution: `function rotarArray(arr, n) {
  if (arr.length === 0) return arr;
  const rotaciones = n % arr.length;
  return [...arr.slice(-rotaciones), ...arr.slice(0, -rotaciones)];
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3], description: "rotarArray([1, 2, 3, 4, 5], 2) debe retornar [4, 5, 1, 2, 3]" },
      { input: [[1, 2, 3], 1], expected: [3, 1, 2], description: "rotarArray([1, 2, 3], 1) debe retornar [3, 1, 2]" },
      { input: [[1, 2, 3], 0], expected: [1, 2, 3], description: "rotarArray([1, 2, 3], 0) debe retornar [1, 2, 3]" },
      { input: [[1, 2, 3], 3], expected: [1, 2, 3], description: "rotarArray([1, 2, 3], 3) debe retornar [1, 2, 3]" }
    ],
    hints: [
      "Usa el operador módulo para manejar rotaciones mayores al tamaño del array",
      "Toma los últimos n elementos y los primeros elementos",
      "Combínalos en el orden correcto"
    ]
  }
];

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty) {
  return CODING_EXERCISES.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener ejercicio por ID
export function getExerciseById(id) {
  return CODING_EXERCISES.find(ex => ex.id === id);
}

// Función helper para obtener todos los ejercicios
export function getAllExercises() {
  return CODING_EXERCISES;
}

