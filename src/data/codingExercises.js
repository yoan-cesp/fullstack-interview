// Ejercicios de codigo por lenguaje (solo nivel intermedio)

export const CODE_LANGUAGES = [
  { id: "javascript", label: "JavaScript", monaco: "javascript", runtime: "javascript", version: "18.15.0" },
  { id: "python", label: "Python", monaco: "python", runtime: "python", version: "3.10.0" },
  { id: "java", label: "Java", monaco: "java", runtime: "java", version: "15.0.2" },
  { id: "flutter", label: "Flutter (Dart)", monaco: "dart", runtime: "dart", version: "2.19.6" }
];

export const CODING_EXERCISES = [
  // ===== JavaScript (1-4) =====
  {
    id: 1,
    title: "Sumar por clave",
    description: "Crea una funcion `sumBy` que sume el valor de una clave numerica en un arreglo de objetos.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "javascript",
    functionName: "sumBy",
    starterCode: `function sumBy(items, key) {
  // Tu codigo aqui
  return 0;
}`,
    solution: `function sumBy(items, key) {
  return items.reduce((acc, item) => acc + (item[key] ?? 0), 0);
}`,
    tests: [
      { input: [[{a: 1}, {a: 2}, {a: 3}], "a"], expected: 6, description: "Suma total de a" },
      { input: [[{price: 10}, {price: 5}], "price"], expected: 15, description: "Suma price" },
      { input: [[{x: 1}, {y: 2}], "x"], expected: 1, description: "Clave faltante se ignora" }
    ]
  },
  {
    id: 2,
    title: "Eliminar duplicados manteniendo orden",
    description: "Implementa `uniqueStable` para devolver el arreglo sin duplicados manteniendo el orden original.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "javascript",
    functionName: "uniqueStable",
    starterCode: `function uniqueStable(items) {
  // Tu codigo aqui
  return [];
}`,
    solution: `function uniqueStable(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}`,
    tests: [
      { input: [[1, 2, 2, 3, 1]], expected: [1, 2, 3], description: "Numeros" },
      { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"], description: "Strings" }
    ]
  },
  {
    id: 3,
    title: "Agrupar por clave",
    description: "Crea `groupBy` que agrupe un arreglo de objetos por una clave y devuelva un objeto.",
    difficulty: "Intermedio",
    category: "Objetos",
    language: "javascript",
    functionName: "groupBy",
    starterCode: `function groupBy(items, key) {
  // Tu codigo aqui
  return {};
}`,
    solution: `function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}`,
    tests: [
      { input: [[{t: "a", v: 1}, {t: "b", v: 2}, {t: "a", v: 3}], "t"], expected: { a: [{t: "a", v: 1}, {t: "a", v: 3}], b: [{t: "b", v: 2}] }, description: "Agrupar por t" }
    ]
  },
  {
    id: 4,
    title: "Top N por puntaje",
    description: "Implementa `topN` que reciba una lista de puntajes y devuelva los N mayores en orden descendente.",
    difficulty: "Intermedio",
    category: "Ordenamiento",
    language: "javascript",
    functionName: "topN",
    starterCode: `function topN(scores, n) {
  // Tu codigo aqui
  return [];
}`,
    solution: `function topN(scores, n) {
  return [...scores].sort((a, b) => b - a).slice(0, n);
}`,
    tests: [
      { input: [[5, 1, 9, 3], 2], expected: [9, 5], description: "Top 2" },
      { input: [[10, 10, 2], 1], expected: [10], description: "Top 1" }
    ]
  },

  // ===== Python (5-8) =====
  {
    id: 5,
    title: "Python - Ventana deslizante",
    description: "Implementa `max_subarray_sum` que devuelva la suma maxima de k elementos consecutivos.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "python",
    functionName: "max_subarray_sum",
    starterCode: `def max_subarray_sum(nums, k):
    # Tu codigo aqui
    return 0
`,
    solution: `def max_subarray_sum(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        if window > best:
            best = window
    return best
`,
    tests: [
      { input: [[1, 2, 3, 4, 5], 2], expected: 9, description: "Maxima suma k=2" },
      { input: [[5, -1, 3, 2], 3], expected: 7, description: "Ventana k=3" }
    ]
  },
  {
    id: 6,
    title: "Python - Anagramas",
    description: "Implementa `is_anagram` que verifique si dos strings son anagramas.",
    difficulty: "Intermedio",
    category: "Strings",
    language: "python",
    functionName: "is_anagram",
    starterCode: `def is_anagram(a, b):
    # Tu codigo aqui
    return False
`,
    solution: `def is_anagram(a, b):
    return sorted(a) == sorted(b)
`,
    tests: [
      { input: ["roma", "amor"], expected: true, description: "roma vs amor" },
      { input: ["abc", "abd"], expected: false, description: "abc vs abd" }
    ]
  },
  {
    id: 7,
    title: "Python - Merge de intervalos",
    description: "Implementa `merge_intervals` que una intervalos solapados.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "python",
    functionName: "merge_intervals",
    starterCode: `def merge_intervals(intervals):
    # Tu codigo aqui
    return []
`,
    solution: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for start, end in intervals:
        if not merged or merged[-1][1] < start:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)
    return merged
`,
    tests: [
      { input: [[[1, 3], [2, 4], [6, 8]]], expected: [[1, 4], [6, 8]], description: "Merge simple" },
      { input: [[[1, 2], [3, 4]]], expected: [[1, 2], [3, 4]], description: "Sin solape" }
    ]
  },
  {
    id: 8,
    title: "Python - Top K",
    description: "Implementa `top_k` para devolver los k elementos mas grandes.",
    difficulty: "Intermedio",
    category: "Ordenamiento",
    language: "python",
    functionName: "top_k",
    starterCode: `def top_k(nums, k):
    # Tu codigo aqui
    return []
`,
    solution: `def top_k(nums, k):
    return sorted(nums, reverse=True)[:k]
`,
    tests: [
      { input: [[4, 1, 7, 3], 2], expected: [7, 4], description: "Top 2" },
      { input: [[9, 9, 8], 1], expected: [9], description: "Top 1" }
    ]
  },

  // ===== Java (9-12) =====
  {
    id: 9,
    title: "Java - Max Subarray",
    description: "Implementa `maxSubarray` que retorne la suma maxima de un subarreglo.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "java",
    functionName: "maxSubarray",
    returnType: "int",
    paramTypes: ["int[]"],
    starterCode: `class Solution {
  public static int maxSubarray(int[] nums) {
    // Tu codigo aqui
    return 0;
  }
}`,
    solution: `class Solution {
  public static int maxSubarray(int[] nums) {
    int best = nums[0];
    int cur = nums[0];
    for (int i = 1; i < nums.length; i++) {
      cur = Math.max(nums[i], cur + nums[i]);
      best = Math.max(best, cur);
    }
    return best;
  }
}`,
    tests: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, description: "Suma maxima" },
      { input: [[1, 2, 3]], expected: 6, description: "Todo positivo" }
    ]
  },
  {
    id: 10,
    title: "Java - Reverse Words",
    description: "Implementa `reverseWords` que invierta el orden de palabras.",
    difficulty: "Intermedio",
    category: "Strings",
    language: "java",
    functionName: "reverseWords",
    returnType: "String",
    paramTypes: ["String"],
    starterCode: `class Solution {
  public static String reverseWords(String s) {
    // Tu codigo aqui
    return "";
  }
}`,
    solution: `class Solution {
  public static String reverseWords(String s) {
    String[] parts = s.trim().split("\\s+");
    StringBuilder out = new StringBuilder();
    for (int i = parts.length - 1; i >= 0; i--) {
      out.append(parts[i]);
      if (i > 0) out.append(" ");
    }
    return out.toString();
  }
}`,
    tests: [
      { input: ["hola mundo"], expected: "mundo hola", description: "Inversion" },
      { input: ["a b c"], expected: "c b a", description: "Tres palabras" }
    ]
  },
  {
    id: 11,
    title: "Java - Validar parentesis",
    description: "Implementa `isValid` que valide parentesis balanceados.",
    difficulty: "Intermedio",
    category: "Stacks",
    language: "java",
    functionName: "isValid",
    returnType: "boolean",
    paramTypes: ["String"],
    starterCode: `class Solution {
  public static boolean isValid(String s) {
    // Tu codigo aqui
    return false;
  }
}`,
    solution: `class Solution {
  public static boolean isValid(String s) {
    java.util.Stack<Character> st = new java.util.Stack<>();
    for (char c : s.toCharArray()) {
      if (c == '(' || c == '[' || c == '{') st.push(c);
      else {
        if (st.isEmpty()) return false;
        char top = st.pop();
        if ((c == ')' && top != '(') || (c == ']' && top != '[') || (c == '}' && top != '{')) return false;
      }
    }
    return st.isEmpty();
  }
}`,
    tests: [
      { input: ["()[]{}"], expected: true, description: "Balanceado" },
      { input: ["(]"], expected: false, description: "No balanceado" }
    ]
  },
  {
    id: 12,
    title: "Java - Merge arreglos",
    description: "Implementa `mergeSorted` que combine dos arreglos ordenados.",
    difficulty: "Intermedio",
    category: "Arrays",
    language: "java",
    functionName: "mergeSorted",
    returnType: "int[]",
    paramTypes: ["int[]", "int[]"],
    starterCode: `class Solution {
  public static int[] mergeSorted(int[] a, int[] b) {
    // Tu codigo aqui
    return new int[0];
  }
}`,
    solution: `class Solution {
  public static int[] mergeSorted(int[] a, int[] b) {
    int[] out = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length) {
      out[k++] = a[i] <= b[j] ? a[i++] : b[j++];
    }
    while (i < a.length) out[k++] = a[i++];
    while (j < b.length) out[k++] = b[j++];
    return out;
  }
}`,
    tests: [
      { input: [[1, 3, 5], [2, 4]], expected: [1, 2, 3, 4, 5], description: "Merge simple" },
      { input: [[1], [2, 3]], expected: [1, 2, 3], description: "Merge corto" }
    ]
  },

  // ===== Flutter (Dart) (13-16) =====
  {
    id: 13,
    title: "Dart - Filtrar y mapear",
    description: "Implementa `activeEmails` que devuelva emails de usuarios activos.",
    difficulty: "Intermedio",
    category: "Colecciones",
    language: "flutter",
    functionName: "activeEmails",
    starterCode: `List<String> activeEmails(List<Map<String, dynamic>> users) {
  // Tu codigo aqui
  return [];
}`,
    solution: `List<String> activeEmails(List<Map<String, dynamic>> users) {
  return users
      .where((u) => u['active'] == true)
      .map((u) => u['email'] as String)
      .toList();
}`,
    tests: [
      { input: [[{'email': 'a@mail.com', 'active': true}, {'email': 'b@mail.com', 'active': false}]], expected: ['a@mail.com'], description: "Activos", inputTypes: ["List<Map<String, dynamic>>"] },
      { input: [[{'email': 'x@mail.com', 'active': true}]], expected: ['x@mail.com'], description: "Uno", inputTypes: ["List<Map<String, dynamic>>"] }
    ]
  },
  {
    id: 14,
    title: "Dart - Contar ocurrencias",
    description: "Implementa `countBy` que cuente ocurrencias por clave.",
    difficulty: "Intermedio",
    category: "Map",
    language: "flutter",
    functionName: "countBy",
    starterCode: `Map<String, int> countBy(List<String> items) {
  // Tu codigo aqui
  return {};
}`,
    solution: `Map<String, int> countBy(List<String> items) {
  final out = <String, int>{};
  for (final item in items) {
    out[item] = (out[item] ?? 0) + 1;
  }
  return out;
}`,
    tests: [
      { input: [['a', 'b', 'a']], expected: {'a': 2, 'b': 1}, description: "Conteo", inputTypes: ["List<String>"] }
    ]
  },
  {
    id: 15,
    title: "Dart - Merge de intervalos",
    description: "Implementa `mergeIntervals` para unir intervalos solapados.",
    difficulty: "Intermedio",
    category: "List",
    language: "flutter",
    functionName: "mergeIntervals",
    starterCode: `List<List<int>> mergeIntervals(List<List<int>> intervals) {
  // Tu codigo aqui
  return [];
}`,
    solution: `List<List<int>> mergeIntervals(List<List<int>> intervals) {
  intervals.sort((a, b) => a[0].compareTo(b[0]));
  final out = <List<int>>[];
  for (final interval in intervals) {
    if (out.isEmpty || out.last[1] < interval[0]) {
      out.add([interval[0], interval[1]]);
    } else {
      out.last[1] = out.last[1] > interval[1] ? out.last[1] : interval[1];
    }
  }
  return out;
}`,
    tests: [
      { input: [[[1, 3], [2, 4], [6, 8]]], expected: [[1, 4], [6, 8]], description: "Merge", inputTypes: ["List<List<int>>"] }
    ]
  },
  {
    id: 16,
    title: "Dart - Ventana maxima",
    description: "Implementa `maxWindowSum` que calcule la suma maxima de k elementos consecutivos.",
    difficulty: "Intermedio",
    category: "List",
    language: "flutter",
    functionName: "maxWindowSum",
    starterCode: `int maxWindowSum(List<int> nums, int k) {
  // Tu codigo aqui
  return 0;
}`,
    solution: `int maxWindowSum(List<int> nums, int k) {
  var window = nums.take(k).reduce((a, b) => a + b);
  var best = window;
  for (var i = k; i < nums.length; i++) {
    window += nums[i] - nums[i - k];
    if (window > best) best = window;
  }
  return best;
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5], 2], expected: 9, description: "Max suma", inputTypes: ["List<int>", "int"] },
      { input: [[5, -1, 3, 2], 3], expected: 7, description: "Ventana", inputTypes: ["List<int>", "int"] }
    ]
  }
];

export function getExerciseById(id) {
  return CODING_EXERCISES.find((exercise) => exercise.id === id) || null;
}

export function getExercisesByLanguage(languageId) {
  if (languageId === 'all') return CODING_EXERCISES;
  return CODING_EXERCISES.filter((exercise) => exercise.language === languageId);
}
