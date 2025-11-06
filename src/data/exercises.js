// Tiempo por dificultad (en segundos)
const TIME_LIMITS = {
  "Básico": 60,      // 1 minuto
  "Intermedio": 90,  // 1.5 minutos
  "Avanzado": 120    // 2 minutos
};

// Ejercicios de entrevista técnica
export const exercises = [
  {
    id: 1,
    title: "useState - Múltiples actualizaciones",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la salida del siguiente código?",
    code: `import { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(5);

  return (
    <>
      <span>{counter}</span>
      <button onClick={() => {
        setCounter(counter + 5);
        setCounter(counter + 5);
        alert(counter);
        setCounter(counter + 5);
        setCounter(counter + 5);
      }}>Increment</button>
    </>
  )
}`,
    options: [
      { id: "a", text: "Alert con 5, 5" },
      { id: "b", text: "Alert con 15, 25" },
      { id: "c", text: "Alert con 5, 10" },
      { id: "d", text: "Error: Cannot update the same state multiple times concurrently" }
    ],
    correctAnswer: "a",
    explanation: "El estado se actualiza de forma asíncrona en React. Dentro del onClick, counter mantiene su valor original (5) durante toda la ejecución. Los 4 setCounter establecen el contador a 10 (5+5), no lo incrementan acumulativamente. El alert muestra 5 porque aún no se ha actualizado el estado."
  },
  {
    id: 2,
    title: "useState - Función callback",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la salida del siguiente código?",
    code: `import { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(5);

  return (
    <>
      <span>{counter}</span>
      <button onClick={() => {
        setCounter(counter => counter + 5);
        setCounter(counter => counter + 5);
        alert(counter);
        setCounter(counter => counter + 5);
        setCounter(counter => counter + 5);
      }}>Increment</button>
    </>
  )
}`,
    options: [
      { id: "a", text: "Alert con 5, 25" },
      { id: "b", text: "Alert con 5, 10" },
      { id: "c", text: "Alert con 15, 25" },
      { id: "d", text: "Alert con 15, 10" }
    ],
    correctAnswer: "a",
    explanation: "Al usar la forma funcional de setState, cada llamada recibe el valor actualizado. Los 4 setCounter se acumulan: 5+5+5+5+5=25. Sin embargo, el alert todavía muestra 5 porque el closure captura el valor original de counter."
  },
  {
    id: 3,
    title: "useRef - Propiedad current",
    category: "React Hooks",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la salida del span después de un click?",
    code: `import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleIncrement() {
    countRef.current = countRef.current + 1;
  }

  return (
    <>
      <span>Count: {countRef.current}</span>
      <button onClick={handleIncrement}>
        Click me
      </button>
    </>
  )
}`,
    options: [
      { id: "a", text: "Cannot read current property of undefined" },
      { id: "b", text: "Count: 1" },
      { id: "c", text: "null" },
      { id: "d", text: "Count: 0" }
    ],
    correctAnswer: "d",
    explanation: "Aunque countRef.current se incrementa a 1, el componente no se re-renderiza porque useRef no desencadena re-renders. El span seguirá mostrando 'Count: 0' hasta que algo más cause un re-render."
  },
  {
    id: 4,
    title: "useRef - Referencias en componentes funcionales",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuál es el resultado después de hacer click en el botón?",
    code: `import { useRef } from 'react';

function MyCustomInput(props) {
  return <input {...props} />;
}

export default function MyCustomForm() {
  const inputRef = useRef(null);

  function handleInputFocus() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyCustomInput ref={inputRef} />
      <button onClick={handleInputFocus}>
        Click Me
      </button>
    </>
  );
}`,
    options: [
      { id: "a", text: "Input gets the focus" },
      { id: "b", text: "Warning: Function components cannot be given refs." },
      { id: "c", text: "Cannot read current property of undefined" },
      { id: "d", text: "Warning: Missing ref on element" }
    ],
    correctAnswer: "b",
    explanation: "Los componentes funcionales no pueden recibir refs directamente. Necesitas usar React.forwardRef para que un componente funcional pueda recibir una ref y pasarla a un elemento DOM interno."
  },
  {
    id: 5,
    title: "useRef - Contador de clicks",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el resultado del número de clicks después de 3 clicks en el botón?",
    code: `import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
  }

  return (
    <>
      <div>Clicked {ref.current} times</div>
      <button onClick={handleClick}>
        Click me!
      </button>
    </>
  );
}`,
    options: [
      { id: "a", text: "3 times" },
      { id: "b", text: "4 times" },
      { id: "c", text: "2 times" },
      { id: "d", text: "0 times" }
    ],
    correctAnswer: "d",
    explanation: "Aunque ref.current se incrementa con cada click (internamente llega a 3), el componente no se re-renderiza porque useRef no causa re-renders. La UI sigue mostrando el valor inicial: 0 times."
  },
  {
    id: 6,
    title: "useEffect - Cleanup function",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué se muestra en consola después de montar y desmontar el componente?",
    code: `import { useEffect, useState } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Effect ran');
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    console.log('Cleanup registered');
    return () => {
      console.log('Cleanup executed');
      clearInterval(timer);
    };
  }, []);

  return <div>Count: {count}</div>;
}`,
    options: [
      { id: "a", text: '"Effect ran", "Cleanup registered", "Cleanup executed" (on mount), "Cleanup executed" (on unmount)' },
      { id: "b", text: '"Effect ran", "Cleanup registered" (on mount), "Cleanup executed" (on unmount)' },
      { id: "c", text: '"Effect ran" (on mount), "Cleanup executed" (on unmount)' },
      { id: "d", text: '"Effect ran", "Cleanup registered", "Cleanup executed" (on mount and unmount)' }
    ],
    correctAnswer: "b",
    explanation: "Al montar: se ejecuta el efecto completo, imprimiendo 'Effect ran' y luego 'Cleanup registered'. La función cleanup solo se ejecuta cuando el componente se desmonta o antes de ejecutar el efecto nuevamente (pero aquí deps es [], así que solo al desmontar)."
  },
  {
    id: 7,
    title: "useState - Mutación directa",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la salida después de hacer click en el botón?",
    code: `import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([1, 2, 3]);

  function handleClick() {
    items.push(4);
    setItems(items);
  }

  return (
    <>
      <div>Items: {items.join(', ')}</div>
      <button onClick={handleClick}>Add Item</button>
    </>
  );
}`,
    options: [
      { id: "a", text: "Items: 1, 2, 3, 4" },
      { id: "b", text: "Items: 1, 2, 3" },
      { id: "c", text: "Error: Cannot mutate state directly" },
      { id: "d", text: "Items: 1, 2, 3, 4, 4 (duplicates on each click)" }
    ],
    correctAnswer: "b",
    explanation: "Aunque items.push(4) modifica el array, React no detecta el cambio porque la referencia del array es la misma. setItems(items) no causa un re-render porque React compara por referencia. Deberías usar setItems([...items, 4])."
  },
  {
    id: 8,
    title: "useEffect - Múltiples efectos",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuál es la salida después de que el componente se monta?",
    code: `import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1);
  });

  useEffect(() => {
    setCount(2);
  }, []);

  console.log('Rendered with count:', count);

  return <div>Count: {count}</div>;
}`,
    options: [
      { id: "a", text: '"Rendered with count: 0", "Rendered with count: 2"' },
      { id: "b", text: '"Rendered with count: 0", "Rendered with count: 1", "Rendered with count: 2"' },
      { id: "c", text: "Infinite loop / Maximum update depth exceeded error" },
      { id: "d", text: '"Rendered with count: 0", "Rendered with count: 2", "Rendered with count: 1"' }
    ],
    correctAnswer: "c",
    explanation: "El primer useEffect no tiene array de dependencias, por lo que se ejecuta después de cada render. Esto causa un ciclo infinito: render -> efecto 1 setCount(1) -> render -> efecto 1 setCount(1) -> etc. React detecta esto y lanza un error de máxima profundidad de actualización."
  },
  {
    id: 9,
    title: "useMemo - Memoización de valores",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué se mostrará en pantalla?",
    code: `import { useMemo } from 'react';

export default function App() {
  const expensiveCalculation = useMemo(() => {
    console.log('Calculating...');
    return 100 + 200;
  });

  return <div>Result: {expensiveCalculation}</div>;
}`,
    options: [
      { id: "a", text: "Result: 300" },
      { id: "b", text: "Result: function() { ... }" },
      { id: "c", text: "Result: undefined" },
      { id: "d", text: "Error: useMemo requires a dependency array" }
    ],
    correctAnswer: "d",
    explanation: "useMemo requiere dos argumentos: la función de cálculo y un array de dependencias. Sin el segundo argumento, React lanzará un error. La sintaxis correcta sería: useMemo(() => { return 100 + 200; }, [])."
  },
  {
    id: 10,
    title: "useState - Objetos y mutación",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la salida después de hacer click dos veces en el botón?",
    code: `import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'John',
    age: 30
  });

  function handleClick() {
    person.age = person.age + 1;
    setPerson(person);
  }

  return (
    <>
      <div>Age: {person.age}</div>
      <button onClick={handleClick}>Increment Age</button>
    </>
  );
}`,
    options: [
      { id: "a", text: "Age: 32" },
      { id: "b", text: "Age: 31" },
      { id: "c", text: "Age: 30" },
      { id: "d", text: "Error: Cannot mutate state" }
    ],
    correctAnswer: "c",
    explanation: "Similar al ejercicio 7, aunque person.age se modifica, React no detecta el cambio porque la referencia del objeto es la misma. Deberías usar setPerson({ ...person, age: person.age + 1 }) para crear un nuevo objeto."
  },
  {
    id: 11,
    title: "useEffect - Orden de ejecución",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué se registrará en la consola? (on initial mount y after first button click)",
    code: `import { useEffect, useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Effect A');
    return () => console.log('Cleanup A');
  }, [count]);

  useEffect(() => {
    console.log('Effect B');
    return () => console.log('Cleanup B');
  }, []);

  console.log('Render');

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    options: [
      { id: "a", text: 'On mount: "Render", "Effect A", "Effect B"\nAfter click: "Render", "Cleanup A", "Effect A"' },
      { id: "b", text: 'On mount: "Effect A", "Effect B", "Render"\nAfter click: "Cleanup A", "Render", "Effect A"' },
      { id: "c", text: 'On mount: "Render", "Effect B", "Effect A"\nAfter click: "Render", "Effect A", "Cleanup A"' },
      { id: "d", text: 'On mount: "Effect A", "Cleanup A", "Effect B", "Render"\nAfter click: "Render", "Cleanup B", "Effect B", "Cleanup A", "Effect A"' }
    ],
    correctAnswer: "a",
    explanation: "React ejecuta el render primero, luego los efectos en orden. En el mount: 'Render', 'Effect A', 'Effect B'. Al hacer click: 'Render' (con nuevo count), luego 'Cleanup A' (porque count cambió), luego 'Effect A' nuevamente. Effect B no se ejecuta porque su array de dependencias está vacío."
  },
  {
    id: 12,
    title: "Node.js - Manejo de rutas API",
    category: "Backend",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el resultado de hacer GET a /api/users/123/posts?",
    code: `const express = require('express');
const app = express();

app.get('/api/users/:id', (req, res) => {
  res.json({ userId: req.params.id });
});

app.get('/api/users/:id/posts', (req, res) => {
  res.json({ userId: req.params.id, posts: [] });
});

app.listen(3000);`,
    options: [
      { id: "a", text: '{ "userId": "123", "posts": [] }' },
      { id: "b", text: '{ "userId": "123" }' },
      { id: "c", text: "404 Not Found" },
      { id: "d", text: "Error: Route conflict" }
    ],
    correctAnswer: "a",
    explanation: "Express evalúa las rutas en orden. La segunda ruta es más específica (/api/users/:id/posts) y coincide exactamente con la petición, por lo que se ejecuta ese handler y retorna el objeto con userId y posts."
  },
  {
    id: 13,
    title: "Node.js - Middleware y orden de ejecución",
    category: "Backend",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué se imprime en consola y cuál es la respuesta HTTP?",
    code: `const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.get('/test', (req, res) => {
  console.log('Handler');
  res.send('Response');
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

// GET /test`,
    options: [
      { id: "a", text: 'Console: "Middleware 1", "Handler", "Middleware 2" | Response: "Response"' },
      { id: "b", text: 'Console: "Middleware 1", "Handler" | Response: "Response"' },
      { id: "c", text: 'Console: "Middleware 1", "Middleware 2", "Handler" | Response: "Response"' },
      { id: "d", text: 'Console: "Handler" | Response: "Response"' }
    ],
    correctAnswer: "b",
    explanation: "Los middlewares definidos con app.use() ANTES de las rutas se ejecutan primero. El Middleware 2 está definido DESPUÉS de la ruta, por lo que no se ejecuta para esta petición. Express ejecuta: Middleware 1 -> next() -> Handler -> res.send() (termina la respuesta)."
  },
  {
    id: 14,
    title: "Git - Rebase vs Merge",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia principal entre git merge y git rebase?",
    code: `# Situación inicial: estás en feature-branch
git log --oneline
# A - B - C (main)
#      \\
#       D - E (feature-branch)

# Opción 1: git merge main
# Opción 2: git rebase main`,
    options: [
      { id: "a", text: "Merge crea un commit de merge, rebase reescribe el historial moviendo los commits" },
      { id: "b", text: "Merge es más rápido, rebase es más lento" },
      { id: "c", text: "Merge solo funciona en la misma rama, rebase entre ramas" },
      { id: "d", text: "No hay diferencia, son comandos sinónimos" }
    ],
    correctAnswer: "a",
    explanation: "git merge crea un nuevo commit de merge que une dos historiales. git rebase reescribe el historial moviendo tus commits encima de otra rama, creando un historial lineal. Rebase es útil para mantener un historial limpio, pero nunca debe usarse en ramas compartidas públicamente."
  },
  {
    id: 15,
    title: "Git - Recuperar cambios perdidos",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Hiciste un hard reset por error (git reset --hard HEAD~3). ¿Cómo recuperas los commits?",
    code: `# Antes del error
git log --oneline
# abc123 (HEAD) Feature complete
# def456 Work in progress
# ghi789 Initial setup

# Después del error
git reset --hard HEAD~3

# ¿Cómo recuperar los commits?`,
    options: [
      { id: "a", text: "git reflog y luego git reset --hard abc123" },
      { id: "b", text: "git revert HEAD~3" },
      { id: "c", text: "git checkout -b recovery" },
      { id: "d", text: "No se puede recuperar, los commits se perdieron permanentemente" }
    ],
    correctAnswer: "a",
    explanation: "git reflog muestra el historial de todos los movimientos de HEAD, incluyendo commits que ya no están en ninguna rama. Puedes ver el hash del commit perdido y hacer git reset --hard [hash] para recuperarlo. Git mantiene estos registros durante ~30 días por defecto."
  },
  {
    id: 16,
    title: "CSS - Flexbox vs Grid",
    category: "CSS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia principal entre Flexbox y CSS Grid?",
    code: `/* Flexbox */
.container {
  display: flex;
}

/* Grid */
.container {
  display: grid;
}`,
    options: [
      { id: "a", text: "Flexbox es unidimensional (filas o columnas), Grid es bidimensional (filas y columnas)" },
      { id: "b", text: "Flexbox solo funciona horizontalmente, Grid solo verticalmente" },
      { id: "c", text: "Grid es más antiguo que Flexbox" },
      { id: "d", text: "No hay diferencia, son intercambiables" }
    ],
    correctAnswer: "a",
    explanation: "Flexbox está diseñado para layouts unidimensionales, trabajando en una dirección (fila o columna). CSS Grid es bidimensional, permitiendo control simultáneo de filas y columnas. Usa Flexbox para componentes y Grid para layouts de página completa."
  },
  {
    id: 17,
    title: "CSS - Especificidad",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué color tendrá el texto del párrafo?",
    code: `<style>
  #content p { color: blue; }
  .text { color: red; }
  p { color: green !important; }
  div p { color: yellow; }
</style>

<div id="content">
  <p class="text">Hello World</p>
</div>`,
    options: [
      { id: "a", text: "Verde (!important tiene máxima prioridad)" },
      { id: "b", text: "Azul (ID selector tiene mayor especificidad)" },
      { id: "c", text: "Rojo (class selector)" },
      { id: "d", text: "Amarillo (último declarado)" }
    ],
    correctAnswer: "a",
    explanation: "!important tiene la máxima prioridad en CSS, sobrescribiendo incluso los selectores ID. La jerarquía es: !important > inline styles > #id > .class > element. Evita usar !important excepto en casos muy específicos."
  },
  {
    id: 18,
    title: "CSS - Box Model",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el ancho total del elemento con box-sizing: content-box?",
    code: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: content-box;
}`,
    options: [
      { id: "a", text: "250px (200 + 20*2 + 5*2)" },
      { id: "b", text: "200px (solo el width)" },
      { id: "c", text: "270px (200 + 20*2 + 5*2 + 10*2)" },
      { id: "d", text: "240px (200 + 20*2)" }
    ],
    correctAnswer: "a",
    explanation: "Con box-sizing: content-box (valor por defecto), el width solo incluye el contenido. El ancho total es: content (200px) + padding-left (20px) + padding-right (20px) + border-left (5px) + border-right (5px) = 250px. El margin no cuenta para el tamaño del elemento, solo para el espaciado externo."
  },
  {
    id: 19,
    title: "AWS - S3 vs EBS",
    category: "AWS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre Amazon S3 y Amazon EBS?",
    code: `// Escenario: Necesitas almacenar archivos para tu aplicación

// Opción 1: Amazon S3
const s3 = new AWS.S3();
s3.putObject({ Bucket: 'my-bucket', Key: 'file.txt', Body: data });

// Opción 2: Amazon EBS
// Volumen adjunto a una instancia EC2
// /dev/xvdf montado en /data`,
    options: [
      { id: "a", text: "S3 es object storage (archivos vía HTTP), EBS es block storage (disco para EC2)" },
      { id: "b", text: "S3 es más barato, EBS es más caro siempre" },
      { id: "c", text: "S3 solo para imágenes, EBS para bases de datos" },
      { id: "d", text: "Son lo mismo, solo diferentes nombres" }
    ],
    correctAnswer: "a",
    explanation: "S3 (Simple Storage Service) es object storage para almacenar archivos accesibles vía HTTP/HTTPS, ideal para backups, assets estáticos, etc. EBS (Elastic Block Store) es block storage que funciona como un disco duro virtual adjunto a instancias EC2, ideal para sistemas de archivos, bases de datos, etc."
  },
  {
    id: 20,
    title: "AWS - Lambda Cold Start",
    category: "AWS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es un 'cold start' en AWS Lambda y cómo afecta el rendimiento?",
    code: `// Lambda function
exports.handler = async (event) => {
  // Código de inicialización
  const db = await connectDatabase();
  
  // Handler principal
  const result = await processRequest(event);
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};`,
    options: [
      { id: "a", text: "Primera invocación de la función que requiere inicializar el contenedor, causando mayor latencia" },
      { id: "b", text: "Error cuando Lambda está en región fría" },
      { id: "c", text: "Función que se ejecuta en horario nocturno" },
      { id: "d", text: "Lambda que usa lenguaje compilado" }
    ],
    correctAnswer: "a",
    explanation: "Cold start ocurre cuando Lambda debe crear un nuevo contenedor de ejecución para tu función. Incluye descargar código, inicializar runtime y ejecutar código de inicialización. Causa latencia adicional (100ms-varios segundos). Puedes mitigar con: Provisioned Concurrency, mantener funciones 'calientes' con invocaciones periódicas, o mover inicialización fuera del handler."
  },
  {
    id: 21,
    title: "AWS - IAM Roles vs Users",
    category: "AWS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuándo usar IAM Role en lugar de IAM User?",
    code: `// Escenario 1: Aplicación en EC2 necesita acceso a S3
// Opción A: Hardcodear credenciales de IAM User
// Opción B: Asignar IAM Role a la instancia EC2

// Escenario 2: Desarrollador necesita acceso a AWS Console
// Opción A: Crear IAM User
// Opción B: Crear IAM Role`,
    options: [
      { id: "a", text: "Roles para servicios AWS/aplicaciones, Users para personas" },
      { id: "b", text: "Roles son más baratos que Users" },
      { id: "c", text: "Roles solo para administradores, Users para desarrolladores" },
      { id: "d", text: "No hay diferencia práctica" }
    ],
    correctAnswer: "a",
    explanation: "IAM Roles son para servicios AWS (EC2, Lambda) o aplicaciones que necesitan acceso temporal. No tienen credenciales permanentes. IAM Users son para personas que necesitan acceso duradero con credenciales fijas. Nunca hardcodees credenciales de Users en código; usa Roles para servicios."
  }
];

// Función helper para calcular el score
export function calculateScore(userAnswers) {
  let correct = 0;
  let total = exercises.length;
  
  exercises.forEach(exercise => {
    if (userAnswers[exercise.id] === exercise.correctAnswer) {
      correct++;
    }
  });
  
  return {
    correct,
    total,
    percentage: Math.round((correct / total) * 100)
  };
}

// Función para obtener el resultado detallado
export function getDetailedResults(userAnswers) {
  return exercises.map(exercise => ({
    ...exercise,
    userAnswer: userAnswers[exercise.id] || null,
    isCorrect: userAnswers[exercise.id] === exercise.correctAnswer
  }));
}

