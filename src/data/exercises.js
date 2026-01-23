import { DEFAULT_QUESTION_COUNT, MULTI_STACK_QUESTION_COUNT, LEVEL_DICTIONARY } from "./stackConfig.js";

// Tiempo por dificultad (en segundos)
const TIME_LIMITS = {
  "Básico": 60,      // 1 minuto
  "Intermedio": 90,  // 1.5 minutos
  "Avanzado": 120    // 2 minutos
};

// Ejercicios de entrevista técnica
const rawExercises = [
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
  },
  {
    id: 22,
    title: "Next.js - Incremental Static Regeneration",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Desplegaste esta página. Haces tres peticiones: A (t=0s), B (t=5s) y C (t=12s). ¿Qué valores reciben los clientes?",
    code: `let builds = 0;

export async function getStaticProps() {
  builds += 1;

  return {
    props: {
      buildCounter: builds,
      generatedAt: Date.now()
    },
    revalidate: 10
  };
}

export default function Page({ buildCounter, generatedAt }) {
  return (
    <>
      <p>build: {buildCounter}</p>
      <p>{generatedAt}</p>
    </>
  );
}`,
    options: [
      { id: "a", text: "A, B y C ven build 1 con el mismo timestamp. ISR nunca vuelve a generar." },
      { id: "b", text: "A ve build 1, B build 2 y C build 3; cada request regenera la página." },
      { id: "c", text: "A y B ven build 1 con el mismo timestamp; C dispara una regeneración en background y termina recibiendo build 2 con timestamp nuevo." },
      { id: "d", text: "A recibe build 1, B recibe 304 Not Modified y C build 1 nuevamente." }
    ],
    correctAnswer: "c",
    explanation: "Con ISR, la primera petición genera la página (build 1). Durante la ventana de revalidate (10s) Next sirve el HTML en caché, así que B recibe los mismos datos. Cuando llega C (>10s) Next responde con la versión cacheada, pero también desencadena la regeneración. Una vez terminada, la respuesta hacia C ya incluye los nuevos props (build 2).",
    stackTags: ["next", "react"]
  },
  {
    id: 23,
    title: "NestJS - Scope de providers",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Se realizan dos requests HTTP consecutivas: GET /reports/daily y GET /reports/weekly. ¿Qué se imprime en consola?",
    code: `import { Controller, Get, Scope, Injectable } from '@nestjs/common';

let instances = 0;

@Injectable({ scope: Scope.REQUEST })
class ReportTracker {
  constructor() {
    instances += 1;
  }

  log(tag: string) {
    console.log(tag, instances);
  }
}

@Controller('reports')
export class ReportsController {
  constructor(private readonly tracker: ReportTracker) {}

  @Get('daily')
  daily() {
    this.tracker.log('daily');
    return 'ok';
  }

  @Get('weekly')
  weekly() {
    this.tracker.log('weekly');
    return 'ok';
  }
}`,
    options: [
      { id: "a", text: "daily 1 / weekly 1, porque el provider se comparte entre requests mientras haya memoria." },
      { id: "b", text: "daily 1 / weekly 2, cada request crea su propia instancia REQUEST scoped." },
      { id: "c", text: "daily 1 / weekly 1, el scope request se comparte dentro del mismo controlador." },
      { id: "d", text: "daily 2 / weekly 2, el provider se crea por handler invocado." }
    ],
    correctAnswer: "b",
    explanation: "Los providers con Scope.REQUEST se instancian una vez por request completo. La primera petición crea la instancia #1 y el log imprime 'daily 1'. La segunda petición crea la instancia #2 independientemente del controlador, por lo que imprime 'weekly 2'.",
    stackTags: ["nestjs", "system-design"]
  },
  {
    id: 24,
    title: "SQL - Índices compuestos",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Necesitas optimizar la consulta para listar facturas vencidas de un tenant ordenadas por fecha. ¿Qué índice ayuda más?",
    code: `CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  tenant_id INT NOT NULL,
  status TEXT NOT NULL,
  due_date DATE NOT NULL
);

EXPLAIN ANALYZE
SELECT *
FROM invoices
WHERE tenant_id = 42
  AND status = 'overdue'
ORDER BY due_date DESC
LIMIT 20;`,
    options: [
      { id: "a", text: "CREATE INDEX ON invoices (status, tenant_id);" },
      { id: "b", text: "CREATE INDEX ON invoices (tenant_id, status, due_date DESC);" },
      { id: "c", text: "CREATE INDEX ON invoices (due_date, status);" },
      { id: "d", text: "CREATE INDEX ON invoices (due_date DESC) WHERE status = 'overdue';" }
    ],
    correctAnswer: "b",
    explanation: "La consulta filtra por tenant y status antes de aplicar ORDER BY due_date. El índice compuesto (tenant_id, status, due_date DESC) permite satisfacer el filtro y la ordenación sin un sort adicional. Un índice parcial solo por due_date no ayuda al filtro por tenant.",
    stackTags: ["relational-db", "nestjs"]
  },
  {
    id: 25,
    title: "NoSQL - Modelado en MongoDB",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Diseñas eventos de auditoría para consultar siempre por userId y rango de fechas. ¿Qué colección modela mejor el acceso?",
    code: `// Opción A
{
  _id: ObjectId,
  userId: 'u1',
  events: [
    { type: 'LOGIN', at: ISODate('2024-01-01') },
    { type: 'CHANGE_PASSWORD', at: ISODate('2024-02-10') }
  ]
}

// Opción B
{
  _id: ObjectId,
  userId: 'u1',
  type: 'LOGIN',
  at: ISODate('2024-01-01')
}`,
    options: [
      { id: "a", text: "Opción A porque minimiza documentos y favorece crecimiento ilimitado del array." },
      { id: "b", text: "Opción B porque permite indexar userId+at y evita documentos gigantes." },
      { id: "c", text: "Ambas son equivalentes; Mongo siempre indexa arrays por defecto." },
      { id: "d", text: "Ninguna: Mongo obliga a tener tablas intermedias para arrays." }
    ],
    correctAnswer: "b",
    explanation: "El patrón de acceso consulta por userId y rango de fechas, lo que se resuelve con un índice compuesto { userId: 1, at: -1 }. Guardar todos los eventos en un único documento produce growth ilimitado y hace que el índice ya no pueda discriminar por fecha.",
    stackTags: ["nosql", "system-design"]
  },
  {
    id: 26,
    title: "Diseño de sistemas - Eventos a escala",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Debes procesar 2 millones de eventos/minuto y permitir reintentos sin duplicados. ¿Cuál arquitectura es más apropiada?",
    code: `// Requerimientos
// - Ingesta bursty
// - Reprocesar eventos fallidos
// - Consumidores independientes (facturación, alertas, analítica)

// Opciones
// A) API HTTP que inserta en tabla relacional con cola de trabajos propia
// B) Colocar un topic de Kafka/Kinesis + consumidores idempotentes
// C) Escribir directamente en S3 y correr cron que procese archivos
// D) Usar WebSockets a todos los consumidores en tiempo real`,
    options: [
      { id: "a", text: "A) porque una tabla relacional con workers internos maneja reintentos de forma simple." },
      { id: "b", text: "B) porque un log distribuido permite offsets, relectura y consumidores independientes." },
      { id: "c", text: "C) porque S3 + batch ofrece durabilidad y procesamientos programados." },
      { id: "d", text: "D) porque WebSockets entregan eventos en tiempo real sin necesidad de colas." }
    ],
    correctAnswer: "b",
    explanation: "Un log distribuido (Kafka/Kinesis) desacopla productores y múltiples consumidores. Soporta throughput alto, relectura con offsets para reintentos e idempotencia en los consumidores. La tabla relacional o los cron sobre S3 no manejan el volumen ni la necesidad de múltiples pipelines independientes.",
    stackTags: ["system-design", "nosql"]
  },
  {
    id: 27,
    title: "QA - Pirámide de testing",
    category: "QA Automation",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "Para un producto web reciente, ¿cómo distribuirías 20 suites de prueba siguiendo la pirámide de testing?",
    code: `// Solicitud del CTO
// "Tenemos 20 suites de prueba automatizadas disponibles. Necesito
// que priorices estabilidad en despliegues diarios."
//
// ¿Cuál distribución respeta la pirámide (unit > integration > e2e)?`,
    options: [
      { id: "a", text: "4 unitarias, 6 integraciones, 10 E2E" },
      { id: "b", text: "10 unitarias, 6 integraciones, 4 E2E" },
      { id: "c", text: "6 unitarias, 6 integraciones, 8 E2E" },
      { id: "d", text: "Distribución pareja: 7, 7 y 6" }
    ],
    correctAnswer: "b",
    explanation: "La pirámide recomienda que la mayoría sean pruebas unitarias (rápidas y baratas), seguidas de integraciones y un número menor de E2E. La opción B mantiene esa proporción y permite retroalimentación rápida.",
    stackTags: ["qa-automation"]
  },
  {
    id: 28,
    title: "QA - Selección de framework",
    category: "QA Automation",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El equipo quiere automatizar regresión UI + API y ejecutarlo en CI. ¿Cuál enfoque es más sostenible?",
    code: `// Contexto
// - Front en React/Next.js
// - Backend en NestJS expone API REST
// - Pipelines GitHub Actions
// - El equipo QA domina JavaScript

// ¿Qué propones?`,
    options: [
      { id: "a", text: "Usar Cypress para UI y supertest para API, compartiendo helpers en un monorepo JS" },
      { id: "b", text: "Escribir todo en Selenium Java, porque es el estándar corporativo" },
      { id: "c", text: "Automatizar solo pruebas manuales con grabadores low-code" },
      { id: "d", text: "Cubrir API con JMeter y UI con scripts Bash simples" }
    ],
    correctAnswer: "a",
    explanation: "Elegir herramientas alineadas con el stack (JS) permite compartir utilidades y ejecutarlas en GitHub Actions sin dependencias adicionales. Cypress ofrece buen soporte UI y supertest integra rápido con NestJS para API.",
    stackTags: ["qa-automation", "react", "next", "nestjs"]
  },
  {
    id: 29,
    title: "QA - Estrategia de flakiness",
    category: "QA Automation",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Este test E2E falla 1/5 corridas en CI debido a `cy.get('[data-testid=\"summary\"]')` que no aparece a tiempo. ¿Qué harías?",
    code: `// extracto
it('should complete checkout flow', () => {
  cy.login('qa-user');
  cy.visit('/checkout');
  cy.get('[data-testid="summary"]').should('contain', 'Total');
});`,
    options: [
      { id: "a", text: "Agregar un cy.wait(5000) fijo antes del get()" },
      { id: "b", text: "Reintentar automáticamente el test completo hasta que pase" },
      { id: "c", text: "Sincronizar usando intercepts/esperas condicionadas y exponer data-testid estables" },
      { id: "d", text: "Eliminar la prueba porque es flaky" }
    ],
    correctAnswer: "c",
    explanation: "La mejor práctica es sincronizar con el evento real (por ejemplo `cy.intercept('GET', '/api/summary').as('summary'); cy.wait('@summary');`) y asegurarse de que el elemento tenga un selector estable. Evita waits fijos y reintentos ciegos.",
    stackTags: ["qa-automation", "next", "react"]
  },
  // ============= REACT - Preguntas adicionales (12-30) =============
  {
    id: 30,
    title: "React.memo - Memoización de componentes",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuántas veces se renderiza ChildComponent después de 3 clicks en el botón del padre?",
    code: `import { useState, memo } from 'react';

const ChildComponent = memo(({ data }) => {
  console.log('Child rendered');
  return <div>{data.value}</div>;
});

export default function Parent() {
  const [count, setCount] = useState(0);
  const data = { value: 'Hello' };
  
  return (
    <>
      <ChildComponent data={data} />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </>
  );
}`,
    options: [
      { id: "a", text: "1 vez (solo en el mount inicial)" },
      { id: "b", text: "4 veces (mount + 3 clicks)" },
      { id: "c", text: "0 veces (memo lo previene completamente)" },
      { id: "d", text: "3 veces (solo los clicks)" }
    ],
    correctAnswer: "b",
    explanation: "Aunque usamos React.memo, el objeto 'data' se crea nuevo en cada render del padre. React compara por referencia, y como cada vez es un objeto diferente, ChildComponent se re-renderiza. Para solucionarlo, usa useMemo: const data = useMemo(() => ({ value: 'Hello' }), [])."
  },
  {
    id: 31,
    title: "useCallback - Dependencias y referencias",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué se imprime en consola después de hacer click en el botón?",
    code: `import { useState, useCallback } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Count:', count);
  }, []);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={handleClick}>
        Log Count
      </button>
      <div>Count: {count}</div>
    </>
  );
}`,
    options: [
      { id: "a", text: "Siempre imprime 'Count: 0' sin importar cuántas veces incrementes" },
      { id: "b", text: "Imprime el valor actual de count" },
      { id: "c", text: "Error: Cannot read property 'count'" },
      { id: "d", text: "Imprime 'Count: undefined'" }
    ],
    correctAnswer: "a",
    explanation: "El callback está memoizado con dependencias vacías [], por lo que captura el valor inicial de count (0) y nunca se actualiza. Para que funcione correctamente, debes incluir count en el array de dependencias: useCallback(() => { console.log('Count:', count); }, [count])."
  },
  {
    id: 32,
    title: "useContext - Re-renders en cascada",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué componentes se re-renderizan cuando cambias el theme en este código?",
    code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Content />
      <button onClick={() => setTheme('dark')}>Toggle</button>
    </ThemeContext.Provider>
  );
}

function Header() {
  console.log('Header rendered');
  return <div>Header</div>;
}

function Content() {
  const theme = useContext(ThemeContext);
  console.log('Content rendered');
  return <div>Content: {theme}</div>;
}`,
    options: [
      { id: "a", text: "Solo Content (consume el context)" },
      { id: "b", text: "App, Header y Content (el Provider causa re-render en todos los hijos)" },
      { id: "c", text: "App y Content (solo los que usan el context)" },
      { id: "d", text: "Ninguno (Context previene re-renders)" }
    ],
    correctAnswer: "b",
    explanation: "Cuando el estado del Provider cambia, React re-renderiza App (donde está el estado) y TODOS sus componentes hijos, incluidos los que no consumen el context. Para optimizar, envuelve los hijos que no consumen context en React.memo o usa composition para evitar re-renders innecesarios."
  },
  {
    id: 33,
    title: "Custom Hooks - Reglas de Hooks",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué problema tiene este custom hook?",
    code: `function useUserData(userId) {
  if (!userId) {
    return null;
  }
  
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setData);
  }, [userId]);
  
  return data;
}`,
    options: [
      { id: "a", text: "No hay problema, el código es correcto" },
      { id: "b", text: "Viola las Reglas de Hooks: los hooks deben llamarse incondicionalmente" },
      { id: "c", text: "Falta el cleanup en useEffect" },
      { id: "d", text: "userId no puede ser undefined" }
    ],
    correctAnswer: "b",
    explanation: "Las Reglas de Hooks establecen que los hooks deben llamarse en el mismo orden en cada render. El return temprano causa que useState y useEffect solo se llamen condicionalmente. La solución es llamar los hooks primero y luego hacer el early return: const [data, setData] = useState(null); if (!userId) return null; useEffect(...)."
  },
  {
    id: 34,
    title: "useReducer - Estado complejo",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el estado después de dispatch({ type: 'increment' })?",
    code: `import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      state.count++;
      return state;
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      <div>Count: {state.count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </>
  );
}`,
    options: [
      { id: "a", text: "Count: 1 (funciona correctamente)" },
      { id: "b", text: "Count: 0 (no se actualiza)" },
      { id: "c", text: "Error: Cannot mutate state" },
      { id: "d", text: "Count: 0 en UI, pero state.count es 1 internamente" }
    ],
    correctAnswer: "b",
    explanation: "El caso 'increment' muta el estado directamente (state.count++) y retorna la misma referencia. React compara por referencia, por lo que no detecta el cambio y no re-renderiza. Debes retornar un nuevo objeto: return { ...state, count: state.count + 1 }."
  },
  {
    id: 35,
    title: "React Suspense - Lazy loading",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué se muestra mientras se carga HeavyComponent?",
    code: `import { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./Heavy'));

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
      <footer>Footer</footer>
    </div>
  );
}`,
    options: [
      { id: "a", text: "'My App', 'Loading...', 'Footer'" },
      { id: "b", text: "Solo 'Loading...' (Suspense bloquea todo)" },
      { id: "c", text: "'My App' y 'Footer' (sin Loading)" },
      { id: "d", text: "Página en blanco hasta que carga" }
    ],
    correctAnswer: "a",
    explanation: "Suspense solo suspende el árbol dentro de su boundary. El h1 y footer se renderizan inmediatamente, mientras que el espacio de HeavyComponent muestra el fallback ('Loading...') hasta que el componente lazy termine de cargar."
  },
  {
    id: 36,
    title: "useLayoutEffect vs useEffect",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuál es la diferencia clave entre useLayoutEffect y useEffect?",
    code: `import { useEffect, useLayoutEffect, useRef } from 'react';

export default function Component() {
  const ref = useRef();
  
  useEffect(() => {
    console.log('useEffect:', ref.current?.offsetHeight);
  }, []);
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect:', ref.current?.offsetHeight);
  }, []);
  
  return <div ref={ref}>Content</div>;
}`,
    options: [
      { id: "a", text: "useLayoutEffect se ejecuta síncronamente después del render, antes de que el navegador pinte" },
      { id: "b", text: "useLayoutEffect solo funciona en class components" },
      { id: "c", text: "No hay diferencia, son sinónimos" },
      { id: "d", text: "useLayoutEffect se ejecuta antes del render" }
    ],
    correctAnswer: "a",
    explanation: "useLayoutEffect se ejecuta síncronamente después del render pero ANTES de que el navegador pinte la pantalla. Es útil para medir el DOM o hacer cambios visuales que deben verse en el primer paint. useEffect se ejecuta después del paint, de forma asíncrona."
  },
  {
    id: 37,
    title: "Controlled vs Uncontrolled Components",
    category: "React Hooks",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál de estos inputs es un controlled component?",
    code: `import { useState, useRef } from 'react';

// Opción A
function InputA() {
  const inputRef = useRef();
  return <input ref={inputRef} defaultValue="Hello" />;
}

// Opción B
function InputB() {
  const [value, setValue] = useState("Hello");
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}`,
    options: [
      { id: "a", text: "Solo InputB (el estado controla el valor)" },
      { id: "b", text: "Solo InputA (usa ref para controlar)" },
      { id: "c", text: "Ambos son controlled" },
      { id: "d", text: "Ninguno es controlled" }
    ],
    correctAnswer: "a",
    explanation: "InputB es controlled porque su valor está controlado por el estado de React (value={value}). InputA es uncontrolled porque el DOM maneja su propio estado, solo usamos ref para acceder al valor cuando lo necesitamos. Los uncontrolled usan defaultValue y refs."
  },
  {
    id: 38,
    title: "React Keys - Reconciliación",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Tienes una lista que se reordena. ¿Qué key es más apropiada?",
    code: `const items = [
  { id: 'a1', name: 'Alice', position: 1 },
  { id: 'b2', name: 'Bob', position: 2 }
];

// Usuario reordena: Bob sube a posición 1

// Opción A: key={index}
// Opción B: key={item.id}
// Opción C: key={item.position}
// Opción D: key={item.name}`,
    options: [
      { id: "a", text: "Opción A (index)" },
      { id: "b", text: "Opción B (item.id)" },
      { id: "c", text: "Opción C (item.position)" },
      { id: "d", text: "Opción D (item.name)" }
    ],
    correctAnswer: "b",
    explanation: "En listas que se reordenan, agregan o eliminan items, usa un ID único y estable (item.id). El index cambia cuando reordenas, causando re-renders innecesarios o bugs de estado. position también cambia al reordenar. name podría duplicarse. item.id es único y persistente."
  },
  {
    id: 39,
    title: "Error Boundaries",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué errores captura un Error Boundary?",
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// ¿Qué errores captura?
// A) Errores en event handlers
// B) Errores en renders de componentes hijos
// C) Errores en código asíncrono (setTimeout, fetch)
// D) Errores en SSR`,
    options: [
      { id: "a", text: "Solo B (errores en renders)" },
      { id: "b", text: "A, B y C (todos los errores de JavaScript)" },
      { id: "c", text: "B y D (renders y SSR)" },
      { id: "d", text: "Todos los tipos de errores" }
    ],
    correctAnswer: "a",
    explanation: "Error Boundaries solo capturan errores durante el render, en métodos del ciclo de vida y en constructores de componentes hijos. NO capturan: errores en event handlers, código asíncrono, SSR o errores en el propio boundary. Para event handlers usa try-catch normal."
  },
  {
    id: 40,
    title: "React StrictMode",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace React.StrictMode en desarrollo?",
    code: `import { StrictMode } from 'react';

function App() {
  console.log('Render');
  return <div>Hello</div>;
}

<StrictMode>
  <App />
</StrictMode>`,
    options: [
      { id: "a", text: "Renderiza cada componente dos veces en desarrollo para detectar efectos secundarios" },
      { id: "b", text: "Previene mutaciones de estado" },
      { id: "c", text: "Solo funciona en producción" },
      { id: "d", text: "Hace el código más rápido" }
    ],
    correctAnswer: "a",
    explanation: "StrictMode en desarrollo renderiza intencionalmente los componentes dos veces para ayudar a encontrar efectos secundarios en el render. También invoca effects dos veces. No hace nada en producción. Ayuda a detectar: funciones impuras, efectos sin cleanup, uso de APIs deprecadas."
  },
  {
    id: 41,
    title: "Portals - Renderizado fuera del árbol",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Dónde se renderiza el Modal en el DOM?",
    code: `import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}

function App() {
  return (
    <div id="app">
      <h1>App</h1>
      <Modal>
        <p>Modal Content</p>
      </Modal>
    </div>
  );
}

// HTML: <div id="root"></div><div id="modal-root"></div>`,
    options: [
      { id: "a", text: "Dentro de #app (como hijo de App)" },
      { id: "b", text: "Dentro de #modal-root (fuera del árbol de App)" },
      { id: "c", text: "Error: createPortal no es válido" },
      { id: "d", text: "En el body directamente" }
    ],
    correctAnswer: "b",
    explanation: "createPortal renderiza el contenido en un nodo DOM diferente (#modal-root) fuera del árbol de componentes padre, pero mantiene el contexto de React. Útil para modals, tooltips, popovers que necesitan escapar del overflow: hidden del padre."
  },
  {
    id: 42,
    title: "Synthetic Events - Event Pooling",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué se imprime en consola en React 17+?",
    code: `function Component() {
  const handleClick = (e) => {
    setTimeout(() => {
      console.log(e.target.value);
    }, 1000);
  };
  
  return <input onChange={handleClick} />;
}`,
    options: [
      { id: "a", text: "El valor del input cuando se escribió" },
      { id: "b", text: "null (event pooling limpia el evento)" },
      { id: "c", text: "undefined" },
      { id: "d", text: "Error: Cannot access property of null" }
    ],
    correctAnswer: "a",
    explanation: "En React 17+, event pooling fue eliminado. Los eventos sintéticos ya no se reciclan, por lo que puedes acceder a e.target.value en callbacks asíncronos sin problemas. En React 16 y anteriores, necesitabas e.persist() para mantener el evento."
  },
  {
    id: 43,
    title: "Concurrent Features - useTransition",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve useTransition en React 18+?",
    code: `import { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      // Update expensive list
      setFilteredResults(filterLargeList(e.target.value));
    });
  };
  
  return <input value={query} onChange={handleChange} />;
}`,
    options: [
      { id: "a", text: "Marca actualizaciones de baja prioridad que pueden interrumpirse para mantener la UI responsive" },
      { id: "b", text: "Ejecuta código después de que termina la transición CSS" },
      { id: "c", text: "Previene re-renders durante la escritura" },
      { id: "d", text: "Es un alias de setTimeout" }
    ],
    correctAnswer: "a",
    explanation: "useTransition permite marcar actualizaciones como 'transiciones' (baja prioridad). React puede interrumpir estas actualizaciones para procesar eventos urgentes (escribir en input). Mantiene la UI responsive incluso con operaciones costosas. isPending indica si la transición está en progreso."
  },
  {
    id: 44,
    title: "React Fragments - Short Syntax",
    category: "React Hooks",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál de estos usos de Fragment es INVÁLIDO?",
    code: `import { Fragment } from 'react';

// Opción A
<Fragment>
  <td>Cell 1</td>
  <td>Cell 2</td>
</Fragment>

// Opción B
<>
  <td>Cell 1</td>
  <td>Cell 2</td>
</>

// Opción C
<Fragment key={item.id}>
  <td>{item.name}</td>
  <td>{item.age}</td>
</Fragment>

// Opción D
<> key={item.id}>
  <td>{item.name}</td>
  <td>{item.age}</td>
</>`,
    options: [
      { id: "a", text: "Opción D (sintaxis corta no acepta props como key)" },
      { id: "b", text: "Opción B (sintaxis corta es inválida)" },
      { id: "c", text: "Opción A (Fragment no existe)" },
      { id: "d", text: "Todas son válidas" }
    ],
    correctAnswer: "a",
    explanation: "La sintaxis corta <></> no puede recibir props ni key. Si necesitas pasar key (por ejemplo en listas), debes usar <Fragment key={...}>. El resto de las opciones son válidas: Fragment importado, sintaxis corta sin props, y Fragment con key."
  },
  {
    id: 45,
    title: "React.forwardRef - Referencias avanzadas",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué problema soluciona forwardRef?",
    code: `import { useRef, forwardRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} className="fancy" />;
});

function Form() {
  const inputRef = useRef();
  
  const handleFocus = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </>
  );
}`,
    options: [
      { id: "a", text: "Permite que componentes funcionales reciban refs y las pasen a elementos DOM internos" },
      { id: "b", text: "Crea refs automáticas sin useRef" },
      { id: "c", text: "Previene memory leaks con refs" },
      { id: "d", text: "Solo funciona con class components" }
    ],
    correctAnswer: "a",
    explanation: "forwardRef permite que un componente funcional reciba una ref como segundo parámetro y la pase a un elemento hijo. Sin forwardRef, los componentes funcionales no pueden recibir refs directamente (recibirías un warning). Es esencial para librerías de componentes que exponen refs."
  },
  {
    id: 46,
    title: "useDeferredValue - Performance",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuándo usar useDeferredValue vs useTransition?",
    code: `import { useState, useDeferredValue, useTransition } from 'react';

// Opción A: useDeferredValue
const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// Opción B: useTransition
const [query, setQuery] = useState('');
const [isPending, startTransition] = useTransition();
const handleChange = (e) => {
  startTransition(() => setQuery(e.target.value));
};`,
    options: [
      { id: "a", text: "useDeferredValue cuando NO controlas el update; useTransition cuando SÍ controlas el setState" },
      { id: "b", text: "Son idénticos, usa cualquiera" },
      { id: "c", text: "useDeferredValue para números, useTransition para strings" },
      { id: "d", text: "useDeferredValue es legacy, siempre usa useTransition" }
    ],
    correctAnswer: "a",
    explanation: "useDeferredValue: cuando recibes un valor de props o de un estado que NO controlas, y quieres diferir su uso en un componente costoso. useTransition: cuando SÍ controlas el setState y quieres marcar ESA actualización como de baja prioridad. Ambos mejoran performance diferentemente."
  },
  {
    id: 47,
    title: "useImperativeHandle - API personalizada",
    category: "React Hooks",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué expone VideoPlayer a través de su ref?",
    code: `import { useRef, useImperativeHandle, forwardRef } from 'react';

const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();
  
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    currentTime: () => videoRef.current.currentTime
  }));
  
  return <video ref={videoRef} {...props} />;
});

function App() {
  const playerRef = useRef();
  
  return (
    <>
      <VideoPlayer ref={playerRef} />
      <button onClick={() => playerRef.current.play()}>
        Play
      </button>
    </>
  );
}`,
    options: [
      { id: "a", text: "Una API personalizada con solo play, pause y currentTime" },
      { id: "b", text: "El elemento video completo con todos sus métodos" },
      { id: "c", text: "Error: no puedes usar forwardRef con useImperativeHandle" },
      { id: "d", text: "undefined (useImperativeHandle bloquea la ref)" }
    ],
    correctAnswer: "a",
    explanation: "useImperativeHandle permite personalizar el valor que se expone a través de la ref. En lugar de exponer el elemento video completo, solo exponemos métodos específicos (play, pause, currentTime). Útil para crear APIs limpias en componentes reutilizables y encapsular implementación interna."
  },
  {
    id: 48,
    title: "useId - IDs únicos en SSR",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Para qué sirve useId en React 18+?",
    code: `import { useId } from 'react';

function FormField({ label }) {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}`,
    options: [
      { id: "a", text: "Genera IDs únicos y estables que son consistentes entre servidor (SSR) y cliente" },
      { id: "b", text: "Reemplaza useRef para generar IDs" },
      { id: "c", text: "Solo funciona en client-side" },
      { id: "d", text: "Genera UUIDs aleatorios en cada render" }
    ],
    correctAnswer: "a",
    explanation: "useId genera IDs únicos que son ESTABLES entre SSR y cliente (evitando hydration mismatches). Es perfecto para accesibilidad (htmlFor, aria-describedby) y elementos relacionados. NO lo uses para keys en listas. En cada render del mismo componente genera el mismo ID."
  },
  {
    id: 49,
    title: "React 18 - Automatic Batching",
    category: "React Hooks",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuántos re-renders ocurren en React 18 al hacer click?",
    code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  console.log('Render');
  
  const handleClick = () => {
    fetch('/api/data').then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      setCount(c => c + 1);
    });
  };
  
  return <button onClick={handleClick}>Update</button>;
}`,
    options: [
      { id: "a", text: "1 re-render (React 18 hace batching automático incluso en promesas)" },
      { id: "b", text: "3 re-renders (uno por cada setState)" },
      { id: "c", text: "2 re-renders" },
      { id: "d", text: "0 re-renders (el batching lo previene todo)" }
    ],
    correctAnswer: "a",
    explanation: "React 18 introdujo 'Automatic Batching' que agrupa múltiples actualizaciones de estado en un solo re-render, incluso en callbacks asíncronos (promises, setTimeout, event listeners nativos). En React 17 serían 3 re-renders. Si por alguna razón necesitas evitar batching, usa flushSync."
  },
  // ============= NEXT.JS - Preguntas (50-69) =============
  {
    id: 50,
    title: "Next.js - getServerSideProps vs getStaticProps",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo se ejecuta getServerSideProps?",
    code: `export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data }
  };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}`,
    options: [
      { id: "a", text: "En cada request del usuario (server-side runtime)" },
      { id: "b", text: "Solo en build time" },
      { id: "c", text: "En el cliente después del primer render" },
      { id: "d", text: "Solo cuando usas next export" }
    ],
    correctAnswer: "a",
    explanation: "getServerSideProps se ejecuta en CADA request del usuario en el servidor. La página se genera dinámicamente para cada petición. Usa getStaticProps si los datos no cambian frecuentemente (se genera en build time y se sirve como HTML estático)."
  },
  {
    id: 51,
    title: "Next.js - Dynamic Routes",
    category: "Next.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo accedes al parámetro 'id' en la ruta /posts/[id].js?",
    code: `// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  // ¿Cómo obtengo el id?
  
  return <div>Post ID: ???</div>;
}`,
    options: [
      { id: "a", text: "router.query.id" },
      { id: "b", text: "router.params.id" },
      { id: "c", text: "router.id" },
      { id: "d", text: "window.location.params.id" }
    ],
    correctAnswer: "a",
    explanation: "En Next.js, los parámetros de rutas dinámicas están disponibles en router.query. Para /posts/[id].js, accedes con router.query.id. También puedes obtenerlos en getServerSideProps o getStaticProps a través de context.params.id."
  },
  {
    id: 52,
    title: "Next.js - API Routes",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué devuelve este API route cuando haces POST /api/users?",
    code: `// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    res.status(200).json({ id: 1, name });
  } else {
    res.status(405).end();
  }
}`,
    options: [
      { id: "a", text: "405 Method Not Allowed (falta configurar bodyParser)" },
      { id: "b", text: "{ id: 1, name: undefined } porque req.body requiere middleware" },
      { id: "c", text: "{ id: 1, name: <valor enviado> } funciona automáticamente" },
      { id: "d", text: "Error: Cannot read body" }
    ],
    correctAnswer: "c",
    explanation: "Next.js automáticamente parsea req.body para API routes. No necesitas configurar body-parser manualmente. Para JSON, Next.js lo parsea por defecto. Si necesitas cambiar el comportamiento, puedes configurar config.api.bodyParser en la ruta."
  },
  {
    id: 53,
    title: "Next.js - Image Optimization",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el beneficio principal de usar next/image vs <img>?",
    code: `import Image from 'next/image';

// Opción A
<Image 
  src="/photo.jpg"
  width={500}
  height={300}
  alt="Photo"
/>

// Opción B
<img 
  src="/photo.jpg"
  width="500"
  height="300"
  alt="Photo"
/>`,
    options: [
      { id: "a", text: "next/image optimiza automáticamente imágenes (resize, lazy load, WebP) y previene CLS" },
      { id: "b", text: "next/image es solo un alias de <img>" },
      { id: "c", text: "Solo funciona con imágenes externas" },
      { id: "d", text: "No hay diferencia en producción" }
    ],
    correctAnswer: "a",
    explanation: "next/image proporciona optimización automática: lazy loading, responsive images, formatos modernos (WebP/AVIF), previene Cumulative Layout Shift, y genera múltiples tamaños. Las imágenes se optimizan on-demand en el servidor. Mejora significativamente el performance."
  },
  {
    id: 54,
    title: "Next.js - getStaticPaths",
    category: "Next.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace fallback: 'blocking' en getStaticPaths?",
    code: `export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: 'blocking'
  };
}

// Usuario visita /posts/999`,
    options: [
      { id: "a", text: "Genera la página 999 on-demand en el servidor (SSR style) y luego la cachea como estática" },
      { id: "b", text: "Muestra 404 porque 999 no está en paths" },
      { id: "c", text: "Muestra una página de loading mientras genera en cliente" },
      { id: "d", text: "Error: Invalid path" }
    ],
    correctAnswer: "a",
    explanation: "fallback: 'blocking' hace que Next.js genere la página en el servidor la primera vez que se solicita (como SSR). El usuario espera (blocking) hasta que la página está lista, luego Next.js la cachea como página estática. Útil para muchas rutas dinámicas sin pre-generar todas en build."
  },
  {
    id: 55,
    title: "Next.js - Middleware",
    category: "Next.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Dónde se ejecuta el middleware de Next.js?",
    code: `// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
};`,
    options: [
      { id: "a", text: "En el Edge Runtime (antes de que la request llegue a las páginas)" },
      { id: "b", text: "En el cliente después del router" },
      { id: "c", text: "En Node.js server junto con getServerSideProps" },
      { id: "d", text: "Solo en build time" }
    ],
    correctAnswer: "a",
    explanation: "El middleware de Next.js se ejecuta en el Edge Runtime (Vercel Edge Network o similar). Corre ANTES de que la request complete, permitiendo modificar la respuesta, hacer redirects, reescribir URLs. Es más rápido que SSR porque no necesita Lambda/Node.js completo."
  },
  {
    id: 56,
    title: "Next.js - App Router vs Pages Router",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre app/ y pages/ directory?",
    code: `// Pages Router (tradicional)
// pages/posts/[id].js
export async function getServerSideProps() {}

// App Router (Next.js 13+)
// app/posts/[id]/page.js
export default async function Page() {
  const data = await fetch(...);
}`,
    options: [
      { id: "a", text: "App Router usa React Server Components, permite async en componentes y tiene mejor layouts" },
      { id: "b", text: "No hay diferencia, solo nombre diferente" },
      { id: "c", text: "App Router solo funciona en desarrollo" },
      { id: "d", text: "Pages Router es más moderno que App Router" }
    ],
    correctAnswer: "a",
    explanation: "App Router (Next.js 13+) introduce React Server Components, permite componentes async, mejora el sistema de layouts compartidos, y usa un modelo de data fetching más simple. Pages Router es el sistema tradicional con getServerSideProps/getStaticProps. Puedes usar ambos en el mismo proyecto."
  },
  {
    id: 57,
    title: "Next.js - Revalidate (ISR)",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Con revalidate: 60, ¿cuándo se regenera la página?",
    code: `export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60
  };
}`,
    options: [
      { id: "a", text: "Cada 60 segundos, pero solo cuando hay una nueva request después del intervalo" },
      { id: "b", text: "Exactamente cada 60 segundos, automáticamente" },
      { id: "c", text: "Solo se regenera si haces redeploy" },
      { id: "d", text: "Se regenera en cada request" }
    ],
    correctAnswer: "a",
    explanation: "Con ISR (Incremental Static Regeneration) y revalidate: 60, la página estática se sirve normalmente. Después de 60 segundos, la SIGUIENTE request dispara una regeneración en background. Esa request aún ve la versión anterior, pero las requests subsecuentes ven la nueva versión. Es 'stale-while-revalidate'."
  },
  {
    id: 58,
    title: "Next.js - Custom _app.js",
    category: "Next.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Para qué sirve pages/_app.js?",
    code: `// pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}`,
    options: [
      { id: "a", text: "Envuelve todas las páginas, útil para layouts globales, estado compartido, y persistir componentes" },
      { id: "b", text: "Solo se usa para la homepage" },
      { id: "c", text: "Es el punto de entrada del servidor" },
      { id: "d", text: "Reemplaza a index.js" }
    ],
    correctAnswer: "a",
    explanation: "_app.js es el componente raíz que envuelve todas las páginas. Se ejecuta en cada navegación. Úsalo para: layouts globales, Context Providers, CSS globals, persistir estado entre páginas. Component es la página actual y pageProps son sus props de getServerSideProps/getStaticProps."
  },
  {
    id: 59,
    title: "Next.js - Custom _document.js",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre _app.js y _document.js?",
    code: `// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`,
    options: [
      { id: "a", text: "_document modifica <html> y <body>, solo se ejecuta en servidor; _app envuelve Component, se ejecuta en cliente y servidor" },
      { id: "b", text: "Son lo mismo, usa cualquiera" },
      { id: "c", text: "_document es para estilos, _app es para lógica" },
      { id: "d", text: "_document solo funciona en producción" }
    ],
    correctAnswer: "a",
    explanation: "_document modifica el HTML inicial del servidor (<html>, <head>, <body>). Solo se ejecuta en servidor y no tiene acceso a navegación. _app es el wrapper de tu aplicación React, se ejecuta en cada navegación en cliente/servidor. Usa _document para: meta tags globales, lang, fuentes, scripts externos."
  },
  {
    id: 60,
    title: "Next.js - Head Component",
    category: "Next.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo añades meta tags específicos a una página en Next.js?",
    code: `import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="About page" />
      </Head>
      <div>Content</div>
    </>
  );
}`,
    options: [
      { id: "a", text: "Usando el componente <Head> de next/head en cada página" },
      { id: "b", text: "Solo se puede hacer en _document.js" },
      { id: "c", text: "No es posible, Next.js usa meta tags globales" },
      { id: "d", text: "Usando document.title" }
    ],
    correctAnswer: "a",
    explanation: "Usa el componente <Head> de next/head para agregar elementos al <head> por página. Next.js deduplica tags automáticamente. Si múltiples páginas tienen el mismo tag, el más específico (de la página actual) toma prioridad. Útil para SEO dinámico."
  },
  {
    id: 61,
    title: "Next.js - Environment Variables",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo expones variables de entorno al navegador en Next.js?",
    code: `// .env.local
DATABASE_URL=postgres://...
NEXT_PUBLIC_API_URL=https://api.example.com

// En tu componente
export default function Component() {
  console.log(process.env.DATABASE_URL);
  console.log(process.env.NEXT_PUBLIC_API_URL);
}`,
    options: [
      { id: "a", text: "Solo variables con prefijo NEXT_PUBLIC_ están disponibles en el navegador" },
      { id: "b", text: "Todas las variables están disponibles automáticamente" },
      { id: "c", text: "Ninguna variable está disponible en cliente" },
      { id: "d", text: "Debes usar window.env" }
    ],
    correctAnswer: "a",
    explanation: "Next.js solo expone variables con prefijo NEXT_PUBLIC_ al navegador. DATABASE_URL solo está disponible en servidor (getServerSideProps, API routes). NEXT_PUBLIC_API_URL está disponible en cliente y servidor. Esto previene exponer secretos accidentalmente en el bundle del cliente."
  },
  {
    id: 62,
    title: "Next.js - Link Prefetching",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace el componente Link por defecto?",
    code: `import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}`,
    options: [
      { id: "a", text: "Prefetchea las páginas en el viewport automáticamente (en producción)" },
      { id: "b", text: "Solo hace client-side routing sin prefetch" },
      { id: "c", text: "Hace full page refresh" },
      { id: "d", text: "Descarga todas las páginas en mount" }
    ],
    correctAnswer: "a",
    explanation: "Next.js Link automáticamente prefetchea las páginas linkadas cuando aparecen en el viewport (en producción). Cuando el usuario hace click, la página ya está cargada, resultando en navegación instantánea. Puedes desactivarlo con prefetch={false}."
  },
  {
    id: 63,
    title: "Next.js - Script Component",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué estrategia de carga usa strategy='lazyOnload'?",
    code: `import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/analytics.js"
        strategy="lazyOnload"
      />
      <div>Content</div>
    </>
  );
}`,
    options: [
      { id: "a", text: "Carga el script después de que la página está idle (bajo prioridad)" },
      { id: "b", text: "Carga el script inmediatamente antes del contenido" },
      { id: "c", text: "Bloquea el render hasta que carga" },
      { id: "d", text: "Solo carga en producción" }
    ],
    correctAnswer: "a",
    explanation: "strategy='lazyOnload' carga el script durante el idle time del navegador, después de que la página está interactiva. Es perfecto para scripts no críticos (analytics, ads). Otras opciones: 'beforeInteractive' (antes de hidratación), 'afterInteractive' (después de hidratación)."
  },
  {
    id: 64,
    title: "Next.js - Shallow Routing",
    category: "Next.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace shallow routing?",
    code: `import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  
  const handleFilter = () => {
    router.push('/posts?filter=new', undefined, { shallow: true });
  };
  
  return <button onClick={handleFilter}>Filter</button>;
}`,
    options: [
      { id: "a", text: "Cambia la URL sin ejecutar getServerSideProps/getStaticProps" },
      { id: "b", text: "Hace full page reload sin cache" },
      { id: "c", text: "Solo funciona con rutas estáticas" },
      { id: "d", text: "No cambia la URL visible" }
    ],
    correctAnswer: "a",
    explanation: "Shallow routing permite cambiar la URL (útil para filtros, tabs) sin ejecutar los data fetching methods (getServerSideProps/getStaticProps) nuevamente. El componente recibe las nuevas query params vía router.query. Solo funciona para la misma página, no para navegación entre páginas."
  },
  {
    id: 65,
    title: "Next.js - Static Site Generation",
    category: "Next.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál método usas para SSG (Static Site Generation)?",
    code: `// Opción A
export async function getServerSideProps() {
  return { props: { data } };
}

// Opción B
export async function getStaticProps() {
  return { props: { data } };
}

// Opción C
export async function getInitialProps() {
  return { data };
}`,
    options: [
      { id: "a", text: "getStaticProps (genera en build time)" },
      { id: "b", text: "getServerSideProps (genera en cada request)" },
      { id: "c", text: "getInitialProps (legacy, no recomendado)" },
      { id: "d", text: "Todas generan páginas estáticas" }
    ],
    correctAnswer: "a",
    explanation: "getStaticProps genera páginas estáticas en build time. Es el más rápido porque las páginas se sirven como HTML estático desde CDN. getServerSideProps es SSR (genera en cada request). getInitialProps es legacy. Para sitios con contenido que no cambia frecuentemente, usa getStaticProps + ISR."
  },
  {
    id: 66,
    title: "Next.js - notFound in getStaticProps",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace notFound: true en getStaticProps?",
    code: `export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  
  if (!post) {
    return {
      notFound: true
    };
  }
  
  return {
    props: { post }
  };
}`,
    options: [
      { id: "a", text: "Devuelve un 404 status y muestra la página pages/404.js" },
      { id: "b", text: "Redirige a la homepage" },
      { id: "c", text: "Lanza un error" },
      { id: "d", text: "Muestra la página en blanco" }
    ],
    correctAnswer: "a",
    explanation: "notFound: true hace que Next.js devuelva un status 404 y muestre tu página personalizada 404.js. Es útil cuando los datos no existen. También puedes usar redirect: { destination: '/', permanent: false } para redirigir en lugar de 404."
  },
  {
    id: 67,
    title: "Next.js - Preview Mode",
    category: "Next.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve Preview Mode?",
    code: `// pages/api/preview.js
export default async function handler(req, res) {
  res.setPreviewData({ user: 'admin' });
  res.redirect(req.query.slug);
}

// pages/posts/[id].js
export async function getStaticProps({ preview, previewData }) {
  const data = preview
    ? await getDraftPost(previewData)
    : await getPublishedPost();
  
  return { props: { data } };
}`,
    options: [
      { id: "a", text: "Permite ver contenido draft/unpublished sin rebuild, útil con CMS headless" },
      { id: "b", text: "Es un modo de desarrollo avanzado" },
      { id: "c", text: "Solo funciona en producción" },
      { id: "d", text: "Previene el caching de páginas" }
    ],
    correctAnswer: "a",
    explanation: "Preview Mode permite ver contenido draft en páginas estáticas sin hacer rebuild completo. Bypassa SSG temporalmente para esa sesión. Perfecto para CMS headless (Contentful, Strapi) donde editores necesitan preview de drafts. Se activa con setPreviewData() en un API route."
  },
  {
    id: 68,
    title: "Next.js - Trailing Slash",
    category: "Next.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo forzar trailing slashes en las URLs (ejemplo.com/about/)?",
    code: `// next.config.js
module.exports = {
  // ¿Qué configuración?
}`,
    options: [
      { id: "a", text: "trailingSlash: true" },
      { id: "b", text: "forceSlash: true" },
      { id: "c", text: "urls: { trailing: true }" },
      { id: "d", text: "No es posible configurar" }
    ],
    correctAnswer: "a",
    explanation: "Usa trailingSlash: true en next.config.js para agregar slash final a todas las URLs. Sin esta config, Next.js usa URLs sin trailing slash por defecto. Importante para SEO: elige uno y sé consistente (con o sin slash) para evitar contenido duplicado."
  },
  {
    id: 69,
    title: "Next.js - Basepath Configuration",
    category: "Next.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Para qué sirve basePath en next.config.js?",
    code: `// next.config.js
module.exports = {
  basePath: '/docs'
}

// Tu app ahora se sirve en:
// ejemplo.com/docs/ en vez de ejemplo.com/`,
    options: [
      { id: "a", text: "Permite desplegar Next.js en un subpath (ej: example.com/docs/)" },
      { id: "b", text: "Cambia el dominio principal" },
      { id: "c", text: "Solo afecta las API routes" },
      { id: "d", text: "Es solo para desarrollo" }
    ],
    correctAnswer: "a",
    explanation: "basePath permite servir tu app Next.js en un subpath. Útil cuando no controlas el root domain (ej: company.com es otra app y quieres Next.js en company.com/blog). Next.js automáticamente prefija todas las rutas, Links e imports con el basePath."
  },
  // ============= NESTJS - Preguntas (70-89) =============
  {
    id: 70,
    title: "NestJS - Decoradores básicos",
    category: "NestJS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué decorador usas para crear un endpoint POST?",
    code: `@Controller('users')
export class UsersController {
  // ¿Qué decorador para POST /users?
  createUser(@Body() createUserDto: CreateUserDto) {
    return 'User created';
  }
}`,
    options: [
      { id: "a", text: "@Post()" },
      { id: "b", text: "@HttpPost()" },
      { id: "c", text: "@PostMapping()" },
      { id: "d", text: "@Route('POST')" }
    ],
    correctAnswer: "a",
    explanation: "Usa @Post() para endpoints POST en NestJS. Otros decoradores HTTP: @Get(), @Put(), @Patch(), @Delete(). Puedes agregar la ruta: @Post(':id') o @Get('profile'). Se combina con la ruta del @Controller."
  },
  {
    id: 71,
    title: "NestJS - Dependency Injection",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo inyectas un servicio en un controlador?",
    code: `@Injectable()
export class UsersService {
  getUsers() {
    return ['Alice', 'Bob'];
  }
}

@Controller('users')
export class UsersController {
  // ¿Cómo inyectar UsersService?
}`,
    options: [
      { id: "a", text: "constructor(private readonly usersService: UsersService) {}" },
      { id: "b", text: "@Inject() private usersService: UsersService" },
      { id: "c", text: "this.usersService = new UsersService()" },
      { id: "d", text: "UsersService.inject(this)" }
    ],
    correctAnswer: "a",
    explanation: "NestJS usa inyección de dependencias por constructor. TypeScript con 'private readonly' automáticamente crea una propiedad de clase. El servicio debe estar en los providers del módulo. NestJS resuelve las dependencias automáticamente."
  },
  {
    id: 72,
    title: "NestJS - Pipes para validación",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace ValidationPipe en este código?",
    code: `// main.ts
app.useGlobalPipes(new ValidationPipe());

// DTO
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email: string;
}

// Controller
@Post()
createUser(@Body() dto: CreateUserDto) {
  return dto;
}`,
    options: [
      { id: "a", text: "Valida automáticamente el body contra el DTO usando class-validator" },
      { id: "b", text: "Solo transforma los tipos" },
      { id: "c", text: "Es solo para logging" },
      { id: "d", text: "No hace nada sin configuración adicional" }
    ],
    correctAnswer: "a",
    explanation: "ValidationPipe valida automáticamente el request body usando decoradores de class-validator en tu DTO. Si la validación falla, devuelve un 400 Bad Request con los errores. Opciones útiles: whitelist: true (remueve props no declaradas), transform: true (transforma plain objects a instancias de DTO)."
  },
  {
    id: 73,
    title: "NestJS - Guards",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuándo se ejecutan los Guards?",
    code: `@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !!request.headers.authorization;
  }
}

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  @Get()
  getDashboard() {
    return 'Dashboard';
  }
}`,
    options: [
      { id: "a", text: "Después de Middlewares y Interceptors (before), antes del handler" },
      { id: "b", text: "Antes de todos los middlewares" },
      { id: "c", text: "Solo después del handler" },
      { id: "d", text: "En paralelo con el handler" }
    ],
    correctAnswer: "a",
    explanation: "Orden de ejecución en NestJS: Middleware -> Guards -> Interceptors (before) -> Pipes -> Controller Handler -> Interceptors (after) -> Exception Filters. Guards determinan si el request puede proceder, son perfectos para autenticación/autorización. Retornan boolean o Promise<boolean>."
  },
  {
    id: 74,
    title: "NestJS - Interceptors",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué puede hacer un Interceptor?",
    code: `@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(\`After... \${Date.now() - now}ms\`))
    );
  }
}`,
    options: [
      { id: "a", text: "Ejecutar lógica antes y después del handler, transformar la respuesta, manejar errores" },
      { id: "b", text: "Solo validar datos" },
      { id: "c", text: "Solo para logging" },
      { id: "d", text: "Solo bloquear requests" }
    ],
    correctAnswer: "a",
    explanation: "Interceptors pueden: ejecutar lógica antes/después del handler, transformar el resultado o excepciones, extender comportamiento, medir tiempo de ejecución. Usan RxJS porque next.handle() devuelve un Observable. Son como middleware pero con más poder sobre la respuesta."
  },
  {
    id: 75,
    title: "NestJS - Exception Filters",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace @Catch(HttpException)?",
    code: `@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString()
    });
  }
}`,
    options: [
      { id: "a", text: "Captura excepciones HttpException y personaliza la respuesta de error" },
      { id: "b", text: "Previene que las excepciones se lancen" },
      { id: "c", text: "Solo loga errores" },
      { id: "d", text: "Valida el response" }
    ],
    correctAnswer: "a",
    explanation: "Exception Filters capturan excepciones y personalizan la respuesta de error. @Catch(HttpException) captura solo HttpException. @Catch() sin argumentos captura todas las excepciones. Úsalos para: formato consistente de errores, logging, integración con servicios de monitoreo."
  },
  {
    id: 76,
    title: "NestJS - Módulos",
    category: "NestJS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo haces que un servicio esté disponible en otros módulos?",
    code: `@Module({
  providers: [UsersService],
  // ¿Qué falta para exportar UsersService?
})
export class UsersModule {}`,
    options: [
      { id: "a", text: "Agregarlo a exports: [UsersService]" },
      { id: "b", text: "Usar @Global() en UsersService" },
      { id: "c", text: "Está disponible automáticamente" },
      { id: "d", text: "Usar @Public() en el módulo" }
    ],
    correctAnswer: "a",
    explanation: "Para que un servicio esté disponible en otros módulos, debes: 1) Declararlo en providers del módulo. 2) Exportarlo en exports. 3) Importar el módulo en otros módulos que lo necesiten. Si quieres que esté disponible globalmente sin importar, usa @Global() en el módulo (no recomendado para la mayoría de casos)."
  },
  {
    id: 77,
    title: "NestJS - Custom Providers",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace este custom provider?",
    code: `@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        return await createConnection();
      }
    }
  ]
})
export class AppModule {}

// En un servicio
constructor(@Inject('DATABASE_CONNECTION') private db: Connection) {}`,
    options: [
      { id: "a", text: "Crea un provider usando una factory function, útil para configuración asíncrona" },
      { id: "b", text: "Solo es un alias de clase" },
      { id: "c", text: "Es un error, no es sintaxis válida" },
      { id: "d", text: "Solo funciona con strings" }
    ],
    correctAnswer: "a",
    explanation: "Custom providers con useFactory permiten lógica asíncrona o condicional en la creación. Otros tipos: useValue (valor constante), useClass (clase alternativa), useExisting (alias). Usa @Inject('TOKEN') para inyectar providers con string/symbol tokens en lugar de clases."
  },
  {
    id: 78,
    title: "NestJS - Lifecycle Hooks",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo se ejecuta onModuleInit?",
    code: `@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('Module initialized');
  }
}`,
    options: [
      { id: "a", text: "Una vez que las dependencias del módulo están resueltas" },
      { id: "b", text: "En cada request" },
      { id: "c", text: "Solo en producción" },
      { id: "d", text: "Antes de que el constructor se ejecute" }
    ],
    correctAnswer: "a",
    explanation: "Lifecycle hooks de NestJS: onModuleInit (cuando el módulo está inicializado), onApplicationBootstrap (cuando la app está lista), onModuleDestroy (antes de destruir módulo), beforeApplicationShutdown, onApplicationShutdown. Útiles para: inicializar conexiones, cleanup, warmup de cache."
  },
  {
    id: 79,
    title: "NestJS - ConfigModule",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo accedes a variables de entorno con ConfigModule?",
    code: `// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot()
  ]
})

// En un servicio
export class AppService {
  constructor(private configService: ConfigService) {}
  
  getDbUrl() {
    return // ¿Cómo obtener DATABASE_URL del .env?
  }
}`,
    options: [
      { id: "a", text: "this.configService.get<string>('DATABASE_URL')" },
      { id: "b", text: "process.env.DATABASE_URL directamente" },
      { id: "c", text: "this.env.DATABASE_URL" },
      { id: "d", text: "No es posible, usa dotenv manual" }
    ],
    correctAnswer: "a",
    explanation: "ConfigService de @nestjs/config proporciona acceso type-safe a env variables. Ventajas vs process.env: validación con Joi, namespaces, configuración jerárquica, valores por defecto. ConfigModule.forRoot() carga .env automáticamente. Usa get<T>('KEY', defaultValue) para acceder."
  },
  {
    id: 80,
    title: "NestJS - Async Configuration",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve registerAsync en módulos dinámicos?",
    code: `@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
      }),
      inject: [ConfigService]
    })
  ]
})`,
    options: [
      { id: "a", text: "Permite configurar módulos con dependencias inyectadas (ConfigService, etc.)" },
      { id: "b", text: "Solo hace la inicialización más lenta" },
      { id: "c", text: "Es lo mismo que forRoot pero con async/await" },
      { id: "d", text: "Solo funciona con TypeORM" }
    ],
    correctAnswer: "a",
    explanation: "registerAsync/forRootAsync permite configurar módulos dinámicos con acceso a otros providers (ConfigService, etc.). useFactory recibe las dependencias especificadas en inject. Alternativas: useClass (factory class), useExisting. Patrón común en NestJS para módulos que necesitan configuración externa."
  },
  {
    id: 81,
    title: "NestJS - Swagger Documentation",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo documentas un endpoint en Swagger?",
    code: `@Controller('users')
@ApiTags('users')
export class UsersController {
  // ¿Cómo documentar este POST?
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return 'User created';
  }
}`,
    options: [
      { id: "a", text: "Usar decoradores como @ApiOperation(), @ApiResponse(), @ApiBody()" },
      { id: "b", text: "Swagger genera todo automáticamente sin decoradores" },
      { id: "c", text: "Escribir docs en JSON separado" },
      { id: "d", text: "No es posible documentar en NestJS" }
    ],
    correctAnswer: "a",
    explanation: "NestJS con @nestjs/swagger permite documentar APIs con decoradores: @ApiOperation() (descripción), @ApiResponse() (respuestas), @ApiBody() (body), @ApiParam() (params), @ApiQuery() (query params). Los DTOs con decoradores de class-validator se documentan automáticamente. Swagger UI se sirve en /api."
  },
  {
    id: 82,
    title: "NestJS - Request Scoped Providers",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué significa Scope.REQUEST?",
    code: `@Injectable({ scope: Scope.REQUEST })
export class LoggerService {
  constructor() {
    console.log('LoggerService created');
  }
}`,
    options: [
      { id: "a", text: "Se crea una nueva instancia por cada request HTTP (no singleton)" },
      { id: "b", text: "Se crea solo en el primer request" },
      { id: "c", text: "Es más eficiente que DEFAULT scope" },
      { id: "d", text: "Solo funciona con GraphQL" }
    ],
    correctAnswer: "a",
    explanation: "Scope.REQUEST crea una nueva instancia del provider para cada request. Por defecto, NestJS usa Scope.DEFAULT (singleton). REQUEST scope es útil para: logging con request ID, multi-tenancy, request-specific configuration. Desventaja: menor performance. Otros scopes: TRANSIENT (nueva instancia por inyección)."
  },
  {
    id: 83,
    title: "NestJS - Database con TypeORM",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo defines una relación One-to-Many en TypeORM?",
    code: `@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  // Usuario tiene muchos posts
  // ¿Cómo definir la relación?
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  
  // Post pertenece a un usuario
  // ¿Cómo definir la relación?
}`,
    options: [
      { id: "a", text: "@OneToMany(() => Post, post => post.user) en User, @ManyToOne(() => User, user => user.posts) en Post" },
      { id: "b", text: "@Relation('posts') en User" },
      { id: "c", text: "@ForeignKey() en Post" },
      { id: "d", text: "No se pueden definir relaciones en TypeORM" }
    ],
    correctAnswer: "a",
    explanation: "TypeORM usa decoradores para relaciones: @OneToMany/@ManyToOne (1:N), @OneToOne (1:1), @ManyToMany (N:M). La función arrow () => Entity evita circular dependencies. El segundo argumento es la propiedad inversa. Agrega @JoinColumn() al lado del FK. Usa eager: true para cargar automáticamente."
  },
  {
    id: 84,
    title: "NestJS - Task Scheduling",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo ejecutas una tarea cada 10 segundos?",
    code: `@Injectable()
export class TasksService {
  // ¿Qué decorador para ejecutar cada 10 segundos?
  handleCron() {
    console.log('Task executed');
  }
}`,
    options: [
      { id: "a", text: "@Cron(CronExpression.EVERY_10_SECONDS) o @Interval(10000)" },
      { id: "b", text: "@Schedule('10s')" },
      { id: "c", text: "@Every(10)" },
      { id: "d", text: "No es posible, usa setInterval manual" }
    ],
    correctAnswer: "a",
    explanation: "@nestjs/schedule proporciona: @Cron() (cron expressions), @Interval() (intervalos en ms), @Timeout() (una sola vez después de X ms). Requiere ScheduleModule.forRoot(). Útil para: cleanup jobs, notificaciones periódicas, sincronización de datos, reports automáticos."
  },
  {
    id: 85,
    title: "NestJS - File Upload",
    category: "NestJS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo manejas file uploads en NestJS?",
    code: `@Controller('upload')
export class UploadController {
  @Post()
  // ¿Qué decoradores?
  uploadFile(/* ¿Qué parámetro? */) {
    return 'File uploaded';
  }
}`,
    options: [
      { id: "a", text: "@UseInterceptors(FileInterceptor('file')) y @UploadedFile() file: Express.Multer.File" },
      { id: "b", text: "@Body() file: File" },
      { id: "c", text: "@File() upload" },
      { id: "d", text: "No soporta file uploads" }
    ],
    correctAnswer: "a",
    explanation: "NestJS usa Multer para file uploads: @UseInterceptors(FileInterceptor('fieldName')) para un archivo, FilesInterceptor() para múltiples, FileFieldsInterceptor() para múltiples campos. Accede con @UploadedFile() o @UploadedFiles(). Puedes validar tamaño/tipo con ParseFilePipe."
  },
  {
    id: 86,
    title: "NestJS - Passport Authentication",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo implementas JWT authentication con Passport?",
    code: `@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY'
    });
  }
  
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

// ¿Cómo proteger una ruta?`,
    options: [
      { id: "a", text: "@UseGuards(AuthGuard('jwt')) en el controlador o método" },
      { id: "b", text: "@Auth() en el método" },
      { id: "c", text: "@Protected() en el controlador" },
      { id: "d", text: "Automáticamente protege todas las rutas" }
    ],
    correctAnswer: "a",
    explanation: "@nestjs/passport integra Passport.js. Proceso: 1) Crear Strategy extendiendo PassportStrategy. 2) Implementar validate() que retorna el user. 3) Registrar en módulo. 4) Usar @UseGuards(AuthGuard('jwt')) en rutas protegidas. El user estará disponible en @Request().user. Puedes crear custom guards extendiendo AuthGuard."
  },
  {
    id: 87,
    title: "NestJS - WebSockets",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo creas un WebSocket Gateway?",
    code: `// ¿Qué decoradores?
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  // ¿Cómo escuchar el evento 'message'?
  handleMessage(client: Socket, payload: string) {
    this.server.emit('message', payload);
  }
}`,
    options: [
      { id: "a", text: "@WebSocketGateway() en la clase, @SubscribeMessage('message') en el método" },
      { id: "b", text: "@Socket() en la clase, @On('message') en el método" },
      { id: "c", text: "@Gateway() y @Listen('message')" },
      { id: "d", text: "NestJS no soporta WebSockets" }
    ],
    correctAnswer: "a",
    explanation: "@WebSocketGateway() crea un gateway (por defecto usa Socket.io). @SubscribeMessage('event') escucha eventos. @WebSocketServer() inyecta el servidor para emitir. @MessageBody() y @ConnectedSocket() extraen datos. Puedes usar adapters para WS nativo o ws library. Soporta guards, pipes, interceptors."
  },
  {
    id: 88,
    title: "NestJS - GraphQL Resolver",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo defines un resolver GraphQL en NestJS?",
    code: `// ¿Qué decoradores?
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  
  // Query: users
  getUsers() {
    return this.usersService.findAll();
  }
  
  // Mutation: createUser
  createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}`,
    options: [
      { id: "a", text: "@Resolver() en la clase, @Query() y @Mutation() en los métodos" },
      { id: "b", text: "@GraphQL() en la clase, @Q() y @M() en métodos" },
      { id: "c", text: "@GQL() y @Operation()" },
      { id: "d", text: "No soporta GraphQL" }
    ],
    correctAnswer: "a",
    explanation: "@nestjs/graphql integra GraphQL: @Resolver() define resolver, @Query() y @Mutation() definen operaciones. @Args() extrae argumentos. Usa GraphQLModule.forRoot() con Code First (TypeScript classes) o Schema First (.graphql files). Soporta subscriptions con @Subscription()."
  },
  {
    id: 89,
    title: "NestJS - Microservices",
    category: "NestJS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo comunicas dos microservicios NestJS?",
    code: `// Microservicio
@MessagePattern({ cmd: 'get_user' })
async getUser(data: { id: number }) {
  return this.usersService.findOne(data.id);
}

// Cliente
// ¿Cómo llamar al microservicio?`,
    options: [
      { id: "a", text: "Inyectar ClientProxy y usar send() o emit()" },
      { id: "b", text: "Hacer HTTP request normal" },
      { id: "c", text: "Usar @Call() decorator" },
      { id: "d", text: "No soporta microservices" }
    ],
    correctAnswer: "a",
    explanation: "NestJS soporta microservices con varios transportes (TCP, Redis, NATS, MQTT, gRPC, Kafka). Microservicio: @MessagePattern() o @EventPattern(). Cliente: inyecta ClientProxy, usa send() (request-response) o emit() (event-based). Configura transport en main.ts con createMicroservice(). Puedes tener hybrid apps (HTTP + microservicio)."
  },
  // ============= GIT - Preguntas (90-109) =============
  {
    id: 90,
    title: "Git - Cherry Pick",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace git cherry-pick abc123?",
    code: `# Situación
# main:     A - B - C
# feature:  A - B - D - E - F

git checkout main
git cherry-pick F

# ¿Resultado?`,
    options: [
      { id: "a", text: "Copia el commit F a main como un nuevo commit" },
      { id: "b", text: "Mueve el commit F de feature a main" },
      { id: "c", text: "Hace merge de toda la rama feature" },
      { id: "d", text: "Borra el commit F de feature" }
    ],
    correctAnswer: "a",
    explanation: "git cherry-pick <commit> aplica los cambios de ese commit específico a tu rama actual como un NUEVO commit (nuevo hash). El commit original permanece en su rama. Útil para: aplicar hotfixes específicos, portar features entre ramas sin hacer merge completo. Puede causar conflictos."
  },
  {
    id: 91,
    title: "Git - Stash",
    category: "Git",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Para qué sirve git stash?",
    code: `# Tienes cambios sin commit
git status
# modified: file.txt

git stash

# ¿Qué pasó con los cambios?`,
    options: [
      { id: "a", text: "Los guarda temporalmente y limpia el working directory" },
      { id: "b", text: "Los elimina permanentemente" },
      { id: "c", text: "Hace commit automático" },
      { id: "d", text: "Los mueve a otra rama" }
    ],
    correctAnswer: "a",
    explanation: "git stash guarda cambios temporalmente (working directory y staging) sin hacer commit. Útil para cambiar de rama rápidamente. Comandos: git stash (guardar), git stash list (listar), git stash pop (aplicar y borrar último), git stash apply (aplicar sin borrar). Puedes stashear múltiples cambios."
  },
  {
    id: 92,
    title: "Git - Interactive Rebase",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué opciones tienes en git rebase -i?",
    code: `git rebase -i HEAD~3

# Editor muestra:
# pick abc123 Commit 1
# pick def456 Commit 2
# pick ghi789 Commit 3

# ¿Qué comandos puedes usar?`,
    options: [
      { id: "a", text: "pick (mantener), reword (cambiar mensaje), squash (fusionar), edit (editar), drop (eliminar)" },
      { id: "b", text: "Solo pick y drop" },
      { id: "c", text: "Solo reword" },
      { id: "d", text: "Solo se pueden reordenar" }
    ],
    correctAnswer: "a",
    explanation: "git rebase -i (interactive) permite: pick (mantener), reword (cambiar mensaje sin cambiar contenido), edit (pausar para editar commit), squash (fusionar con anterior, combinar mensajes), fixup (fusionar con anterior, descartar mensaje), drop (eliminar commit). También puedes reordenar commits cambiando el orden de las líneas."
  },
  {
    id: 93,
    title: "Git - Reset vs Revert",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre git reset y git revert?",
    code: `# Historial: A - B - C - D (HEAD)

# Opción 1: git reset --hard C
# Opción 2: git revert D`,
    options: [
      { id: "a", text: "reset borra commits del historial (reescribe historial), revert crea un nuevo commit que deshace cambios" },
      { id: "b", text: "Son lo mismo" },
      { id: "c", text: "reset es más seguro que revert" },
      { id: "d", text: "revert solo funciona con merges" }
    ],
    correctAnswer: "a",
    explanation: "git reset reescribe el historial (peligroso en ramas compartidas): --soft (mantiene cambios staged), --mixed (mantiene cambios unstaged), --hard (borra todo). git revert crea un NUEVO commit que deshace los cambios de un commit específico (seguro para ramas públicas). Para ramas compartidas, siempre usa revert."
  },
  {
    id: 94,
    title: "Git - Merge Conflicts",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo resuelves un conflicto de merge?",
    code: `git merge feature

# CONFLICT in file.txt:
<<<<<<< HEAD
console.log('main version');
=======
console.log('feature version');
>>>>>>> feature

# ¿Qué hacer?`,
    options: [
      { id: "a", text: "Editar el archivo, elegir la versión correcta, git add file.txt, git commit" },
      { id: "b", text: "git merge --abort siempre" },
      { id: "c", text: "Borrar el archivo y crearlo de nuevo" },
      { id: "d", text: "git resolve file.txt" }
    ],
    correctAnswer: "a",
    explanation: "Resolver conflictos: 1) Edita el archivo, elimina los markers (<<<<, ====, >>>>), elige/combina el código correcto. 2) git add para marcar como resuelto. 3) git commit para completar el merge. Herramientas: git mergetool, VSCode/IDE con merge editor. git merge --abort cancela todo el merge."
  },
  {
    id: 95,
    title: "Git - Bisect",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve git bisect?",
    code: `git bisect start
git bisect bad  # commit actual es malo
git bisect good abc123  # este commit era bueno

# Git hace checkout a un commit intermedio
# Pruebas el código
git bisect good  # o bad

# ¿Qué hace Git?`,
    options: [
      { id: "a", text: "Busca binariamente el commit que introdujo el bug, reduciendo commits a revisar logarítmicamente" },
      { id: "b", text: "Hace diff entre dos commits" },
      { id: "c", text: "Borra commits malos" },
      { id: "d", text: "Divide la rama en dos" }
    ],
    correctAnswer: "a",
    explanation: "git bisect usa búsqueda binaria para encontrar qué commit introdujo un bug. Divide el rango por la mitad en cada paso, reduciendo O(n) a O(log n). Puedes automatizar con git bisect run <script> que retorna exit code 0 (good) o 1 (bad). Extremadamente útil en historiales largos."
  },
  {
    id: 96,
    title: "Git - Git Hooks",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Dónde defines un hook pre-commit?",
    code: `# ¿Dónde crear el script?
#!/bin/sh
npm run lint
npm test

# Si alguno falla, previene el commit`,
    options: [
      { id: "a", text: ".git/hooks/pre-commit (ejecutable, sin extensión)" },
      { id: "b", text: ".githooks/pre-commit.sh" },
      { id: "c", text: "package.json en scripts.precommit" },
      { id: "d", text: ".git/config" }
    ],
    correctAnswer: "a",
    explanation: "Git hooks están en .git/hooks/: pre-commit (antes de commit), commit-msg (validar mensaje), pre-push (antes de push), post-merge, etc. Deben ser ejecutables (chmod +x) y sin extensión. Limitación: .git/ no se commitea, usa herramientas como Husky para compartir hooks en el repo."
  },
  {
    id: 97,
    title: "Git - Fetch vs Pull",
    category: "Git",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia entre git fetch y git pull?",
    code: `# Opción 1
git fetch origin

# Opción 2
git pull origin main`,
    options: [
      { id: "a", text: "fetch descarga cambios sin aplicarlos, pull descarga y hace merge automático" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "fetch solo funciona con tags" },
      { id: "d", text: "pull es más rápido" }
    ],
    correctAnswer: "a",
    explanation: "git fetch descarga commits/refs del remoto pero NO los aplica a tu rama local (actualiza origin/main). Seguro para revisar cambios. git pull = git fetch + git merge (o rebase con --rebase). fetch te permite revisar cambios antes de integrarlos. Buena práctica: fetch primero, revisar, luego merge/rebase manual."
  },
  {
    id: 98,
    title: "Git - Remote Branches",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo eliminas una rama remota?",
    code: `# Borraste la rama local
git branch -d feature

# ¿Cómo borrar en remoto?`,
    options: [
      { id: "a", text: "git push origin --delete feature o git push origin :feature" },
      { id: "b", text: "git delete origin/feature" },
      { id: "c", text: "git branch -dr origin/feature" },
      { id: "d", text: "No se puede borrar ramas remotas" }
    ],
    correctAnswer: "a",
    explanation: "Para borrar ramas remotas: git push origin --delete <branch> (forma moderna) o git push origin :<branch> (sintaxis legacy, 'push nada a branch'). Para limpiar referencias obsoletas localmente: git remote prune origin o git fetch --prune. git branch -d solo borra localmente."
  },
  {
    id: 99,
    title: "Git - Amend Commit",
    category: "Git",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué hace git commit --amend?",
    code: `git add forgotten-file.txt
git commit --amend --no-edit

# ¿Qué pasa?`,
    options: [
      { id: "a", text: "Modifica el último commit agregando los cambios staged, sin cambiar el mensaje" },
      { id: "b", text: "Crea un nuevo commit separado" },
      { id: "c", text: "Solo cambia el mensaje del commit" },
      { id: "d", text: "Borra el último commit" }
    ],
    correctAnswer: "a",
    explanation: "git commit --amend reemplaza el último commit con uno nuevo que incluye los cambios staged. --no-edit mantiene el mensaje original, sin --no-edit abre el editor. NUNCA uses --amend en commits ya pusheados (reescribe historial). Es perfecto para: olvidaste un archivo, typo en el código, cambiar mensaje."
  },
  {
    id: 100,
    title: "Git - Tags",
    category: "Git",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo creas un tag anotado para una release?",
    code: `# Release v1.0.0
# ¿Qué comando?`,
    options: [
      { id: "a", text: "git tag -a v1.0.0 -m 'Release 1.0.0'" },
      { id: "b", text: "git tag v1.0.0" },
      { id: "c", text: "git release v1.0.0" },
      { id: "d", text: "git commit -t v1.0.0" }
    ],
    correctAnswer: "a",
    explanation: "Tags anotados (-a): incluyen autor, fecha, mensaje (recomendados para releases). Tags ligeros: solo un pointer a un commit. Comandos: git tag -a v1.0.0 -m 'msg' (anotado), git tag v1.0.0 (ligero), git push origin v1.0.0 (pushear tag), git push --tags (pushear todos). Listar: git tag."
  },
  {
    id: 101,
    title: "Git - Submodules",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirven los submodules?",
    code: `git submodule add https://github.com/user/lib.git libs/lib

# ¿Qué crea esto?`,
    options: [
      { id: "a", text: "Incluye otro repo Git dentro de tu repo, manteniendo su propio historial" },
      { id: "b", text: "Copia el código del otro repo" },
      { id: "c", text: "Crea un symlink al otro repo" },
      { id: "d", text: "Hace fork del repo" }
    ],
    correctAnswer: "a",
    explanation: "Submodules permiten incluir otros repos Git como subdirectorios. Tu repo guarda el commit específico del submodule. Comandos: git submodule add <url>, git submodule update --init (clonar), git submodule update --remote (actualizar). Alternativas más simples: Git Subtree, npm/package managers."
  },
  {
    id: 102,
    title: "Git - Blame",
    category: "Git",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué muestra git blame?",
    code: `git blame src/app.js

# ¿Qué información ves?`,
    options: [
      { id: "a", text: "Quién modificó cada línea, en qué commit y cuándo" },
      { id: "b", text: "Los commits de todo el repositorio" },
      { id: "c", text: "Los errores en el archivo" },
      { id: "d", text: "El diff del último commit" }
    ],
    correctAnswer: "a",
    explanation: "git blame <file> muestra quién modificó cada línea por última vez, el commit hash, fecha. Útil para entender el contexto de código y encontrar al autor para preguntas. Opciones: -L 10,20 (líneas específicas), -w (ignora whitespace), -C (detecta código movido entre archivos). No es para 'culpar', es para entender historial."
  },
  {
    id: 103,
    title: "Git - Clean",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace git clean -fd?",
    code: `git status
# Untracked files:
#   temp/
#   debug.log

git clean -fd

# ¿Qué pasa?`,
    options: [
      { id: "a", text: "Elimina archivos y directorios untracked (-f force, -d directories)" },
      { id: "b", text: "Solo lista los archivos a eliminar" },
      { id: "c", text: "Elimina todos los commits" },
      { id: "d", text: "Limpia el historial de Git" }
    ],
    correctAnswer: "a",
    explanation: "git clean elimina archivos untracked: -f (force, requerido), -d (directorios), -n (dry run, solo mostrar), -x (incluir .gitignore files), -i (interactivo). PELIGROSO: elimina permanentemente, no se puede deshacer. Siempre usa -n primero para ver qué se eliminará."
  },
  {
    id: 104,
    title: "Git - Worktrees",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirven los worktrees?",
    code: `git worktree add ../project-feature feature-branch

# ¿Qué permite esto?`,
    options: [
      { id: "a", text: "Tener múltiples branches checked out simultáneamente en diferentes directorios" },
      { id: "b", text: "Clonar el repo múltiples veces" },
      { id: "c", text: "Hacer merge automático" },
      { id: "d", text: "Solo funciona con submodules" }
    ],
    correctAnswer: "a",
    explanation: "Git worktrees permiten tener múltiples ramas checked out al mismo tiempo en diferentes directorios, compartiendo el mismo .git. Útil para: trabajar en feature mientras revisas PR en otra rama, comparar branches side-by-side, CI/CD en paralelo. Comandos: git worktree add, list, remove, prune."
  },
  {
    id: 105,
    title: "Git - Sparse Checkout",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué permite sparse checkout?",
    code: `git sparse-checkout init --cone
git sparse-checkout set src/components

# ¿Qué hace?`,
    options: [
      { id: "a", text: "Clona solo las carpetas/archivos especificados de un repo grande (checkout parcial)" },
      { id: "b", text: "Hace el clone más rápido" },
      { id: "c", text: "Solo funciona con LFS" },
      { id: "d", text: "Comprime el repositorio" }
    ],
    correctAnswer: "a",
    explanation: "Sparse checkout permite trabajar con solo una parte del árbol de archivos en repos grandes (monorepos). Solo los archivos especificados se extraen al working directory. Cone mode (--cone) es más eficiente. Combinado con partial clone (--filter=blob:none), puedes clonar repos enormes rápidamente descargando solo lo necesario."
  },
  {
    id: 106,
    title: "Git - Force Push Safely",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la forma segura de force push?",
    code: `# Reescribiste historial local
git rebase -i HEAD~3

# ¿Cómo hacer force push de forma segura?`,
    options: [
      { id: "a", text: "git push --force-with-lease (previene sobrescribir cambios de otros)" },
      { id: "b", text: "git push --force siempre" },
      { id: "c", text: "git push -f" },
      { id: "d", text: "Nunca hacer force push" }
    ],
    correctAnswer: "a",
    explanation: "--force-with-lease solo sobrescribe si el remoto está en el estado que esperas (tu último fetch). Si alguien pusheó mientras tanto, falla y te protege de sobrescribir su trabajo. --force ignora todo y sobrescribe. Usa --force-with-lease para branches de features donde colaboras, nunca force push a main/master."
  },
  {
    id: 107,
    title: "Git - Squash Merge",
    category: "Git",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace git merge --squash?",
    code: `# Feature branch tiene commits: A, B, C, D
git checkout main
git merge --squash feature

# ¿Qué pasa?`,
    options: [
      { id: "a", text: "Combina todos los commits de feature en uno solo en main (sin crear merge commit)" },
      { id: "b", text: "Hace merge normal con todos los commits" },
      { id: "c", text: "Borra la rama feature" },
      { id: "d", text: "Error: --squash no es válido" }
    ],
    correctAnswer: "a",
    explanation: "--squash toma todos los cambios de la rama y los deja staged como un solo commit (debes hacer commit manual). Resulta en historial lineal limpio. Comparación: merge normal (mantiene todos los commits + merge commit), squash (un commit), rebase (mantiene commits pero los replay). Popular en GitHub PRs para limpiar historiales."
  },
  {
    id: 108,
    title: "Git - Reflog Expiration",
    category: "Git",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Por cuánto tiempo Git mantiene commits 'perdidos' en reflog?",
    code: `git reflog

# ¿Cuánto tiempo antes de que Git haga garbage collection?`,
    options: [
      { id: "a", text: "~30 días para commits unreachable, ~90 días para commits reachable" },
      { id: "b", text: "Forever, nunca se borran" },
      { id: "c", text: "24 horas" },
      { id: "d", text: "Hasta el próximo reboot" }
    ],
    correctAnswer: "a",
    explanation: "Git reflog mantiene historial de movimientos de HEAD/branches. Por defecto: commits unreachable (no en ninguna rama) ~30 días (gc.reflogExpireUnreachable), reachable ~90 días (gc.reflogExpire). Git garbage collection (git gc) limpia automáticamente. Puedes recuperar commits 'perdidos' dentro de esta ventana con git reflog -> git reset/checkout."
  },
  {
    id: 109,
    title: "Git - Diff Tools",
    category: "Git",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo ves diferencias entre dos commits?",
    code: `# Commits: A - B - C - D

# ¿Cómo ver cambios entre B y D?`,
    options: [
      { id: "a", text: "git diff B D o git diff B..D" },
      { id: "b", text: "git compare B D" },
      { id: "c", text: "git show B D" },
      { id: "d", text: "git log B D" }
    ],
    correctAnswer: "a",
    explanation: "git diff <commit1> <commit2> muestra diferencias. Variantes: git diff (working vs staging), git diff HEAD (working vs último commit), git diff --cached (staging vs último commit), git diff branch1..branch2 (entre ramas). Opciones: --stat (resumen), --name-only (solo nombres), -- <file> (archivo específico)."
  },
  // ============= CSS - Preguntas (110-129) =============
  {
    id: 110,
    title: "CSS - Position Sticky",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo funciona position: sticky?",
    code: `.header {
  position: sticky;
  top: 0;
  background: white;
}`,
    options: [
      { id: "a", text: "Se comporta como relative hasta que cruza un threshold, luego como fixed" },
      { id: "b", text: "Es lo mismo que position: fixed" },
      { id: "c", text: "Solo funciona con z-index alto" },
      { id: "d", text: "No es una propiedad válida" }
    ],
    correctAnswer: "a",
    explanation: "position: sticky es híbrido: se comporta como relative hasta que el elemento alcanza el umbral especificado (top, bottom, left, right) durante el scroll, entonces actúa como fixed. El elemento queda 'pegado' en esa posición. Requiere especificar al menos uno de top/bottom/left/right. No necesita JavaScript."
  },
  {
    id: 111,
    title: "CSS - Z-index y Stacking Context",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Por qué el div con z-index: 100 está detrás del div con z-index: 1?",
    code: `<div class="parent1" style="position: relative; z-index: 1;">
  <div class="child1" style="position: absolute; z-index: 100;">
    Child 1
  </div>
</div>

<div class="parent2" style="position: relative; z-index: 2;">
  <div class="child2" style="position: absolute; z-index: 1;">
    Child 2
  </div>
</div>`,
    options: [
      { id: "a", text: "Porque parent2 crea un stacking context con z-index más alto que parent1" },
      { id: "b", text: "Es un bug del navegador" },
      { id: "c", text: "z-index no funciona con position: absolute" },
      { id: "d", text: "Child1 debería estar adelante porque tiene z-index mayor" }
    ],
    correctAnswer: "a",
    explanation: "Elementos posicionados crean un nuevo stacking context. El z-index de los hijos SOLO compite dentro de su stacking context padre. Parent2 (z-index: 2) está sobre Parent1 (z-index: 1), entonces TODO en parent2, incluso con z-index:1, está sobre TODO en parent1, incluso con z-index:100."
  },
  {
    id: 112,
    title: "CSS - CSS Variables (Custom Properties)",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo usas CSS variables?",
    code: `:root {
  --primary-color: #3498db;
  --spacing: 16px;
}

.button {
  /* ¿Cómo usar la variable? */
  background: ???;
  padding: ???;
}`,
    options: [
      { id: "a", text: "var(--primary-color) y var(--spacing)" },
      { id: "b", text: "$primary-color y $spacing" },
      { id: "c", text: "get(--primary-color)" },
      { id: "d", text: "No se pueden usar variables en CSS" }
    ],
    correctAnswer: "a",
    explanation: "CSS Custom Properties usan sintaxis --nombre en definición y var(--nombre) para usar. Se definen comúnmente en :root para alcance global. Ventajas sobre Sass: son dinámicas (se pueden cambiar con JavaScript), heredan en cascada, funcionan en DevTools. Puedes usar valores por defecto: var(--color, blue)."
  },
  {
    id: 113,
    title: "CSS - Grid Template Areas",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace grid-template-areas?",
    code: `.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }`,
    options: [
      { id: "a", text: "Define un layout visual con nombres de áreas, muy legible" },
      { id: "b", text: "Es lo mismo que grid-template-columns" },
      { id: "c", text: "Solo funciona con flexbox" },
      { id: "d", text: "Define el orden de los elementos" }
    ],
    correctAnswer: "a",
    explanation: "grid-template-areas permite definir el layout usando nombres de áreas en ASCII art. Cada string es una fila, cada palabra es una celda. Los elementos usan grid-area para posicionarse. Muy legible y mantenible. Usa '.' para celdas vacías. Perfecto para layouts complejos responsive."
  },
  {
    id: 114,
    title: "CSS - Pseudo-elementos ::before y ::after",
    category: "CSS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué se necesita para que ::before y ::after se muestren?",
    code: `.icon::before {
  /* ¿Qué falta? */
  width: 20px;
  height: 20px;
  background: blue;
}`,
    options: [
      { id: "a", text: "Propiedad content (aunque sea vacía: content: '')" },
      { id: "b", text: "Solo display: block" },
      { id: "c", text: "Se muestran automáticamente" },
      { id: "d", text: "visibility: visible" }
    ],
    correctAnswer: "a",
    explanation: "::before y ::after REQUIEREN la propiedad content para renderizarse, aunque sea vacía (content: ''). Son elementos inline por defecto. Útiles para íconos decorativos, clearfix, tooltips. No añaden contenido al DOM (no son accesibles), solo visual. Usa :: para pseudo-elementos (::before) y : para pseudo-clases (:hover)."
  },
  {
    id: 115,
    title: "CSS - Media Queries",
    category: "CSS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cómo aplicas estilos solo en mobile (max 768px)?",
    code: `/* ¿Qué media query? */
.container {
  /* estilos mobile */
}`,
    options: [
      { id: "a", text: "@media (max-width: 768px) { .container { ... } }" },
      { id: "b", text: "@mobile { .container { ... } }" },
      { id: "c", text: "@screen (mobile) { .container { ... } }" },
      { id: "d", text: ".container@mobile { ... }" }
    ],
    correctAnswer: "a",
    explanation: "Media queries usan @media (condición) { estilos }. max-width: pantalla máxima (mobile-first), min-width: pantalla mínima (desktop-first). Otras features: orientation (portrait/landscape), hover (detecta touch devices), prefers-color-scheme (dark mode). Puedes combinar: @media (min-width: 768px) and (max-width: 1024px)."
  },
  {
    id: 116,
    title: "CSS - Calc() function",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace calc() en CSS?",
    code: `.container {
  width: calc(100% - 40px);
  padding: calc(1rem + 5px);
  height: calc(100vh - 60px);
}`,
    options: [
      { id: "a", text: "Permite cálculos matemáticos mezclando unidades diferentes" },
      { id: "b", text: "Solo funciona con porcentajes" },
      { id: "c", text: "Es sintaxis de Sass, no CSS" },
      { id: "d", text: "Solo funciona en width" }
    ],
    correctAnswer: "a",
    explanation: "calc() permite operaciones matemáticas (+, -, *, /) mezclando diferentes unidades (%, px, rem, vh, etc.). Útil para: ancho menos padding fijo, altura de viewport menos header. Requiere espacios alrededor de + y -: calc(100% - 20px), no calc(100%-20px). Funciona en cualquier propiedad numérica."
  },
  {
    id: 117,
    title: "CSS - Transform vs Transition",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre transform y transition?",
    code: `.box {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.box:hover {
  transform: rotate(90deg);
}`,
    options: [
      { id: "a", text: "transform cambia la apariencia (rotate, scale, translate), transition anima cambios de propiedades" },
      { id: "b", text: "Son lo mismo" },
      { id: "c", text: "transform es más lento que transition" },
      { id: "d", text: "transition reemplaza a transform" }
    ],
    correctAnswer: "a",
    explanation: "transform aplica transformaciones visuales 2D/3D (translate, rotate, scale, skew) sin afectar el layout. transition anima cambios de propiedades CSS suavemente. Se complementan: transform hace el cambio, transition lo anima. Transform es GPU-accelerated (rápido). Para animaciones complejas, usa @keyframes + animation."
  },
  {
    id: 118,
    title: "CSS - Viewport Units",
    category: "CSS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué significa 'vh' en CSS?",
    code: `.hero {
  height: 100vh;
  width: 50vw;
}`,
    options: [
      { id: "a", text: "vh = 1% del viewport height, vw = 1% del viewport width" },
      { id: "b", text: "vh = very high, vw = very wide" },
      { id: "c", text: "Son unidades inválidas" },
      { id: "d", text: "Solo funcionan en mobile" }
    ],
    correctAnswer: "a",
    explanation: "Viewport units: vh (viewport height), vw (viewport width), vmin (menor de vw/vh), vmax (mayor de vw/vh). 100vh = altura completa de viewport, útil para heroes/secciones fullscreen. Cuidado en mobile: 100vh incluye la barra de navegación del browser. Para textos responsive: font-size: calc(16px + 1vw)."
  },
  {
    id: 119,
    title: "CSS - Aspect Ratio",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo mantienes un aspect ratio 16:9?",
    code: `.video-container {
  /* ¿Cómo mantener 16:9? */
}`,
    options: [
      { id: "a", text: "aspect-ratio: 16 / 9 (CSS moderno) o padding-top: 56.25% (técnica legacy)" },
      { id: "b", text: "width: 16; height: 9;" },
      { id: "c", text: "ratio: 16:9;" },
      { id: "d", text: "No es posible en CSS" }
    ],
    correctAnswer: "a",
    explanation: "CSS moderno: aspect-ratio: 16 / 9 (soportado desde ~2021). Técnica legacy: padding-top en % (relativo al width) crea el ratio: 56.25% = (9/16)*100. Útil para videos, images, placeholders. aspect-ratio funciona con width o height, mantiene el otro proporcional."
  },
  {
    id: 120,
    title: "CSS - Object-fit",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace object-fit: cover?",
    code: `<img 
  src="photo.jpg"
  style="width: 300px; height: 200px; object-fit: cover;"
/>`,
    options: [
      { id: "a", text: "Escala la imagen para cubrir el contenedor, recortando si es necesario (mantiene aspect ratio)" },
      { id: "b", text: "Estira la imagen para llenar el contenedor (distorsiona)" },
      { id: "c", text: "Repite la imagen como pattern" },
      { id: "d", text: "No hace nada" }
    ],
    correctAnswer: "a",
    explanation: "object-fit controla cómo una imagen/video se ajusta a su contenedor: cover (llena, puede recortar), contain (cabe completo, puede dejar espacios), fill (estira, default), none (tamaño original), scale-down (el menor entre none o contain). Usa object-position para controlar qué parte mostrar al recortar."
  },
  {
    id: 121,
    title: "CSS - Flexbox Gap",
    category: "CSS",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Para qué sirve la propiedad gap en flexbox?",
    code: `.container {
  display: flex;
  gap: 20px;
}`,
    options: [
      { id: "a", text: "Crea espaciado entre elementos flex sin usar margin" },
      { id: "b", text: "Solo funciona en grid" },
      { id: "c", text: "Es lo mismo que padding" },
      { id: "d", text: "Cambia el flex-direction" }
    ],
    correctAnswer: "a",
    explanation: "gap (antes solo en Grid) ahora funciona en Flexbox (desde ~2021). Crea espacios entre elementos sin margin hacky. gap: 20px (uniforme) o gap: 20px 10px (row-gap column-gap). Más limpio que margin porque no necesitas :last-child para quitar el margin final. También funciona en Grid."
  },
  {
    id: 122,
    title: "CSS - Contain y Content-visibility",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué optimización proporciona content-visibility: auto?",
    code: `.article {
  content-visibility: auto;
  contain-intrinsic-size: 500px;
}`,
    options: [
      { id: "a", text: "El navegador skip renderizado de contenido fuera del viewport, mejorando performance" },
      { id: "b", text: "Hace el contenido invisible permanentemente" },
      { id: "c", text: "Solo funciona con imágenes" },
      { id: "d", text: "Es lo mismo que display: none" }
    ],
    correctAnswer: "a",
    explanation: "content-visibility: auto permite al navegador saltarse el layout/paint de contenido off-screen, acelerando el render inicial dramáticamente (especialmente en páginas largas). contain-intrinsic-size da un tamaño placeholder para mantener scrollbar estable. Útil para feeds infinitos, artículos largos."
  },
  {
    id: 123,
    title: "CSS - Clamp() function",
    category: "CSS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace clamp(16px, 2vw, 24px)?",
    code: `h1 {
  font-size: clamp(16px, 2vw, 24px);
}`,
    options: [
      { id: "a", text: "Tamaño mínimo 16px, preferido 2vw, máximo 24px (responsive sin media queries)" },
      { id: "b", text: "Siempre usa 2vw" },
      { id: "c", text: "Alterna entre los tres valores" },
      { id: "d", text: "Es sintaxis inválida" }
    ],
    correctAnswer: "a",
    explanation: "clamp(MIN, IDEAL, MAX) establece un valor fluido con límites: usa IDEAL si está entre MIN y MAX, sino usa el límite. Perfecto para typography responsive sin media queries. Ejemplo: clamp(1rem, 2.5vw, 2rem) escala con viewport pero nunca demasiado pequeño o grande. También funciona para margins, paddings, etc."
  },
  {
    id: 124,
    title: "CSS - Scroll Snap",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace scroll-snap-type: x mandatory?",
    code: `.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.item {
  scroll-snap-align: center;
}`,
    options: [
      { id: "a", text: "Fuerza el scroll a detenerse en posiciones específicas (snap points) en eje X" },
      { id: "b", text: "Previene el scroll horizontal" },
      { id: "c", text: "Solo funciona en vertical" },
      { id: "d", text: "Es lo mismo que overflow: scroll" }
    ],
    correctAnswer: "a",
    explanation: "CSS Scroll Snap crea experiencias de scroll controladas sin JavaScript. scroll-snap-type: x mandatory (horizontal, siempre snap) o y proximity (vertical, snap si cerca). scroll-snap-align: start/center/end define dónde snapea. Perfecto para carousels, galleries, páginas tipo 'slides'. Soporta scroll suave nativo."
  },
  {
    id: 125,
    title: "CSS - :is() y :where()",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuál es la diferencia entre :is() y :where()?",
    code: `/* Opción A */
:is(header, main, footer) p {
  color: blue;
}

/* Opción B */
:where(header, main, footer) p {
  color: blue;
}`,
    options: [
      { id: "a", text: ":is() tiene la especificidad del selector más específico de la lista, :where() siempre especificidad 0" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: ":is() es más rápido que :where()" },
      { id: "d", text: ":where() no es CSS válido" }
    ],
    correctAnswer: "a",
    explanation: ":is() y :where() agrupan selectores, evitando repetición. Diferencia: :is() toma la especificidad del selector más específico de su lista. :where() SIEMPRE tiene especificidad 0, perfecto para estilos base fáciles de sobrescribir. :is(.class, #id) tiene especificidad de ID, :where(.class, #id) tiene especificidad 0."
  },
  {
    id: 126,
    title: "CSS - Container Queries",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué permiten las Container Queries (@container)?",
    code: `.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}`,
    options: [
      { id: "a", text: "Aplican estilos basados en el tamaño del contenedor padre, no del viewport" },
      { id: "b", text: "Es lo mismo que media queries" },
      { id: "c", text: "Solo funciona con grid" },
      { id: "d", text: "Aún no es CSS estándar" }
    ],
    correctAnswer: "a",
    explanation: "Container Queries (CSS ~2023) aplican estilos según el tamaño del CONTENEDOR, no el viewport. Revolucionario para componentes truly responsive. Define contenedor con container-type: inline-size (width), luego @container (min-width: 400px) aplica cuando ESE contenedor >= 400px. Perfecto para design systems modulares."
  },
  {
    id: 127,
    title: "CSS - Cascade Layers (@layer)",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirven las Cascade Layers?",
    code: `@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer utilities {
  .text-center { text-align: center; }
}`,
    options: [
      { id: "a", text: "Controlan el orden de cascada independiente de especificidad, mejorando arquitectura CSS" },
      { id: "b", text: "Solo son comentarios organizacionales" },
      { id: "c", text: "Reemplazan a !important" },
      { id: "d", text: "Son exclusivos de Sass" }
    ],
    correctAnswer: "a",
    explanation: "@layer (CSS ~2022) permite organizar CSS en capas con precedencia explícita, independiente de especificidad/orden. Layers posteriores ganan sobre anteriores. Útil para: organizar reset < base < themes < utilities, evitar guerras de especificidad. Unlayered CSS (sin @layer) siempre gana, permitiendo overrides. Revoluciona arquitectura CSS."
  },
  {
    id: 128,
    title: "CSS - Subgrid",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué permite subgrid en CSS Grid?",
    code: `.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.child {
  display: grid;
  grid-template-columns: subgrid;
}`,
    options: [
      { id: "a", text: "El hijo hereda las tracks del grid padre, permitiendo alineación de contenido anidado" },
      { id: "b", text: "Crea un grid más pequeño" },
      { id: "c", text: "Es lo mismo que nested grids normales" },
      { id: "d", text: "No es CSS válido" }
    ],
    correctAnswer: "a",
    explanation: "subgrid (CSS ~2023, Firefox primero) permite que un elemento grid hijo use las tracks del padre. Soluciona el problema clásico de 'nested grids': mantener alineación entre cards con contenido de diferente altura. El hijo participa en el grid del padre, perfecto para layouts complejos como card grids con headers/footers alineados."
  },
  {
    id: 129,
    title: "CSS - Has() Selector (Parent Selector)",
    category: "CSS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace el :has() selector?",
    code: `.card:has(img) {
  padding: 0;
}

.form:has(:invalid) {
  border: 2px solid red;
}`,
    options: [
      { id: "a", text: "Selecciona el padre si contiene un descendiente que cumple la condición (parent selector)" },
      { id: "b", text: "Verifica si un elemento existe en la página" },
      { id: "c", text: "Solo funciona con clases" },
      { id: "d", text: "Aún no está soportado" }
    ],
    correctAnswer: "a",
    explanation: ":has() (CSS ~2023) es el long-awaited 'parent selector'. Selecciona elementos según sus descendientes: .card:has(img) selecciona cards que contienen imágenes. También funciona con siblings: h2:has(+ p) (h2 seguido de p). form:has(:invalid) estila el form si tiene inputs inválidos. Poderoso para estados condicionales sin JavaScript."
  },
  // ============= RELATIONAL DB - Preguntas (130-148) =============
  {
    id: 130,
    title: "SQL - INNER JOIN vs LEFT JOIN",
    category: "Relacional",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia entre INNER JOIN y LEFT JOIN?",
    code: `SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- vs

SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
    options: [
      { id: "a", text: "LEFT JOIN incluye todos los users (con/sin orders), INNER JOIN solo users con orders" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "LEFT JOIN es más lento siempre" },
      { id: "d", text: "INNER JOIN incluye NULL values" }
    ],
    correctAnswer: "a",
    explanation: "INNER JOIN solo retorna filas con matches en ambas tablas. LEFT JOIN retorna TODAS las filas de la tabla izquierda, con NULLs para columnas de la derecha sin match. RIGHT JOIN hace lo opuesto. FULL OUTER JOIN incluye todas las filas de ambas tablas."
  },
  {
    id: 131,
    title: "SQL - Transacciones ACID",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué significa ACID en bases de datos?",
    code: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
    options: [
      { id: "a", text: "Atomicity, Consistency, Isolation, Durability" },
      { id: "b", text: "Automatic, Consistent, Independent, Distributed" },
      { id: "c", text: "Advanced, Cached, Indexed, Distributed" },
      { id: "d", text: "Solo es un acrónimo sin significado técnico" }
    ],
    correctAnswer: "a",
    explanation: "ACID garantiza: Atomicity (todo o nada), Consistency (estado válido siempre), Isolation (transacciones no interfieren), Durability (cambios persisten tras commit). Crítico para operaciones financieras. NoSQL suele sacrificar ACID por escalabilidad (BASE: Basically Available, Soft state, Eventually consistent)."
  },
  {
    id: 132,
    title: "SQL - Índices y Performance",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo NO deberías agregar un índice?",
    code: `-- Tabla con muchos INSERTs/UPDATEs
CREATE TABLE logs (
  id SERIAL,
  message TEXT,
  created_at TIMESTAMP
);

-- ¿Agregar índice en created_at?`,
    options: [
      { id: "a", text: "Si la tabla tiene muchos writes y pocas queries, los índices ralentizan INSERTs/UPDATEs" },
      { id: "b", text: "Siempre agrega índices, no tienen desventajas" },
      { id: "c", text: "Los índices solo funcionan en PKs" },
      { id: "d", text: "Los índices no afectan performance" }
    ],
    correctAnswer: "a",
    explanation: "Índices aceleran SELECTs pero ralentizan INSERTs/UPDATEs/DELETEs (deben actualizar el índice). Trade-off: si tabla es write-heavy con pocas queries, minimiza índices. También ocupan espacio. Usa índices en: foreign keys, columnas en WHERE/JOIN, ORDER BY frecuentes."
  },
  {
    id: 133,
    title: "SQL - Normalización",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué problema soluciona la 3ra Forma Normal (3NF)?",
    code: `-- Tabla NO normalizada
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100),
  customer_city VARCHAR(100),
  product_name VARCHAR(100),
  product_price DECIMAL
);`,
    options: [
      { id: "a", text: "Elimina dependencias transitivas (columnas que dependen de otras no-key)" },
      { id: "b", text: "Solo elimina NULLs" },
      { id: "c", text: "Hace la DB más rápida siempre" },
      { id: "d", text: "No existe 3NF" }
    ],
    correctAnswer: "a",
    explanation: "3NF elimina dependencias transitivas: si customer_city depende de customer_name (no de la PK), debes moverlo a tabla customers separada. Normalización reduce redundancia y anomalías de update. Pero exceso de normalización puede requerir muchos JOINs. A veces denormalizas intencionalmente para performance."
  },
  {
    id: 134,
    title: "SQL - EXPLAIN y Query Optimization",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué te dice EXPLAIN ANALYZE?",
    code: `EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'user@example.com';

-- Result: Seq Scan on users (cost=0..1000 rows=1)`,
    options: [
      { id: "a", text: "Muestra el plan de ejecución y costos, indicando si usa índices o table scans" },
      { id: "b", text: "Solo muestra errores de sintaxis" },
      { id: "c", text: "Ejecuta la query más rápido" },
      { id: "d", text: "Solo funciona en PostgreSQL" }
    ],
    correctAnswer: "a",
    explanation: "EXPLAIN muestra cómo la DB ejecutará la query: Seq Scan (table scan, lento), Index Scan (usa índice, rápido), join methods, costos estimados. ANALYZE también ejecuta y da tiempos reales. 'Seq Scan' en columnas frecuentes indica falta de índice. Herramienta esencial para optimización."
  },
  {
    id: 135,
    title: "SQL - Subqueries vs JOINs",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es generalmente más eficiente?",
    code: `-- Opción A: Subquery
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- Opción B: JOIN
SELECT DISTINCT users.* FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;`,
    options: [
      { id: "a", text: "JOIN suele ser más eficiente, los optimizadores modernos pueden reescribir subqueries pero no siempre" },
      { id: "b", text: "Subqueries siempre son más rápidas" },
      { id: "c", text: "No hay diferencia de performance" },
      { id: "d", text: "Depende solo del tamaño de la tabla" }
    ],
    correctAnswer: "a",
    explanation: "JOINs suelen ser más eficientes porque el optimizador tiene más control. Algunos DBs convierten subqueries a JOINs automáticamente, pero no siempre. EXISTS es mejor que IN para subqueries. Usa EXPLAIN para comparar. Subqueries pueden ser más legibles para lógica compleja."
  },
  {
    id: 136,
    title: "SQL - Window Functions",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace ROW_NUMBER() OVER?",
    code: `SELECT 
  name,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;`,
    options: [
      { id: "a", text: "Asigna un número secuencial a cada fila dentro de cada partición (department)" },
      { id: "b", text: "Cuenta el total de filas" },
      { id: "c", text: "Es lo mismo que COUNT(*)" },
      { id: "d", text: "Solo funciona sin PARTITION BY" }
    ],
    correctAnswer: "a",
    explanation: "Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD) operan sobre 'ventanas' de filas. ROW_NUMBER asigna números únicos. PARTITION BY divide en grupos. Útil para: top N por categoría, running totals, comparar con fila anterior. No colapsa filas como GROUP BY."
  },
  {
    id: 137,
    title: "SQL - Isolation Levels",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué previene SERIALIZABLE isolation level?",
    code: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN;
SELECT * FROM accounts WHERE id = 1;
-- Otra transacción modifica accounts
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
COMMIT;`,
    options: [
      { id: "a", text: "Previene dirty reads, non-repeatable reads y phantom reads (máximo aislamiento)" },
      { id: "b", text: "Solo previene dirty reads" },
      { id: "c", text: "No hace nada especial" },
      { id: "d", text: "Es el nivel por defecto" }
    ],
    correctAnswer: "a",
    explanation: "Isolation levels (menor a mayor aislamiento): READ UNCOMMITTED (permite dirty reads), READ COMMITTED (default, previene dirty reads), REPEATABLE READ (previene non-repeatable reads), SERIALIZABLE (máximo aislamiento, como si transacciones fueran seriales). Mayor aislamiento = menor concurrencia. Trade-off entre consistencia y performance."
  },
  {
    id: 138,
    title: "SQL - HAVING vs WHERE",
    category: "Relacional",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuándo usas HAVING en lugar de WHERE?",
    code: `SELECT department, COUNT(*) as total
FROM employees
-- WHERE o HAVING?
GROUP BY department;`,
    options: [
      { id: "a", text: "HAVING filtra después de GROUP BY (sobre aggregates), WHERE filtra antes" },
      { id: "b", text: "Son intercambiables" },
      { id: "c", text: "HAVING solo funciona sin GROUP BY" },
      { id: "d", text: "WHERE es más lento que HAVING" }
    ],
    correctAnswer: "a",
    explanation: "WHERE filtra filas ANTES de agrupar. HAVING filtra grupos DESPUÉS de GROUP BY. Para filtrar aggregates usa HAVING: HAVING COUNT(*) > 5. Puedes usar ambos: WHERE department != 'IT' ... HAVING COUNT(*) > 5. WHERE no puede usar funciones aggregate."
  },
  {
    id: 139,
    title: "SQL - Deadlocks",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué causa un deadlock?",
    code: `-- Transaction 1
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Transaction 2 (simultánea)
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;
UPDATE accounts SET balance = balance + 50 WHERE id = 1;
COMMIT;`,
    options: [
      { id: "a", text: "Dos transacciones esperan locks mutuamente (circular dependency), causando bloqueo permanente" },
      { id: "b", text: "Es un error de sintaxis SQL" },
      { id: "c", text: "Solo ocurre con INSERTs" },
      { id: "d", text: "No existen deadlocks en SQL" }
    ],
    correctAnswer: "a",
    explanation: "Deadlock: T1 lockea A y espera B, T2 lockea B y espera A (circular wait). La DB detecta y aborta una transacción. Prevención: orden consistente de locks, transacciones cortas, índices apropiados. Algunos DBs tienen deadlock detection automático y retry logic en el driver."
  },
  {
    id: 140,
    title: "SQL - Foreign Keys y Cascades",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace ON DELETE CASCADE?",
    code: `CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

DELETE FROM users WHERE id = 1;`,
    options: [
      { id: "a", text: "Elimina automáticamente todos los orders del user cuando eliminas el user" },
      { id: "b", text: "Previene eliminar el user si tiene orders" },
      { id: "c", text: "No hace nada" },
      { id: "d", text: "Solo funciona con UPDATEs" }
    ],
    correctAnswer: "a",
    explanation: "ON DELETE CASCADE elimina filas dependientes automáticamente. Alternativas: RESTRICT/NO ACTION (previene delete si hay dependientes), SET NULL (pone FK a NULL), SET DEFAULT. También existe ON UPDATE CASCADE para cambios de PK. Útil pero peligroso si no entiendes las cascadas."
  },
  {
    id: 141,
    title: "SQL - UNION vs UNION ALL",
    category: "Relacional",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia entre UNION y UNION ALL?",
    code: `SELECT name FROM customers
UNION
SELECT name FROM suppliers;

-- vs

SELECT name FROM customers
UNION ALL
SELECT name FROM suppliers;`,
    options: [
      { id: "a", text: "UNION elimina duplicados, UNION ALL los mantiene (más rápido)" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "UNION ALL solo funciona con dos tablas" },
      { id: "d", text: "UNION es siempre más rápido" }
    ],
    correctAnswer: "a",
    explanation: "UNION elimina duplicados (implica un DISTINCT costoso). UNION ALL mantiene todos los registros, incluso duplicados, siendo más rápido. Usa UNION ALL cuando sepas que no hay duplicados o cuando los quieres mantener. Las columnas deben coincidir en número y tipos compatibles."
  },
  {
    id: 142,
    title: "SQL - Database Sharding",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es database sharding?",
    code: `// Ejemplo conceptual
// Shard 1: users con id 1-1000000
// Shard 2: users con id 1000001-2000000
// Shard 3: users con id 2000001-3000000`,
    options: [
      { id: "a", text: "Particionamiento horizontal: dividir datos entre múltiples databases/servidores usando una shard key" },
      { id: "b", text: "Es lo mismo que replicación" },
      { id: "c", text: "Solo funciona con NoSQL" },
      { id: "d", text: "Es dividir tablas en columnas" }
    ],
    correctAnswer: "a",
    explanation: "Sharding particiona datos horizontalmente entre múltiples databases. Shard key (ej: user_id % 3) determina qué shard. Ventajas: escala writes, cada shard es más pequeño. Desventajas: complejidad (JOINs cross-shard, transacciones distribuidas difíciles), rebalanceo complicado. Evítalo hasta que realmente lo necesites (>millones de filas)."
  },
  {
    id: 143,
    title: "SQL - Materialized Views",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es una materialized view?",
    code: `CREATE MATERIALIZED VIEW monthly_sales AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  SUM(total) as total_sales
FROM orders
GROUP BY month;

REFRESH MATERIALIZED VIEW monthly_sales;`,
    options: [
      { id: "a", text: "Una view cuyos resultados se almacenan físicamente, requiere refresh manual/programado" },
      { id: "b", text: "Es lo mismo que una view normal" },
      { id: "c", text: "Se actualiza automáticamente siempre" },
      { id: "d", text: "Solo existe en MySQL" }
    ],
    correctAnswer: "a",
    explanation: "Views normales son queries guardadas (ejecutan cada vez). Materialized views ALMACENAN los resultados físicamente. Ventajas: queries complejas pre-computadas, super rápido. Desventajas: datos pueden estar stale, ocupan espacio, requiere REFRESH (manual o scheduled). Úsalas para reports/analytics donde datos recientes perfectos no son críticos."
  },
  {
    id: 144,
    title: "SQL - Database Replication",
    category: "Relacional",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es Master-Slave replication?",
    code: `// Architecture
// Master (write): handles INSERT/UPDATE/DELETE
// Slave 1 (read): replica, handles SELECT
// Slave 2 (read): replica, handles SELECT
// Slave 3 (read): replica, handles SELECT`,
    options: [
      { id: "a", text: "Master maneja writes, Slaves replican y manejan reads, escalando lectura horizontalmente" },
      { id: "b", text: "Todos los servidores manejan writes y reads igualmente" },
      { id: "c", text: "Es backup manual" },
      { id: "d", text: "Solo funciona con MySQL" }
    ],
    correctAnswer: "a",
    explanation: "Replication copia datos del Master a Slaves automáticamente. Master maneja writes, Slaves manejan reads. Ventajas: escala reads, alta disponibilidad, backups sin afectar master. Limitaciones: eventual consistency (replica lag), writes no escalan. Master-Master (multi-master) es más complejo por conflictos."
  },
  {
    id: 145,
    title: "SQL - Connection Pooling",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Por qué necesitas connection pooling?",
    code: `// Sin pool
for (request of requests) {
  const conn = await db.connect();
  await conn.query('SELECT ...');
  await conn.close();
}

// Con pool
const pool = createPool({ max: 10 });
for (request of requests) {
  await pool.query('SELECT ...');
}`,
    options: [
      { id: "a", text: "Reutiliza conexiones en lugar de crear/cerrar cada vez, evitando overhead de handshake TCP/SSL" },
      { id: "b", text: "Solo es para seguridad" },
      { id: "c", text: "Hace las queries más rápidas" },
      { id: "d", text: "No tiene beneficios reales" }
    ],
    correctAnswer: "a",
    explanation: "Crear conexiones DB es costoso (TCP handshake, auth, SSL). Connection pool mantiene conexiones abiertas y las reutiliza. Configura max connections según carga. Muy pocas = bottleneck, demasiadas = sobrecarga DB. Típico: 10-50 para apps web. Crucial para performance en producción."
  },
  {
    id: 146,
    title: "SQL - Stored Procedures",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo usar stored procedures?",
    code: `CREATE PROCEDURE transfer_money(
  from_account INT,
  to_account INT,
  amount DECIMAL
)
BEGIN
  UPDATE accounts SET balance = balance - amount WHERE id = from_account;
  UPDATE accounts SET balance = balance + amount WHERE id = to_account;
END;

CALL transfer_money(1, 2, 100);`,
    options: [
      { id: "a", text: "Para lógica compleja en DB, reducir network roundtrips, pero dificulta testing/versioning" },
      { id: "b", text: "Siempre úsalas para todo" },
      { id: "c", text: "Nunca las uses, son legacy" },
      { id: "d", text: "Solo funcionan en Oracle" }
    ],
    correctAnswer: "a",
    explanation: "Stored procedures: lógica SQL reutilizable en la DB. Pros: reducen network traffic (una llamada vs muchas queries), performance (pre-compiladas), seguridad (abstraen tablas). Contras: difíciles de versionar/testear, lógica dividida entre app y DB, vendor lock-in. Modernamente se prefiere lógica en app para microservices."
  },
  {
    id: 147,
    title: "SQL - COALESCE y NULL handling",
    category: "Relacional",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué hace COALESCE?",
    code: `SELECT 
  name,
  COALESCE(phone, email, 'No contact') as contact
FROM users;`,
    options: [
      { id: "a", text: "Retorna el primer valor no-NULL de la lista" },
      { id: "b", text: "Suma todos los valores" },
      { id: "c", text: "Convierte todo a NULL" },
      { id: "d", text: "Es lo mismo que CONCAT" }
    ],
    correctAnswer: "a",
    explanation: "COALESCE(val1, val2, val3, ...) retorna el primer valor no-NULL. Útil para valores default: COALESCE(column, 'default'). Similar a || en algunos DBs o IFNULL/NVL. NULL != NULL en SQL, usa IS NULL / IS NOT NULL para comparar. NULL en operaciones propaga: 1 + NULL = NULL."
  },
  {
    id: 148,
    title: "SQL - Query Caching",
    category: "Relacional",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué estrategia de caching usarías para queries caras?",
    code: `// Query cara que se ejecuta frecuentemente
SELECT * FROM products 
JOIN categories ON products.category_id = categories.id
JOIN reviews ON products.id = reviews.product_id
WHERE products.status = 'active'
GROUP BY products.id;`,
    options: [
      { id: "a", text: "Cache en aplicación (Redis/Memcached) con TTL, invalidación on write" },
      { id: "b", text: "Query cache de la DB (deprecated en MySQL 8+)" },
      { id: "c", text: "No cachear nunca" },
      { id: "d", text: "Solo usar materialized views" }
    ],
    correctAnswer: "a",
    explanation: "Estrategias: 1) Application-level cache (Redis): flexible, cache-aside pattern. 2) CDN para APIs públicas. 3) Materialized views para analytics. 4) DB query cache (deprecated/limitado). Considera: cache invalidation (hard problem), TTL vs event-based invalidation, cache stampede prevention. 'There are only two hard things in CS: cache invalidation and naming things.'"
  },
  // ============= NOSQL - Preguntas (150-168) =============
  {
    id: 150,
    title: "NoSQL - CAP Theorem",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué dice el CAP Theorem?",
    code: `// Distributed System
// C = Consistency (todos ven los mismos datos)
// A = Availability (siempre responde)
// P = Partition Tolerance (funciona con network splits)

// Solo puedes garantizar 2 de 3`,
    options: [
      { id: "a", text: "En sistemas distribuidos solo puedes garantizar 2 de 3: Consistency, Availability, Partition tolerance" },
      { id: "b", text: "Puedes tener los 3 siempre" },
      { id: "c", text: "Solo aplica a SQL databases" },
      { id: "d", text: "Es un mito sin base científica" }
    ],
    correctAnswer: "a",
    explanation: "CAP: ante network partition (inevitable), elige Consistency o Availability. CP systems (MongoDB, HBase): prefieren consistency, rechazan writes si no pueden garantizarla. AP systems (Cassandra, DynamoDB): prefieren availability, aceptan eventual consistency. En práctica: CA no existe en sistemas distribuidos reales (partitions pasan)."
  },
  {
    id: 151,
    title: "MongoDB - Modelado Embedded vs Referenced",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo usar embedded documents vs references?",
    code: `// Embedded
{
  _id: 1,
  title: "Blog Post",
  comments: [
    { user: "Alice", text: "Great!" },
    { user: "Bob", text: "Thanks!" }
  ]
}

// Referenced
{
  _id: 1,
  title: "Blog Post"
}
// comments collection separada`,
    options: [
      { id: "a", text: "Embedded para datos que siempre se leen juntos y 1:N limitado; Referenced para M:N o arrays grandes" },
      { id: "b", text: "Siempre usa referenced" },
      { id: "c", text: "Siempre usa embedded" },
      { id: "d", text: "No hay diferencia" }
    ],
    correctAnswer: "a",
    explanation: "Embedded: mejor performance (1 query), útil para 1:N cuando el hijo solo existe con el padre. Límite: documento 16MB. Referenced: para M:N, arrays que crecen sin bound, datos consultados independientemente. Regla: modela según patrones de acceso, no según normalización SQL."
  },
  {
    id: 152,
    title: "MongoDB - Aggregation Pipeline",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace este aggregation pipeline?",
    code: `db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);`,
    options: [
      { id: "a", text: "Top 10 usuarios por total gastado en orders completadas" },
      { id: "b", text: "Total de todas las órdenes" },
      { id: "c", text: "Lista de usuarios sin filtrar" },
      { id: "d", text: "Sintaxis inválida" }
    ],
    correctAnswer: "a",
    explanation: "Aggregation pipeline procesa documentos en stages: $match (filter), $group (agrupa y calcula), $project (reshape), $sort, $limit, $lookup (JOIN), $unwind (aplana arrays). Equivalente a SQL con GROUP BY. Útil para analytics complejas. Puede usar índices en early stages ($match)."
  },
  {
    id: 153,
    title: "NoSQL - Eventual Consistency",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué significa eventual consistency?",
    code: `// Write to Node A
db.users.update({ id: 1 }, { name: 'Alice Updated' });

// Immediate read from Node B (replica)
// ¿Qué puede retornar?`,
    options: [
      { id: "a", text: "Puede retornar datos antiguos temporalmente, pero eventualmente converge a valor correcto" },
      { id: "b", text: "Siempre retorna datos actualizados inmediatamente" },
      { id: "c", text: "Los datos nunca se actualizan" },
      { id: "d", text: "Es lo mismo que strong consistency" }
    ],
    correctAnswer: "a",
    explanation: "Eventual consistency: tras un write, las reads pueden ver valor antiguo temporalmente hasta que la replicación completa. Trade-off por availability/performance. Alternativa: strong/immediate consistency (más lenta, menos disponible). BASE (NoSQL) vs ACID (SQL). Para casos como likes/views está bien; para finanzas, no."
  },
  {
    id: 154,
    title: "Cassandra - Partition Key y Clustering Key",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve la partition key en Cassandra?",
    code: `CREATE TABLE messages (
  user_id UUID,
  timestamp TIMESTAMP,
  message TEXT,
  PRIMARY KEY (user_id, timestamp)
);

// user_id = partition key
// timestamp = clustering key`,
    options: [
      { id: "a", text: "Determina qué nodo almacena los datos (distribución); clustering key ordena dentro de partición" },
      { id: "b", text: "Es solo un índice normal" },
      { id: "c", text: "No afecta la distribución" },
      { id: "d", text: "Es lo mismo que una foreign key" }
    ],
    correctAnswer: "a",
    explanation: "Partition key determina distribución (hash -> nodo). Todos los datos con misma partition key están en el mismo nodo. Clustering key ordena dentro de la partición. Diseño crítico: queries deben incluir partition key (sino scatter-gather lento). Anti-pattern: partition key con cardinalidad baja (hot partitions)."
  },
  {
    id: 155,
    title: "Redis - Casos de Uso",
    category: "NoSQL",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Para qué se usa comúnmente Redis?",
    code: `// Ejemplos
SET user:1000:session "..." EX 3600
INCR page:views
LPUSH queue:jobs "job-data"
SETEX cache:product:123 300 "{...}"`,
    options: [
      { id: "a", text: "Cache en memoria, sesiones, rate limiting, queues, contadores en tiempo real" },
      { id: "b", text: "Solo para base de datos principal" },
      { id: "c", text: "Reemplazo completo de SQL" },
      { id: "d", text: "Solo para almacenar strings" }
    ],
    correctAnswer: "a",
    explanation: "Redis: key-value store in-memory ultra-rápido. Casos: cache (SET/GET con TTL), sesiones, pub/sub, rate limiting (INCR), leaderboards (sorted sets), queues (lists), distributed locks. Persistencia opcional (RDB snapshots, AOF log). No reemplaza DB relacional, es complemento."
  },
  {
    id: 156,
    title: "MongoDB - Índices",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué tipo de índice usarías para buscar por ubicación geográfica?",
    code: `db.restaurants.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-73.9, 40.7] },
      $maxDistance: 1000
    }
  }
});`,
    options: [
      { id: "a", text: "2dsphere index para datos geoespaciales" },
      { id: "b", text: "Índice normal" },
      { id: "c", text: "Text index" },
      { id: "d", text: "MongoDB no soporta geolocalización" }
    ],
    correctAnswer: "a",
    explanation: "MongoDB soporta índices especializados: 2dsphere (geoespacial con coordenadas esféricas), text (full-text search), hashed (sharding), compound, multikey (arrays). 2dsphere permite queries: $near (cerca de), $geoWithin (dentro de polígono), $geoIntersects. Crítico para apps con mapas/ubicaciones."
  },
  {
    id: 157,
    title: "NoSQL - Document Size Limits",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el límite de tamaño de documento en MongoDB?",
    code: `{
  _id: 1,
  data: "..." // ¿Cuánto puede crecer?
}`,
    options: [
      { id: "a", text: "16MB por documento" },
      { id: "b", text: "Ilimitado" },
      { id: "c", text: "1MB" },
      { id: "d", text: "1GB" }
    ],
    correctAnswer: "a",
    explanation: "MongoDB: 16MB por documento. Para datos más grandes: GridFS (divide en chunks), o referencias. Cassandra: limit por partition (~2GB pero no recomendado). DynamoDB: 400KB por item. Diseña para que documentos individuales no sean enormes. Si necesitas archivos grandes, usa object storage (S3) y guarda referencias."
  },
  {
    id: 158,
    title: "NoSQL - Write Concerns",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué significa write concern 'majority' en MongoDB?",
    code: `db.users.insertOne(
  { name: 'Alice' },
  { writeConcern: { w: 'majority' } }
);`,
    options: [
      { id: "a", text: "Espera confirmación de la mayoría de los nodos del replica set antes de confirmar el write" },
      { id: "b", text: "Solo escribe en el primary" },
      { id: "c", text: "No espera confirmación alguna" },
      { id: "d", text: "Escribe en todos los nodos" }
    ],
    correctAnswer: "a",
    explanation: "Write concern controla durabilidad: w:1 (solo primary, rápido pero riesgo de pérdida), w:'majority' (mayoría de replicas, balanceado), w:'all' (todos, lento). También: j:true (espera journal flush a disco). Trade-off: mayor durabilidad = mayor latencia. Para datos críticos usa 'majority'."
  },
  {
    id: 159,
    title: "DynamoDB - Partition Keys y Hot Partitions",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué problema causa esta partition key?",
    code: `// Table: orders
// Partition key: status ('pending', 'completed')

// La mayoría de queries son:
// status = 'pending'`,
    options: [
      { id: "a", text: "Baja cardinalidad causa hot partitions: una partición recibe todo el tráfico (throttling)" },
      { id: "b", text: "No hay problema" },
      { id: "c", text: "Es el diseño óptimo" },
      { id: "d", text: "DynamoDB balancea automáticamente" }
    ],
    correctAnswer: "a",
    explanation: "DynamoDB distribuye por partition key. Cardinalidad baja (pocos valores distintos) causa hot partitions: una partición sobrecar gada. Mejor: alta cardinalidad (userId, orderId). Para queries por status + alta cardinalidad: usa composite key (status#userId) o GSI. Regla: diseña partition key con distribución uniforme del tráfico."
  },
  {
    id: 160,
    title: "NoSQL - Time Series Data",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo modelarías datos time-series en Cassandra?",
    code: `// IoT sensor data: millones de readings/día
// Queries: obtener readings de un sensor en rango de tiempo

// ¿Qué diseño?`,
    options: [
      { id: "a", text: "Partition key: (sensor_id, bucket_date), Clustering key: timestamp, para evitar particiones gigantes" },
      { id: "b", text: "Partition key: timestamp solo" },
      { id: "c", text: "Un documento gigante por sensor" },
      { id: "d", text: "Tabla SQL normalizada" }
    ],
    correctAnswer: "a",
    explanation: "Time-series: usa buckets para evitar particiones sin bound. Ejemplo: partition key (sensor_id, day), clustering key (timestamp). Cada día es nueva partición. Permite TTL para auto-delete datos antiguos. También considera: InfluxDB/TimescaleDB (especializadas en time-series), o agregaciones pre-computadas para queries frecuentes."
  },
  {
    id: 161,
    title: "MongoDB - Change Streams",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirven change streams?",
    code: `const changeStream = db.collection('orders').watch();

changeStream.on('change', (change) => {
  console.log('Change detected:', change);
  // Notify other services, update cache, etc.
});`,
    options: [
      { id: "a", text: "Escuchan cambios en tiempo real en la DB (inserts, updates, deletes) para event-driven architectures" },
      { id: "b", text: "Solo para hacer backups" },
      { id: "c", text: "Reemplazan queries normales" },
      { id: "d", text: "No existen en MongoDB" }
    ],
    correctAnswer: "a",
    explanation: "Change streams (MongoDB 3.6+) proveen streams de cambios en tiempo real. Usa el oplog (replication log). Casos: invalidar caches, sincronizar sistemas, notificaciones, event sourcing. Alternativa: polling (ineficiente). Similar a: Postgres LISTEN/NOTIFY, Kafka CDC (Change Data Capture)."
  },
  {
    id: 162,
    title: "NoSQL - Graph Databases",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo usar una graph database como Neo4j?",
    code: `// Ejemplo: Red social
// Users -> FOLLOWS -> Users
// Users -> LIKES -> Posts
// Posts -> TAGGED -> Topics

// Query: Amigos de amigos que siguen los mismos topics`,
    options: [
      { id: "a", text: "Para datos altamente conectados con relaciones complejas (social networks, fraud detection, recommendations)" },
      { id: "b", text: "Para reemplazar todas las bases de datos" },
      { id: "c", text: "Solo para grafos matemáticos" },
      { id: "d", text: "Nunca, son demasiado lentas" }
    ],
    correctAnswer: "a",
    explanation: "Graph DBs (Neo4j, Amazon Neptune) optimizan relaciones. Casos: redes sociales (amigos de amigos), detección de fraude (redes de transacciones), sistemas de recomendación, knowledge graphs. Queries de traversal múltiples niveles son eficientes vs múltiples JOINs en SQL. Cypher query language (Neo4j) es intuitivo para grafos."
  },
  {
    id: 163,
    title: "MongoDB - Transactions",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿MongoDB soporta transacciones ACID?",
    code: `const session = client.startSession();
session.startTransaction();
try {
  await accounts.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
  await accounts.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction();
} catch (e) {
  await session.abortTransaction();
}`,
    options: [
      { id: "a", text: "Sí, desde MongoDB 4.0+ soporta multi-document ACID transactions" },
      { id: "b", text: "No, nunca soportará transacciones" },
      { id: "c", text: "Solo transacciones en un solo documento" },
      { id: "d", text: "Las transacciones no son necesarias en NoSQL" }
    ],
    correctAnswer: "a",
    explanation: "MongoDB 4.0+ (2018) agregó multi-document transactions ACID. Antes: solo atomicidad a nivel documento. Útil para operaciones financieras, pero tiene cost de performance. Regla: diseña para evitar transacciones cuando sea posible (embedded docs), úsalas solo cuando realmente necesites atomicidad cross-document."
  },
  {
    id: 164,
    title: "Redis - Data Structures",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué estructura de Redis usarías para un leaderboard?",
    code: `// Necesitas:
// - Agregar scores de jugadores
// - Obtener top N jugadores
// - Obtener ranking de un jugador específico`,
    options: [
      { id: "a", text: "Sorted Set (ZADD, ZRANGE, ZRANK) con score como ranking" },
      { id: "b", text: "Simple string" },
      { id: "c", text: "List" },
      { id: "d", text: "Hash sin orden" }
    ],
    correctAnswer: "a",
    explanation: "Sorted Sets mantienen elementos ordenados por score automáticamente. Operaciones O(log n): ZADD (agregar/update), ZRANGE (obtener rango), ZRANK (posición), ZINCRBY (incrementar score). Perfecto para leaderboards, trending topics, priority queues. Otras estructuras: Strings, Lists, Sets, Hashes, Streams, Bitmaps, HyperLogLog."
  },
  {
    id: 165,
    title: "NoSQL - Schema Design",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la regla principal para diseñar schema en NoSQL?",
    code: `// ¿Normalizar como SQL o denormalizar?`,
    options: [
      { id: "a", text: "Diseña según patrones de acceso (queries), no según normalización. Denormalización es común." },
      { id: "b", text: "Siempre normaliza como en SQL" },
      { id: "c", text: "No necesitas diseñar schema (schema-less)" },
      { id: "d", text: "Copia el diseño SQL directamente" }
    ],
    correctAnswer: "a",
    explanation: "NoSQL: diseña para tus queries, no para normalización. Denormalización (duplicar datos) es común porque JOINs son costosos/inexistentes. 'Schema-less' no significa 'sin schema', significa flexible. Analiza: qué queries harás? Con qué frecuencia? Optimiza para el caso común. Cada DB NoSQL tiene patrones específicos."
  },
  {
    id: 166,
    title: "MongoDB - Sharding",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es una shard key en MongoDB?",
    code: `sh.shardCollection("mydb.users", { email: "hashed" });

// ¿Qué determina la shard key?`,
    options: [
      { id: "a", text: "Determina cómo se distribuyen documentos entre shards; elegir mal causa hot shards" },
      { id: "b", text: "Es solo un índice normal" },
      { id: "c", text: "No afecta la distribución" },
      { id: "d", text: "Se puede cambiar fácilmente después" }
    ],
    correctAnswer: "a",
    explanation: "Shard key distribuye datos entre shards. Mala elección (baja cardinalidad, monotónico como timestamp) causa hot shards. Buena: alta cardinalidad, distribución uniforme. Estrategias: hashed (distribuye uniform pero queries de rango son scatter-gather), ranged (queries de rango eficientes). Difícil de cambiar después, diseña con cuidado."
  },
  {
    id: 167,
    title: "Cassandra - Tunable Consistency",
    category: "NoSQL",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué significa consistency level QUORUM en Cassandra?",
    code: `// Cluster con replication factor = 3
INSERT INTO users (...) VALUES (...) USING CONSISTENCY QUORUM;
SELECT * FROM users WHERE id = 1 USING CONSISTENCY QUORUM;`,
    options: [
      { id: "a", text: "Lee/escribe en mayoría de replicas (RF/2 + 1), balanceando consistency y availability" },
      { id: "b", text: "Lee/escribe en todas las replicas" },
      { id: "c", text: "Solo una replica" },
      { id: "d", text: "Es lo mismo que ONE" }
    ],
    correctAnswer: "a",
    explanation: "Cassandra: tunable consistency per query. ONE (más rápido, eventual consistency), QUORUM (mayoría, strong consistency si R+W > RF), ALL (lento, máxima consistency). QUORUM con RF=3: necesita 2 nodos. Trade-off availability vs consistency según use case. R+W > RF garantiza strong consistency."
  },
  {
    id: 168,
    title: "NoSQL - Secondary Indexes",
    category: "NoSQL",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Por qué los secondary indexes son costosos en DynamoDB?",
    code: `// Table: users (PK: userId)
// Query: buscar por email

// Opciones:
// A) Scan toda la tabla
// B) Global Secondary Index en email`,
    options: [
      { id: "a", text: "GSI requiere WCU/RCU adicionales y mantiene copia de datos, pero evita scans costosos" },
      { id: "b", text: "Son gratis y siempre rápidos" },
      { id: "c", text: "No existen en DynamoDB" },
      { id: "d", text: "Son más baratos que la tabla principal" }
    ],
    correctAnswer: "a",
    explanation: "DynamoDB GSI (Global Secondary Index): copia asíncrona con different partition/sort key. Requiere provisionar WCU/RCU separado, cuesta storage adicional. Pero permite queries eficientes sin scan. LSI (Local Secondary Index): comparte partition key, solo cambia sort key. Diseña access patterns primero, luego define PKs y indexes necesarios."
  },
  // ============= SYSTEM DESIGN - Preguntas (170-185) =============
  {
    id: 170,
    title: "System Design - Load Balancing",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué algoritmo de load balancing usarías para sesiones sticky?",
    code: `// Load Balancer
// Server 1, Server 2, Server 3
// Requests con sesiones deben ir al mismo servidor`,
    options: [
      { id: "a", text: "IP hash o cookie affinity para fijar al usuario en el mismo nodo" },
      { id: "b", text: "Least connections con sesiones externas (Redis) para evitar afinidad" },
      { id: "c", text: "Round robin con replicación síncrona de sesiones entre nodos" },
      { id: "d", text: "Consistent hashing a nivel de app sin soporte del balanceador" }
    ],
    correctAnswer: "a",
    explanation: "Algoritmos: Round Robin (distribuye igual), Least Connections (al menos cargado), IP Hash (mismo IP -> mismo server), Cookie-based sticky (sesión -> server). Sticky sessions: útil para state en servidor pero complica escalado. Mejor: stateless servers + external session store (Redis). Health checks para remover servidores caídos."
  },
  {
    id: 171,
    title: "System Design - Caching Strategies",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre Cache-Aside y Write-Through?",
    code: `// Cache-Aside (Lazy Loading)
data = cache.get(key);
if (!data) {
  data = db.query();
  cache.set(key, data);
}

// Write-Through
db.write(data);
cache.set(key, data);`,
    options: [
      { id: "a", text: "Cache-Aside: la app carga bajo demanda; Write-Through: cada write actualiza cache y DB" },
      { id: "b", text: "Cache-Aside escribe siempre en cache y evita tocar DB en writes" },
      { id: "c", text: "Write-Through persiste a DB de forma asíncrona después de cachear" },
      { id: "d", text: "Cache-Aside requiere precargar todo el cache al inicio" }
    ],
    correctAnswer: "a",
    explanation: "Patrones: Cache-Aside (app maneja, popular, solo cachea lo usado), Write-Through (cache siempre sync, add latency a writes), Write-Behind (async write, riesgo de pérdida), Read-Through (cache maneja DB fetch). Cache invalidation: TTL, event-based, write-invalidate. Thundering herd: usa locking."
  },
  {
    id: 172,
    title: "System Design - Rate Limiting",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué algoritmo de rate limiting usarías para API pública?",
    code: `// Requisitos:
// - Permitir bursts pequeños
// - Evitar abuse
// - Distribuir límite en ventana de tiempo`,
    options: [
      { id: "a", text: "Token Bucket o Sliding Window para admitir bursts sin perder el límite promedio" },
      { id: "b", text: "Fixed Window con ventanas cortas y jitter para reducir picos" },
      { id: "c", text: "Leaky Bucket para suavizar el tráfico aunque limite los bursts" },
      { id: "d", text: "Rate limit solo en el firewall por IP, sin estado por usuario" }
    ],
    correctAnswer: "a",
    explanation: "Algoritmos: Fixed Window (simple, spike problem), Sliding Window (preciso, costoso), Token Bucket (popular, permite bursts), Leaky Bucket (suaviza tráfico). Token Bucket: agrega tokens a rate constante, request consume token. Implementación: Redis INCR + EXPIRE. Layer 7 (application) mejor que Layer 4 (network) para APIs."
  },
  {
    id: 173,
    title: "System Design - CDN",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué cachea un CDN?",
    code: `// CDN Nodes: Tokyo, London, NY, Sydney
// User en Tokyo request: https://cdn.example.com/image.jpg`,
    options: [
      { id: "a", text: "Contenido cacheable en edge (estáticos y GETs con headers adecuados)" },
      { id: "b", text: "HTML dinámico generado en origen, pero no JS/CSS/imagenes" },
      { id: "c", text: "Respuestas de APIs autenticadas incluso sin headers de cache" },
      { id: "d", text: "Solo actúa como proxy TLS sin almacenamiento en edge" }
    ],
    correctAnswer: "a",
    explanation: "CDN (CloudFlare, CloudFront): cache geográficamente distribuida. Cachea assets estáticos cerca del usuario (reduce latency). Headers: Cache-Control, ETag controlan caching. También: DDoS protection, SSL termination. Cache invalidation: purge manual o versioned URLs (/v2/image.jpg). CDN pull (fetch on miss) vs push (preload)."
  },
  {
    id: 174,
    title: "System Design - Microservices vs Monolith",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo NO usar microservicios?",
    code: `// Startup temprano, equipo pequeño (3 devs)
// Producto en fase de experimentación rápida`,
    options: [
      { id: "a", text: "Equipos pequenos, dominio inestable y alto riesgo de overhead operativo" },
      { id: "b", text: "Equipos con ownership claro y despliegues independientes por dominio" },
      { id: "c", text: "Cuando necesitas escalar un modulo sin tocar el resto del sistema" },
      { id: "d", text: "Cuando el producto ya tiene madurez y fronteras estables" }
    ],
    correctAnswer: "a",
    explanation: "Microservicios: pros (escalado independiente, tech diversity, ownership), cons (complejidad operacional, network overhead, transacciones distribuidas difíciles). Monolith para: MVP, equipos pequeños, dominios no claros. Puedes empezar monolith, luego extraer servicios (strangler pattern). 'Monolith primero' - Martin Fowler."
  },
  {
    id: 175,
    title: "System Design - Message Queues",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Para qué usar una message queue (RabbitMQ, SQS)?",
    code: `// Servicio A -> Queue -> Servicio B
// Servicio A produce mensajes
// Servicio B consume cuando puede`,
    options: [
      { id: "a", text: "Desacoplar productores/consumidores y absorber picos con entrega confiable" },
      { id: "b", text: "Garantizar orden total y consultas temporales como en un log analitico" },
      { id: "c", text: "Sustituir la base de datos principal para evitar transacciones" },
      { id: "d", text: "Evitar reintentos en integraciones externas por completo" }
    ],
    correctAnswer: "a",
    explanation: "Message queues: desacoplan producer/consumer temporalmente. Casos: background jobs (emails, thumbnails), absorber spikes (Black Friday), garantizar processing (at-least-once delivery). Patrones: fan-out (1->N), fan-in (N->1), priority queues. Alternativas: Kafka (event streaming, retention), Redis (simple), SQS (managed)."
  },
  {
    id: 176,
    title: "System Design - Idempotency",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo haces una API idempotente?",
    code: `// POST /api/payments
// Si la request se reintenta, no debe crear pago duplicado

// ¿Cómo garantizar idempotency?`,
    options: [
      { id: "a", text: "Idempotency key de cliente + almacenamiento de resultado para deduplicar" },
      { id: "b", text: "Usar timestamp y rechazar si llega el mismo payload en 60 segundos" },
      { id: "c", text: "Depender de retries del cliente sin identificador unico" },
      { id: "d", text: "Generar un nuevo id en cada intento y limpiar duplicados despues" }
    ],
    correctAnswer: "a",
    explanation: "Idempotent: múltiples requests idénticas tienen mismo efecto que una. GET/PUT/DELETE son idempotentes por naturaleza. POST no lo es. Solución: client-generated idempotency key (Stripe usa esto), servidor checkea duplicados en DB. Útil para: retries, network failures, garantizar exactly-once processing. TTL en keys (24h típico)."
  },
  {
    id: 177,
    title: "System Design - Horizontal vs Vertical Scaling",
    category: "Arquitectura",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia entre scaling horizontal y vertical?",
    code: `// Vertical: 1 server (4 CPU) -> 1 server (16 CPU)
// Horizontal: 1 server -> 4 servers`,
    options: [
      { id: "a", text: "Vertical: mas recursos en un nodo; Horizontal: mas nodos con balanceo" },
      { id: "b", text: "Horizontal es escalar CPU/RAM; Vertical es agregar mas instancias" },
      { id: "c", text: "Horizontal solo aplica a lectura; vertical solo a escritura" },
      { id: "d", text: "Vertical es practicamente ilimitado en la nube" }
    ],
    correctAnswer: "a",
    explanation: "Vertical: más CPU/RAM al server (límite hardware, single point of failure, menos complejidad). Horizontal: más servers (ilimitado teóricamente, require load balancer, app debe ser stateless). Horizontal mejor para: high availability, fault tolerance. Vertical más simple inicialmente. Combina ambos."
  },
  {
    id: 178,
    title: "System Design - Database Connection Pooling at Scale",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Con 100 app servers y pool de 20 connections cada uno, ¿cuántas connections a la DB?",
    code: `// 100 app servers
// Pool size = 20 per server
// 1 DB server

// ¿Cuántas connections simultáneas?`,
    options: [
      { id: "a", text: "100 * 20 = 2000 conexiones (riesgo de saturar la DB)" },
      { id: "b", text: "100 conexiones porque el pool es global en la app" },
      { id: "c", text: "20 conexiones si todos comparten un proxy de pools" },
      { id: "d", text: "Depende solo de max_connections y no del pool por app" }
    ],
    correctAnswer: "a",
    explanation: "Problema común: cada app server abre su pool, saturando DB. Solución: connection proxy/pooler (PgBouncer para Postgres, ProxySQL para MySQL). Reduce connections a DB manteniendo pools en app. También: reduce pool size si tienes muchos app servers. Postgres típicamente max_connections=100-200."
  },
  {
    id: 179,
    title: "System Design - API Versioning",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la mejor práctica para versionar APIs?",
    code: `// Opción A: /api/v1/users, /api/v2/users
// Opción B: Header: Accept: application/vnd.api+json; version=1
// Opción C: Query param: /api/users?version=1`,
    options: [
      { id: "a", text: "Versionar en URL (/v1/) es explicito y cacheable" },
      { id: "b", text: "Versionar en headers para no tocar rutas ni contratos visibles" },
      { id: "c", text: "Usar query params porque permite cambiar version por request" },
      { id: "d", text: "Evitar versionado y romper clientes con feature flags" }
    ],
    correctAnswer: "a",
    explanation: "URL versioning (/v1/) es más popular: explicit, fácil de testear/cachear, visible. Header versioning (Accept): más 'RESTful' pero menos visible. Query params: raro, problemas con caching. Regla: mantén backward compatibility cuando sea posible. Major version para breaking changes. Sunset viejas versiones con antelación."
  },
  {
    id: 180,
    title: "System Design - Circuit Breaker Pattern",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve un Circuit Breaker?",
    code: `// Service A -> Service B
// Si B está caído:
// - Sin circuit breaker: A sigue intentando (timeout cada request)
// - Con circuit breaker: A deja de intentar temporalmente`,
    options: [
      { id: "a", text: "Evitar cascading failures con fail-fast y cooldown cuando un servicio cae" },
      { id: "b", text: "Limitar concurrencia de llamadas con bulkheads" },
      { id: "c", text: "Agregar retries con backoff como estrategia principal" },
      { id: "d", text: "Hacer rate limiting para proteger el servicio destino" }
    ],
    correctAnswer: "a",
    explanation: "Circuit Breaker (Netflix Hystrix, resilience4j): monitorea failures. Estados: Closed (normal), Open (tras threshold, fail-fast sin llamar servicio), Half-Open (prueba si servicio se recuperó). Previene cascading failures, thread exhaustion, da tiempo al servicio a recuperarse. Combina con: retries, timeouts, fallbacks."
  },
  {
    id: 181,
    title: "System Design - Consistent Hashing",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué problema soluciona consistent hashing?",
    code: `// Sin consistent hashing: server = hash(key) % num_servers
// Agregar/quitar server -> rehash todo

// Con consistent hashing:
// Agregar/quitar server -> solo K/N keys se mueven`,
    options: [
      { id: "a", text: "Minimiza el movimiento de claves al agregar/quitar nodos" },
      { id: "b", text: "Distribuye claves con hash modulo N para balance perfecto" },
      { id: "c", text: "Garantiza orden global de claves en un cluster" },
      { id: "d", text: "Evita hotspots solo con replicas multiples" }
    ],
    correctAnswer: "a",
    explanation: "Hash simple (key % N): agregar/quitar servidor invalida casi todo el cache. Consistent hashing: servidores y keys en anillo hash, key va al siguiente servidor clockwise. Agregar/quitar servidor solo mueve K/N keys. Usado en: DynamoDB, Cassandra, Memcached. Virtual nodes mejoran distribución."
  },
  {
    id: 182,
    title: "System Design - CQRS Pattern",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es CQRS (Command Query Responsibility Segregation)?",
    code: `// Commands (writes) -> Write DB (optimized for writes)
// Queries (reads) -> Read DB (optimized for reads, denormalized)
// Sync async entre ambas`,
    options: [
      { id: "a", text: "Separar modelos de lectura y escritura y optimizar cada uno" },
      { id: "b", text: "Usar replicas read-only con el mismo modelo de datos" },
      { id: "c", text: "Cambiar solo el ORM para lecturas y escrituras" },
      { id: "d", text: "Aplicable unicamente cuando hay Event Sourcing" }
    ],
    correctAnswer: "a",
    explanation: "CQRS: separa commands (writes) y queries (reads) en modelos diferentes. Ventajas: optimiza cada lado independientemente, escala reads/writes por separado. Desventajas: complejidad, eventual consistency. Casos: sistemas complejos con diferentes necesidades read/write. A menudo combinado con Event Sourcing."
  },
  {
    id: 183,
    title: "System Design - Saga Pattern",
    category: "Arquitectura",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo manejas transacciones distribuidas en microservicios?",
    code: `// Order Service -> Payment Service -> Inventory Service
// ¿Cómo garantizar atomicidad sin distributed transactions?`,
    options: [
      { id: "a", text: "Saga: transacciones locales + compensaciones cuando hay fallos" },
      { id: "b", text: "Two-Phase Commit con coordinator y locks distribuidos" },
      { id: "c", text: "Unificar todo en una sola base de datos compartida" },
      { id: "d", text: "Reintentar indefinidamente hasta que todos concuerden" }
    ],
    correctAnswer: "a",
    explanation: "Saga: cada servicio hace transacción local, publica evento. Si falla, ejecuta compensating transaction (undo). Tipos: Choreography (event-driven, descentralizado), Orchestration (coordinador central). 2PC es complejo y bloquea. Saga es eventual consistency. Alternativa: evitar transacciones distribuidas con buen diseño de bounded contexts."
  },
  {
    id: 184,
    title: "System Design - Webhook Reliability",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo haces webhooks confiables?",
    code: `// Tu servicio -> Webhook URL del cliente
// Cliente puede estar caído o lento

// ¿Cómo garantizar entrega?`,
    options: [
      { id: "a", text: "Queue persistente + retries con backoff + firma HMAC" },
      { id: "b", text: "Reintentar en loop inmediato hasta que responda" },
      { id: "c", text: "Migrar a polling y desactivar webhooks" },
      { id: "d", text: "Mantener un WebSocket permanente por cliente" }
    ],
    correctAnswer: "a",
    explanation: "Webhooks confiables: 1) Queue persistente (SQS), 2) Retries con exponential backoff, 3) Dead letter queue tras N intentos, 4) Idempotency en receptor, 5) Signature HMAC para verificar origen, 6) Timeout configurado. Ofrece también: webhook logs, manual retry, testing endpoint. Stripe/GitHub hacen esto bien."
  },
  {
    id: 185,
    title: "System Design - Blue-Green Deployment",
    category: "Arquitectura",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es Blue-Green deployment?",
    code: `// Blue (current): v1.0 (receiving 100% traffic)
// Green (new): v2.0 (idle)

// Deploy: switch traffic Blue -> Green
// Rollback: switch traffic Green -> Blue`,
    options: [
      { id: "a", text: "Dos ambientes identicos y switch de trafico instantaneo" },
      { id: "b", text: "Despliegue gradual por porcentaje con metricas" },
      { id: "c", text: "Actualizacion rolling, nodo por nodo" },
      { id: "d", text: "Feature flags sin duplicar infraestructura" }
    ],
    correctAnswer: "a",
    explanation: "Blue-Green: dos ambientes completos (blue=actual, green=nuevo). Deploy: cambiar load balancer/DNS a green. Rollback: volver a blue. Pros: rollback instantáneo, testing en producción antes de switch. Contras: costo (2x infrastructure), DB migrations complejas. Canary: deploy gradual (5% -> 50% -> 100%). Rolling: actualiza servidores uno a uno."
  },
  // ============= QA AUTOMATION - Preguntas (190-206) =============
  {
    id: 190,
    title: "QA - Test Pyramid",
    category: "QA Automation",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué representa la pirámide de testing?",
    code: `//        /\\
//       /E2E\\     (pocos, lentos, costosos)
//      /------\\
//     /  API   \\   (moderados)
//    /----------\\
//   /   Unit     \\ (muchos, rápidos, baratos)
//  /--------------\\`,
    options: [
      { id: "a", text: "Más tests unitarios (base), menos tests E2E (cima): balance entre coverage, velocidad y costo" },
      { id: "b", text: "Solo tests E2E son necesarios" },
      { id: "c", text: "Todas las capas deben tener igual cantidad de tests" },
      { id: "d", text: "Tests unitarios no son importantes" }
    ],
    correctAnswer: "a",
    explanation: "Pirámide de testing (Mike Cohn): base ancha de tests unitarios (rápidos, baratos, alta cobertura de lógica), capa media de tests de integración/API, y cima pequeña de tests E2E (lentos, frágiles, costosos pero validan user journeys). Anti-pattern: 'Ice Cream Cone' (demasiados E2E). Balance es clave."
  },
  {
    id: 191,
    title: "QA - Flaky Tests",
    category: "QA Automation",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo mitigas tests flaky (intermitentes)?",
    code: `// Test que falla aleatoriamente
test('loads user data', async () => {
  render(<UserProfile />);
  // A veces pasa, a veces falla
  expect(screen.getByText('John')).toBeInTheDocument();
});`,
    options: [
      { id: "a", text: "Proper waits (waitFor), eliminar sleeps fijos, aislar state, evitar dependencias de tiempo/red" },
      { id: "b", text: "Retry automático siempre" },
      { id: "c", text: "Ignorar tests flaky" },
      { id: "d", text: "Solo ejecutar tests una vez" }
    ],
    correctAnswer: "a",
    explanation: "Causas de flaky tests: race conditions, timing issues, dependencias externas, state compartido, network. Soluciones: usar waitFor en lugar de sleep fijos, mock APIs, aislar tests, deterministic data, idempotencia. Quarantine flaky tests hasta fix. Retries deben ser último recurso. Flaky tests erosionan confianza en la suite."
  },
  {
    id: 192,
    title: "QA Manual - Casos de Prueba",
    category: "QA Manual",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué debe incluir un buen caso de prueba?",
    code: `// Ejemplo: Login functionality
// ¿Qué información debe contener el test case?`,
    options: [
      { id: "a", text: "ID, Título, Precondiciones, Pasos, Datos de entrada, Resultado esperado, Prioridad" },
      { id: "b", text: "Solo el título" },
      { id: "c", text: "Solo el resultado esperado" },
      { id: "d", text: "No necesita estructura formal" }
    ],
    correctAnswer: "a",
    explanation: "Test case bien documentado incluye: ID único, título descriptivo, precondiciones (setup), pasos detallados (reproducibles), test data, resultado esperado claro, prioridad/severidad, ambiente, referencias a requisitos. Debe ser: claro, reproducible, independiente, mantenible. Herramientas: TestRail, Zephyr, Xray, TestLink."
  },
  {
    id: 193,
    title: "QA - Técnicas de Testing",
    category: "QA Manual",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué técnica de testing es Boundary Value Analysis?",
    code: `// Campo: edad (válido 18-65)
// ¿Qué valores probar?`,
    options: [
      { id: "a", text: "Probar límites: 17, 18, 19, 64, 65, 66 (antes, en, después del límite)" },
      { id: "b", text: "Solo probar valores al azar" },
      { id: "c", text: "Solo probar valor medio (41)" },
      { id: "d", text: "No probar límites, solo casos comunes" }
    ],
    correctAnswer: "a",
    explanation: "BVA (Boundary Value Analysis): errores frecuentes en límites. Prueba: mínimo-1, mínimo, mínimo+1, máximo-1, máximo, máximo+1. Complementa con Equivalence Partitioning (clases de equivalencia). Otras técnicas: Decision Tables, State Transition, Use Case Testing, Exploratory Testing. Reduce test cases manteniendo alta cobertura."
  },
  {
    id: 194,
    title: "Scrum - Sprint Planning",
    category: "Scrum",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es el objetivo del Sprint Planning?",
    code: `// Sprint Planning Meeting
// Equipo Scrum reunido
// Backlog priorizado disponible`,
    options: [
      { id: "a", text: "Definir qué se construirá en el sprint y cómo (Sprint Goal, Sprint Backlog)" },
      { id: "b", text: "Solo asignar tareas individualmente" },
      { id: "c", text: "Review del sprint anterior" },
      { id: "d", text: "Solo el Product Owner decide qué hacer" }
    ],
    correctAnswer: "a",
    explanation: "Sprint Planning (timebox: 8h para sprint de 1 mes): el equipo define Sprint Goal y selecciona items del Product Backlog. Dos partes: QUÉ (Product Owner presenta prioridades, equipo estima capacidad) y CÓMO (equipo descompone en tareas técnicas). Output: Sprint Backlog comprometido. Participan: todo el equipo Scrum."
  },
  {
    id: 195,
    title: "Scrum - Daily Standup",
    category: "Scrum",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué se responde en el Daily Standup?",
    code: `// Daily Scrum (15 min)
// Equipo de desarrollo reunido
// Frente al tablero`,
    options: [
      { id: "a", text: "¿Qué hice ayer? ¿Qué haré hoy? ¿Tengo impedimentos?" },
      { id: "b", text: "Status report detallado al manager" },
      { id: "c", text: "Solo decir 'todo bien'" },
      { id: "d", text: "Discutir soluciones técnicas en detalle" }
    ],
    correctAnswer: "a",
    explanation: "Daily Scrum: 15min, mismo lugar/hora, equipo sincroniza progreso hacia Sprint Goal. 3 preguntas: qué hice ayer, qué haré hoy, impedimentos. NO es status report al manager. Scrum Master facilita, remueve impedimentos. Discusiones técnicas detalladas van después (parking lot). Mantiene transparencia y early detection de problemas."
  },
  {
    id: 196,
    title: "Scrum - Definition of Done",
    category: "Scrum",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es la Definition of Done?",
    code: `// DoD ejemplo:
// - Código revisado (PR approved)
// - Tests pasando
// - Documentación actualizada
// - Deployed a staging
// - QA validation passed`,
    options: [
      { id: "a", text: "Checklist compartido que define cuándo un item está 100% completo y potencialmente shippable" },
      { id: "b", text: "Solo que el developer diga que terminó" },
      { id: "c", text: "Lo define el manager individualmente" },
      { id: "d", text: "No es necesario tener uno" }
    ],
    correctAnswer: "a",
    explanation: "DoD: acuerdo explícito del equipo sobre criterios de completitud. Puede incluir: code review, tests, documentation, deployment, QA approval. Diferente de Acceptance Criteria (específico por story). DoD más estricto = menos deuda técnica. Incrementa con madurez del equipo. Asegura calidad consistente y reduce 'almost done'."
  },
  {
    id: 197,
    title: "QA Automation - Selenium vs Cypress",
    category: "QA Automation",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia principal entre Selenium y Cypress?",
    code: `// Selenium
driver.findElement(By.id('submit')).click();

// Cypress
cy.get('#submit').click();`,
    options: [
      { id: "a", text: "Cypress corre en el browser (más rápido, automatic waits); Selenium usa WebDriver remoto (más browsers)" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "Selenium es siempre mejor" },
      { id: "d", text: "Cypress solo funciona con React" }
    ],
    correctAnswer: "a",
    explanation: "Cypress: corre dentro del browser, automatic waiting, time-travel debugging, mejor DX. Limitaciones: solo Chrome-family, no multi-tab. Selenium: estándar W3C, multi-browser (Firefox, Safari, Edge, IE), multi-tab. Playwright: alternativa moderna (multi-browser, rápido). Elige según: browsers requeridos, ecosistema, experiencia del equipo."
  },
  {
    id: 198,
    title: "QA - Test Data Management",
    category: "QA Automation",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo manejas test data en automation?",
    code: `// Necesitas: user con pedidos, productos, etc.
// ¿Cómo generas/mantienes data?`,
    options: [
      { id: "a", text: "API seeds antes de tests, data factories, cleanup después, evitar shared data entre tests" },
      { id: "b", text: "Data manual en DB compartida" },
      { id: "c", text: "Usar producción directamente" },
      { id: "d", text: "No necesitas controlar test data" }
    ],
    correctAnswer: "a",
    explanation: "Estrategias: 1) API setup/teardown (cada test crea su data), 2) Data factories (Faker, Factory Bot), 3) DB seeds (estado conocido), 4) Test data service. Evita: compartir data entre tests (coupling, race conditions), hardcoded IDs, usar data de producción (GDPR). Principio: tests deben ser independientes y reproducibles."
  },
  {
    id: 199,
    title: "QA Manual - Tipos de Testing",
    category: "QA Manual",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Qué es Regression Testing?",
    code: `// Escenario:
// - Nueva feature agregada
// - ¿Funcionalidades existentes siguen funcionando?`,
    options: [
      { id: "a", text: "Re-ejecutar tests existentes para verificar que cambios no rompieron funcionalidad previa" },
      { id: "b", text: "Solo probar la nueva feature" },
      { id: "c", text: "Testing de performance" },
      { id: "d", text: "Solo testear bugs conocidos" }
    ],
    correctAnswer: "a",
    explanation: "Regression Testing: verificar que nuevos cambios no rompieron funcionalidad existente. Crítico tras: nuevas features, bug fixes, refactoring. Candidato ideal para automatización (suite repetitiva). Estrategias: full regression (todo), selective (áreas impactadas), smoke tests (funcionalidad crítica). CI/CD ejecuta regresión automáticamente."
  },
  {
    id: 200,
    title: "Scrum - Sprint Retrospective",
    category: "Scrum",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es el propósito de la Retrospectiva?",
    code: `// Al final del Sprint
// Equipo reunido en privado
// Timeboxed: 3h para sprint de 1 mes`,
    options: [
      { id: "a", text: "Inspeccionar cómo fue el sprint (personas, procesos, herramientas) y planear mejoras" },
      { id: "b", text: "Demo al Product Owner" },
      { id: "c", text: "Planear el próximo sprint" },
      { id: "d", text: "Solo culpar por problemas" }
    ],
    correctAnswer: "a",
    explanation: "Sprint Retrospective: equipo inspecciona sprint y crea plan de mejoras. Formato común: qué fue bien, qué mejorar, action items. Atmosfera segura (sin culpas). Scrum Master facilita. Es sobre el PROCESO, no el producto. Continua mejora (kaizen). Puede usar técnicas: Start/Stop/Continue, Mad/Sad/Glad, Sailboat, 4Ls."
  },
  {
    id: 201,
    title: "QA - Bug Report Quality",
    category: "QA Manual",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace a un bug report excelente?",
    code: `// Bug encontrado en producción
// Necesitas reportarlo al equipo`,
    options: [
      { id: "a", text: "Título claro, Steps to reproduce, Expected vs Actual, Severity, Screenshots/logs, Environment" },
      { id: "b", text: "Solo decir 'no funciona'" },
      { id: "c", text: "Solo el título" },
      { id: "d", text: "Asumir que todos saben el contexto" }
    ],
    correctAnswer: "a",
    explanation: "Bug report de calidad: 1) Título descriptivo, 2) Steps detallados (reproducible), 3) Expected vs Actual behavior, 4) Severity/Priority, 5) Environment (OS, browser, version), 6) Screenshots/video/logs, 7) Frequency (always, sometimes). Menos ping-pong = más rápido el fix. Herramientas: Jira, GitHub Issues, Bugzilla."
  },
  {
    id: 202,
    title: "QA Automation - Page Object Model",
    category: "QA Automation",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es el Page Object Model pattern?",
    code: `// LoginPage.js
class LoginPage {
  get emailInput() { return cy.get('#email'); }
  get submitBtn() { return cy.get('#submit'); }
  
  login(email, pass) {
    this.emailInput.type(email);
    // ...
  }
}

// test
loginPage.login('user@test.com', 'pass');`,
    options: [
      { id: "a", text: "Abstrae elementos UI en clases/objetos, separando tests de implementación (mantenibilidad)" },
      { id: "b", text: "Solo para organizar archivos" },
      { id: "c", text: "No aporta beneficios" },
      { id: "d", text: "Solo funciona con Selenium" }
    ],
    correctAnswer: "a",
    explanation: "POM: patrón que encapsula elementos y acciones de una página en un objeto. Ventajas: mantenibilidad (cambio de UI en un lugar), reusabilidad, tests más legibles. Locators centralizados. Si botón cambia ID, solo actualizas el POM. Nivel superior: App Actions. Evita: demasiada lógica en POMs, God Objects gigantes."
  },
  {
    id: 203,
    title: "Scrum - Product Backlog Refinement",
    category: "Scrum",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es Backlog Refinement (Grooming)?",
    code: `// Actividad continua durante el Sprint
// Product Owner + Equipo
// ~10% de capacidad del sprint`,
    options: [
      { id: "a", text: "Clarificar, estimar, split stories del Product Backlog para sprints futuros (preparación)" },
      { id: "b", text: "Es lo mismo que Sprint Planning" },
      { id: "c", text: "Solo el PO trabaja en esto" },
      { id: "d", text: "No es necesario" }
    ],
    correctAnswer: "a",
    explanation: "Backlog Refinement: actividad ongoing de agregar detalles, estimaciones, orden a items del Product Backlog. No es evento formal Scrum pero es buena práctica. Equipo: agrega acceptance criteria, descompone épicas, estima story points, clarifica con PO. Output: top items 'ready' para Planning. Previene Plannings largos."
  },
  {
    id: 204,
    title: "QA - API Testing",
    category: "QA Automation",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué validar en API testing?",
    code: `// GET /api/users/123
// Response: 200 OK
// Body: { "id": 123, "name": "Alice" }`,
    options: [
      { id: "a", text: "Status code, response schema, data correctness, headers, error handling, performance" },
      { id: "b", text: "Solo que retorne 200" },
      { id: "c", text: "Solo el body" },
      { id: "d", text: "APIs no necesitan testing" }
    ],
    correctAnswer: "a",
    explanation: "API testing valida: 1) Status codes (200, 400, 500), 2) Response schema (JSON structure), 3) Data correctness, 4) Headers (auth, content-type), 5) Error messages, 6) Performance/latency, 7) Security. Herramientas: Postman, REST Assured, Supertest. Contract testing: Pact. Automatiza en CI/CD. Tests API son más rápidos/estables que UI."
  },
  {
    id: 205,
    title: "QA - Smoke vs Sanity Testing",
    category: "QA Manual",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre Smoke y Sanity testing?",
    code: `// Después de nuevo deploy
// ¿Qué tipo de testing ejecutar?`,
    options: [
      { id: "a", text: "Smoke: funcionalidad crítica (build estable?); Sanity: verificar fix específico (racional probar más?)" },
      { id: "b", text: "Son exactamente lo mismo" },
      { id: "c", text: "Smoke es solo para QA, Sanity solo para devs" },
      { id: "d", text: "No existen diferencias reales" }
    ],
    correctAnswer: "a",
    explanation: "Smoke testing: subset rápido de tests críticos para verificar build estable (can we test further?). Ejecuta tras deploy. Shallow y amplio. Sanity testing: verificación rápida de funcionalidad específica tras bug fix. Narrow y profundo en área afectada. Ambos: rápidos, no exhaustivos, decision gates. Smoke suele estar automatizado (CI/CD)."
  },
  {
    id: 206,
    title: "Scrum - Scrum Master Role",
    category: "Scrum",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál NO es responsabilidad del Scrum Master?",
    code: `// Opciones de actividades en el proyecto`,
    options: [
      { id: "a", text: "Decidir qué features van en el Product Backlog (eso es del Product Owner)" },
      { id: "b", text: "Facilitar eventos Scrum" },
      { id: "c", text: "Remover impedimentos del equipo" },
      { id: "d", text: "Coaching al equipo en Scrum" }
    ],
    correctAnswer: "a",
    explanation: "Scrum Master: servant-leader, facilita Scrum, remueve impedimentos, coaching, protege al equipo de distracciones. NO es: project manager, technical lead, ni decide el QUÉ (eso es Product Owner). Product Owner: maximiza valor del producto, gestiona Product Backlog, prioriza. Development Team: auto-organizado, entrega Increment. Roles claros evitan confusión."
  },
  // ============= VUE.JS - Preguntas (210-229) =============
  {
    id: 210,
    title: "Vue - Reactivity System",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo funciona el sistema de reactividad de Vue?",
    code: `import { ref, reactive } from 'vue';

const count = ref(0);
const state = reactive({ name: 'Vue' });

count.value++;
state.name = 'Vue 3';`,
    options: [
      { id: "a", text: "Usa Proxy para interceptar cambios y actualizar automáticamente el DOM" },
      { id: "b", text: "Requiere llamar manualmente update() después de cada cambio" },
      { id: "c", text: "Solo funciona con objetos, no con primitivos" },
      { id: "d", text: "No tiene sistema de reactividad" }
    ],
    correctAnswer: "a",
    explanation: "Vue 3 usa Proxy API para crear objetos reactivos. ref() envuelve primitivos en un objeto con .value. reactive() hace objetos profundamente reactivos. Vue rastrea dependencias automáticamente y actualiza el DOM cuando cambian. Vue 2 usaba Object.defineProperty (limitaciones). Proxy permite detectar agregar/eliminar propiedades y arrays."
  },
  {
    id: 211,
    title: "Vue - Composition API vs Options API",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la ventaja principal de Composition API sobre Options API?",
    code: `// Options API
export default {
  data() { return { count: 0 }; },
  methods: { increment() { this.count++; } }
}

// Composition API
import { ref } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  }
}`,
    options: [
      { id: "a", text: "Mejor organización de lógica relacionada, reutilización con composables, mejor TypeScript support" },
      { id: "b", text: "Es más rápido siempre" },
      { id: "c", text: "Options API está deprecado" },
      { id: "d", text: "No hay diferencias reales" }
    ],
    correctAnswer: "a",
    explanation: "Composition API agrupa lógica relacionada (data + methods) en lugar de separarla por tipo (data, methods, computed). Permite composables reutilizables (useCounter, useAuth). Mejor inferencia de tipos en TypeScript. Options API sigue soportado y es válido para componentes simples. Puedes usar ambos en el mismo proyecto."
  },
  {
    id: 212,
    title: "Vue - Computed Properties",
    category: "Vue.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuándo usar computed vs methods en Vue?",
    code: `// Computed
const fullName = computed(() => firstName.value + ' ' + lastName.value);

// Method
const getFullName = () => firstName.value + ' ' + lastName.value;`,
    options: [
      { id: "a", text: "Computed: cachea resultado, solo recalcula si dependencias cambian; Methods: ejecuta cada vez" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "Computed es más lento" },
      { id: "d", text: "Methods siempre es mejor" }
    ],
    correctAnswer: "a",
    explanation: "Computed properties son cached y reactivos. Solo se recalculan cuando sus dependencias reactivas cambian. Útiles para valores derivados. Methods se ejecutan cada vez que se llaman. Usa computed para: valores derivados, filtrado/transformación de datos. Usa methods para: eventos, acciones que necesitan ejecutarse cada vez."
  },
  {
    id: 213,
    title: "Vue - Directivas v-if vs v-show",
    category: "Vue.js",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia entre v-if y v-show?",
    code: `<!-- v-if -->
<div v-if="isVisible">Contenido</div>

<!-- v-show -->
<div v-show="isVisible">Contenido</div>`,
    options: [
      { id: "a", text: "v-if: condicionalmente renderiza (agrega/quita del DOM); v-show: siempre renderiza, solo cambia CSS display" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "v-show es más rápido siempre" },
      { id: "d", text: "v-if solo funciona con strings" }
    ],
    correctAnswer: "a",
    explanation: "v-if: renderizado condicional. Si false, el elemento no existe en el DOM. Costoso si cambia frecuentemente (crear/destruir). v-show: siempre renderiza, usa display: none. Mejor para toggles frecuentes. v-if tiene menor costo inicial si raramente visible. v-show tiene menor costo de toggle. v-if soporta v-else, v-else-if."
  },
  {
    id: 214,
    title: "Vue - Watchers",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo usar watch vs watchEffect?",
    code: `// watch
watch(count, (newVal, oldVal) => {
  console.log('Count changed:', newVal);
});

// watchEffect
watchEffect(() => {
  console.log('Count:', count.value);
});`,
    options: [
      { id: "a", text: "watch: observa fuente específica, lazy (solo cuando cambia); watchEffect: observa todas las dependencias usadas, eager (inmediato)" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "watchEffect es deprecated" },
      { id: "d", text: "watch solo funciona con refs" }
    ],
    correctAnswer: "a",
    explanation: "watch: observa una o más fuentes específicas, lazy (no ejecuta hasta que cambia), acceso a oldValue. watchEffect: automáticamente rastrea dependencias reactivas usadas dentro, eager (ejecuta inmediatamente), no tiene oldValue. Usa watch para: reacciones que necesitan oldValue, observación específica. Usa watchEffect para: efectos que necesitan ejecutarse inmediatamente."
  },
  {
    id: 215,
    title: "Vue - Props y Emits",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo comunicas datos del hijo al padre en Vue?",
    code: `// Child Component
const emit = defineEmits(['update']);
emit('update', newValue);

// Parent Component
<ChildComponent @update="handleUpdate" />`,
    options: [
      { id: "a", text: "Usando $emit o defineEmits para emitir eventos que el padre escucha con @event" },
      { id: "b", text: "Modificando props directamente" },
      { id: "c", text: "Usando v-model en el hijo" },
      { id: "d", text: "No es posible comunicar hijo -> padre" }
    ],
    correctAnswer: "a",
    explanation: "Vue usa one-way data flow: props down, events up. Hijo emite eventos con emit('eventName', payload). Padre escucha con @eventName=\"handler\". v-model es sugar syntax para :value + @input. defineEmits (Composition API) o emits option (Options API) declara eventos. Nunca mutes props directamente, siempre emite eventos."
  },
  {
    id: 216,
    title: "Vue - Lifecycle Hooks",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿En qué orden se ejecutan los lifecycle hooks?",
    code: `// Composition API
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => { /* ... */ });
onUpdated(() => { /* ... */ });
onUnmounted(() => { /* ... */ });`,
    options: [
      { id: "a", text: "setup -> onMounted -> onUpdated (cuando cambia) -> onUnmounted" },
      { id: "b", text: "onMounted -> setup -> onUpdated" },
      { id: "c", text: "Todos se ejecutan al mismo tiempo" },
      { id: "d", text: "Solo existe onMounted" }
    ],
    correctAnswer: "a",
    explanation: "Lifecycle: setup (Composition API) / created (Options API) -> onMounted / mounted (DOM montado) -> onUpdated / updated (cuando data cambia) -> onUnmounted / unmounted (componente destruido). También: onBeforeMount, onBeforeUpdate, onBeforeUnmount. setup() corre antes de created. Útil para: API calls (mounted), cleanup (unmounted), side effects."
  },
  {
    id: 217,
    title: "Vue - v-model y Custom Components",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo implementas v-model en un componente personalizado?",
    code: `// CustomInput.vue
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const updateValue = (e) => {
  emit('update:modelValue', e.target.value);
};`,
    options: [
      { id: "a", text: "Define prop 'modelValue' y emite 'update:modelValue' con el nuevo valor" },
      { id: "b", text: "Solo necesitas el prop, no emit" },
      { id: "c", text: "v-model no funciona en componentes custom" },
      { id: "d", text: "Usa v-bind directamente" }
    ],
    correctAnswer: "a",
    explanation: "v-model en componentes custom: prop 'modelValue' (o nombre custom con v-model:customName), emit 'update:modelValue' (o 'update:customName'). Vue 3 permite múltiples v-models: v-model:title, v-model:content. Internamente v-model es sugar para :modelValue=\"value\" @update:modelValue=\"value = $event\"."
  },
  {
    id: 218,
    title: "Vue - Slots",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué son los slots en Vue?",
    code: `// Parent
<Card>
  <template #header>Title</template>
  <p>Content</p>
  <template #footer>Footer</template>
</Card>

// Card.vue
<slot name="header" />
<slot />
<slot name="footer" />`,
    options: [
      { id: "a", text: "Permiten pasar contenido/componentes al hijo, con named slots para múltiples áreas" },
      { id: "b", text: "Son solo para estilos CSS" },
      { id: "c", text: "Solo funcionan con strings" },
      { id: "d", text: "No existen en Vue 3" }
    ],
    correctAnswer: "a",
    explanation: "Slots: contenido proyectado del padre al hijo. Default slot: contenido sin nombre. Named slots: #header, #footer (sintaxis v-slot:header o #header). Scoped slots: pasan datos del hijo al padre (v-slot=\"{ data }\"). Útiles para: layouts reutilizables, composición de componentes, contenido dinámico."
  },
  {
    id: 219,
    title: "Vue - Provide/Inject",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve provide/inject?",
    code: `// Ancestor Component
provide('theme', 'dark');

// Deep Child Component
const theme = inject('theme');`,
    options: [
      { id: "a", text: "Pasa datos de ancestro a descendientes sin prop drilling (evita pasar props por cada nivel)" },
      { id: "b", text: "Reemplaza props completamente" },
      { id: "c", text: "Solo funciona con un nivel de profundidad" },
      { id: "d", text: "Es lo mismo que v-model" }
    ],
    correctAnswer: "a",
    explanation: "provide/inject: dependency injection pattern. Ancestor provide() datos, cualquier descendiente puede inject(). Útil para: themes, configuración global, plugins. Evita prop drilling (pasar props por componentes intermedios que no las usan). provide puede ser reactive con ref/reactive. Similar a React Context. Úsalo cuando props drilling es problemático."
  },
  {
    id: 220,
    title: "Vue - Teleport",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué hace <Teleport>?",
    code: `<Teleport to="body">
  <Modal v-if="showModal" />
</Teleport>`,
    options: [
      { id: "a", text: "Renderiza el contenido en otro lugar del DOM (útil para modales, tooltips fuera del flujo)" },
      { id: "b", text: "Teletransporta el componente a otro servidor" },
      { id: "c", text: "Solo funciona con modales" },
      { id: "d", text: "No existe en Vue 3" }
    ],
    correctAnswer: "a",
    explanation: "Teleport: renderiza contenido en diferente ubicación del DOM. Útil para: modales (fuera de z-index issues), tooltips, notifications. El componente mantiene su contexto Vue (props, events) pero el DOM está en otro lugar. Similar a React Portals. to puede ser selector CSS o 'body'."
  },
  {
    id: 221,
    title: "Vue - Pinia State Management",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre Pinia y Vuex?",
    code: `// Pinia
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: { increment() { this.count++; } }
});`,
    options: [
      { id: "a", text: "Pinia: más simple, mejor TypeScript, sin mutations, composables; Vuex: más verboso, mutations separadas" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "Vuex es siempre mejor" },
      { id: "d", text: "Pinia está deprecado" }
    ],
    correctAnswer: "a",
    explanation: "Pinia: store oficial de Vue 3, reemplaza Vuex. Ventajas: sin mutations (actions pueden mutar state), mejor TypeScript inference, múltiples stores, DevTools support. Vuex: mutations obligatorias, más boilerplate. Pinia es más simple y moderno. Ambos soportan modules/namespaces. Migración de Vuex a Pinia es relativamente fácil."
  },
  {
    id: 222,
    title: "Vue - KeepAlive",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Para qué sirve <KeepAlive>?",
    code: `<KeepAlive :include="['ComponentA']">
  <component :is="currentComponent" />
</KeepAlive>`,
    options: [
      { id: "a", text: "Cachea componentes desmontados, preservando estado y evitando re-render (útil para tabs, routing)" },
      { id: "b", text: "Solo mantiene componentes vivos" },
      { id: "c", text: "No tiene efecto real" },
      { id: "d", text: "Solo funciona con un componente" }
    ],
    correctAnswer: "a",
    explanation: "KeepAlive: componente wrapper que cachea instancias de componentes. Cuando se desmonta, se guarda en memoria. Al remontar, reusa la instancia (no recrea). Props: include (componentes a cachear), exclude, max (límite de instancias). Útil para: tabs, routing (preservar scroll position), formularios complejos. Lifecycle: activated/deactivated hooks."
  },
  {
    id: 223,
    title: "Vue - Custom Directives",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cómo creas una directiva personalizada?",
    code: `// Global
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

// Usage
<input v-focus />`,
    options: [
      { id: "a", text: "Define objeto con lifecycle hooks (mounted, updated, unmounted) que reciben el elemento DOM" },
      { id: "b", text: "Solo funciona con funciones" },
      { id: "c", text: "No se pueden crear directivas custom" },
      { id: "d", text: "Solo en Options API" }
    ],
    correctAnswer: "a",
    explanation: "Custom directives: extienden comportamiento del DOM. Hooks: mounted (elemento insertado), updated (VNode actualizado), unmounted (elemento removido). Reciben: el (elemento DOM), binding (value, oldValue, arg, modifiers). Útiles para: integración con librerías DOM, comportamiento reutilizable (v-focus, v-tooltip). Built-in: v-if, v-show, v-model, v-for."
  },
  {
    id: 224,
    title: "Vue - Router Navigation Guards",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué son los navigation guards en Vue Router?",
    code: `router.beforeEach((to, from, next) => {
  if (requiresAuth(to)) {
    next('/login');
  } else {
    next();
  }
});`,
    options: [
      { id: "a", text: "Funciones que interceptan navegación para autenticación, permisos, o lógica antes/después de rutas" },
      { id: "b", text: "Solo para logging" },
      { id: "c", text: "No existen en Vue Router" },
      { id: "d", text: "Solo funcionan en componentes" }
    ],
    correctAnswer: "a",
    explanation: "Navigation guards: beforeEach (global, antes de navegación), beforeResolve (después de guards de componentes), afterEach (después de navegación, sin next). Component guards: beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave. Útiles para: auth checks, permisos, loading states, confirmación antes de salir. next() continúa, next(false) cancela, next('/path') redirige."
  },
  {
    id: 225,
    title: "Vue - Suspense",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Para qué sirve <Suspense> en Vue 3?",
    code: `<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <Loading />
  </template>
</Suspense>`,
    options: [
      { id: "a", text: "Maneja componentes asíncronos, mostrando fallback mientras cargan (async setup, async components)" },
      { id: "b", text: "Solo para errores" },
      { id: "c", text: "No existe en Vue 3" },
      { id: "d", text: "Solo funciona con fetch" }
    ],
    correctAnswer: "a",
    explanation: "Suspense: wrapper para componentes asíncronos. Muestra fallback mientras el componente carga (async setup() o async component). Similar a React Suspense. Útil para: code splitting, data fetching, lazy loading. Puede anidarse. onErrorCaptured maneja errores. Experimental en Vue 3, pero estable para casos de uso comunes."
  },
  {
    id: 226,
    title: "Vue - Ref vs Reactive",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo usar ref() vs reactive()?",
    code: `const count = ref(0);
const state = reactive({ name: 'Vue', age: 3 });`,
    options: [
      { id: "a", text: "ref: primitivos o cuando necesitas reemplazar objeto completo; reactive: objetos/arrays que no reemplazarás" },
      { id: "b", text: "Son intercambiables siempre" },
      { id: "c", text: "reactive es siempre mejor" },
      { id: "d", text: "ref solo funciona con números" }
    ],
    correctAnswer: "a",
    explanation: "ref: envuelve cualquier valor en objeto { value }, útil para primitivos (string, number, boolean). Acceso con .value. reactive: solo objetos/arrays, no primitivos. No puedes reemplazar objeto completo (pierde reactividad). ref puede reemplazar valor completo. Regla: usa ref por defecto, reactive solo si necesitas objeto sin .value. Ambos son profundamente reactivos."
  },
  {
    id: 227,
    title: "Vue - Template Refs",
    category: "Vue.js",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo accedes a elementos DOM en Vue?",
    code: `// Template
<input ref="inputRef" />

// Composition API
const inputRef = ref(null);
onMounted(() => {
  inputRef.value.focus();
});`,
    options: [
      { id: "a", text: "Usa ref attribute en template y ref() en script, accede después de mounted" },
      { id: "b", text: "Usa document.querySelector directamente" },
      { id: "c", text: "No es posible acceder al DOM" },
      { id: "d", text: "Solo funciona en Options API" }
    ],
    correctAnswer: "a",
    explanation: "Template refs: ref=\"name\" en template, const name = ref(null) en script. El ref se asigna después de que el componente se monta. Accede en onMounted() o después. Útil para: focus, scroll, integrar librerías DOM (charts, maps). En Options API: this.$refs.name. Puedes usar refs en componentes también (acceso a instancia del componente hijo)."
  },
  {
    id: 228,
    title: "Vue - Mixins vs Composables",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Por qué Composables son mejores que Mixins?",
    code: `// Mixin (Vue 2)
const myMixin = { methods: { ... } };

// Composable (Vue 3)
function useCounter() {
  const count = ref(0);
  return { count };
}`,
    options: [
      { id: "a", text: "Composables: explícitos (import), no conflictos de nombres, mejor TypeScript; Mixins: implícitos, conflictos, difícil debug" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "Mixins son siempre mejores" },
      { id: "d", text: "Mixins no existen en Vue" }
    ],
    correctAnswer: "a",
    explanation: "Mixins: mezclan opciones (data, methods) en componente. Problemas: conflictos de nombres, origen de propiedades no claro, difícil composar múltiples mixins. Composables: funciones que retornan estado/lógica, explícitos (import), composables, mejor TypeScript. Patrón recomendado en Vue 3. Naming: useXxx (useCounter, useAuth). Reemplazan mixins completamente."
  },
  {
    id: 229,
    title: "Vue - Performance Optimization",
    category: "Vue.js",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué técnicas optimizan performance en Vue?",
    code: `// v-memo
<div v-for="item in list" v-memo="[item.id]">
  {{ expensive(item) }}
</div>

// v-once
<div v-once>{{ staticContent }}</div>`,
    options: [
      { id: "a", text: "v-memo (cachea subárbol), v-once (renderiza una vez), lazy components, computed caching, virtual scrolling" },
      { id: "b", text: "Solo v-if optimiza" },
      { id: "c", text: "Vue no necesita optimización" },
      { id: "d", text: "Solo funciona con v-for" }
    ],
    correctAnswer: "a",
    explanation: "Optimizaciones: v-memo (Vue 3.2+): cachea subárbol si dependencias no cambian, útil en v-for. v-once: renderiza una vez, ignora cambios. Lazy components: code splitting. Computed: cache automático. Virtual scrolling: renderizar solo items visibles. También: key estable en v-for, evitar inline functions en templates, usar Object.freeze para listas grandes."
  },
  // ============= JAVA - Preguntas (230-249) =============
  {
    id: 230,
    title: "Java - Hibernate ORM Basics",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es Hibernate ORM?",
    code: `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_name")
    private String name;
}`,
    options: [
      { id: "a", text: "Framework ORM que mapea objetos Java a tablas SQL, maneja persistencia y queries" },
      { id: "b", text: "Solo un generador de SQL" },
      { id: "c", text: "Reemplaza completamente SQL" },
      { id: "d", text: "Solo funciona con MySQL" }
    ],
    correctAnswer: "a",
    explanation: "Hibernate: ORM (Object-Relational Mapping) framework. Mapea clases Java (@Entity) a tablas SQL. Maneja: persistencia (save, update, delete), queries (HQL, Criteria API), relaciones (OneToMany, ManyToOne), transacciones, lazy loading. Implementa JPA specification. Ventajas: menos SQL boilerplate, portabilidad entre DBs. Desventajas: puede generar queries ineficientes si no se entiende bien."
  },
  {
    id: 231,
    title: "Java - Hibernate Session y EntityManager",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la diferencia entre Session (Hibernate) y EntityManager (JPA)?",
    code: `// Hibernate Session
Session session = sessionFactory.openSession();
User user = session.get(User.class, 1L);

// JPA EntityManager
EntityManager em = entityManagerFactory.createEntityManager();
User user = em.find(User.class, 1L);`,
    options: [
      { id: "a", text: "EntityManager es estándar JPA (portable), Session es específico de Hibernate (más features)" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "Session está deprecado" },
      { id: "d", text: "No se pueden usar juntos" }
    ],
    correctAnswer: "a",
    explanation: "EntityManager: estándar JPA, portable entre implementaciones (Hibernate, EclipseLink). Session: API nativa de Hibernate, más features (filters, interceptors). Hibernate implementa JPA, así que EntityManager internamente usa Session. Prefiere EntityManager para portabilidad. Session para features avanzadas específicas de Hibernate. Ambos manejan: persist, merge, remove, find, flush."
  },
  {
    id: 232,
    title: "Java - Hibernate Lazy vs Eager Loading",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué significa FetchType.LAZY?",
    code: `@OneToMany(fetch = FetchType.LAZY)
private List<Order> orders;

@ManyToOne(fetch = FetchType.EAGER)
private User user;`,
    options: [
      { id: "a", text: "LAZY: carga relación solo cuando se accede; EAGER: carga inmediatamente (puede causar N+1 queries)" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "LAZY es siempre más lento" },
      { id: "d", text: "EAGER es siempre mejor" }
    ],
    correctAnswer: "a",
    explanation: "LAZY: carga relación bajo demanda (proxy). Eficiente si no siempre necesitas la relación. EAGER: carga inmediatamente (join o query separada). Puede causar N+1 problem si cargas múltiples entidades. Regla: usa LAZY por defecto, EAGER solo si siempre necesitas la relación. Puedes forzar carga con JOIN FETCH en query. LazyInitializationException si accedes fuera de transacción."
  },
  {
    id: 233,
    title: "Java - Hibernate N+1 Problem",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es el problema N+1 en Hibernate?",
    code: `// Query 1: SELECT * FROM users
List<User> users = session.createQuery("FROM User").list();

// Queries N: SELECT * FROM orders WHERE user_id = ?
for (User user : users) {
    user.getOrders().size(); // Lazy load trigger
}`,
    options: [
      { id: "a", text: "1 query para lista + N queries para cada relación lazy (ineficiente); solución: JOIN FETCH o batch fetching" },
      { id: "b", text: "Es un feature, no un problema" },
      { id: "c", text: "Solo ocurre con EAGER" },
      { id: "d", text: "No existe en Hibernate" }
    ],
    correctAnswer: "a",
    explanation: "N+1 problem: 1 query para obtener lista, N queries adicionales para cargar relaciones lazy. Ejemplo: 100 users, cada uno con orders lazy = 1 + 100 queries. Soluciones: JOIN FETCH (\"FROM User u JOIN FETCH u.orders\"), @BatchSize, Hibernate.initialize(). Usa EXPLAIN o logging para detectar. Crítico para performance en producción."
  },
  {
    id: 234,
    title: "Java - Spring Beans",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es un Spring Bean?",
    code: `@Component
public class UserService {
    @Autowired
    private UserRepository repository;
}

@Configuration
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}`,
    options: [
      { id: "a", text: "Objeto gestionado por Spring IoC container, creado, configurado y gestionado por el framework" },
      { id: "b", text: "Solo clases anotadas con @Bean" },
      { id: "c", text: "Es lo mismo que una clase normal" },
      { id: "d", text: "Solo existe en Spring Boot" }
    ],
    correctAnswer: "a",
    explanation: "Spring Bean: objeto gestionado por Spring IoC (Inversion of Control) container. Spring crea, configura, y gestiona el ciclo de vida. Anotaciones: @Component, @Service, @Repository, @Controller (stereotypes), o @Bean en @Configuration. Ventajas: dependency injection, singleton por defecto, lifecycle management. Container resuelve dependencias automáticamente (@Autowired, constructor injection)."
  },
  {
    id: 235,
    title: "Java - Spring Bean Scopes",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuáles son los scopes de Spring Beans?",
    code: `@Component
@Scope("prototype")
public class PrototypeBean { }

@Component
@Scope("singleton") // default
public class SingletonBean { }`,
    options: [
      { id: "a", text: "singleton (1 instancia), prototype (nueva cada vez), request/session (web), application (ServletContext)" },
      { id: "b", text: "Solo singleton existe" },
      { id: "c", text: "Todos son iguales" },
      { id: "d", text: "No hay scopes en Spring" }
    ],
    correctAnswer: "a",
    explanation: "Bean scopes: singleton (default, 1 instancia compartida), prototype (nueva instancia cada vez que se solicita), request (1 por HTTP request, web), session (1 por HTTP session, web), application (1 por ServletContext, web), websocket (1 por WebSocket session). Singleton: eficiente, stateless. Prototype: cuando necesitas estado independiente. Request/Session: para web apps con estado."
  },
  {
    id: 236,
    title: "Java - Spring Dependency Injection",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuál es la mejor forma de inyectar dependencias en Spring?",
    code: `// Constructor Injection (recomendado)
public class UserService {
    private final UserRepository repository;
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}

// Field Injection
@Autowired
private UserRepository repository;`,
    options: [
      { id: "a", text: "Constructor injection: inmutable, requerido, fácil testing; Field injection: menos verboso pero menos recomendado" },
      { id: "b", text: "Solo field injection funciona" },
      { id: "c", text: "Son idénticos" },
      { id: "d", text: "No hay inyección de dependencias" }
    ],
    correctAnswer: "a",
    explanation: "Constructor injection: dependencias como parámetros del constructor. Ventajas: inmutable (final), requerido (fail-fast si falta), fácil testing (new Service(repo)), no necesita @Autowired (Spring 4.3+). Field injection: @Autowired en campo. Desventajas: mutable, difícil testing (reflection), oculta dependencias. Spring recomienda constructor injection. Setter injection: para opcionales."
  },
  {
    id: 237,
    title: "Java - Spring @Transactional",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué hace @Transactional?",
    code: `@Service
@Transactional
public class UserService {
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        // Multiple DB operations
    }
}`,
    options: [
      { id: "a", text: "Marca método/clase para ejecutarse en transacción: commit si éxito, rollback si excepción" },
      { id: "b", text: "Solo para logging" },
      { id: "c", text: "No tiene efecto real" },
      { id: "d", text: "Solo funciona con Hibernate" }
    ],
    correctAnswer: "a",
    explanation: "@Transactional: Spring maneja transacciones declarativamente. Crea transacción antes del método, commit si éxito, rollback si RuntimeException/Error. Props: propagation (REQUIRED default, NESTED, REQUIRES_NEW), isolation, readOnly, timeout, rollbackFor. AOP proxy intercepta llamadas. Self-invocation no funciona (llamar método @Transactional desde mismo objeto). Usa TransactionTemplate para programático."
  },
  {
    id: 238,
    title: "Java - Spring AOP",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es AOP en Spring?",
    code: `@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(Loggable)")
    public Object log(ProceedingJoinPoint pjp) throws Throwable {
        // Before
        Object result = pjp.proceed();
        // After
        return result;
    }
}`,
    options: [
      { id: "a", text: "Aspect-Oriented Programming: separa cross-cutting concerns (logging, security, transactions) del código business" },
      { id: "b", text: "Solo para logging" },
      { id: "c", text: "No existe en Spring" },
      { id: "d", text: "Es lo mismo que inheritance" }
    ],
    correctAnswer: "a",
    explanation: "AOP: separa concerns transversales (cross-cutting). Aspectos: @Aspect con @Before, @After, @Around, @AfterReturning, @AfterThrowing. Pointcuts: @annotation, execution(), within(). Spring usa proxies (JDK dynamic o CGLIB). Ejemplos: @Transactional, @Cacheable, security, logging, performance monitoring. Mantiene código business limpio, reutiliza lógica transversal."
  },
  {
    id: 239,
    title: "Java - JPA Entity Relationships",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo defines relación OneToMany bidireccional?",
    code: `// Parent
@Entity
public class User {
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;
}

// Child
@Entity
public class Order {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}`,
    options: [
      { id: "a", text: "Parent: @OneToMany(mappedBy=\"fieldName\"), Child: @ManyToOne con @JoinColumn; mappedBy indica que el otro lado es owner" },
      { id: "b", text: "Solo necesitas @OneToMany" },
      { id: "c", text: "No se pueden hacer relaciones bidireccionales" },
      { id: "d", text: "Solo funciona con @ManyToMany" }
    ],
    correctAnswer: "a",
    explanation: "Bidirectional: un lado es owner (tiene @JoinColumn), otro es inverse (mappedBy). Owner: @ManyToOne o @OneToMany sin mappedBy. Inverse: @OneToMany(mappedBy=\"fieldName\") o @ManyToOne(mappedBy). mappedBy referencia el campo en la otra entidad. Cascade: ALL, PERSIST, MERGE, REMOVE, REFRESH, DETACH. Bidirectional útil para navegación desde ambos lados."
  },
  {
    id: 240,
    title: "Java - Hibernate Second Level Cache",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es el Second Level Cache en Hibernate?",
    code: `@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User { }`,
    options: [
      { id: "a", text: "Cache compartido entre todas las sesiones, reduce queries a DB para entidades frecuentemente accedidas" },
      { id: "b", text: "Solo cachea en memoria local" },
      { id: "c", text: "No existe en Hibernate" },
      { id: "d", text: "Solo funciona con Redis" }
    ],
    correctAnswer: "a",
    explanation: "Second Level Cache: cache compartido a nivel de SessionFactory (todas las sesiones). First Level Cache: por sesión (implícito). Providers: EhCache, Infinispan, Hazelcast. Estrategias: READ_ONLY (inmutable), READ_WRITE (read-write), NONSTRICT_READ_WRITE, TRANSACTIONAL. Útil para: entidades de referencia (países, categorías), datos raramente modificados. Configurar en hibernate.cfg.xml o application.properties."
  },
  {
    id: 241,
    title: "Java - Spring Profiles",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Para qué sirven los Spring Profiles?",
    code: `@Profile("dev")
@Configuration
public class DevConfig { }

@Profile("prod")
@Configuration
public class ProdConfig { }`,
    options: [
      { id: "a", text: "Activan configuraciones específicas por ambiente (dev, test, prod) - beans condicionales" },
      { id: "b", text: "Solo para logging" },
      { id: "c", text: "No tienen efecto" },
      { id: "d", text: "Solo funcionan en Spring Boot" }
    ],
    correctAnswer: "a",
    explanation: "Profiles: activan beans/configuraciones por ambiente. Activar: -Dspring.profiles.active=dev, application.properties (spring.profiles.active=dev), @ActiveProfiles en tests. Útil para: diferentes DBs (dev: H2, prod: PostgreSQL), configuraciones (dev: debug, prod: optimizado), features (dev: mock services, prod: real). @Profile en @Configuration, @Component, @Bean. Múltiples profiles: @Profile({\"dev\", \"test\"})."
  },
  {
    id: 242,
    title: "Java - Spring Boot Auto Configuration",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cómo funciona Spring Boot Auto Configuration?",
    code: `// Spring Boot detecta classpath y configura automáticamente
// Si encuentra H2 en classpath -> DataSource automático
// Si encuentra Jackson -> ObjectMapper automático`,
    options: [
      { id: "a", text: "Detecta librerías en classpath y configura beans automáticamente basado en condiciones (@ConditionalOnClass)" },
      { id: "b", text: "Solo configura lo que le dices explícitamente" },
      { id: "c", text: "No existe auto-configuration" },
      { id: "d", text: "Solo funciona con Spring Boot Starter" }
    ],
    correctAnswer: "a",
    explanation: "Auto Configuration: Spring Boot configura beans automáticamente basado en classpath. @ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty. Ejemplos: H2 en classpath -> H2 DataSource, Jackson -> ObjectMapper, Spring Data JPA -> EntityManagerFactory. Puedes deshabilitar: @SpringBootApplication(exclude = DataSourceAutoConfiguration.class). Custom auto-config: crear @Configuration en META-INF/spring.factories."
  },
  {
    id: 243,
    title: "Java - Hibernate Criteria API",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Cuándo usar Criteria API vs HQL?",
    code: `// Criteria API (type-safe, programático)
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<User> query = cb.createQuery(User.class);
Root<User> root = query.from(User.class);
query.where(cb.equal(root.get("name"), "John"));

// HQL (string-based)
String hql = "FROM User WHERE name = :name";`,
    options: [
      { id: "a", text: "Criteria: queries dinámicas type-safe; HQL: queries estáticas más legibles, similar a SQL" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "Criteria está deprecado" },
      { id: "d", text: "HQL no existe" }
    ],
    correctAnswer: "a",
    explanation: "Criteria API: programático, type-safe (compile-time checks), útil para queries dinámicas (filtros opcionales). HQL: string-based, más legible, similar a SQL. JPA Criteria (estándar) vs Hibernate Criteria (deprecated en favor de JPA). Para queries simples: HQL. Para queries dinámicas complejas: Criteria. Spring Data JPA: métodos derivados o @Query (HQL/JPQL)."
  },
  {
    id: 244,
    title: "Java - Spring Data JPA",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué es Spring Data JPA?",
    code: `public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(@Param("email") String email);
}`,
    options: [
      { id: "a", text: "Abstracción sobre JPA que genera implementaciones de repositorios automáticamente basado en métodos" },
      { id: "b", text: "Reemplaza Hibernate completamente" },
      { id: "c", text: "Solo para testing" },
      { id: "d", text: "No existe" }
    ],
    correctAnswer: "a",
    explanation: "Spring Data JPA: reduce boilerplate de DAOs. Extiende JpaRepository (CRUD methods), PagingAndSortingRepository. Métodos derivados: findByName, findByEmailAndActive, etc. Genera queries automáticamente. @Query para queries custom (JPQL o SQL nativo). @Modifying para UPDATE/DELETE. Paginación: Pageable, Page. Ventajas: menos código, consistencia, fácil testing. Implementación generada en runtime."
  },
  {
    id: 245,
    title: "Java - Hibernate Detached Entities",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué es una entidad detached en Hibernate?",
    code: `// Entity está en estado detached
User user = session.get(User.class, 1L);
session.close(); // user ahora está detached

// Reattach
Session newSession = sessionFactory.openSession();
newSession.update(user); // o merge()`,
    options: [
      { id: "a", text: "Entidad fuera de sesión Hibernate (session cerrada); necesita merge() o update() para reattach" },
      { id: "b", text: "Entidad eliminada de la DB" },
      { id: "c", text: "No existe este concepto" },
      { id: "d", text: "Solo ocurre con @Transactional" }
    ],
    correctAnswer: "a",
    explanation: "Estados de entidad: transient (nueva, no en DB), persistent (en sesión, sincronizada con DB), detached (fuera de sesión, existe en DB), removed (marcada para delete). Detached: session cerrada pero objeto existe. Reattach: merge() (copia estado, retorna managed), update() (reattach si no existe en sesión). Útil en: web apps (entidad serializada, luego merge en nueva request)."
  },
  {
    id: 246,
    title: "Java - Spring @Component vs @Service vs @Repository",
    category: "Java",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "¿Cuál es la diferencia entre @Component, @Service y @Repository?",
    code: `@Component // Generic
public class Util { }

@Service // Business logic
public class UserService { }

@Repository // Data access
public class UserRepository { }`,
    options: [
      { id: "a", text: "Todas son @Component, pero @Service/@Repository indican propósito semántico y habilitan features específicos (@Repository: exception translation)" },
      { id: "b", text: "Son completamente diferentes" },
      { id: "c", text: "Solo @Component funciona" },
      { id: "d", text: "No hay diferencias" }
    ],
    correctAnswer: "a",
    explanation: "Todas son estereotipos de @Component (mismo comportamiento base). @Service: lógica de negocio, semántica. @Repository: acceso a datos, traduce excepciones de persistencia a DataAccessException. @Controller: web layer, maneja requests. @Component: genérico. Diferencia práctica: @Repository habilita exception translation (SQLException -> DataAccessException). Usa por semántica y claridad, no por funcionalidad."
  },
  {
    id: 247,
    title: "Java - Hibernate HQL vs Native SQL",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Cuándo usar HQL vs Native SQL?",
    code: `// HQL (portable)
String hql = "FROM User u WHERE u.name = :name";

// Native SQL (DB-specific)
String sql = "SELECT * FROM users WHERE user_name = ?";`,
    options: [
      { id: "a", text: "HQL: portable entre DBs, usa nombres de entidades; Native SQL: DB-specific, más control, queries complejas" },
      { id: "b", text: "Son idénticos" },
      { id: "c", text: "HQL está deprecado" },
      { id: "d", text: "Solo Native SQL funciona" }
    ],
    correctAnswer: "a",
    explanation: "HQL: Hibernate Query Language, portable, usa nombres de entidades/propiedades, Hibernate maneja SQL. Native SQL: SQL directo, DB-specific, más control, útil para queries complejas, stored procedures, funciones DB específicas. @Query(nativeQuery = true) en Spring Data. HQL para: portabilidad, queries estándar. Native SQL para: performance crítica, features DB específicas, migración de queries existentes."
  },
  {
    id: 248,
    title: "Java - Spring Bean Lifecycle",
    category: "Java",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "¿Qué métodos del ciclo de vida de Spring Beans conoces?",
    code: `@Component
public class MyBean implements InitializingBean, DisposableBean {
    @PostConstruct
    public void init() { }
    
    @PreDestroy
    public void cleanup() { }
}`,
    options: [
      { id: "a", text: "@PostConstruct (después de inyección), @PreDestroy (antes de destrucción), InitializingBean, DisposableBean" },
      { id: "b", text: "Solo constructor" },
      { id: "c", text: "No hay lifecycle" },
      { id: "d", text: "Solo @Autowired" }
    ],
    correctAnswer: "a",
    explanation: "Bean lifecycle: 1) Constructor, 2) Dependency injection (@Autowired), 3) @PostConstruct (inicialización), 4) Bean ready, 5) @PreDestroy (cleanup antes de destrucción). Interfaces: InitializingBean.afterPropertiesSet(), DisposableBean.destroy(). @PostConstruct/@PreDestroy: JSR-250, recomendado. Útil para: inicializar recursos, conexiones DB, cleanup. Orden: @PostConstruct después de todas las inyecciones."
  },
  {
    id: 249,
    title: "Java - Hibernate Inheritance Strategies",
    category: "Java",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "¿Qué estrategias de herencia soporta JPA/Hibernate?",
    code: `// Single Table
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
public class Animal { }

// Joined Table
@Inheritance(strategy = InheritanceType.JOINED)
public class Animal { }`,
    options: [
      { id: "a", text: "SINGLE_TABLE (1 tabla con discriminator), JOINED (tabla por clase), TABLE_PER_CLASS (tabla por clase conpleta)" },
      { id: "b", text: "Solo herencia simple" },
      { id: "c", text: "No soporta herencia" },
      { id: "d", text: "Solo SINGLE_TABLE" }
    ],
    correctAnswer: "a",
    explanation: "Estrategias: SINGLE_TABLE: todas las clases en 1 tabla, @DiscriminatorColumn diferencia tipos, eficiente queries, columnas null. JOINED: tabla por clase, JOINs para queries, normalizado. TABLE_PER_CLASS: tabla por clase con todas las columnas, UNION para polimorfismo, no recomendado. Elegir según: queries frecuentes (SINGLE_TABLE), normalización (JOINED), performance vs estructura."
  },

  // ===== BUSINESS ANALYST (250-269) =====
  // Preguntas prácticas para evaluar competencias de Business Analyst
  // NOTA: Opciones diseñadas para ser de longitud similar y todas plausibles
  
  // Tema 1: Estrategia de medicion y tracking (GA4/GTM)
  {
    id: 250,
    title: "Plan de medicion para nuevo checkout",
    category: "Medicion y Tracking",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Lanzas un nuevo checkout y Marketing pide \"medir todo\" en GA4. ¿Cual es la mejor siguiente accion como BA?",
    code: `Contexto del proyecto:

- Objetivo: subir conversion de compra +8%
- Herramientas: GA4 + Google Tag Manager
- Equipo dev: 2 sprints disponibles
- Stakeholders: Marketing, Producto, BI, Legal

Restricciones:
- No se puede enviar PII a GA4
- Debe quedar documentado para BI (BigQuery)`,
    options: [
      { id: "a", text: "Configurar todos los eventos automaticos de GA4 y agregar 50 eventos personalizados para cubrir cada click posible del checkout" },
      { id: "b", text: "Definir objetivos de negocio y KPIs, mapearlos a eventos/parametros GA4, crear un plan de medicion con dataLayer, y validar con Marketing/BI antes de implementar en GTM" },
      { id: "c", text: "Pedir al equipo de desarrollo que instrumente el checkout como lo considere conveniente y luego ajustar en GA4 con filtros y comparaciones" },
      { id: "d", text: "Crear primero dashboards en Looker Studio y luego pedir al equipo que agregue los eventos que falten" }
    ],
    correctAnswer: "b",
    explanation: "Un plan de medicion parte de objetivos y KPIs, define eventos/parametros y dataLayer, y alinea a Marketing/BI. Instrumentar sin plan genera ruido, datos incompletos y re-trabajo."
  },
  {
    id: 251,
    title: "Gobernanza de GTM en multiples equipos",
    category: "Medicion y Tracking",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Tres equipos modifican Google Tag Manager y los datos en GA4 son inconsistentes. ¿Que control implementas primero?",
    code: `Situacion actual:

- 3 equipos publican cambios en GTM sin coordinacion
- Eventos duplicados y nombres distintos para el mismo evento
- No hay ambientes de staging/produccion
- Cambios urgentes en campanas pagadas cada semana`,
    options: [
      { id: "a", text: "Bloquear accesos a GTM y dejar solo a Marketing con permisos de publicacion para evitar cambios frecuentes" },
      { id: "b", text: "Definir governance: naming convention, dataLayer spec, ambientes (dev/stage/prod), flujo de aprobacion y versionado con QA" },
      { id: "c", text: "Duplicar contenedores GTM por equipo para que cada uno pueda publicar sin afectar a los demas" },
      { id: "d", text: "Migrar toda la instrumentacion a codigo hardcode para evitar depender de GTM" }
    ],
    correctAnswer: "b",
    explanation: "GTM requiere governance: convenciones, dataLayer especifica, ambientes y aprobaciones. Eso reduce eventos duplicados y facilita QA sin bloquear operaciones."
  },

  // Tema 2: Modelado de eventos en GA4
  {
    id: 252,
    title: "Modelado de plan y cambios en GA4",
    category: "GA4 y Eventos",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El plan del usuario puede cambiar durante el checkout. BI necesita conversion por plan al momento de compra y Marketing audiencias por plan actual. ¿Que implementacion propones?",
    code: `Contexto:

- GA4 via GTM con dataLayer
- BI consume export a BigQuery
- Cambios de plan: upgrade/downgrade en cuenta
- Compra debe reflejar plan vigente en ese instante`,
    options: [
      { id: "a", text: "Solo user_property current_plan seteada al login; no enviar plan en eventos" },
      { id: "b", text: "Solo parametro plan en cada evento relevante, sin user properties" },
      { id: "c", text: "User_property current_plan + parametro plan_at_event en purchase y evento upgrade/downgrade; documentar dataLayer" },
      { id: "d", text: "Guardar plan solo en BigQuery con un join posterior y no tocar GA4" }
    ],
    correctAnswer: "c",
    explanation: "User properties sirven para audiencias y estado actual. El parametro en eventos captura el plan en el momento del evento para analisis en BigQuery."
  },
  {
    id: 253,
    title: "Naming y parametros de eventos",
    category: "GA4 y Eventos",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Necesitas medir clicks en un CTA principal del home con GA4. ¿Cual es la implementacion mas correcta?",
    code: `Contexto:

- CTA: "Probar gratis"
- Atributos requeridos por BI: texto, posicion, pagina
- Uso de GTM con dataLayer
- Requiere consistencia para BigQuery`,
    options: [
      { id: "a", text: "Evento: click | Parametros: element_id, element_text, page_location" },
      { id: "b", text: "Evento: cta_click | Parametros: cta_text, cta_position, page_location" },
      { id: "c", text: "Evento: home_click_probar_gratis | Parametros: ninguno (el nombre ya lo describe)" },
      { id: "d", text: "Evento: button_click | Parametros: color_boton, tamanio_boton, page_title" }
    ],
    correctAnswer: "b",
    explanation: "GA4 recomienda eventos con nombres genericos y parametros descriptivos. \"cta_click\" con parametros claros permite analisis consistente y escalable en BigQuery."
  },

  // Tema 3: Requisitos funcionales de medicion
  {
    id: 254,
    title: "Traduccion de necesidad de marketing a tracking",
    category: "Requisitos Funcionales",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Marketing pide: \"quiero ver conversiones por campana y audiencia en GA4 y Ads\". ¿Cual requisito funcional es mejor?",
    code: `Contexto:

- Inversion mensual ads: $120K
- Canales: Google Ads, Meta, Email
- Hay UTMs inconsistentes
- GA4 no esta enlazado con Google Ads`,
    options: [
      { id: "a", text: "Configurar UTMs en todas las campanas, enlazar GA4 con Google Ads, y registrar gclid/fbclid en dataLayer para atribucion y export a BigQuery" },
      { id: "b", text: "Crear un dashboard en GA4 con trafico por canal y pedir a Marketing que reporte conversiones manualmente" },
      { id: "c", text: "Instalar pixeles de Ads solo en la pagina de thank you y usar conversiones de cada plataforma" },
      { id: "d", text: "Activar el modelo de atribucion data-driven en GA4 y esperar 30 dias para que el sistema auto-corregir los datos" }
    ],
    correctAnswer: "a",
    explanation: "El requisito debe cubrir UTMs consistentes, link GA4-Ads y captura de identificadores para atribucion y BI. Sin eso, los reportes quedan incompletos."
  },
  {
    id: 255,
    title: "Criterios de aceptacion para tagging en GTM",
    category: "Requisitos Funcionales",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Debes escribir criterios de aceptacion para instrumentar el evento purchase en GA4 via GTM. ¿Cual set es mas completo y testeable?",
    code: `Reglas del negocio:

- Enviar evento purchase solo cuando se confirma pago
- Incluir transaction_id, value, currency, items
- No enviar datos personales
- Validar en ambiente de staging antes de prod`,
    options: [
      { id: "a", text: "DADO que un usuario complete una compra, CUANDO llega a la pagina de confirmacion, ENTONCES se envia el evento purchase a GA4" },
      { id: "b", text: "DADO pago confirmado, CUANDO el backend responde OK, ENTONCES dataLayer envia purchase con transaction_id/value/currency/items; Y DADO ambiente staging, CUANDO se prueba en GTM preview, ENTONCES el evento coincide con GA4 DebugView sin PII" },
      { id: "c", text: "DADO una venta, CUANDO el usuario ve el recibo, ENTONCES se activa un trigger de GTM que registra la venta en GA4" },
      { id: "d", text: "DADO que el usuario confirma la compra, CUANDO se ejecuta el tag, ENTONCES la compra aparece en el reporte de GA4" }
    ],
    correctAnswer: "b",
    explanation: "Los criterios deben incluir condiciones de disparo, parametros obligatorios, validacion en staging, y control de PII. La opcion B es testeable y completa."
  },

  // Tema 4: KPIs y analisis en GA4/BigQuery
  {
    id: 256,
    title: "Definir KPIs para campana paga",
    category: "KPIs y Metricas",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Lanzas una campana paga para aumentar ventas. ¿Cual set de KPIs es mas accionable?",
    code: `Objetivo de negocio:

- Incrementar ingresos netos en 3 meses
- Presupuesto: $200K
- Canales: Search, Display, Social
- Herramientas: GA4 + BigQuery + Ads`,
    options: [
      { id: "a", text: "Impresiones, clicks, CTR y CPC por canal" },
      { id: "b", text: "ROAS incremental, CAC por canal, conversion rate, revenue por usuario, y metricas guardrail (rebote, devoluciones)" },
      { id: "c", text: "Total de ventas, sesiones y paginas vistas por campana" },
      { id: "d", text: "Crecimiento de seguidores en redes sociales y share of voice" }
    ],
    correctAnswer: "b",
    explanation: "Los KPIs deben conectar negocio con performance y controlar efectos secundarios. ROAS incremental y CAC miden impacto real; guardrails evitan optimizar a costa de calidad."
  },
  {
    id: 257,
    title: "Interpretar funnel en GA4",
    category: "KPIs y Metricas",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El funnel en GA4 muestra gran caida entre add_to_cart y begin_checkout. ¿Que investigas primero?",
    code: `Datos del funnel (30 dias):

add_to_cart:      48,000
begin_checkout:  13,500 (-72%)
purchase:        10,800

Observaciones:
- Cambios recientes en UI del carrito
- Nuevos costos de envio
- Campanas de alto trafico social`,
    options: [
      { id: "a", text: "Revisar que add_to_cart y begin_checkout esten bien instrumentados, validar duplicados en GTM y confirmar que el evento begin_checkout se dispare en todos los flujos" },
      { id: "b", text: "Asumir que el problema es el metodo de pago y cambiarlo antes de investigar" },
      { id: "c", text: "Invertir mas en trafico para compensar la caida del funnel" },
      { id: "d", text: "Optimizar solo la pagina de confirmacion porque el purchase esta alto" }
    ],
    correctAnswer: "a",
    explanation: "Antes de decidir, valida calidad de datos y disparo de eventos. Un error de tagging puede simular caidas inexistentes. Luego analiza costos, UX y campanas."
  },

  // Tema 5: Priorizacion (MoSCoW, valor vs esfuerzo)
  {
    id: 258,
    title: "MoSCoW para backlog de tracking",
    category: "Priorizacion",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Tienes 2 sprints para instrumentar analitica en un e-commerce. ¿Como priorizas con MoSCoW?",
    code: `Backlog de tracking:

1) purchase, add_to_cart, begin_checkout
2) view_item y select_item
3) scroll_depth y video_play
4) view_promotion y select_promotion
5) search on-site`,
    options: [
      { id: "a", text: "Must: 1 | Should: 2 y 5 | Could: 4 | Won't: 3" },
      { id: "b", text: "Must: 1, 2, 4, 5 | Should: 3 | Could: ninguna" },
      { id: "c", text: "Must: 3 | Should: 4 | Could: 2 | Won't: 1" },
      { id: "d", text: "Must: 1 y 3 | Should: 2 | Could: 4 y 5" }
    ],
    correctAnswer: "a",
    explanation: "Los eventos de conversion (1) son imprescindibles. Navegacion y busqueda (2 y 5) ayudan a optimizar funnel. Promos (4) puede esperar. Scroll/video (3) es nice-to-have."
  },
  {
    id: 259,
    title: "Priorizacion tecnica de calidad de datos",
    category: "Priorizacion",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Tienes 2 sprints para mejorar calidad de datos en GA4/BigQuery. ¿Que orden es mas correcto?",
    code: `Backlog tecnico:

A) Purchase sin transaction_id consistente y currency incorrecta
B) Consent Mode v2 no implementado (perdida de datos)
C) Migracion completa a server-side tagging
D) Dashboard de performance por campana`,
    options: [
      { id: "a", text: "A → B → D → C" },
      { id: "b", text: "C → A → B → D" },
      { id: "c", text: "D → A → B → C" },
      { id: "d", text: "B → D → A → C" }
    ],
    correctAnswer: "a",
    explanation: "Primero se corrige revenue y consistencia (A), luego consentimiento para cobertura (B). El dashboard depende de datos confiables (D). Server-side completo es costoso y puede esperar (C)."
  },

  // Tema 6: BigQuery para GA4
  {
    id: 260,
    title: "Sesiones y compras por fuente en BigQuery",
    category: "BigQuery",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Quieres sesiones y compras por source/medium desde GA4 exportado a BigQuery. ¿Cual query es correcta?",
    code: `Tabla: analytics.events_*
Campos: event_name, user_pseudo_id, event_params, traffic_source.source, traffic_source.medium

Nota: ga_session_id esta en event_params`,
    options: [
      { id: "a", text: "SELECT source, medium, COUNT(*) AS sessions, COUNTIF(event_name='purchase') AS purchases FROM events GROUP BY 1,2" },
      { id: "b", text: "SELECT source, medium, COUNT(DISTINCT user_pseudo_id) AS sessions, COUNTIF(event_name='purchase') AS purchases FROM events GROUP BY 1,2" },
      { id: "c", text: "SELECT traffic_source.source, traffic_source.medium, COUNT(DISTINCT CONCAT(user_pseudo_id,'-',(SELECT value.int_value FROM UNNEST(event_params) WHERE key='ga_session_id'))) AS sessions, COUNTIF(event_name='purchase') AS purchases FROM events GROUP BY 1,2" },
      { id: "d", text: "SELECT source, medium, COUNT(DISTINCT event_timestamp) AS sessions, SUM(event_name='purchase') AS purchases FROM events GROUP BY 1,2" }
    ],
    correctAnswer: "c",
    explanation: "En GA4, sesiones se identifican por user_pseudo_id + ga_session_id. Contar filas o usuarios distorsiona el dato. COUNTIF purchase es valido para compras."
  },
  {
    id: 261,
    title: "Revenue de compras en BigQuery",
    category: "BigQuery",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Necesitas calcular revenue desde GA4 export en BigQuery. ¿Cual es el enfoque correcto?",
    code: `Evento purchase:

- event_name = 'purchase'
- value y currency en event_params
- items en event_params/items (array)

Requerimiento:
- Revenue total y por moneda`,
    options: [
      { id: "a", text: "SUM(event_value) desde todas las filas de events" },
      { id: "b", text: "SUM((SELECT value.double_value FROM UNNEST(event_params) WHERE key='value')) filtrando event_name='purchase' y agrupando por currency" },
      { id: "c", text: "COUNT(purchase) * ticket_promedio definido manualmente" },
      { id: "d", text: "SUM(item_revenue) sin filtrar por event_name" }
    ],
    correctAnswer: "b",
    explanation: "El revenue en GA4 viene en event_params del evento purchase. Debe filtrarse por purchase y agrupar por currency para evitar mezclar monedas."
  },

  // Tema 7: Comunicacion BA-equipo tecnico
  {
    id: 262,
    title: "Requisito de frescura de datos",
    category: "Comunicacion Tecnica",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Marketing exige \"datos en tiempo real\" para campanas. ¿Como lo traduces al equipo tecnico?",
    code: `Contexto:

- GA4 tiene retraso de procesamiento
- BigQuery export diario y streaming disponible
- SLA de negocio: reaccionar a caidas de performance`,
    options: [
      { id: "a", text: "Comunicar que se usara GA4 Realtime y que eso cumple con tiempo real sin definir tiempos" },
      { id: "b", text: "Definir SLA: reportes con latencia <=15 min para sesiones y conversiones; explicitar limites de GA4 y usar export streaming a BigQuery para dashboards" },
      { id: "c", text: "Pedir a Marketing que ajuste sus expectativas porque GA4 no es tiempo real" },
      { id: "d", text: "Implementar cualquier solucion tecnica y luego informar resultados" }
    ],
    correctAnswer: "b",
    explanation: "El BA debe convertir \"tiempo real\" en SLA medible, explicando limites de GA4 y proponiendo la via tecnica (streaming a BigQuery)."
  },
  {
    id: 263,
    title: "Desacuerdo sobre server-side tagging",
    category: "Comunicacion Tecnica",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Seguridad quiere server-side tagging; Marketing prefiere client-side por velocidad. ¿Como facilitas la decision?",
    code: `Posiciones:

- Seguridad: reducir bloqueo de cookies y PII
- Marketing: rapidez en cambios y menor costo
- Dev: capacidad limitada para mantener infraestructura`,
    options: [
      { id: "a", text: "Adoptar server-side para cumplir seguridad, sin analizar impacto" },
      { id: "b", text: "Analizar casos de uso, costos y beneficios; proponer piloto server-side para eventos criticos (purchase) y mantener client-side para eventos de bajo riesgo" },
      { id: "c", text: "Mantener client-side porque es mas rapido para Marketing" },
      { id: "d", text: "Escalar al CFO para que decida segun presupuesto" }
    ],
    correctAnswer: "b",
    explanation: "El BA debe balancear riesgos y valor. Un piloto con eventos criticos permite validar sin comprometer velocidad ni costos."
  },

  // Tema 8: Manejo de cambios
  {
    id: 264,
    title: "Cambio de dataLayer en produccion",
    category: "Manejo de Cambios",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Producto quiere renombrar un parametro de dataLayer usado por GA4 y BigQuery. ¿Que haces primero?",
    code: `Parametro actual:

- dataLayer: { ecommerce: { transaction_id } }
- Usado en GTM, GA4, BigQuery, dashboards
- Partners externos consumen el export`,
    options: [
      { id: "a", text: "Cambiar el parametro en GTM y avisar despues a BI" },
      { id: "b", text: "Hacer analisis de impacto, definir plan de migracion con periodo de doble escritura, actualizar documentacion y coordinar con BI/partners" },
      { id: "c", text: "Crear un nuevo parametro y dejar el viejo indefinidamente" },
      { id: "d", text: "Rechazar el cambio porque afecta reportes existentes" }
    ],
    correctAnswer: "b",
    explanation: "Cambios en dataLayer impactan multiples consumidores. Se requiere analisis de impacto y plan de migracion con doble escritura para evitar perdida de datos."
  },
  {
    id: 265,
    title: "Impacto de cambio en UTMs",
    category: "Manejo de Cambios",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Marketing quiere cambiar la convencion de UTMs de inmediato. ¿Que analisis de impacto es correcto?",
    code: `Actual:

- utm_campaign: black_friday_2024
- utm_source/medium consistentes

Propuesto:
- utm_campaign: bf24_nov
- Nuevos valores para source/medium`,
    options: [
      { id: "a", text: "Cambiarlo sin aviso porque UTMs solo afectan Ads y no BI" },
      { id: "b", text: "Evaluar impacto en reportes historicos, modelos de atribucion, dashboards y alertas; definir mapeo y periodo de coexistencia" },
      { id: "c", text: "Aprobarlo y pedir a BI que ajuste cuando tenga tiempo" },
      { id: "d", text: "Bloquear cualquier cambio de UTMs para mantener consistencia" }
    ],
    correctAnswer: "b",
    explanation: "UTMs impactan historicos, atribucion y dashboards. Se requiere mapeo y plan de transicion para comparabilidad."
  },

  // Tema 9: Pensamiento critico y experimentacion
  {
    id: 266,
    title: "Medir impacto de campanas con inferencia",
    category: "Pensamiento Critico",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Necesitas demostrar el impacto incremental de una campana. ¿Cual enfoque es mas riguroso?",
    code: `Situacion:

- Campana nacional de 4 semanas
- No hay grupos de control directos
- Datos en GA4 y BigQuery`,
    options: [
      { id: "a", text: "Comparar ventas antes y despues de la campana y atribuir toda la diferencia a la publicidad" },
      { id: "b", text: "Usar un holdout geografico o temporal y aplicar diferencia en diferencias para estimar el lift" },
      { id: "c", text: "Tomar el total de conversiones reportadas por la plataforma de Ads" },
      { id: "d", text: "Pedir feedback cualitativo a clientes para validar impacto" }
    ],
    correctAnswer: "b",
    explanation: "El enfoque con holdout y diferencia en diferencias reduce sesgos y permite inferencia causal mas solida que comparaciones simples."
  },
  {
    id: 267,
    title: "Evaluar herramienta de atribucion",
    category: "Pensamiento Critico",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Un vendor promete \"atribucion con IA\" y +30% de ROAS. ¿Que preguntas haces antes de comprar?",
    code: `Propuesta:

- Modelo propietario con IA
- Requiere acceso a GA4 y Ads
- Costo: $8K/mes
- Promesa: +30% ROAS`,
    options: [
      { id: "a", text: "Aceptar porque el incremento de ROAS justifica el costo" },
      { id: "b", text: "Preguntar metodologia de incrementalidad, datos requeridos, baseline, sesgos, y como validan causalidad vs correlacion" },
      { id: "c", text: "Rechazar porque los modelos de atribucion siempre son inexactos" },
      { id: "d", text: "Comprar y evaluar despues de 3 meses" }
    ],
    correctAnswer: "b",
    explanation: "El BA debe cuestionar metodologia, baseline y validez causal. Promesas sin evidencia pueden no ser incrementales."
  },

  // Tema 10: Datos incompletos y requisitos ambiguos
  {
    id: 268,
    title: "Datos incompletos por consentimiento",
    category: "Datos Incompletos",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "El 35% de usuarios rechaza cookies y el funnel de GA4 queda incompleto. ¿Como procedes?",
    code: `Contexto:

- Consent mode activo
- Caida de conversion en GA4
- BI necesita reportes consistentes`,
    options: [
      { id: "a", text: "Ignorar a los usuarios sin consentimiento y reportar solo el 65% restante" },
      { id: "b", text: "Documentar sesgo, usar modelado (Consent Mode), contrastar con datos de backend/CRM y reportar rangos" },
      { id: "c", text: "Desactivar el banner de cookies para recuperar datos completos" },
      { id: "d", text: "Duplicar tags para intentar capturar datos sin consentimiento" }
    ],
    correctAnswer: "b",
    explanation: "Se debe reconocer sesgo, usar modelado permitido y triangulacion con fuentes backend para reportes mas confiables."
  },
  {
    id: 269,
    title: "Requisito ambiguo de impacto publicitario",
    category: "Datos Incompletos",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El CMO dice: \"quiero saber el impacto real de las campanas\". Tienes reunion en 2 horas. ¿Como preparas la sesion?",
    code: `Datos disponibles:

- GA4 con eventos de conversion
- BigQuery export diario
- Campanas en Ads con UTMs inconsistentes
- Presupuesto anual alto`,
    options: [
      { id: "a", text: "Llegar con un dashboard basico y esperar que el CMO defina el resto" },
      { id: "b", text: "Preparar una estructura: objetivos de negocio, KPIs (ROAS incremental, CAC), diseno experimental (holdout/A-B), requerimientos de UTMs y plan de medicion" },
      { id: "c", text: "Pedir al equipo tecnico que defina el metodo estadistico sin involucrar al CMO" },
      { id: "d", text: "Prometer resultados inmediatos con el modelo de atribucion por default" }
    ],
    correctAnswer: "b",
    explanation: "Un requisito ambiguo requiere estructura: objetivos, KPIs, metodo de inferencia y calidad de datos. Eso alinea expectativas y habilita decisiones."
  }
,

  // ===== MOBILE DEV (Flutter/Android/iOS) =====
  // Preguntas practicas con enfoque tecnico (Intermedio/Avanzado)

  // --- Flutter (270-276) ---
  {
    id: 270,
    title: "Flutter - Estado no reactivo en UI",
    category: "Flutter",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El contador no se actualiza en pantalla. ¿Cual es la correccion correcta?",
    code: `class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        count++;
      },
      child: Text('Count: $count'),
    );
  }
}`,
    options: [
      { id: "a", text: "Mover count a una variable local dentro de build()" },
      { id: "b", text: "Usar setState(() { count++; }) dentro de onPressed" },
      { id: "c", text: "Cambiar ElevatedButton por GestureDetector" },
      { id: "d", text: "Hacer count static para compartir el estado" }
    ],
    correctAnswer: "b",
    explanation: "Sin setState no hay rebuild. El estado debe actualizarse dentro de setState para que el widget se redibuje."
  },
  {
    id: 271,
    title: "Flutter - FutureBuilder y null safety",
    category: "Flutter",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Este widget lanza una excepcion al iniciar. ¿Que cambio evita el crash?",
    code: `FutureBuilder<List<String>>(
  future: fetchItems(),
  builder: (context, snapshot) {
    return ListView.builder(
      itemCount: snapshot.data!.length,
      itemBuilder: (_, i) => Text(snapshot.data![i]),
    );
  },
);`,
    options: [
      { id: "a", text: "Usar snapshot.data ?? [] y verificar snapshot.hasData antes" },
      { id: "b", text: "Cambiar FutureBuilder por StreamBuilder" },
      { id: "c", text: "Hacer fetchItems() sincronico" },
      { id: "d", text: "Eliminar itemCount para que sea infinito" }
    ],
    correctAnswer: "a",
    explanation: "Al inicio snapshot.data es null. Se debe validar snapshot.hasData y/o usar un fallback antes de acceder."
  },
  {
    id: 272,
    title: "Flutter - setState dentro de build",
    category: "Flutter",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Este codigo genera un loop de builds. ¿Cual es la causa?",
    code: `@override
Widget build(BuildContext context) {
  setState(() {
    total = items.length;
  });
  return Text('Total: $total');
}`,
    options: [
      { id: "a", text: "setState en build provoca renders infinitos" },
      { id: "b", text: "items.length es O(n)" },
      { id: "c", text: "Text no puede renderizar enteros" },
      { id: "d", text: "Debe usarse StatelessWidget" }
    ],
    correctAnswer: "a",
    explanation: "build no debe disparar setState; eso provoca un ciclo de render infinito."
  },
  {
    id: 273,
    title: "Flutter - dispose de AnimationController",
    category: "Flutter",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El siguiente widget muestra un warning de fuga. ¿Que falta?",
    code: `class FadeBox extends State<FadeBox> with SingleTickerProviderStateMixin {
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(vsync: this, duration: Duration(seconds: 1));
  }

  @override
  Widget build(BuildContext context) => FadeTransition(opacity: controller, child: Container());
}`,
    options: [
      { id: "a", text: "Llamar controller.forward() en build" },
      { id: "b", text: "Agregar dispose() y llamar controller.dispose()" },
      { id: "c", text: "Eliminar SingleTickerProviderStateMixin" },
      { id: "d", text: "Cambiar AnimationController por Tween" }
    ],
    correctAnswer: "b",
    explanation: "Los controllers deben liberarse en dispose() para evitar fugas."
  },
  {
    id: 274,
    title: "Flutter - ListView con estado",
    category: "Flutter",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Los switches pierden su estado al hacer scroll. ¿Como se corrige?",
    code: `ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, i) {
    return SwitchListTile(
      value: items[i].enabled,
      onChanged: (v) => setState(() => items[i].enabled = v),
      title: Text(items[i].name),
    );
  },
);`,
    options: [
      { id: "a", text: "Agregar Key unica por item (ValueKey)" },
      { id: "b", text: "Cambiar a ListView.separated" },
      { id: "c", text: "Usar const en SwitchListTile" },
      { id: "d", text: "Mover items a una variable local" }
    ],
    correctAnswer: "a",
    explanation: "Sin keys estables, el reciclado de celdas puede mezclar estados. ValueKey mantiene el estado por item."
  },
  {
    id: 275,
    title: "Flutter - Context y Navigator",
    category: "Flutter",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Este pop falla con \"Looking up a deactivated widget\". ¿Cual es la solucion?",
    code: `void onSave() async {
  await saveData();
  Navigator.of(context).pop();
}`,
    options: [
      { id: "a", text: "Usar if (!mounted) return; antes de Navigator.pop" },
      { id: "b", text: "Usar Navigator.pop(context) dentro de initState" },
      { id: "c", text: "Eliminar await saveData()" },
      { id: "d", text: "Usar WidgetsBinding.instance.addPostFrameCallback" }
    ],
    correctAnswer: "a",
    explanation: "Tras await, el widget puede estar desmontado. Se debe validar mounted antes de usar context."
  },
  {
    id: 276,
    title: "Flutter - Isolate para trabajo pesado",
    category: "Flutter",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "El parsing bloquea la UI. ¿Que cambio es correcto?",
    code: `final result = parseHugeJson(raw); // tarda 2s
setState(() => data = result);`,
    options: [
      { id: "a", text: "Mover el parseo a compute() o a un Isolate" },
      { id: "b", text: "Usar setState async" },
      { id: "c", text: "Ejecutar parseHugeJson en build()" },
      { id: "d", text: "Cambiar JSON por Map literal" }
    ],
    correctAnswer: "a",
    explanation: "Trabajo pesado debe ir a un isolate para no bloquear el hilo principal."
  },

  // --- Android (277-283) ---
  {
    id: 277,
    title: "Android - Coroutines y thread principal",
    category: "Android",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "La UI se congela al ejecutar esta funcion. ¿Que cambio es correcto?",
    code: `fun load() {
  GlobalScope.launch(Dispatchers.Main) {
    val data = api.fetch() // llamada de red
    textView.text = data
  }
}`,
    options: [
      { id: "a", text: "Cambiar a Dispatchers.IO para la llamada y volver a Main" },
      { id: "b", text: "Usar Thread.sleep() para esperar" },
      { id: "c", text: "Mover la llamada a onCreate" },
      { id: "d", text: "Eliminar coroutine y usar blocking call" }
    ],
    correctAnswer: "a",
    explanation: "La red debe ejecutarse en IO y luego actualizar UI en Main."
  },
  {
    id: 278,
    title: "Android - LiveData no actualiza",
    category: "Android",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "La UI no observa cambios. ¿Cual es el error?",
    code: `val items = MutableLiveData<List<String>>()

fun addItem(v: String) {
  val current = items.value ?: emptyList()
  current.toMutableList().add(v)
  items.value = current
}`,
    options: [
      { id: "a", text: "items.value debe asignarse a la nueva lista mutable" },
      { id: "b", text: "Se debe usar setValue desde background" },
      { id: "c", text: "LiveData no soporta listas" },
      { id: "d", text: "Debe ser LiveData sin Mutable" }
    ],
    correctAnswer: "a",
    explanation: "Se crea una lista mutable pero no se asigna. Debe publicarse la nueva lista para notificar cambios."
  },
  {
    id: 279,
    title: "Android - RecyclerView diff",
    category: "Android",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "El adapter no actualiza cambios parciales. ¿Que usar?",
    code: `class UserAdapter : RecyclerView.Adapter<ViewHolder>() {
  var items: List<User> = emptyList()
  fun submit(list: List<User>) {
    items = list
    notifyDataSetChanged()
  }
}`,
    options: [
      { id: "a", text: "Usar DiffUtil y ListAdapter" },
      { id: "b", text: "Usar notifyItemInserted siempre" },
      { id: "c", text: "Hacer items mutable" },
      { id: "d", text: "Mover notifyDataSetChanged a onBindViewHolder" }
    ],
    correctAnswer: "a",
    explanation: "DiffUtil calcula cambios y evita redraw completo. ListAdapter lo integra."
  },
  {
    id: 280,
    title: "Android - Room y suspend",
    category: "Android",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Esta consulta bloquea la UI. ¿Cual es la solucion correcta?",
    code: `@Query("SELECT * FROM orders")
fun getOrders(): List<Order>`,
    options: [
      { id: "a", text: "Cambiar a suspend fun getOrders(): List<Order>" },
      { id: "b", text: "Usar allowMainThreadQueries" },
      { id: "c", text: "Mover la query al Application" },
      { id: "d", text: "Hacer la tabla @Transaction" }
    ],
    correctAnswer: "a",
    explanation: "Room debe ejecutar queries fuera del main thread; usar suspend o Flow."
  },
  {
    id: 281,
    title: "Android - Lifecycle y coroutines",
    category: "Android",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Hay fugas porque la coroutine vive mas que el Activity. ¿Que cambio es correcto?",
    code: `GlobalScope.launch {
  val data = api.fetch()
  runOnUiThread { textView.text = data }
}`,
    options: [
      { id: "a", text: "Usar lifecycleScope.launch para atar al ciclo de vida" },
      { id: "b", text: "Usar Thread en vez de coroutine" },
      { id: "c", text: "Hacer textView nullable" },
      { id: "d", text: "Cambiar a Dispatchers.Default" }
    ],
    correctAnswer: "a",
    explanation: "lifecycleScope cancela automaticamente cuando el Activity/Fragment se destruye."
  },
  {
    id: 282,
    title: "Android - ViewModel y state",
    category: "Android",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "El estado se pierde al rotar. ¿Cual es la solucion?",
    code: `class LoginActivity : AppCompatActivity() {
  var email = ""
}`,
    options: [
      { id: "a", text: "Mover estado a ViewModel" },
      { id: "b", text: "Usar onDestroy" },
      { id: "c", text: "Hacer email companion object" },
      { id: "d", text: "Desactivar la rotacion" }
    ],
    correctAnswer: "a",
    explanation: "ViewModel sobrevive a cambios de configuracion y mantiene el estado."
  },
  {
    id: 283,
    title: "Android - Network en strict mode",
    category: "Android",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Se lanza NetworkOnMainThreadException. ¿Cual es la solucion correcta?",
    code: `val response = URL(url).readText()
textView.text = response`,
    options: [
      { id: "a", text: "Mover la llamada a IO (coroutine/Executor)" },
      { id: "b", text: "Agregar StrictMode permitAll()" },
      { id: "c", text: "Aumentar timeout" },
      { id: "d", text: "Usar runBlocking en Main" }
    ],
    correctAnswer: "a",
    explanation: "Las operaciones de red deben ir fuera del main thread para evitar bloqueos."
  },

  // --- iOS (284-290) ---
  {
    id: 284,
    title: "iOS - Captura de self en closures",
    category: "iOS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Este codigo filtra pero genera memory leak. ¿Cual es la correccion?",
    code: `class UsersVC: UIViewController {
  var users: [User] = []
  func load() {
    api.fetch { result in
      self.users = result
      self.tableView.reloadData()
    }
  }
}`,
    options: [
      { id: "a", text: "Usar [weak self] en el closure" },
      { id: "b", text: "Hacer users static" },
      { id: "c", text: "Mover reloadData a viewDidAppear" },
      { id: "d", text: "Usar guard let self = self fuera del closure" }
    ],
    correctAnswer: "a",
    explanation: "El closure retiene a self; usar [weak self] evita ciclos de retencion."
  },
  {
    id: 285,
    title: "iOS - UITableView y datasource",
    category: "iOS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "La app crashea con index out of range. ¿Cual es el fix correcto?",
    code: `func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
  cell.textLabel?.text = items[indexPath.row]
  return cell
}

func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
  return items.count - 1
}`,
    options: [
      { id: "a", text: "Hacer numberOfRowsInSection retornar items.count" },
      { id: "b", text: "Usar items.first en cellForRowAt" },
      { id: "c", text: "Restar 2 al count" },
      { id: "d", text: "Cambiar a UICollectionView" }
    ],
    correctAnswer: "a",
    explanation: "El datasource debe retornar el mismo numero de filas que accesos en cellForRowAt."
  },
  {
    id: 286,
    title: "iOS - DispatchQueue y UI",
    category: "iOS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Este codigo a veces no actualiza la UI. ¿Que falta?",
    code: `DispatchQueue.global().async {
  let data = loadData()
  self.label.text = data
}`,
    options: [
      { id: "a", text: "Actualizar UI en DispatchQueue.main.async" },
      { id: "b", text: "Cambiar a DispatchQueue.global(qos: .background)" },
      { id: "c", text: "Hacer label weak" },
      { id: "d", text: "Usar OperationQueue" }
    ],
    correctAnswer: "a",
    explanation: "La UI solo puede actualizarse en el main thread."
  },
  {
    id: 287,
    title: "iOS - Optionals y crash",
    category: "iOS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Este codigo crashea en produccion. ¿Cual es el fix correcto?",
    code: `let userId: String? = fetchId()
let token = "Bearer \(userId!)"`,
    options: [
      { id: "a", text: "Usar guard let id = userId else { return }" },
      { id: "b", text: "Usar ?? '' sin validar" },
      { id: "c", text: "Convertir a Int" },
      { id: "d", text: "Hacer userId global" }
    ],
    correctAnswer: "a",
    explanation: "Force unwrap puede crashear. guard let valida y evita nil."
  },
  {
    id: 288,
    title: "iOS - Auto Layout constraints",
    category: "iOS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Al crear vistas programaticamente, no aparecen. ¿Que falta?",
    code: `let view = UIView()
container.addSubview(view)
NSLayoutConstraint.activate([
  view.leadingAnchor.constraint(equalTo: container.leadingAnchor),
  view.trailingAnchor.constraint(equalTo: container.trailingAnchor)
])`,
    options: [
      { id: "a", text: "Asignar view.translatesAutoresizingMaskIntoConstraints = false" },
      { id: "b", text: "Usar frame en vez de constraints" },
      { id: "c", text: "Llamar layoutIfNeeded en view" },
      { id: "d", text: "Agregar heightAnchor primero" }
    ],
    correctAnswer: "a",
    explanation: "Sin desactivar autoresizing, las constraints no aplican correctamente."
  },
  {
    id: 289,
    title: "iOS - Reutilizacion de celdas",
    category: "iOS",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Las celdas muestran imagenes incorrectas. ¿Que cambio es correcto?",
    code: `func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as! UserCell
  cell.avatar.image = UIImage(named: users[indexPath.row].avatar)
  return cell
}`,
    options: [
      { id: "a", text: "Resetear imagen en prepareForReuse" },
      { id: "b", text: "Desactivar reuseIdentifier" },
      { id: "c", text: "Usar static cells" },
      { id: "d", text: "Cambiar a collection view" }
    ],
    correctAnswer: "a",
    explanation: "Las celdas se reutilizan; se debe limpiar estado en prepareForReuse."
  },
  {
    id: 290,
    title: "iOS - URLSession y parseo",
    category: "iOS",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Este parseo falla con data vacia. ¿Que validacion falta?",
    code: `URLSession.shared.dataTask(with: url) { data, _, _ in
  let items = try! JSONDecoder().decode([Item].self, from: data!)
  self.items = items
}.resume()`,
    options: [
      { id: "a", text: "Validar data != nil y manejar error antes de decode" },
      { id: "b", text: "Cambiar a URLSessionConfiguration" },
      { id: "c", text: "Usar JSONSerialization" },
      { id: "d", text: "Hacer items var global" }
    ],
    correctAnswer: "a",
    explanation: "data puede ser nil o invalida; se debe validar y manejar errores antes del decode."
  },

  // ===== PRODUCT DESIGNER (291-311) = 21 preguntas =====
  // 7 Básico + 7 Intermedio + 7 Avanzado

  // --- Nivel Básico (291-297) ---
  {
    id: 291,
    title: "Discovery - Creacion de User Personas",
    category: "Proceso UX",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "El PM te pide crear personas para un nuevo producto B2B. ¿Cual es el enfoque mas efectivo dado el contexto?",
    code: `Contexto:
- Producto B2B de gestion de inventario
- Tienes acceso a 5 usuarios actuales
- Deadline: 1 semana`,
    options: [
      { id: "a", text: "Realizar una encuesta online a los 5 usuarios para recopilar datos demograficos y preferencias de forma eficiente" },
      { id: "b", text: "Entrevistar a los 5 usuarios, identificar patrones de comportamiento y necesidades, y crear 2-3 personas basadas en esos datos" },
      { id: "c", text: "Analizar los datos de uso del producto actual y crear personas basadas en segmentos de comportamiento sin contacto directo" },
      { id: "d", text: "Facilitar un workshop con el equipo interno (ventas, soporte) para consolidar su conocimiento sobre los tipos de usuarios" }
    ],
    correctAnswer: "b",
    explanation: "Con solo 5 usuarios, las entrevistas en profundidad son mas valiosas que encuestas. Los workshops internos (d) aportan pero no reemplazan la voz del usuario. El analisis de datos (c) complementa pero no captura motivaciones. Las encuestas (a) pierden profundidad con muestras pequeñas."
  },
  {
    id: 292,
    title: "Jerarquia visual en UI",
    category: "Fundamentos UX/UI",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "En una pantalla de checkout, ¿como estableces la jerarquia visual correcta?",
    code: `Elementos a mostrar:
- Resumen del pedido
- Boton de pago (CTA principal)
- Terminos y condiciones
- Boton para agregar cupon`,
    options: [
      { id: "a", text: "Resumen del pedido prominente arriba, CTA de pago y cupon con igual peso visual para dar opciones claras, terminos al final" },
      { id: "b", text: "CTA de pago con mayor contraste y tamaño, cupon como link secundario, terminos visibles pero con menor peso visual" },
      { id: "c", text: "Cupon destacado para incentivar su uso y reducir abandono, CTA de pago secundario, resumen colapsable" },
      { id: "d", text: "Todos los elementos con tamaño similar pero usando iconos para diferenciarlos y mantener limpieza visual" }
    ],
    correctAnswer: "b",
    explanation: "La jerarquia debe guiar hacia la conversion. El CTA de pago es la accion principal y debe destacar. Dar igual peso al cupon (a,c) puede distraer del objetivo. Iconos sin jerarquia de tamaño (d) no establecen prioridad clara."
  },
  {
    id: 293,
    title: "Design Tokens - Concepto basico",
    category: "Design Systems",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "Tu equipo necesita mantener consistencia entre web y mobile. ¿Que solucion es mas escalable?",
    code: `Contexto:
- Equipo de 3 designers
- 2 productos (web y mobile)
- Desarrollo en React y Swift
- Cambios de marca frecuentes`,
    options: [
      { id: "a", text: "Crear una libreria de componentes compartida en Figma con estilos vinculados entre archivos" },
      { id: "b", text: "Implementar Design Tokens: variables semanticas (colores, spacing, typography) exportables a CSS/Swift que se actualizan desde una fuente unica" },
      { id: "c", text: "Documentar todas las especificaciones en un PDF de guia de estilos que desarrollo consulte" },
      { id: "d", text: "Usar los mismos valores hexadecimales y pixeles en ambos proyectos, documentados en Confluence" }
    ],
    correctAnswer: "b",
    explanation: "Los Design Tokens permiten cambios centralizados que se propagan a todas las plataformas. Una libreria Figma (a) ayuda a designers pero no conecta con codigo. PDFs (c) y documentacion estatica (d) requieren actualizacion manual y generan inconsistencias."
  },
  {
    id: 294,
    title: "Hotjar - Interpretacion de heatmaps",
    category: "Research",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "El heatmap de clicks muestra alta concentracion en una imagen decorativa y pocos clicks en el CTA. ¿Cual es la interpretacion correcta?",
    code: `Datos del heatmap:
- 847 clicks en imagen de producto (no enlazada)
- 156 clicks en CTA "Comprar ahora"
- 423 clicks en texto del precio
- Scroll depth: 78% llega al CTA`,
    options: [
      { id: "a", text: "Los usuarios prefieren ver imagenes antes de comprar, debemos agregar mas fotos del producto" },
      { id: "b", text: "La imagen y el precio tienen affordance de clickeables; considerar hacerlos interactivos o rediseñar el CTA para que destaque mas" },
      { id: "c", text: "El CTA esta mal posicionado, debemos moverlo arriba del fold donde hay mas atencion" },
      { id: "d", text: "Los usuarios estan confundidos, debemos simplificar la pagina removiendo elementos distractores" }
    ],
    correctAnswer: "b",
    explanation: "Clicks en elementos no interactivos revelan expectativas incumplidas (false affordance). El scroll depth muestra que ven el CTA pero no clickean. Mover el CTA (c) no resuelve el problema de affordance. Agregar fotos (a) o simplificar (d) no abordan el hallazgo principal."
  },
  {
    id: 295,
    title: "Miro - User Journey Mapping",
    category: "Proceso UX",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "Vas a facilitar una sesion de User Journey Mapping en Miro. ¿Cual preparacion maximiza el valor del tiempo del equipo?",
    code: `Objetivo:
- Mapear experiencia de compra actual
- Participantes: PM, CS, Dev Lead, Marketing
- Duracion: 90 minutos
- Tienes datos de 12 entrevistas recientes`,
    options: [
      { id: "a", text: "Preparar el journey completo basado en las entrevistas y usar la sesion para que el equipo agregue su perspectiva interna" },
      { id: "b", text: "Crear template con fases, filas para acciones/emociones/pain points, y citas textuales de usuarios como puntos de partida para discusion" },
      { id: "c", text: "Diseñar actividades de ideacion (crazy 8s, dot voting) para que el equipo proponga mejoras al journey actual" },
      { id: "d", text: "Compartir el board vacio con estructura basica y asignar a cada participante una fase para que investiguen antes de la sesion" }
    ],
    correctAnswer: "b",
    explanation: "El template da estructura pero el contenido se construye colaborativamente. Traer un journey pre-hecho (a) limita participacion. Ideacion (c) es prematura sin mapear el estado actual. Asignar investigacion (d) fragmenta la vision compartida."
  },
  {
    id: 296,
    title: "Notion - Documentacion de proyecto de diseño",
    category: "Colaboracion",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "El equipo usa Notion para documentar proyectos. ¿Cual estructura de documentacion es mas efectiva para un proyecto de 6 semanas?",
    code: `Proyecto:
- Rediseño de flujo de registro
- Equipo: 1 PM, 2 devs, 1 designer (tu)
- Duracion estimada: 6 semanas`,
    options: [
      { id: "a", text: "Una pagina con embeds de Figma actualizados automaticamente, changelog de versiones y comentarios del equipo integrados" },
      { id: "b", text: "Objetivo y metricas de exito, decision log con rationale, links a research y diseños, status semanal y proximos pasos" },
      { id: "c", text: "Espejo del PRD con seccion adicional de diseño, specs detalladas por componente y enlaces a tickets de Jira relacionados" },
      { id: "d", text: "Wiki estructurada por fase (discovery, design, handoff) con templates estandarizados del equipo de diseño" }
    ],
    correctAnswer: "b",
    explanation: "La documentacion debe capturar el 'por que' de las decisiones, no solo el 'que'. Embeds de Figma (a) muestran estado actual pero no contexto. Espejar el PRD (c) duplica sin agregar valor de diseño. Estructura por fases (d) puede fragmentar la narrativa del proyecto."
  },
  {
    id: 297,
    title: "Feedback de diseño - Recepcion",
    category: "Soft Skills",
    difficulty: "Básico",
    timeLimit: TIME_LIMITS["Básico"],
    question: "Un stakeholder critica tu diseño diciendo 'no me gusta el color'. El color sigue la guia de marca. ¿Como respondes?",
    code: `Contexto:
- Reunion de revision de diseño
- El color fue elegido siguiendo la guia de marca
- El stakeholder es el Director de Marketing
- Otros asistentes esperan tu respuesta`,
    options: [
      { id: "a", text: "Agradecer el feedback, explicar que el color viene de la guia de marca, y ofrecer explorar variaciones dentro de la paleta aprobada" },
      { id: "b", text: "Preguntar: '¿Que sensacion te genera? ¿En que contexto especifico no funciona?' para entender la preocupacion antes de responder" },
      { id: "c", text: "Anotar el feedback, continuar la reunion, y enviar opciones alternativas por email para no alargar la sesion" },
      { id: "d", text: "Mostrar ejemplos de competidores y benchmarks que usan colores similares para validar la decision" }
    ],
    correctAnswer: "b",
    explanation: "Indagar primero permite entender si el problema es el color especifico, el contraste, el contexto de uso, o algo mas profundo. Defender con guia de marca (a) o benchmarks (d) cierra la conversacion prematuramente. Diferir (c) no aprovecha el momento para alinear."
  },

  // --- Nivel Intermedio (298-304) ---
  {
    id: 298,
    title: "Figma - Variantes y propiedades",
    category: "Figma",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Necesitas crear un componente de boton con multiples estados y tamaños. ¿Cual estructura optimiza mantenibilidad y usabilidad?",
    code: `Requerimientos:
- 3 tamaños: S, M, L
- 4 estados: default, hover, pressed, disabled
- 2 tipos: primary, secondary
- El equipo tiene 8 designers`,
    options: [
      { id: "a", text: "Un componente base con variantes solo para Type, usando interactive components para estados y Auto Layout con constraints para tamaños" },
      { id: "b", text: "Un componente con 3 propiedades explicitas (Size, State, Type) como variantes, mostrando todas las combinaciones en el panel de propiedades" },
      { id: "c", text: "Componentes separados por Type (ButtonPrimary, ButtonSecondary) cada uno con variantes de Size, y estados manejados con interactive components" },
      { id: "d", text: "Un componente con slots usando component properties para icono y texto, Size como variante, y State/Type como boolean properties" }
    ],
    correctAnswer: "b",
    explanation: "Variantes explicitas para las 3 dimensiones dan visibilidad completa a los designers. Interactive components (a,c) ocultan estados del panel. Separar por Type (c) duplica mantenimiento. Boolean properties (d) no escalan bien para 4 estados."
  },
  {
    id: 299,
    title: "Maze - Diseño de test de usabilidad",
    category: "Research",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Vas a testear un nuevo flujo de checkout en Maze con 50 participantes remotos. ¿Cual diseño de test maximiza insights accionables?",
    code: `Objetivos:
- Validar que usuarios completen el checkout
- Identificar puntos de friccion
- Obtener feedback cualitativo
- Tiempo estimado por participante: 10 min`,
    options: [
      { id: "a", text: "3 misiones secuenciales (agregar producto, checkout, confirmar) con opinion scale al final de cada una y pregunta abierta al cierre" },
      { id: "b", text: "1 mision end-to-end con expected path definido, metricas de misclicks/tiempo por pantalla, y preguntas contextuales en puntos de decision clave" },
      { id: "c", text: "Test A/B con dos versiones del checkout, cada participante ve una, comparando completion rates entre variantes" },
      { id: "d", text: "Mision abierta 'completa una compra' sin path esperado para no sesgar, seguida de System Usability Scale (SUS) al final" }
    ],
    correctAnswer: "b",
    explanation: "Un expected path permite medir desviaciones y identificar fricciones especificas. Misiones separadas (a) fragmentan el flujo natural. A/B (c) requiere mas participantes para significancia. Sin path esperado (d) dificulta identificar donde ocurren problemas."
  },
  {
    id: 300,
    title: "Design System - Documentacion de componentes",
    category: "Design Systems",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Estas documentando un componente Card para el Design System. ¿Cual enfoque balancea completitud con mantenibilidad?",
    code: `Componente: Card de producto
Usuarios: 5 designers, 12 developers
Contexto: E-commerce con 3 productos
Problema actual: docs desactualizadas`,
    options: [
      { id: "a", text: "Embed del componente Figma con auto-sync, props listadas automaticamente desde codigo, y un canal de Slack para dudas" },
      { id: "b", text: "Anatomia visual, casos de uso con ejemplos, estados y variantes, do's/don'ts, specs de accesibilidad, todo versionado junto al codigo" },
      { id: "c", text: "Storybook interactivo con todos los estados renderizados, props documentadas en codigo, y link a Figma para referencia visual" },
      { id: "d", text: "Wiki en Notion con screenshots, tabla de props, y proceso de request para nuevas variantes via Jira" }
    ],
    correctAnswer: "b",
    explanation: "Documentacion junto al codigo (b) se versiona y actualiza con cambios. Auto-sync (a) puede perder contexto de 'cuando usar'. Solo Storybook (c) no captura decisiones de diseño. Wiki separada (d) tiende a desactualizarse."
  },
  {
    id: 301,
    title: "Google Analytics - Metricas de UX",
    category: "Research",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Solo 15% completa el registro. ¿Cual combinacion de analisis en GA4 te da insights mas accionables para diseño?",
    code: `Funnel actual:
1. Landing → 2. Formulario → 3. Verificacion → 4. Completado

Datos disponibles:
- Eventos de campo de formulario trackeados
- Session recordings en Hotjar
- 50K usuarios mensuales`,
    options: [
      { id: "a", text: "Path exploration desde landing para ver flujos alternativos, bounce rate por pagina, y comparativa de conversion por fuente de trafico" },
      { id: "b", text: "Funnel exploration con drop-off por paso, segmentacion mobile vs desktop, tiempo promedio en formulario, y correlacion con eventos de error" },
      { id: "c", text: "Cohort analysis de usuarios que completaron vs abandonaron, comparando comportamiento previo y LTV potencial" },
      { id: "d", text: "User explorer para revisar journeys individuales de usuarios que abandonaron, combinado con session recordings de esos mismos usuarios" }
    ],
    correctAnswer: "b",
    explanation: "Funnel exploration identifica el paso problematico, segmentacion revela si es peor en mobile, tiempo en formulario sugiere complejidad. Path exploration (a) no enfoca el problema. Cohort (c) es mas para producto/marketing. User explorer (d) no escala con 50K usuarios."
  },
  {
    id: 302,
    title: "Portfolio - Presentacion de caso de diseño",
    category: "Portfolio",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Estas preparando un caso de diseño para tu portfolio. El reclutador promedio dedica 3-5 minutos por caso. ¿Cual estructura es mas efectiva?",
    code: `Proyecto a documentar:
- Rediseño de app de delivery
- Mejoraste conversion en 25%
- Proceso de 3 meses
- Trabajaste con PM, 2 devs, data analyst`,
    options: [
      { id: "a", text: "Hero visual impactante → Resultado clave (25%) arriba → Problema → Proceso resumido → Solucion → Aprendizajes" },
      { id: "b", text: "Contexto detallado → Problema → Research completo → Ideacion → Iteraciones → Solucion → Resultados → Aprendizajes" },
      { id: "c", text: "Problema → Tu rol especifico → Proceso con decision points clave → Solucion → Resultados → Que harias diferente" },
      { id: "d", text: "Video walkthrough de 2 min del prototipo final con voiceover explicando decisiones de diseño" }
    ],
    correctAnswer: "c",
    explanation: "Con tiempo limitado, reclutadores buscan entender TU impacto y pensamiento critico. Poner resultado arriba (a) pero sin enfatizar tu rol diluye contribucion. Proceso muy detallado (b) excede el tiempo. Video (d) no permite escaneo rapido."
  },
  {
    id: 303,
    title: "Storytelling - Presentacion de diseño",
    category: "Comunicacion",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Vas a presentar una propuesta de rediseño a C-level. Necesitas aprobacion de presupuesto. ¿Como estructuras los 30 minutos?",
    code: `Audiencia:
- CEO, CMO, Head of Product
- 30 minutos disponibles
- Necesitas aprobar $50K para desarrollo
- El CEO suele interrumpir con preguntas`,
    options: [
      { id: "a", text: "5 min problema con datos → 5 min insights de usuarios → 10 min solucion con demo → 5 min impacto proyectado (ROI) → 5 min discusion" },
      { id: "b", text: "Executive summary de 2 slides → Demo interactiva de 15 min → Preguntas abiertas el resto del tiempo para ajustar en vivo" },
      { id: "c", text: "Contexto del proyecto → Research detallado → Opciones consideradas → Recomendacion → Roadmap de implementacion → Preguntas" },
      { id: "d", text: "Empezar con la pregunta '¿Aprobamos los $50K?' → Mostrar ROI primero → Luego el diseño como evidencia → Cerrar con proximos pasos" }
    ],
    correctAnswer: "a",
    explanation: "Estructura clara con tiempos permite manejar interrupciones. Demo sin contexto (b) no justifica inversion. Research detallado (c) pierde a C-level. Empezar pidiendo dinero (d) es agresivo sin construir el caso primero."
  },
  {
    id: 304,
    title: "Handoff - Especificaciones para desarrollo",
    category: "Colaboracion",
    difficulty: "Intermedio",
    timeLimit: TIME_LIMITS["Intermedio"],
    question: "Desarrollo reporta inconsistencias recurrentes en implementacion. ¿Cual solucion aborda la causa raiz?",
    code: `Problemas reportados:
- Espaciados diferentes a los diseños
- Colores con variaciones sutiles  
- Comportamientos hover/focus no documentados
- Equipo: 2 designers, 6 developers
- Stack: React con Tailwind`,
    options: [
      { id: "a", text: "Implementar Dev Mode de Figma para que devs extraigan valores exactos, con sesion semanal de Q&A para resolver dudas" },
      { id: "b", text: "Crear tokens compartidos (Figma variables → Tailwind config), documentar estados interactivos en cada componente, y PR reviews de diseño" },
      { id: "c", text: "Agregar un QA de diseño al proceso que revise cada implementacion antes de merge y reporte discrepancias" },
      { id: "d", text: "Generar specs automaticas con plugin de Figma (Zeplin/Avocode) que devs consulten como fuente de verdad" }
    ],
    correctAnswer: "b",
    explanation: "Tokens compartidos eliminan interpretacion. Dev Mode (a) ayuda pero no resuelve estados interactivos. QA de diseño (c) es reactivo, no preventivo. Specs automaticas (d) no capturan comportamientos ni conectan con el codigo."
  },

  // --- Nivel Avanzado (305-311) ---
  {
    id: 305,
    title: "Design System - Gobernanza y escalabilidad",
    category: "Design Systems",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "El Design System tiene 200+ componentes y 5 equipos contribuyendo con los problemas listados. ¿Cual modelo de gobernanza balancea control con velocidad?",
    code: `Problemas actuales:
- Componentes duplicados con nombres diferentes
- Cambios breaking sin aviso previo
- Documentacion desactualizada frecuentemente
- Adopcion inconsistente (40-90%) entre equipos
- Equipo DS: 2 personas full-time`,
    options: [
      { id: "a", text: "Modelo federado: cada equipo tiene un DS champion que contribuye, con el equipo core haciendo reviews y manteniendo la libreria central" },
      { id: "b", text: "Contribution guidelines publicas, versionado semantico obligatorio, deprecation policy de 2 sprints, PR reviews por equipo core, y dashboard de adopcion" },
      { id: "c", text: "Modelo centralizado: solo el equipo DS puede modificar componentes, equipos envian requests que se priorizan en backlog unico" },
      { id: "d", text: "Modelo hibrido: componentes core bloqueados, componentes de dominio owned por cada equipo, sync mensual para promover a core" }
    ],
    correctAnswer: "b",
    explanation: "Procesos explicitos escalan mejor que modelos organizacionales. El modelo federado (a) depende de personas. Centralizado (c) crea cuello de botella con 2 personas. Hibrido (d) puede fragmentar el DS sin versionado claro."
  },
  {
    id: 306,
    title: "Research - Triangulacion de datos",
    category: "Research",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "GA4 muestra 80% completion pero entrevistas revelan frustracion. Debes presentar findings al equipo mañana. ¿Como reconcilias la contradiccion?",
    code: `Situacion:
- GA4: 80% de usuarios completan el flujo
- 8 entrevistas: 6/8 reportan frustracion en el proceso
- Entrevistados reclutados de lista de usuarios activos
- No hay session recordings disponibles
- Deadline: presentar mañana a las 10am`,
    options: [
      { id: "a", text: "Presentar ambos hallazgos como complementarios: alto completion pero con friction, usando quotes de entrevistas como evidencia cualitativa" },
      { id: "b", text: "Revisar definicion de 'completar' en GA4, verificar si incluye retries, segmentar por new vs returning users, y cruzar con tiempo promedio en flujo" },
      { id: "c", text: "Solicitar session recordings antes de concluir, postponiendo la presentacion hasta tener datos de comportamiento real" },
      { id: "d", text: "Priorizar GA4 por ser mas representativo (toda la base) vs 8 entrevistas, pero mencionar el feedback cualitativo como area a explorar" }
    ],
    correctAnswer: "b",
    explanation: "Antes de presentar hay que entender la discrepancia. 'Completar' puede incluir multiples intentos inflando el %. Segmentar revela si el problema es peor para nuevos usuarios. Presentar sin reconciliar (a,d) deja la contradiccion sin resolver. Postponer (c) no es viable."
  },
  {
    id: 307,
    title: "E-commerce - Optimizacion de conversion",
    category: "UX Strategy",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Checkout tiene 2.1% conversion (benchmark 3.5%). Con los datos disponibles, ¿cual estrategia tiene mayor probabilidad de impacto?",
    code: `Datos disponibles:
- Funnel: Cart → Shipping → Payment → Confirm
- Drop-off mayor: Payment (45% abandono)
- Hotjar: usuarios regresan al campo CVV 2.3 veces promedio
- GA4: mobile tiene 60% mas abandono que desktop
- Trafico: 70% mobile, 30% desktop
- Capacidad dev: 1 sprint para mejoras`,
    options: [
      { id: "a", text: "Rediseñar el checkout mobile-first con un solo paso, reduciendo friction de navegacion entre pantallas" },
      { id: "b", text: "Enfocarse en el campo CVV: agregar tooltip explicativo, auto-formato, deteccion de tipo de tarjeta, y validacion inline" },
      { id: "c", text: "Agregar Apple Pay/Google Pay para mobile, eliminando la friccion del formulario de pago manual" },
      { id: "d", text: "A/B test de checkout en 1 paso vs actual, midiendo completion rate y tiempo, priorizando la variante ganadora" }
    ],
    correctAnswer: "b",
    explanation: "El dato mas especifico (2.3 vueltas al CVV) señala friccion puntual con fix de bajo esfuerzo. Rediseño completo (a) es alto riesgo en 1 sprint. Wallets (c) asume que el problema es el metodo, no el campo. A/B (d) es valioso pero toma tiempo sin resolver el problema inmediato."
  },
  {
    id: 308,
    title: "Organizacion - Gestion de multiples proyectos",
    category: "Soft Skills",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Un PM agrega una solicitud urgente a tu carga actual. ¿Cual respuesta balancea profesionalismo con sostenibilidad?",
    code: `Carga actual:
- Proyecto A: entrega en 2 dias (70% avance) - PM: Maria
- Proyecto B: entrega en 5 dias (40% avance) - PM: Carlos  
- Proyecto C: entrega en 1 semana (20% avance) - PM: Maria
- Solicitud urgente de Carlos: "mockups para cliente mañana a las 9am"
- Son las 5pm, tu jornada termina a las 6pm`,
    options: [
      { id: "a", text: "Aceptar y quedarte hasta terminar; es parte del trabajo y Carlos cuenta contigo" },
      { id: "b", text: "Responder: 'Puedo entregar version simplificada mañana 9am o version completa pasado mañana. ¿Cual prefieres?' y ajustar Proyecto B si acepta la primera" },
      { id: "c", text: "Escalar a tu manager explicando la situacion y pidiendo que ayude a priorizar entre los 3 PMs" },
      { id: "d", text: "Proponer a Carlos: 'Si Maria puede esperar 1 dia mas en Proyecto A, puedo hacer los mockups urgentes esta noche'" }
    ],
    correctAnswer: "b",
    explanation: "Ofrecer opciones con trade-offs claros empodera al PM a decidir. Aceptar todo (a) no es sostenible. Escalar (c) puede ser necesario pero intenta resolver primero. Negociar con otros PMs (d) no es tu rol y genera conflictos."
  },
  {
    id: 309,
    title: "Liderazgo de proyecto end-to-end",
    category: "UX Strategy",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Te asignan liderar rediseño de app core (500K usuarios). Con 3 meses y el contexto dado, ¿cual plan reduce mas el riesgo?",
    code: `Contexto:
- App con 500K usuarios activos, revenue $2M/mes
- Equipo: 2 designers, 1 researcher (compartido 50%)
- Stakeholders: PM, Engineering Lead, CMO (opiniones divergentes)
- Restriccion: no puede haber downtime durante rollout
- Engineering empieza a desarrollar en semana 6`,
    options: [
      { id: "a", text: "Discovery (3 sem) → Design (4 sem) → Usability testing (2 sem) → Iteration (2 sem) → Handoff (1 sem), con demos cada 2 semanas" },
      { id: "b", text: "Sprint 0 de alineacion con stakeholders (1 sem) → Discovery + Design paralelo por flujos (6 sem) → Test + Iterate (3 sem) → Handoff escalonado (2 sem)" },
      { id: "c", text: "Audit del estado actual (2 sem) → Benchmarking competitivo (1 sem) → Propuesta de vision (1 sem) → Aprobacion → Design detallado (6 sem) → Handoff (2 sem)" },
      { id: "d", text: "Empezar diseñando los flujos core en paralelo con discovery, testeando cada 2 semanas, con stakeholder review semanal y handoff continuo desde semana 4" }
    ],
    correctAnswer: "b",
    explanation: "Sprint 0 alinea stakeholders divergentes antes de invertir. Paralelo por flujos maximiza el researcher compartido. 3 semanas de test permite iterar. El plan (a) deja testing muy tarde. Vision primero (c) retrasa feedback. Handoff desde semana 4 (d) es prematuro sin validar."
  },
  {
    id: 310,
    title: "Accesibilidad - Auditoria y remediacion",
    category: "UX Strategy",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Una auditoria WCAG revela 47 issues. Con 1 sprint disponible, ¿cual estrategia maximiza impacto y previene regresiones?",
    code: `Issues encontrados:
- 12 criticos (A): 4 de contraste (globales), 5 alt text, 3 focus states
- 20 moderados (AA): 12 labels de form, 8 landmarks
- 15 menores (AAA): timing, text spacing, etc.

Recursos: 1 sprint (10 dias dev), tu tiempo de diseño
Contexto: producto B2B sin requisito legal explicito`,
    options: [
      { id: "a", text: "Resolver los 4 issues de contraste (afectan todo el producto), los 3 de focus, y documentar el resto como deuda tecnica para siguiente quarter" },
      { id: "b", text: "Crear matriz impacto/esfuerzo de los 12 criticos, resolver los de mayor impacto que quepan en el sprint, y agregar a11y checks al Definition of Done" },
      { id: "c", text: "Priorizar los 12 labels de form (AA) porque son el flujo core, dejando issues criticos que requieren cambios de Design System para despues" },
      { id: "d", text: "Resolver todos los 12 criticos (A) porque son requisitos minimos, aunque requiera negociar extension del sprint" }
    ],
    correctAnswer: "b",
    explanation: "Matriz permite decisions basadas en datos. Contraste global (a) es alto impacto pero puede requerir tokens. Solo labels (c) ignora criticos. Negociar extension (d) puede no ser viable. El DoD previene nuevos issues."
  },
  {
    id: 311,
    title: "Stakeholder management - Conflicto de prioridades",
    category: "Soft Skills",
    difficulty: "Avanzado",
    timeLimit: TIME_LIMITS["Avanzado"],
    question: "Tres stakeholders con veto power tienen visiones opuestas para el homepage. ¿Cual approach tiene mayor probabilidad de alineacion en 4 semanas?",
    code: `Situacion:
- Redesign de homepage
- CMO: "necesitamos hero animado que impresione, como Apple"
- CPO: "bounce rate es 60%, simplificar y optimizar conversion"
- Eng Lead: "solo 4 semanas, no podemos hacer animaciones complejas"
- Tu analisis: el problema real es la propuesta de valor confusa
- Deadline inamovible: 4 semanas`,
    options: [
      { id: "a", text: "Proponer A/B test: version simple (CPO/Eng) vs version con animacion (CMO), dejando que datos decidan post-launch" },
      { id: "b", text: "Facilitar workshop de 2 horas: revisar datos de bounce, definir metricas de exito compartidas, co-crear constraints de diseño, y proponer hero estatico con copy fuerte" },
      { id: "c", text: "Diseñar prototipo que integre elementos de las tres visiones: hero animado pero simple tecnicamente, con CTA optimizado para conversion" },
      { id: "d", text: "Presentar tu analisis (propuesta de valor confusa) con evidencia, reenmarcando el problema antes de discutir soluciones visuales" }
    ],
    correctAnswer: "b",
    explanation: "El workshop crea ownership compartido. A/B (a) postpone la decision y duplica trabajo. Integrar todo (c) puede no satisfacer a nadie. Presentar tu analisis solo (d) es valido pero el workshop lo incorpora con participacion de todos."
  }

];

const STACK_ASSIGNMENTS = {
  // ===== React (1-11, 30-49) = 29 preguntas =====
  1: ["react"],
  2: ["react"],
  3: ["react"],
  4: ["react"],
  5: ["react"],
  6: ["react"],
  7: ["react"],
  8: ["react"],
  9: ["react"],
  10: ["react"],
  11: ["react"],
  30: ["react"],
  31: ["react"],
  32: ["react"],
  33: ["react"],
  34: ["react"],
  35: ["react"],
  36: ["react"],
  37: ["react"],
  38: ["react"],
  39: ["react"],
  40: ["react"],
  41: ["react"],
  42: ["react"],
  43: ["react"],
  44: ["react"],
  45: ["react"],
  46: ["react"],
  47: ["react"],
  48: ["react"],
  49: ["react"],
  // ===== Next.js (22, 50-69) = 21 preguntas =====
  22: ["next"],
  50: ["next"],
  51: ["next"],
  52: ["next"],
  53: ["next"],
  54: ["next"],
  55: ["next"],
  56: ["next"],
  57: ["next"],
  58: ["next"],
  59: ["next"],
  60: ["next"],
  61: ["next"],
  62: ["next"],
  63: ["next"],
  64: ["next"],
  65: ["next"],
  66: ["next"],
  67: ["next"],
  68: ["next"],
  69: ["next"],
  // ===== NestJS (12, 13, 23, 70-89) = 23 preguntas =====
  12: ["nestjs"],
  13: ["nestjs"],
  23: ["nestjs"],
  70: ["nestjs"],
  71: ["nestjs"],
  72: ["nestjs"],
  73: ["nestjs"],
  74: ["nestjs"],
  75: ["nestjs"],
  76: ["nestjs"],
  77: ["nestjs"],
  78: ["nestjs"],
  79: ["nestjs"],
  80: ["nestjs"],
  81: ["nestjs"],
  82: ["nestjs"],
  83: ["nestjs"],
  84: ["nestjs"],
  85: ["nestjs"],
  86: ["nestjs"],
  87: ["nestjs"],
  88: ["nestjs"],
  89: ["nestjs"],
  // ===== Git (14, 15, 90-109) = 22 preguntas =====
  14: ["git"],
  15: ["git"],
  90: ["git"],
  91: ["git"],
  92: ["git"],
  93: ["git"],
  94: ["git"],
  95: ["git"],
  96: ["git"],
  97: ["git"],
  98: ["git"],
  99: ["git"],
  100: ["git"],
  101: ["git"],
  102: ["git"],
  103: ["git"],
  104: ["git"],
  105: ["git"],
  106: ["git"],
  107: ["git"],
  108: ["git"],
  109: ["git"],
  // ===== CSS (16, 17, 18, 110-129) = 23 preguntas =====
  16: ["css"],
  17: ["css"],
  18: ["css"],
  110: ["css"],
  111: ["css"],
  112: ["css"],
  113: ["css"],
  114: ["css"],
  115: ["css"],
  116: ["css"],
  117: ["css"],
  118: ["css"],
  119: ["css"],
  120: ["css"],
  121: ["css"],
  122: ["css"],
  123: ["css"],
  124: ["css"],
  125: ["css"],
  126: ["css"],
  127: ["css"],
  128: ["css"],
  129: ["css"],
  // ===== Relational DB (24, 130-148) = 20 preguntas =====
  24: ["relational-db"],
  130: ["relational-db"],
  131: ["relational-db"],
  132: ["relational-db"],
  133: ["relational-db"],
  134: ["relational-db"],
  135: ["relational-db"],
  136: ["relational-db"],
  137: ["relational-db"],
  138: ["relational-db"],
  139: ["relational-db"],
  140: ["relational-db"],
  141: ["relational-db"],
  142: ["relational-db"],
  143: ["relational-db"],
  144: ["relational-db"],
  145: ["relational-db"],
  146: ["relational-db"],
  147: ["relational-db"],
  148: ["relational-db"],
  // ===== NoSQL (25, 150-168) = 20 preguntas =====
  25: ["nosql"],
  150: ["nosql"],
  151: ["nosql"],
  152: ["nosql"],
  153: ["nosql"],
  154: ["nosql"],
  155: ["nosql"],
  156: ["nosql"],
  157: ["nosql"],
  158: ["nosql"],
  159: ["nosql"],
  160: ["nosql"],
  161: ["nosql"],
  162: ["nosql"],
  163: ["nosql"],
  164: ["nosql"],
  165: ["nosql"],
  166: ["nosql"],
  167: ["nosql"],
  168: ["nosql"],
  // ===== AWS (19-21) = 3 preguntas =====
  19: ["aws"],
  20: ["aws"],
  21: ["aws"],
  // ===== System Design (26, 170-185) = 17 preguntas =====
  26: ["system-design"],
  170: ["system-design"],
  171: ["system-design"],
  172: ["system-design"],
  173: ["system-design"],
  174: ["system-design"],
  175: ["system-design"],
  176: ["system-design"],
  177: ["system-design"],
  178: ["system-design"],
  179: ["system-design"],
  180: ["system-design"],
  181: ["system-design"],
  182: ["system-design"],
  183: ["system-design"],
  184: ["system-design"],
  185: ["system-design"],
  // ===== QA Automation (27, 28, 29, 190-206) = 20 preguntas =====
  27: ["qa-automation"],
  28: ["qa-automation"],
  29: ["qa-automation"],
  190: ["qa-automation"],
  191: ["qa-automation"],
  192: ["qa-automation"],
  193: ["qa-automation"],
  194: ["qa-automation"],
  195: ["qa-automation"],
  196: ["qa-automation"],
  197: ["qa-automation"],
  198: ["qa-automation"],
  199: ["qa-automation"],
  200: ["qa-automation"],
  201: ["qa-automation"],
  202: ["qa-automation"],
  203: ["qa-automation"],
  204: ["qa-automation"],
  205: ["qa-automation"],
  206: ["qa-automation"],
  // ===== Vue.js (210-229) = 20 preguntas =====
  210: ["vue"],
  211: ["vue"],
  212: ["vue"],
  213: ["vue"],
  214: ["vue"],
  215: ["vue"],
  216: ["vue"],
  217: ["vue"],
  218: ["vue"],
  219: ["vue"],
  220: ["vue"],
  221: ["vue"],
  222: ["vue"],
  223: ["vue"],
  224: ["vue"],
  225: ["vue"],
  226: ["vue"],
  227: ["vue"],
  228: ["vue"],
  229: ["vue"],
  // ===== Java (230-249) = 20 preguntas =====
  230: ["java"],
  231: ["java"],
  232: ["java"],
  233: ["java"],
  234: ["java"],
  235: ["java"],
  236: ["java"],
  237: ["java"],
  238: ["java"],
  239: ["java"],
  240: ["java"],
  241: ["java"],
  242: ["java"],
  243: ["java"],
  244: ["java"],
  245: ["java"],
  246: ["java"],
  247: ["java"],
  248: ["java"],
  249: ["java"],
  // ===== Business Analyst (250-269) = 20 preguntas =====
  250: ["business-analyst"],
  251: ["business-analyst"],
  252: ["business-analyst"],
  253: ["business-analyst"],
  254: ["business-analyst"],
  255: ["business-analyst"],
  256: ["business-analyst"],
  257: ["business-analyst"],
  258: ["business-analyst"],
  259: ["business-analyst"],
  260: ["business-analyst"],
  261: ["business-analyst"],
  262: ["business-analyst"],
  263: ["business-analyst"],
  264: ["business-analyst"],
  265: ["business-analyst"],
  266: ["business-analyst"],
  267: ["business-analyst"],
  268: ["business-analyst"],
  269: ["business-analyst"],
  // ===== Mobile (270-290) =====
  270: ["flutter"],
  271: ["flutter"],
  272: ["flutter"],
  273: ["flutter"],
  274: ["flutter"],
  275: ["flutter"],
  276: ["flutter"],
  277: ["android"],
  278: ["android"],
  279: ["android"],
  280: ["android"],
  281: ["android"],
  282: ["android"],
  283: ["android"],
  284: ["ios"],
  285: ["ios"],
  286: ["ios"],
  287: ["ios"],
  288: ["ios"],
  289: ["ios"],
  290: ["ios"],
  // ===== Product Designer (291-311) = 21 preguntas =====
  291: ["product-designer"],
  292: ["product-designer"],
  293: ["product-designer"],
  294: ["product-designer"],
  295: ["product-designer"],
  296: ["product-designer"],
  297: ["product-designer"],
  298: ["product-designer"],
  299: ["product-designer"],
  300: ["product-designer"],
  301: ["product-designer"],
  302: ["product-designer"],
  303: ["product-designer"],
  304: ["product-designer"],
  305: ["product-designer"],
  306: ["product-designer"],
  307: ["product-designer"],
  308: ["product-designer"],
  309: ["product-designer"],
  310: ["product-designer"],
  311: ["product-designer"],
};

const DEFAULT_STACK = ["react"];

export const exercises = rawExercises.map((exercise) => ({
  ...exercise,
  stackTags: STACK_ASSIGNMENTS[exercise.id] || exercise.stackTags || DEFAULT_STACK,
}));

const shuffleArray = (items = []) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export function getExercisesByIds(questionIds) {
  if (!Array.isArray(questionIds) || questionIds.length === 0) {
    return exercises;
  }
  const ids = new Set(questionIds);
  return exercises.filter((exercise) => ids.has(exercise.id));
}

export function buildQuestionSet(config = {}, questionBank = exercises) {
  const stackList =
    Array.isArray(config?.stacks) && config.stacks.length ? config.stacks : null;
  const difficultyList =
    LEVEL_DICTIONARY[config?.level]?.difficulties ||
    LEVEL_DICTIONARY["intermedio"].difficulties;

  const difficultySet = new Set(difficultyList);
  const stackSet = stackList ? new Set(stackList) : null;
  const isMultiStack = stackList && stackList.length > 1;
  const questionLimit = Math.min(
    config?.questionCount ||
      (isMultiStack ? MULTI_STACK_QUESTION_COUNT : DEFAULT_QUESTION_COUNT),
    questionBank.length
  );

  const filterByStack = stackSet
    ? questionBank.filter((exercise) =>
        exercise.stackTags.some((tag) => stackSet.has(tag))
      )
    : questionBank.slice();

  const takeWithPriority = (pool, limit) => {
    const matches = shuffleArray(
      pool.filter((exercise) => difficultySet.has(exercise.difficulty))
    );
    const others = shuffleArray(
      pool.filter((exercise) => !difficultySet.has(exercise.difficulty))
    );
    const picked = [];
    const seen = new Set();
    while (picked.length < limit && (matches.length || others.length)) {
      const source = matches.length ? matches : others;
      const candidate = source.shift();
      if (!candidate || seen.has(candidate.id)) continue;
      picked.push(candidate);
      seen.add(candidate.id);
    }
    return picked;
  };

  if (!stackList || stackList.length === 0) {
    return takeWithPriority(filterByStack, questionLimit);
  }

  if (stackList.length === 1) {
    return takeWithPriority(filterByStack, questionLimit);
  }

  const results = [];
  const seen = new Set();
  const pools = stackList.map((stackId) => {
    const stackPool = filterByStack.filter((exercise) =>
      exercise.stackTags.includes(stackId)
    );
    return {
      stackId,
      priority: shuffleArray(
        stackPool.filter((exercise) => difficultySet.has(exercise.difficulty))
      ),
      fallback: shuffleArray(
        stackPool.filter((exercise) => !difficultySet.has(exercise.difficulty))
      ),
    };
  });

  let poolIndex = 0;
  while (
    results.length < questionLimit &&
    pools.some((pool) => pool.priority.length || pool.fallback.length)
  ) {
    const pool = pools[poolIndex % pools.length];
    const bucket = pool.priority.length ? pool.priority : pool.fallback;
    if (bucket.length) {
      const candidate = bucket.shift();
      if (!seen.has(candidate.id)) {
        results.push(candidate);
        seen.add(candidate.id);
      }
    }
    poolIndex += 1;
  }

  if (results.length < questionLimit) {
    const leftovers = shuffleArray(
      filterByStack.filter((exercise) => !seen.has(exercise.id))
    );
    results.push(...leftovers.slice(0, questionLimit - results.length));
  }

  return results;
}

// Función helper para calcular el score
export function calculateScore(userAnswers, options = {}) {
  const targetExercises = getExercisesByIds(options.questionIds);
  let correct = 0;
  let total = targetExercises.length;
  
  // Obtener el mapeo de respuestas correctas si existe
  let correctAnswerMap = {};
  try {
    const stored = localStorage.getItem('correct-answer-map');
    if (stored) {
      correctAnswerMap = JSON.parse(stored);
    }
  } catch (e) {
    // Si no hay mapeo, usar comparación original
  }
  
  targetExercises.forEach(exercise => {
    const userAnswer = userAnswers[exercise.id];
    const correctDisplayId = correctAnswerMap[exercise.id];
    
    if (correctDisplayId) {
      // Usar el mapeo: la respuesta correcta está en la posición A, B, C, o D
      if (userAnswer === correctDisplayId) {
      correct++;
      }
    } else {
      // Fallback: comparación original
      if (userAnswer === exercise.correctAnswer) {
        correct++;
      }
    }
  });
  
  return {
    correct,
    total,
    percentage: total ? Math.round((correct / total) * 100) : 0
  };
}

// Función para obtener el resultado detallado
export function getDetailedResults(userAnswers, options = {}) {
  const targetExercises = getExercisesByIds(options.questionIds);
  
  // Obtener el mapeo de respuestas correctas y el orden de opciones
  let correctAnswerMap = {};
  let optionOrder = {};
  try {
    const storedMap = localStorage.getItem('correct-answer-map');
    if (storedMap) {
      correctAnswerMap = JSON.parse(storedMap);
    }
    const storedOrder = localStorage.getItem('option-order');
    if (storedOrder) {
      optionOrder = JSON.parse(storedOrder);
    }
  } catch (e) {
    // Si no hay mapeo, usar comparación original
  }
  
  return targetExercises.map(exercise => {
    const userAnswer = userAnswers[exercise.id] || null;
    const correctDisplayId = correctAnswerMap[exercise.id];
    
    // Determinar si es correcta
    let isCorrect = false;
    if (correctDisplayId) {
      // Usar el mapeo: comparar A, B, C, D
      isCorrect = userAnswer === correctDisplayId;
    } else {
      // Fallback: comparación original
      isCorrect = userAnswer === exercise.correctAnswer;
    }
    
    // Obtener las opciones ordenadas si existen
    const orderedOptions = optionOrder[exercise.id] || exercise.options;
    
    return {
    ...exercise,
      userAnswer: userAnswer,
      isCorrect: isCorrect,
      correctAnswer: correctDisplayId || exercise.correctAnswer, // Usar el ID mapeado para mostrar
      options: orderedOptions, // Usar las opciones ordenadas
      explanation: exercise.explanation || '' // Asegurar que la explicación esté incluida
    };
  });
}
