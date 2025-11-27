# 🎯 Laboratorio Práctico de Evaluación Técnica

Sistema interactivo de evaluación técnica para entrevistas de desarrollo, diseñado para evaluar conocimientos prácticos mediante preguntas tipo quiz con explicaciones detalladas y retroalimentación inmediata.

## 📋 Descripción del Laboratorio

Este laboratorio práctico permite a los entrevistadores evaluar las competencias técnicas de candidatos en diferentes tecnologías y niveles de experiencia. El sistema incluye:

- **246+ preguntas técnicas** distribuidas en 11 stacks tecnológicos
- **Sistema de monitoreo en tiempo real** para que el entrevistador observe el progreso del candidato
- **Temporizador por pregunta** basado en la complejidad
- **Generación aleatoria de preguntas** para evitar repetición
- **Orden aleatorio de opciones** para evitar patrones predecibles
- **Resultados detallados** con explicaciones y estadísticas

## 🚀 Inicio Rápido

### Opción 1: GitHub Codespaces (Recomendado)

1. Ve a tu repositorio en GitHub
2. Click en el botón verde **"Code"**
3. Selecciona **"Codespaces"** → **"Create codespace on master"**
4. Se abrirá VS Code en tu navegador y ejecutará automáticamente

**✅ GRATIS**: 60 horas/mes para cuentas personales

### Opción 2: Desarrollo Local

**Requisitos**: Node.js 20+ (recomendado Node 22)

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

La aplicación estará disponible en `http://localhost:5173`

### Opción 3: GitHub Pages (Deploy Público)

1. Sube tu código a GitHub
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **"GitHub Actions"**
4. Tu sitio estará en: `https://TU_USUARIO.github.io/fullstack-interview/`

## 🎓 Stacks Tecnológicos Disponibles

El sistema incluye preguntas sobre:

1. **⚛️ React** - Hooks, Componentes, Optimización (29 preguntas)
2. **⏭️ Next.js** - SSR, ISR, App Router, Caching (20 preguntas)
3. **🧱 NestJS** - DI, Pipes, Guards, Interceptors (20 preguntas)
4. **🗄️ Bases de Datos Relacionales** - SQL, Normalización, Transacciones (20 preguntas)
5. **🧩 Bases de Datos NoSQL** - MongoDB, Modelado, Indexación (20 preguntas)
6. **🎨 CSS** - Flexbox, Grid, Especificidad, Animaciones (20 preguntas)
7. **🌱 Git** - Rebase, Merge, Reflog, Cherry-pick (20 preguntas)
8. **🧪 QA Automation** - Testing, CI/CD, QA Manual, Scrum (20 preguntas)
9. **🧠 Arquitectura / System Design** - Escalabilidad, Microservicios (20 preguntas)
10. **💚 Vue.js** - Composition API, Reactivity, Directivas (20 preguntas)
11. **☕ Java** - Spring, Hibernate ORM, Beans, JPA (20 preguntas)

**Total: 246+ preguntas técnicas**

## 📊 Sistema de Evaluación

### Configuración de Niveles

- **Intermedio**: Preguntas Básicas e Intermedias
- **Intermedio Avanzado**: Preguntas Intermedias y Avanzadas
- **Avanzado**: Solo preguntas Avanzadas

### Generación de Preguntas

- **Un stack seleccionado**: 20 preguntas aleatorias del stack
- **Múltiples stacks seleccionados**: 15 preguntas aleatorias distribuidas entre los stacks seleccionados

### Temporizador por Pregunta

- **Básico**: 60 segundos (1 minuto)
- **Intermedio**: 90 segundos (1.5 minutos)
- **Avanzado**: 120 segundos (2 minutos)

Si el tiempo se agota, la pregunta se marca como "Tiempo agotado" y se avanza automáticamente a la siguiente.


## 🔍 Sistema de Monitoreo en Tiempo Real

### Para el Entrevistador

1. En la página principal, haz click en **"🔍 Crear Sesión de Monitoreo"**
2. Selecciona los stacks y el nivel de dificultad
3. Se generará un **ID de sesión de 2 dígitos**
4. Se mostrarán dos URLs:
   - **URL para el Candidato**: `/test/{sessionId}`
   - **URL para el Entrevistador (Monitor)**: `/monitor/{sessionId}`

### Funcionalidades del Monitor

- **Visualización en tiempo real** del progreso del candidato
- **Pregunta actual** que está respondiendo
- **Respuestas seleccionadas** por el candidato
- **Tiempo restante** por pregunta
- **Configuración del test** (stacks seleccionados, nivel, etc.)
- **Progreso general** del examen

### Tecnología de Monitoreo

- **Firebase Realtime Database** para comunicación en tiempo real
- **BroadcastChannel API** como fallback para desarrollo local
- Funciona entre diferentes navegadores y dispositivos

## 📝 Flujo de Uso

### 1. Entrevistador Crea Sesión

```
Home → Seleccionar Stacks → Seleccionar Nivel → "Crear Sesión de Monitoreo"
```

### 2. Compartir URL con Candidato

El entrevistador copia la URL del candidato y la comparte.

### 3. Candidato Realiza el Test

- El candidato accede a `/test/{sessionId}`
- Responde las preguntas con el temporizador activo
- Puede navegar entre preguntas (Anterior, Siguiente)
- Las respuestas se guardan automáticamente

### 4. Entrevistador Monitorea

- El entrevistador accede a `/monitor/{sessionId}`
- Observa en tiempo real:
  - Pregunta actual
  - Respuesta seleccionada
  - Tiempo restante
  - Progreso general

### 5. Ver Resultados

- Al finalizar, el candidato puede ver sus resultados
- El entrevistador puede ver el progreso en tiempo real
- Los resultados incluyen:
  - Puntuación total
  - Preguntas correctas/incorrectas
  - Preguntas sin responder (tiempo agotado)
  - Explicaciones detalladas

## 🎨 Características Principales

### Sistema de Ejercicios

- ✅ **Navegación step-by-step** con indicadores visuales
- ✅ **Barra de progreso** que muestra el avance
- ✅ **Persistencia de respuestas** en localStorage
- ✅ **Navegación libre** entre preguntas
- ✅ **Bloques de código** con syntax highlighting
- ✅ **Botón de copiar código** para facilitar pruebas
- ✅ **Layout optimizado** (pregunta y código lado a lado)

### Sistema de Resultados

- ✅ **Puntuación visual** con gráfico circular animado
- ✅ **Estadísticas detalladas**: correctas, incorrectas, tiempo agotado
- ✅ **Sistema de filtros**: ver todas/correctas/incorrectas/tiempo agotado
- ✅ **Resultados expandibles** con:
  - Pregunta original
  - Código de ejemplo
  - Todas las opciones
  - Comparación: tu respuesta vs respuesta correcta
  - Explicación detallada
- ✅ **Opción de reiniciar** el examen

### Diseño y UX

- ✅ **Interfaz moderna** con animaciones suaves
- ✅ **Totalmente responsive** (móvil, tablet, desktop)
- ✅ **Badges de dificultad** (Básico, Intermedio, Avanzado)
- ✅ **Feedback visual** con colores
- ✅ **Accesibilidad** mejorada

## 🔧 Configuración de Firebase (Opcional)

Para habilitar el monitoreo en tiempo real entre diferentes dispositivos:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Realtime Database**
3. Configura las reglas de seguridad:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
4. Obtén la configuración de tu app web
5. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_DATABASE_URL=tu_database_url
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

**Nota**: Si Firebase no está configurado, el sistema usará `BroadcastChannel` para desarrollo local (solo funciona en la misma pestaña/navegador).

## 📁 Estructura del Proyecto

```text
fullstack-interview/
├── README.md                    # Este archivo
├── package.json                  # Dependencias y scripts
├── index.html                   # HTML principal
├── vite.config.js               # Configuración de Vite
├── .env                         # Variables de entorno (Firebase)
├── .gitignore                   # Archivos ignorados por git
├── .github/
│   └── workflows/
│       └── pages.yml            # GitHub Actions para deploy
└── src/
    ├── App.jsx                  # Configuración de rutas
    ├── main.jsx                 # Entry point
    ├── data/
    │   ├── exercises.js         # 246+ preguntas técnicas
    │   └── stackConfig.js        # Configuración de stacks y niveles
    ├── pages/
    │   ├── Home.jsx             # Página principal (crear sesión)
    │   ├── NuevosEjercicios.jsx # Sistema de preguntas step-by-step
    │   ├── NuevosResultados.jsx # Visualización de resultados
    │   └── Monitor.jsx          # Dashboard de monitoreo
    ├── hooks/
    │   └── useSessionBroadcast.js # Hook para comunicación en tiempo real
    ├── utils/
    │   ├── firebaseConfig.js     # Configuración de Firebase
    │   └── firebaseSession.js   # Utilidades de sesión y Firebase
    └── styles/
        └── global.css           # Estilos completos del sistema
```

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **React Router 6** - Navegación entre páginas
- **Vite 7** - Build tool y dev server
- **Firebase Realtime Database** - Comunicación en tiempo real
- **LocalStorage** - Persistencia de datos
- **CSS moderno** - Grid, Flexbox, animaciones

## 📚 Agregar Nuevas Preguntas

Edita `src/data/exercises.js` y agrega un nuevo objeto al array `rawExercises`:

```javascript
{
  id: 250,  // ID único incremental
  title: "Título descriptivo",
  category: "React Hooks", // Categoría del stack
  difficulty: "Intermedio", // "Básico", "Intermedio", "Avanzado"
  timeLimit: TIME_LIMITS["Intermedio"], // Tiempo límite en segundos
  question: "¿Cuál es el resultado...?",
  code: `// Tu código de ejemplo aquí
const ejemplo = "hola";`,
  options: [
    { id: "a", text: "Opción A" },
    { id: "b", text: "Opción B" },
    { id: "c", text: "Opción C" },
    { id: "d", text: "Opción D" }
  ],
  correctAnswer: "a", // ID de la opción correcta (a, b, c, o d)
  explanation: "Explicación detallada de por qué esta es la respuesta correcta..."
}
```

Luego, actualiza el objeto `STACK_ASSIGNMENTS` en el mismo archivo para asignar la pregunta al stack correspondiente.

## 📄 Licencia

Este proyecto es de uso interno para evaluaciones técnicas.

## 🤝 Contribuciones

Para agregar nuevas preguntas o mejorar el sistema, por favor crea un issue o pull request.

---

**Desarrollado para evaluaciones técnicas de desarrollo en general** 🚀
