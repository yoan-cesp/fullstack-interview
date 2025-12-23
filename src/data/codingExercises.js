// Ejercicios PRÁCTICOS de JavaScript - Tareas del día a día

export const CODING_EXERCISES = [
  // ==================== BÁSICOS - TAREAS COTIDIANAS ====================
  {
    id: 1,
    title: "Formatear precio con moneda",
    description: "Crea una función `formatearPrecio` que reciba un número y retorne el precio formateado con símbolo $ y 2 decimales. Ejemplo: 1234.5 → '$1,234.50'",
    difficulty: "Básico",
    category: "Formateo",
    language: "javascript",
    starterCode: `function formatearPrecio(precio) {
  // Tu código aquí
  return;
}`,
    solution: `function formatearPrecio(precio) {
  return '$' + precio.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}`,
    tests: [
      { input: [1234.5], expected: "$1,234.50", description: "1234.5 → $1,234.50" },
      { input: [99.9], expected: "$99.90", description: "99.9 → $99.90" },
      { input: [1000000], expected: "$1,000,000.00", description: "1000000 → $1,000,000.00" },
      { input: [0], expected: "$0.00", description: "0 → $0.00" }
    ],
    hints: [
      "Usa toFixed(2) para los decimales",
      "Usa regex para agregar comas cada 3 dígitos"
    ]
  },
  {
    id: 2,
    title: "Extraer iniciales de nombre",
    description: "Crea una función `obtenerIniciales` que reciba un nombre completo y retorne las iniciales en mayúsculas. Ejemplo: 'Juan Carlos Pérez' → 'JCP'",
    difficulty: "Básico",
    category: "Strings",
    language: "javascript",
    starterCode: `function obtenerIniciales(nombreCompleto) {
  // Tu código aquí
  return;
}`,
    solution: `function obtenerIniciales(nombreCompleto) {
  return nombreCompleto.split(' ').map(n => n[0].toUpperCase()).join('');
}`,
    tests: [
      { input: ["Juan Carlos Pérez"], expected: "JCP", description: "Juan Carlos Pérez → JCP" },
      { input: ["Ana María"], expected: "AM", description: "Ana María → AM" },
      { input: ["Pedro"], expected: "P", description: "Pedro → P" }
    ],
    hints: [
      "Divide el nombre por espacios con split(' ')",
      "Toma el primer carácter de cada palabra con [0]"
    ]
  },
  {
    id: 3,
    title: "Validar email simple",
    description: "Crea una función `esEmailValido` que retorne true si el email tiene formato básico válido (texto@texto.texto).",
    difficulty: "Básico",
    category: "Validación",
    language: "javascript",
    starterCode: `function esEmailValido(email) {
  // Tu código aquí
  return;
}`,
    solution: `function esEmailValido(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}`,
    tests: [
      { input: ["user@mail.com"], expected: true, description: "user@mail.com es válido" },
      { input: ["test.user@company.co"], expected: true, description: "test.user@company.co es válido" },
      { input: ["invalid"], expected: false, description: "invalid no es válido" },
      { input: ["@nouser.com"], expected: false, description: "@nouser.com no es válido" },
      { input: ["user@"], expected: false, description: "user@ no es válido" }
    ],
    hints: [
      "Debe tener @ y al menos un punto después",
      "Usa una expresión regular simple con .test()"
    ]
  },
  {
    id: 4,
    title: "Truncar texto con ellipsis",
    description: "Crea una función `truncarTexto` que corte un texto a N caracteres y agregue '...' si es más largo. Si el texto es más corto o igual, retorna el texto sin cambios.",
    difficulty: "Básico",
    category: "Strings",
    language: "javascript",
    starterCode: `function truncarTexto(texto, maxLength) {
  // Tu código aquí
  return;
}`,
    solution: `function truncarTexto(texto, maxLength) {
  if (texto.length <= maxLength) return texto;
  return texto.slice(0, maxLength) + '...';
}`,
    tests: [
      { input: ["Hola mundo cruel", 10], expected: "Hola mundo...", description: "Trunca a 10 caracteres" },
      { input: ["Corto", 10], expected: "Corto", description: "No trunca si es más corto" },
      { input: ["Exacto", 6], expected: "Exacto", description: "No trunca si es igual" }
    ],
    hints: [
      "Compara la longitud del texto con maxLength",
      "Usa slice() para cortar el texto"
    ]
  },
  {
    id: 5,
    title: "Convertir objeto a query string",
    description: "Crea una función `objetoAQueryString` que convierta un objeto a parámetros de URL. Ejemplo: {name: 'Juan', age: 30} → 'name=Juan&age=30'",
    difficulty: "Básico",
    category: "URLs",
    language: "javascript",
    starterCode: `function objetoAQueryString(obj) {
  // Tu código aquí
  return;
}`,
    solution: `function objetoAQueryString(obj) {
  return Object.entries(obj).map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&');
}`,
    tests: [
      { input: [{name: "Juan", age: 30}], expected: "name=Juan&age=30", description: "Objeto simple" },
      { input: [{q: "hola mundo"}], expected: "q=hola%20mundo", description: "Codifica espacios" },
      { input: [{}], expected: "", description: "Objeto vacío retorna string vacío" }
    ],
    hints: [
      "Usa Object.entries() para obtener pares [key, value]",
      "Usa encodeURIComponent para valores especiales"
    ]
  },
  {
    id: 6,
    title: "Generar slug desde título",
    description: "Crea una función `generarSlug` que convierta un título a formato URL-friendly (minúsculas, guiones en vez de espacios, sin caracteres especiales).",
    difficulty: "Básico",
    category: "Strings",
    language: "javascript",
    starterCode: `function generarSlug(titulo) {
  // Tu código aquí
  return;
}`,
    solution: `function generarSlug(titulo) {
  return titulo.toLowerCase()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}`,
    tests: [
      { input: ["Hola Mundo"], expected: "hola-mundo", description: "Hola Mundo → hola-mundo" },
      { input: ["Articulo de Programacion"], expected: "articulo-de-programacion", description: "Espacios a guiones" },
      { input: ["Test 123"], expected: "test-123", description: "Mantiene números" }
    ],
    hints: [
      "Convierte a minúsculas con toLowerCase()",
      "Usa normalize('NFD') para quitar acentos",
      "Reemplaza caracteres especiales por guiones"
    ]
  },
  {
    id: 7,
    title: "Verificar si es palíndromo",
    description: "Crea una función `esPalindromo` que retorne true si el texto es un palíndromo (se lee igual al derecho y al revés). Ignora espacios y mayúsculas.",
    difficulty: "Básico",
    category: "Strings",
    language: "javascript",
    starterCode: `function esPalindromo(texto) {
  // Tu código aquí
  return;
}`,
    solution: `function esPalindromo(texto) {
  const limpio = texto.toLowerCase().replace(/[^a-z0-9]/g, '');
  return limpio === limpio.split('').reverse().join('');
}`,
    tests: [
      { input: ["ana"], expected: true, description: "ana es palíndromo" },
      { input: ["Anita lava la tina"], expected: true, description: "Frase palíndromo" },
      { input: ["hola"], expected: false, description: "hola no es palíndromo" },
      { input: ["A Santa at NASA"], expected: true, description: "Ignora espacios y mayúsculas" }
    ],
    hints: [
      "Limpia el texto: minúsculas y solo letras/números",
      "Compara el texto con su versión invertida"
    ]
  },
  {
    id: 8,
    title: "Contar palabras en texto",
    description: "Crea una función `contarPalabras` que retorne el número de palabras en un texto. Las palabras están separadas por espacios.",
    difficulty: "Básico",
    category: "Strings",
    language: "javascript",
    starterCode: `function contarPalabras(texto) {
  // Tu código aquí
  return;
}`,
    solution: `function contarPalabras(texto) {
  if (!texto.trim()) return 0;
  return texto.trim().split(/\\s+/).length;
}`,
    tests: [
      { input: ["Hola mundo"], expected: 2, description: "Dos palabras" },
      { input: ["Una sola palabra mas otra"], expected: 5, description: "Cinco palabras" },
      { input: [""], expected: 0, description: "Texto vacío" },
      { input: ["   espacios   extra   "], expected: 2, description: "Ignora espacios extra" }
    ],
    hints: [
      "Usa trim() para quitar espacios al inicio y final",
      "Divide por espacios con split()"
    ]
  },
  {
    id: 9,
    title: "Encontrar el máximo en array",
    description: "Crea una función `encontrarMaximo` que retorne el número más grande de un array de números.",
    difficulty: "Básico",
    category: "Arrays",
    language: "javascript",
    starterCode: `function encontrarMaximo(numeros) {
  // Tu código aquí
  return;
}`,
    solution: `function encontrarMaximo(numeros) {
  return Math.max(...numeros);
}`,
    tests: [
      { input: [[1, 5, 3, 9, 2]], expected: 9, description: "Encuentra 9" },
      { input: [[-1, -5, -3]], expected: -1, description: "Con negativos" },
      { input: [[42]], expected: 42, description: "Un solo elemento" }
    ],
    hints: [
      "Math.max() encuentra el máximo de varios números",
      "Usa spread operator (...) para expandir el array"
    ]
  },
  {
    id: 10,
    title: "Eliminar duplicados de array",
    description: "Crea una función `eliminarDuplicados` que retorne un nuevo array sin elementos duplicados, manteniendo el orden original.",
    difficulty: "Básico",
    category: "Arrays",
    language: "javascript",
    starterCode: `function eliminarDuplicados(arr) {
  // Tu código aquí
  return;
}`,
    solution: `function eliminarDuplicados(arr) {
  return [...new Set(arr)];
}`,
    tests: [
      { input: [[1, 2, 2, 3, 3, 3]], expected: [1, 2, 3], description: "Elimina números duplicados" },
      { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"], description: "Elimina strings duplicados" },
      { input: [[1, 2, 3]], expected: [1, 2, 3], description: "Sin duplicados, igual" }
    ],
    hints: [
      "Set elimina duplicados automáticamente",
      "Convierte el Set de vuelta a array con spread operator"
    ]
  },

  // ==================== INTERMEDIOS - TAREAS COMUNES ====================
  {
    id: 11,
    title: "Agrupar array por propiedad",
    description: "Crea una función `agruparPor` que agrupe un array de objetos por una propiedad específica.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "javascript",
    starterCode: `function agruparPor(arr, propiedad) {
  // Tu código aquí
  return;
}`,
    solution: `function agruparPor(arr, propiedad) {
  return arr.reduce((grupos, item) => {
    const key = item[propiedad];
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(item);
    return grupos;
  }, {});
}`,
    tests: [
      {
        input: [[{tipo: 'a', v: 1}, {tipo: 'b', v: 2}, {tipo: 'a', v: 3}], 'tipo'],
        expected: {a: [{tipo: 'a', v: 1}, {tipo: 'a', v: 3}], b: [{tipo: 'b', v: 2}]},
        description: "Agrupa por 'tipo'"
      },
      {
        input: [[{cat: 'x', n: 1}], 'cat'],
        expected: {x: [{cat: 'x', n: 1}]},
        description: "Un solo grupo"
      }
    ],
    hints: [
      "Usa reduce para construir el objeto resultado",
      "Crea un array para cada grupo si no existe"
    ]
  },
  {
    id: 12,
    title: "Parsear query string a objeto",
    description: "Crea una función `parsearQueryString` que convierta un query string a objeto. Ejemplo: '?name=Juan&age=30' → {name: 'Juan', age: '30'}",
    difficulty: "Intermedio",
    category: "URLs",
    language: "javascript",
    starterCode: `function parsearQueryString(queryString) {
  // Tu código aquí
  return;
}`,
    solution: `function parsearQueryString(queryString) {
  const params = new URLSearchParams(queryString);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}`,
    tests: [
      { input: ["?name=Juan&age=30"], expected: {name: "Juan", age: "30"}, description: "Parsea parámetros" },
      { input: ["?q=hola%20mundo"], expected: {q: "hola mundo"}, description: "Decodifica valores" },
      { input: [""], expected: {}, description: "String vacío" }
    ],
    hints: [
      "URLSearchParams parsea query strings automáticamente",
      "Itera con for...of sobre los entries"
    ]
  },
  {
    id: 13,
    title: "Ordenar array por múltiples campos",
    description: "Crea una función `ordenarPor` que ordene un array de objetos por múltiples campos. Un '-' al inicio indica orden descendente.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "javascript",
    starterCode: `function ordenarPor(arr, campos) {
  // campos: ['apellido', '-edad'] (- = descendente)
  // Tu código aquí
  return;
}`,
    solution: `function ordenarPor(arr, campos) {
  return [...arr].sort((a, b) => {
    for (const campo of campos) {
      const desc = campo.startsWith('-');
      const key = desc ? campo.slice(1) : campo;
      if (a[key] < b[key]) return desc ? 1 : -1;
      if (a[key] > b[key]) return desc ? -1 : 1;
    }
    return 0;
  });
}`,
    tests: [
      {
        input: [[{n: 'A', e: 30}, {n: 'B', e: 25}, {n: 'A', e: 25}], ['n', '-e']],
        expected: [{n: 'A', e: 30}, {n: 'A', e: 25}, {n: 'B', e: 25}],
        description: "Ordena por n asc, luego e desc"
      }
    ],
    hints: [
      "Itera los campos en orden de prioridad",
      "El '-' al inicio indica orden descendente"
    ]
  },
  {
    id: 14,
    title: "Obtener valor nested de objeto",
    description: "Crea una función `obtenerValor` que obtenga un valor de un objeto usando un path como 'user.address.city'. Retorna undefined si no existe.",
    difficulty: "Intermedio",
    category: "Objetos",
    language: "javascript",
    starterCode: `function obtenerValor(obj, path) {
  // Tu código aquí
  return;
}`,
    solution: `function obtenerValor(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}`,
    tests: [
      { input: [{user: {name: "Juan"}}, "user.name"], expected: "Juan", description: "Accede a user.name" },
      { input: [{a: {b: {c: 123}}}, "a.b.c"], expected: 123, description: "Accede a a.b.c" },
      { input: [{x: 1}, "y.z"], expected: undefined, description: "Retorna undefined si no existe" }
    ],
    hints: [
      "Divide el path por puntos con split('.')",
      "Usa reduce con optional chaining (?.)"
    ]
  },
  {
    id: 15,
    title: "Deep merge de objetos",
    description: "Crea una función `deepMerge` que combine dos objetos recursivamente. El segundo objeto sobrescribe valores del primero.",
    difficulty: "Intermedio",
    category: "Objetos",
    language: "javascript",
    starterCode: `function deepMerge(target, source) {
  // Tu código aquí
  return;
}`,
    solution: `function deepMerge(target, source) {
  const result = {...target};
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}`,
    tests: [
      { input: [{a: {b: 1}}, {a: {c: 2}}], expected: {a: {b: 1, c: 2}}, description: "Merge profundo" },
      { input: [{x: 1}, {y: 2}], expected: {x: 1, y: 2}, description: "Merge simple" },
      { input: [{a: 1}, {a: 2}], expected: {a: 2}, description: "Sobrescribe valores" }
    ],
    hints: [
      "Verifica si el valor es un objeto con typeof",
      "Usa recursión para objetos anidados"
    ]
  },
  {
    id: 16,
    title: "Validar formulario",
    description: "Crea una función `validarFormulario` que valide datos contra reglas y retorne un objeto con los errores encontrados.",
    difficulty: "Intermedio",
    category: "Validación",
    language: "javascript",
    starterCode: `function validarFormulario(datos, reglas) {
  // datos: {email: "", name: "Jo"}
  // reglas: {email: {required: true}, name: {minLength: 3}}
  // retorna: {email: "Campo requerido", name: "Mínimo 3 caracteres"}
  // Tu código aquí
  return;
}`,
    solution: `function validarFormulario(datos, reglas) {
  const errores = {};
  for (const campo in reglas) {
    const valor = datos[campo] || '';
    const regla = reglas[campo];
    if (regla.required && !valor) {
      errores[campo] = "Campo requerido";
    } else if (regla.minLength && valor.length < regla.minLength) {
      errores[campo] = "Mínimo " + regla.minLength + " caracteres";
    }
  }
  return errores;
}`,
    tests: [
      {
        input: [{email: "", name: "Jo"}, {email: {required: true}, name: {minLength: 3}}],
        expected: {email: "Campo requerido", name: "Mínimo 3 caracteres"},
        description: "Detecta errores"
      },
      {
        input: [{email: "a@b.com", name: "Juan"}, {email: {required: true}, name: {minLength: 3}}],
        expected: {},
        description: "Sin errores si es válido"
      }
    ],
    hints: [
      "Itera sobre cada regla definida",
      "Verifica cada condición y agrega el error correspondiente"
    ]
  },
  {
    id: 17,
    title: "Flatten array nested",
    description: "Crea una función `aplanar` que convierta un array anidado en uno plano (sin usar .flat()).",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "javascript",
    starterCode: `function aplanar(arr) {
  // [1, [2, [3, 4]], 5] → [1, 2, 3, 4, 5]
  // Tu código aquí
  return;
}`,
    solution: `function aplanar(arr) {
  const resultado = [];
  function recorrer(items) {
    for (const item of items) {
      if (Array.isArray(item)) {
        recorrer(item);
      } else {
        resultado.push(item);
      }
    }
  }
  recorrer(arr);
  return resultado;
}`,
    tests: [
      { input: [[1, [2, [3, 4]], 5]], expected: [1, 2, 3, 4, 5], description: "Aplana array anidado" },
      { input: [[[1], [[2]], [[[3]]]]], expected: [1, 2, 3], description: "Múltiples niveles" },
      { input: [[1, 2, 3]], expected: [1, 2, 3], description: "Ya plano" }
    ],
    hints: [
      "Usa recursión para manejar anidamiento",
      "Verifica si el elemento es un array con Array.isArray()"
    ]
  },
  {
    id: 18,
    title: "Invertir palabras de una frase",
    description: "Crea una función `invertirPalabras` que invierta el orden de las palabras en una frase (no los caracteres).",
    difficulty: "Intermedio",
    category: "Strings",
    language: "javascript",
    starterCode: `function invertirPalabras(frase) {
  // "Hola mundo cruel" → "cruel mundo Hola"
  // Tu código aquí
  return;
}`,
    solution: `function invertirPalabras(frase) {
  return frase.split(' ').reverse().join(' ');
}`,
    tests: [
      { input: ["Hola mundo cruel"], expected: "cruel mundo Hola", description: "Invierte orden de palabras" },
      { input: ["JavaScript es genial"], expected: "genial es JavaScript", description: "Tres palabras" },
      { input: ["Solo"], expected: "Solo", description: "Una palabra" }
    ],
    hints: [
      "Divide la frase en palabras con split(' ')",
      "Usa reverse() para invertir el array"
    ]
  },

  // ==================== AVANZADOS - PROBLEMAS REALES ====================
  {
    id: 19,
    title: "Flatten object con dot notation",
    description: "Crea una función `flattenObject` que convierta un objeto anidado a uno plano con keys como 'a.b.c'.",
    difficulty: "Avanzado",
    category: "Objetos",
    language: "javascript",
    starterCode: `function flattenObject(obj) {
  // {a: {b: {c: 1}}} → {"a.b.c": 1}
  // Tu código aquí
  return;
}`,
    solution: `function flattenObject(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    const newKey = prefix ? prefix + '.' + key : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}`,
    tests: [
      { input: [{a: {b: {c: 1}}}], expected: {"a.b.c": 1}, description: "Aplana objeto anidado" },
      { input: [{x: 1, y: {z: 2}}], expected: {x: 1, "y.z": 2}, description: "Mix de niveles" },
      { input: [{a: 1}], expected: {a: 1}, description: "Ya plano" }
    ],
    hints: [
      "Usa recursión con un parámetro prefix",
      "Concatena las keys con punto para crear el path"
    ]
  },
  {
    id: 20,
    title: "Diferencia entre dos arrays",
    description: "Crea una función `diferencia` que retorne los elementos que están en el primer array pero no en el segundo.",
    difficulty: "Avanzado",
    category: "Arrays",
    language: "javascript",
    starterCode: `function diferencia(arr1, arr2) {
  // [1, 2, 3, 4], [2, 4] → [1, 3]
  // Tu código aquí
  return;
}`,
    solution: `function diferencia(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(x => !set2.has(x));
}`,
    tests: [
      { input: [[1, 2, 3, 4], [2, 4]], expected: [1, 3], description: "Diferencia básica" },
      { input: [["a", "b", "c"], ["b"]], expected: ["a", "c"], description: "Con strings" },
      { input: [[1, 2], [1, 2]], expected: [], description: "Arrays iguales" }
    ],
    hints: [
      "Convierte el segundo array a Set para búsqueda O(1)",
      "Usa filter para mantener solo los que no están en el Set"
    ]
  },
  {
    id: 21,
    title: "Chunk array en grupos",
    description: "Crea una función `chunk` que divida un array en grupos de tamaño N.",
    difficulty: "Avanzado",
    category: "Arrays",
    language: "javascript",
    starterCode: `function chunk(arr, size) {
  // [1, 2, 3, 4, 5], 2 → [[1, 2], [3, 4], [5]]
  // Tu código aquí
  return;
}`,
    solution: `function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]], description: "Chunks de 2" },
      { input: [[1, 2, 3, 4], 4], expected: [[1, 2, 3, 4]], description: "Un solo chunk" },
      { input: [[1, 2, 3], 1], expected: [[1], [2], [3]], description: "Chunks de 1" }
    ],
    hints: [
      "Itera con incrementos de 'size'",
      "Usa slice(i, i + size) para extraer cada chunk"
    ]
  },
  {
    id: 22,
    title: "Encontrar elementos duplicados",
    description: "Crea una función `encontrarDuplicados` que retorne un array con los elementos que aparecen más de una vez.",
    difficulty: "Avanzado",
    category: "Arrays",
    language: "javascript",
    starterCode: `function encontrarDuplicados(arr) {
  // [1, 2, 2, 3, 3, 3, 4] → [2, 3]
  // Tu código aquí
  return;
}`,
    solution: `function encontrarDuplicados(arr) {
  const conteo = {};
  arr.forEach(item => conteo[item] = (conteo[item] || 0) + 1);
  return Object.keys(conteo).filter(key => conteo[key] > 1).map(key => isNaN(key) ? key : Number(key));
}`,
    tests: [
      { input: [[1, 2, 2, 3, 3, 3, 4]], expected: [2, 3], description: "Encuentra duplicados" },
      { input: [[1, 2, 3]], expected: [], description: "Sin duplicados" },
      { input: [["a", "b", "a"]], expected: ["a"], description: "Con strings" }
    ],
    hints: [
      "Cuenta las ocurrencias de cada elemento",
      "Filtra los que tienen conteo mayor a 1"
    ]
  },
  {
    id: 23,
    title: "Intersección de arrays",
    description: "Crea una función `interseccion` que retorne los elementos que están en ambos arrays.",
    difficulty: "Avanzado",
    category: "Arrays",
    language: "javascript",
    starterCode: `function interseccion(arr1, arr2) {
  // [1, 2, 3], [2, 3, 4] → [2, 3]
  // Tu código aquí
  return;
}`,
    solution: `function interseccion(arr1, arr2) {
  const set2 = new Set(arr2);
  return [...new Set(arr1)].filter(x => set2.has(x));
}`,
    tests: [
      { input: [[1, 2, 3], [2, 3, 4]], expected: [2, 3], description: "Intersección básica" },
      { input: [[1, 2], [3, 4]], expected: [], description: "Sin elementos comunes" },
      { input: [["a", "b"], ["b", "c"]], expected: ["b"], description: "Con strings" }
    ],
    hints: [
      "Convierte un array a Set para búsqueda rápida",
      "Filtra el otro array para mantener solo los comunes"
    ]
  },
  {
    id: 24,
    title: "Zip de dos arrays",
    description: "Crea una función `zip` que combine dos arrays en pares. Si tienen diferente longitud, usa undefined para los faltantes.",
    difficulty: "Avanzado",
    category: "Arrays",
    language: "javascript",
    starterCode: `function zip(arr1, arr2) {
  // [1, 2, 3], ['a', 'b'] → [[1, 'a'], [2, 'b'], [3, undefined]]
  // Tu código aquí
  return;
}`,
    solution: `function zip(arr1, arr2) {
  const maxLen = Math.max(arr1.length, arr2.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}`,
    tests: [
      { input: [[1, 2, 3], ['a', 'b', 'c']], expected: [[1, 'a'], [2, 'b'], [3, 'c']], description: "Misma longitud" },
      { input: [[1, 2, 3], ['a', 'b']], expected: [[1, 'a'], [2, 'b'], [3, undefined]], description: "Diferente longitud" },
      { input: [[], []], expected: [], description: "Arrays vacíos" }
    ],
    hints: [
      "Usa Math.max para determinar la longitud del resultado",
      "Accede a índices que no existen para obtener undefined"
    ]
  },
  {
    id: 25,
    title: "Componer funciones (pipe)",
    description: "Crea una función `pipe` que componga múltiples funciones de izquierda a derecha. pipe(f, g, h)(x) = h(g(f(x)))",
    difficulty: "Avanzado",
    category: "Funcional",
    language: "javascript",
    starterCode: `function pipe(...fns) {
  // pipe(addOne, double)(5) → double(addOne(5)) → 12
  // Tu código aquí
  return;
}`,
    solution: `function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}`,
    tests: [
      {
        input: [],
        expected: 12,
        description: "Compone funciones",
        testFunction: (pipe) => {
          const addOne = x => x + 1;
          const double = x => x * 2;
          return pipe(addOne, double)(5);
        }
      },
      {
        input: [],
        expected: 9,
        description: "Tres funciones",
        testFunction: (pipe) => {
          const addOne = x => x + 1;
          const double = x => x * 2;
          const addThree = x => x + 3;
          return pipe(addOne, double, addThree)(2);
        }
      }
    ],
    hints: [
      "Usa reduce para aplicar cada función al resultado de la anterior",
      "Retorna una función que recibe el valor inicial"
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
