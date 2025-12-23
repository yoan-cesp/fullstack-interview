# 🎯 Laboratorio Práctico de Evaluación Técnica

Sistema interactivo de evaluación técnica para entrevistas de desarrollo, diseñado para evaluar conocimientos prácticos mediante preguntas tipo quiz con explicaciones detalladas y retroalimentación inmediata.

## 📋 Descripción del Laboratorio

Este laboratorio práctico permite a los entrevistadores evaluar las competencias técnicas de candidatos en diferentes tecnologías y niveles de experiencia. El sistema incluye:

- **266+ preguntas técnicas** distribuidas en 12 stacks tecnológicos
- **Editor de código interactivo** con evaluación automática de ejercicios de programación
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
12. **📊 Business Analyst** - Requisitos, stakeholders, KPIs, priorización, procesos (20 preguntas)

**Total: 266+ preguntas técnicas**

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

## 💻 Editor de Código Interactivo

### Características

El sistema incluye un editor de código completo donde los candidatos pueden resolver **ejercicios prácticos del día a día** de un desarrollador JavaScript:

- ✅ **Editor profesional** con Monaco Editor (mismo editor de VS Code)
- ✅ **25 ejercicios prácticos** (10 básicos, 8 intermedios, 7 avanzados)
- ✅ **Ejercicios del mundo real**: formateo, validación, APIs, optimización
- ✅ **Evaluación automática** con sistema de tests
- ✅ **Feedback inmediato** con resultados detallados de cada test
- ✅ **Syntax highlighting** y auto-completado
- ✅ **Tema claro/oscuro** configurable
- ✅ **Sistema de hints** progresivos para ayudar al candidato
- ✅ **Ver solución** después de intentar
- ✅ **Persistencia automática** del código escrito
- ✅ **Indicador de ejercicios completados**
- ✅ **Filtros por dificultad** (Básico, Intermedio, Avanzado)

### Cómo Usar el Editor

1. Navega a **"Editor de Código"** desde el menú o la página principal
2. Selecciona un ejercicio de la lista lateral
3. Lee la descripción y los requisitos del ejercicio
4. Escribe tu solución en el editor
5. Haz click en **"▶️ Ejecutar Tests"** para evaluar tu código
6. Revisa los resultados: verás qué tests pasaron y cuáles fallaron
7. Si todos los tests pasan, el ejercicio se marca como completado ✅

### Ejercicios Disponibles

Todos los ejercicios son **tareas prácticas del día a día** de un desarrollador JavaScript:

**Básicos (10 ejercicios):**
- Formatear precio con moneda (`$1,234.50`)
- Extraer iniciales de nombre (`Juan Carlos → JC`)
- Validar email simple
- Truncar texto con ellipsis
- Convertir objeto a query string
- Generar slug desde título (`hola-mundo`)
- Verificar palíndromo
- Contar palabras en texto
- Encontrar máximo en array
- Eliminar duplicados

**Intermedios (8 ejercicios):**
- Agrupar array por propiedad
- Parsear query string a objeto
- Ordenar por múltiples campos
- Obtener valor nested (`user.address.city`)
- Deep merge de objetos
- Validar formulario con reglas
- Flatten array anidado
- Invertir palabras de frase

**Avanzados (7 ejercicios):**
- Flatten object con dot notation
- Diferencia entre arrays
- Chunk array en grupos
- Encontrar duplicados
- Intersección de arrays
- Zip de dos arrays
- Componer funciones (pipe)

### Seguridad

El editor incluye validación de seguridad que bloquea:
- Uso de `eval()`, `setTimeout()`, `setInterval()`
- Acceso a `window`, `document`, `process`, `global`
- Importaciones dinámicas y `require()`
- Bucles infinitos (con timeout de 5 segundos)

### Tecnología

- **Monaco Editor** (`@monaco-editor/react`) - Editor de código
- **Evaluación en cliente** - No requiere backend
- **Sistema de tests** - Ejecuta múltiples casos de prueba automáticamente

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

### Sistema de Ejercicios (Quiz)

- ✅ **Navegación step-by-step** con indicadores visuales
- ✅ **Barra de progreso** que muestra el avance
- ✅ **Persistencia de respuestas** en localStorage
- ✅ **Navegación libre** entre preguntas
- ✅ **Bloques de código** con syntax highlighting
- ✅ **Botón de copiar código** para facilitar pruebas
- ✅ **Layout optimizado** (pregunta y código lado a lado)

### Editor de Código

- ✅ **Editor profesional** con Monaco Editor (VS Code)
- ✅ **25 ejercicios prácticos** de JavaScript del día a día
- ✅ **Evaluación automática** con tests unitarios
- ✅ **Feedback inmediato** con resultados detallados
- ✅ **Sistema de hints** progresivos
- ✅ **Ver solución** opcional
- ✅ **Persistencia del código** escrito
- ✅ **Tema claro/oscuro** configurable
- ✅ **Filtros por dificultad**
- ✅ **Categorías**: Formateo, Validación, URLs, Fechas, Async, Optimización

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
    │   ├── stackConfig.js        # Configuración de stacks y niveles
    │   └── codingExercises.js    # 15 ejercicios de programación
    ├── pages/
    │   ├── Home.jsx             # Página principal (crear sesión)
    │   ├── NuevosEjercicios.jsx # Sistema de preguntas step-by-step
    │   ├── NuevosResultados.jsx # Visualización de resultados
    │   ├── Monitor.jsx          # Dashboard de monitoreo
    │   └── CodeEditor.jsx       # Editor de código interactivo
    ├── components/
    │   └── TestResults.jsx      # Componente de resultados de tests
    ├── hooks/
    │   └── useSessionBroadcast.js # Hook para comunicación en tiempo real
    ├── utils/
    │   ├── firebaseConfig.js     # Configuración de Firebase
    │   ├── firebaseSession.js   # Utilidades de sesión y Firebase
    │   └── codeEvaluator.js      # Sistema de evaluación de código
    └── styles/
        ├── global.css           # Estilos completos del sistema
        └── code-editor.css      # Estilos del editor de código
```

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **React Router 6** - Navegación entre páginas
- **Vite 7** - Build tool y dev server
- **Monaco Editor** (`@monaco-editor/react`) - Editor de código profesional
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

## 🚀 Roadmap: Plataforma de Entrevistas Real

### Fase 1: Mejoras Core (MVP+)

| Prioridad | Feature | Descripción | Complejidad |
|-----------|---------|-------------|-------------|
| 🔴 Alta | **Autenticación** | Login con Google/GitHub, roles (admin, entrevistador, candidato) | Media |
| 🔴 Alta | **Base de datos persistente** | Migrar de localStorage a Supabase/Firebase Firestore | Media |
| 🔴 Alta | **Historial de entrevistas** | Dashboard con todas las sesiones pasadas y resultados | Media |
| 🟡 Media | **Perfiles de candidato** | Guardar info del candidato, CV, notas del entrevistador | Baja |
| 🟡 Media | **Exportar resultados** | Generar PDF con reporte completo de la entrevista | Baja |
| 🟡 Media | **Estadísticas agregadas** | Analytics de preguntas más falladas, tiempos promedio | Media |

### Fase 2: Mejoras de Evaluación

| Prioridad | Feature | Descripción | Complejidad |
|-----------|---------|-------------|-------------|
| 🔴 Alta | **Tests personalizados** | Crear tests custom seleccionando preguntas específicas | Media |
| 🔴 Alta | **Banco de preguntas propio** | UI para crear/editar/eliminar preguntas sin tocar código | Alta |
| 🟡 Media | **Categorías dinámicas** | Crear nuevos stacks/categorías desde la UI | Media |
| 🟡 Media | **Peso por pregunta** | Asignar puntos diferentes según dificultad/importancia | Baja |
| 🟢 Baja | **Preguntas condicionales** | Mostrar preguntas basadas en respuestas anteriores | Alta |

### Fase 3: Mejoras del Editor de Código

| Prioridad | Feature | Descripción | Complejidad |
|-----------|---------|-------------|-------------|
| 🔴 Alta | **Más lenguajes** | Agregar Python, TypeScript, SQL | Alta |
| 🔴 Alta | **Backend sandbox** | Ejecutar código en servidor (Docker containers) | Alta |
| 🟡 Media | **Code review en vivo** | Entrevistador ve código en tiempo real mientras escribe | Media |
| 🟡 Media | **Ejercicios SQL** | Conectar a DB temporal y ejecutar queries reales | Alta |
| 🟢 Baja | **Pair programming** | Modo colaborativo donde ambos pueden editar | Alta |

### Fase 4: Comunicación y Colaboración

| Prioridad | Feature | Descripción | Complejidad |
|-----------|---------|-------------|-------------|
| 🟡 Media | **Video call integrado** | WebRTC para video durante la entrevista | Alta |
| 🟡 Media | **Chat en tiempo real** | Mensajes entre entrevistador y candidato | Media |
| 🟡 Media | **Notas del entrevistador** | Área para tomar notas durante la sesión | Baja |
| 🟢 Baja | **Grabación de sesión** | Grabar la entrevista para revisión posterior | Alta |

### Fase 5: Gestión Empresarial

| Prioridad | Feature | Descripción | Complejidad |
|-----------|---------|-------------|-------------|
| 🟡 Media | **Multi-tenant** | Organizaciones separadas con sus propios datos | Alta |
| 🟡 Media | **Invitaciones por email** | Enviar link de test al candidato por correo | Baja |
| 🟡 Media | **Calendario integrado** | Programar entrevistas con Calendly/Google Calendar | Media |
| 🟢 Baja | **API pública** | Integrar con ATS (Greenhouse, Lever, etc.) | Alta |
| 🟢 Baja | **Reportes de equipo** | Estadísticas de entrevistadores y hiring pipeline | Media |

### Fase 6: IA y Automatización

| Prioridad | Feature | Descripción | Complejidad |
|-----------|---------|-------------|-------------|
| 🟢 Baja | **Generación de preguntas con IA** | Crear nuevas preguntas basadas en prompts | Alta |
| 🟢 Baja | **Evaluación automática de código** | IA que sugiere puntuación basada en calidad del código | Alta |
| 🟢 Baja | **Resumen de entrevista** | IA que genera resumen automático de la sesión | Media |

---

### 🛠️ Stack Tecnológico Recomendado para Escalar

| Componente | Tecnología Actual | Recomendación para Producción |
|------------|-------------------|-------------------------------|
| Frontend | React + Vite | Next.js (SSR, mejor SEO) |
| Auth | - | Clerk / Auth0 / Supabase Auth |
| Database | LocalStorage | Supabase / PlanetScale / Firebase |
| Real-time | Firebase RTDB | Supabase Realtime / Pusher |
| Hosting | GitHub Pages | Vercel / Railway / Fly.io |
| Code Execution | Client-side | Judge0 / Piston API / Docker |
| Email | - | Resend / SendGrid |
| Analytics | - | Plausible / Mixpanel |
| Payments | - | Stripe / Lemonsqueezy |

---

### 💰 Modelo de Negocio Potencial

**Freemium:**
- **Free**: 5 entrevistas/mes, preguntas básicas
- **Pro ($29/mes)**: Ilimitadas, todas las preguntas, editor de código
- **Team ($99/mes)**: Multi-usuario, analytics, API

**Por Entrevista:**
- $5-10 por entrevista completada
- Descuentos por volumen

---

## 📄 Licencia

Este proyecto es de uso interno para evaluaciones técnicas.

## 🤝 Contribuciones

Para agregar nuevas preguntas o mejorar el sistema, por favor crea un issue o pull request.

---

**Desarrollado para evaluaciones técnicas de desarrollo en general** 🚀
