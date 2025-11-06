# 🎯 Sistema de Evaluación Técnica - Fullstack

Sistema interactivo de evaluación técnica para entrevistas, con preguntas sobre React, Node.js, Git, CSS y AWS.

## Objetivo

Evaluar conocimientos prácticos de candidatos mediante un sistema de preguntas técnicas tipo quiz con explicaciones detalladas y retroalimentación inmediata.

## 🚀 Usar directamente desde GitHub (SIN instalación local)

### ⚡ Opción 1: GitHub Codespaces (RECOMENDADO) ⭐

**Entorno de desarrollo completo en la nube con Node 20:**

1. Ve a tu repositorio en GitHub
2. Click en el botón verde **"Code"**
3. Selecciona **"Codespaces"** → **"Create codespace on master"**
4. ¡Listo! Se abrirá VS Code en tu navegador y ejecutará automáticamente

**✅ GRATIS**: 60 horas/mes para cuentas personales

### 🌐 Opción 2: GitHub Pages (Deploy público)

**URL pública permanente para compartir con candidatos:**

1. Sube tu código a GitHub
2. Ve a **Settings** → **Pages** 
3. En **Source**, selecciona **"GitHub Actions"**
4. Tu sitio estará en: `https://TU_USUARIO.github.io/fullstack-interview/`

**✅ GRATIS**: Ilimitado

**📚 Ver guía completa en `GITHUB_SETUP.md`**

### 💻 Opción 2: Desarrollo local (Requiere Node 18+)

⚠️ **Tu Node actual (14.17.6) es muy antiguo**. Opciones:

#### A. Actualizar Node (Recomendado para desarrollo local):
```bash
# Con nvm
nvm install 18
nvm use 18

# Verificar
node -v  # Debe mostrar v18.x.x
```

#### B. Luego instalar y ejecutar:
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

La aplicación estará disponible en `http://localhost:5173`

**Nota**: Si no puedes actualizar Node, **usa StackBlitz** (Opción 1).

## 📁 Estructura del proyecto

```text
fullstack-interview/
├── README.md                 # Este archivo
├── DOCUMENTACION.md          # Documentación completa del sistema
├── package.json              # Dependencias y scripts
├── index.html                # HTML principal
├── vite.config.js            # Configuración de Vite
├── .stackblitzrc             # Configuración para StackBlitz
├── .gitignore                # Archivos ignorados por git
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
└── src/                      # Código fuente
    ├── App.jsx               # Configuración de rutas
    ├── main.jsx              # Entry point
    ├── data/
    │   └── exercises.js      # 21 preguntas técnicas
    ├── pages/
    │   ├── Home.jsx                # Página principal
    │   ├── NuevosEjercicios.jsx   # Sistema de preguntas step-by-step
    │   └── NuevosResultados.jsx   # Visualización de resultados
    └── styles/
        └── global.css        # Estilos completos del sistema
```

**Estructura optimizada para StackBlitz**: Todos los archivos del frontend están en la raíz para máxima compatibilidad.

## ✨ Características

### 📝 Sistema de Ejercicios
- **21 preguntas técnicas** sobre React, Node.js, Git, CSS y AWS
- **Temporizador inteligente** por pregunta:
  - ⏱️ Básico: 60 segundos
  - ⏱️ Intermedio: 90 segundos
  - ⏱️ Avanzado: 120 segundos
  - Auto-avance al agotarse el tiempo
  - Animaciones visuales según tiempo restante
- **Sistema de navegación step-by-step** con indicadores visuales
- **Barra de progreso** que muestra el avance
- **Persistencia de respuestas** en localStorage
- **Navegación libre** entre preguntas (Anterior, Siguiente, Saltar)
- **Bloques de código** con syntax highlighting
- **Botón de copiar código** para facilitar pruebas

### 📊 Sistema de Resultados
- **Puntuación visual** con gráfico circular animado
- **Estadísticas detalladas**: correctas, incorrectas, tiempo agotado, total
- **Sistema de filtros**: ver todas/correctas/incorrectas/tiempo agotado
- **Resultados expandibles** con:
  - Pregunta original
  - Código de ejemplo
  - Todas las opciones
  - Comparación: tu respuesta vs respuesta correcta
  - Explicación detallada
- **Opción de reiniciar** el examen

### 🎨 Diseño y UX
- **Interfaz moderna** con animaciones suaves
- **Totalmente responsive** (móvil, tablet, desktop)
- **Badges de dificultad** (Básico, Intermedio, Avanzado)
- **Feedback visual** con colores (verde para correcto, rojo para incorrecto)
- **Accesibilidad** mejorada

## 📚 Preguntas Incluidas

### React Hooks (11 preguntas)
1. useState - Múltiples actualizaciones
2. useState - Función callback
3. useRef - Propiedad current
4. useRef - Referencias en componentes funcionales
5. useRef - Contador de clicks
6. useEffect - Cleanup function
7. useState - Mutación directa de arrays
8. useEffect - Múltiples efectos
9. useMemo - Memoización de valores
10. useState - Objetos y mutación
11. useEffect - Orden de ejecución

### Backend / Node.js (2 preguntas)
12. Express - Manejo de rutas API
13. Express - Middleware y orden de ejecución

### Git (2 preguntas)
14. Git - Rebase vs Merge
15. Git - Recuperar cambios perdidos con reflog

### CSS (3 preguntas)
16. CSS - Flexbox vs Grid
17. CSS - Especificidad y !important
18. CSS - Box Model y box-sizing

### AWS (3 preguntas)
19. AWS - S3 vs EBS (Object Storage vs Block Storage)
20. AWS - Lambda Cold Start
21. AWS - IAM Roles vs Users

## 🔧 Agregar Nuevas Preguntas

Edita `client/src/data/exercises.js` y agrega un nuevo objeto al array:

```javascript
{
  id: 14,  // ID único incremental
  title: "Título descriptivo",
  category: "React Hooks", // o "Backend"
  difficulty: "Intermedio", // "Básico", "Intermedio", "Avanzado"
  question: "¿Cuál es el resultado...?",
  code: `// Tu código de ejemplo aquí
const ejemplo = "hola";`,
  options: [
    { id: "a", text: "Opción A" },
    { id: "b", text: "Opción B" },
    { id: "c", text: "Opción C" },
    { id: "d", text: "Opción D" }
  ],
  correctAnswer: "a", // ID de la opción correcta
  explanation: "Explicación detallada..."
}
```

## 📖 Documentación

Para más detalles, consulta `DOCUMENTACION.md` que incluye:
- Descripción completa de funcionalidades
- Guía de uso para candidatos y evaluadores
- Instrucciones para agregar preguntas
- Roadmap de mejoras futuras

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **React Router 6** - Navegación entre páginas
- **Vite** - Build tool y dev server
- **LocalStorage** - Persistencia de datos
- **CSS moderno** - Grid, Flexbox, animaciones
