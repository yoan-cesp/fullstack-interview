# 🎯 Sistema de Evaluación Técnica - Fullstack

## Descripción General

Sistema de evaluación técnica interactivo diseñado para evaluar conocimientos en:
- **React Hooks**: useState, useEffect, useRef, useMemo
- **Node.js/Express**: Middleware, rutas, APIs
- **Git**: Rebase, merge, reflog, recuperación de commits
- **CSS**: Flexbox, Grid, Box Model, especificidad
- **AWS**: S3, EBS, Lambda, IAM

## Características Principales

### ✨ Funcionalidades

1. **Sistema de Preguntas Tipo Quiz**
   - 21 preguntas técnicas sobre React, Node.js, Git, CSS y AWS
   - **Temporizador por pregunta** basado en complejidad:
     * Básico: 60 segundos (1 minuto)
     * Intermedio: 90 segundos (1.5 minutos)
     * Avanzado: 120 segundos (2 minutos)
   - Auto-avance al agotarse el tiempo (cuenta como fallo)
   - Navegación fluida entre preguntas con sistema de steps
   - Barra de progreso visual
   - Indicadores de preguntas completadas

2. **Interfaz Interactiva**
   - Bloques de código con syntax highlighting
   - Opciones de múltiple selección
   - Botón para copiar código
   - Diseño responsive y moderno

3. **Sistema de Resultados**
   - Puntuación visual con gráfico circular
   - Estadísticas detalladas (correctas, incorrectas, tiempo agotado, total)
   - Filtros para ver todas/correctas/incorrectas/tiempo agotado
   - Indicador especial para preguntas no respondidas por tiempo
   - Explicaciones detalladas de cada respuesta
   - Opción de reiniciar el examen

4. **Persistencia de Datos**
   - Las respuestas se guardan en localStorage
   - El progreso se mantiene al recargar la página
   - Posibilidad de retomar donde se quedó

## Estructura del Proyecto

```
fullstack-interview/
├── README.md                 # Documentación principal
├── DOCUMENTACION.md          # Este archivo - documentación detallada
├── package.json              # Dependencias y scripts
├── index.html                # HTML principal
├── vite.config.js            # Configuración de Vite
├── .stackblitzrc             # Configuración para StackBlitz
├── .gitignore                # Archivos ignorados por git
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
└── src/                      # Código fuente de la aplicación
    ├── App.jsx               # Configuración de rutas React Router
    ├── main.jsx              # Entry point de la aplicación
    ├── data/
    │   └── exercises.js      # Base de datos con 21 preguntas técnicas
    ├── pages/
    │   ├── Home.jsx                # Página principal con accesos
    │   ├── NuevosEjercicios.jsx   # Sistema de preguntas step-by-step
    │   └── NuevosResultados.jsx   # Visualización de resultados
    └── styles/
        └── global.css        # Estilos completos del sistema
```

**Notas importantes**:
- ✅ Este proyecto es **solo frontend** (no requiere backend)
- ✅ Toda la lógica se ejecuta en el navegador
- ✅ Los datos se almacenan en localStorage
- ✅ **Optimizado para StackBlitz**: Estructura plana para máxima compatibilidad
- ✅ Compatible con Vite y React 18

## Preguntas Incluidas

### 📚 React Hooks (11 preguntas)

1. **useState - Múltiples actualizaciones**: Comportamiento de múltiples setCounter
2. **useState - Función callback**: Uso de la forma funcional de setState
3. **useRef - Propiedad current**: Actualización de refs sin re-render
4. **useRef - Referencias en componentes funcionales**: Limitaciones de refs en functional components
5. **useRef - Contador de clicks**: Persistencia sin re-render
6. **useEffect - Cleanup function**: Funciones de limpieza y su ejecución
7. **useState - Mutación directa**: Problemas con la mutación de arrays
8. **useEffect - Múltiples efectos**: Loops infinitos con efectos sin dependencias
9. **useMemo - Memoización**: Requisitos de useMemo
10. **useState - Objetos y mutación**: Mutación de objetos vs inmutabilidad
11. **useEffect - Orden de ejecución**: Cleanup y múltiples efectos

### 🔧 Node.js / Backend (2 preguntas)

12. **Manejo de rutas API**: Evaluación de rutas en Express
13. **Middleware y orden de ejecución**: Flujo de middlewares en Express

### 🌳 Git (2 preguntas)

14. **Rebase vs Merge**: Diferencias entre git merge y git rebase
15. **Recuperar cambios perdidos**: Uso de git reflog para recuperar commits después de un hard reset

### 🎨 CSS (3 preguntas)

16. **Flexbox vs Grid**: Cuándo usar cada uno (unidimensional vs bidimensional)
17. **Especificidad**: Jerarquía de selectores y el uso de !important
18. **Box Model**: Cálculo de dimensiones con box-sizing

### ☁️ AWS (3 preguntas)

19. **S3 vs EBS**: Diferencias entre Object Storage y Block Storage
20. **Lambda Cold Start**: Qué es y cómo optimizar el rendimiento
21. **IAM Roles vs Users**: Cuándo usar cada uno para servicios vs personas

## Cómo Usar el Sistema

### Para el Candidato:

1. **Iniciar**: Acceder al Home y hacer clic en "Comenzar Ejercicios"
2. **Responder**: Leer cada pregunta, analizar el código y seleccionar una respuesta
3. **Navegar**: 
   - Usar "Siguiente" para avanzar
   - Usar "Anterior" para retroceder
   - Usar "Saltar" para omitir preguntas
   - Click en los indicadores para ir a una pregunta específica
4. **Finalizar**: Al terminar, hacer clic en "Ver Resultados"
5. **Revisar**: Ver puntuación, filtrar respuestas y leer explicaciones

### Para el Evaluador:

1. El sistema guarda automáticamente las respuestas
2. Se puede revisar el progreso en cualquier momento
3. Las explicaciones están disponibles en la página de resultados
4. Se puede reiniciar el examen desde la página de resultados

## Agregar Nuevas Preguntas

Edita el archivo `client/src/data/exercises.js`:

```javascript
{
  id: 14,  // ID único incremental
  title: "Título de la pregunta",
  category: "React Hooks", // o "Backend"
  difficulty: "Básico", // "Básico", "Intermedio", "Avanzado"
  question: "¿Cuál es...?",
  code: `// Código de ejemplo
const ejemplo = "hola";`,
  options: [
    { id: "a", text: "Opción A" },
    { id: "b", text: "Opción B" },
    { id: "c", text: "Opción C" },
    { id: "d", text: "Opción D" }
  ],
  correctAnswer: "a", // ID de la opción correcta
  explanation: "Explicación detallada de por qué esta es la respuesta correcta..."
}
```

## Tecnologías Utilizadas

- **React 18**: Framework principal
- **React Router 6**: Navegación entre páginas
- **Vite**: Build tool y dev server
- **LocalStorage**: Persistencia de datos
- **CSS moderno**: Diseño responsive con grid y flexbox

## Instalación y Ejecución

```bash
# Instalar dependencias
cd client
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## Características de UI/UX

### 🎨 Diseño

- **Colores temáticos**: Azul turquesa (#1f7a8c) como color primario
- **Badges de dificultad**: Verde (Básico), Naranja (Intermedio), Rojo (Avanzado)
- **Feedback visual**: Colores para correcto (verde) e incorrecto (rojo)
- **Animaciones suaves**: Transiciones y hover effects

### 📱 Responsive

- Diseño adaptativo para móviles, tablets y desktop
- Navegación optimizada para pantallas pequeñas
- Código con scroll horizontal en dispositivos móviles

### ♿ Accesibilidad

- Labels apropiados en todos los inputs
- Contraste de colores adecuado
- Navegación por teclado funcional

## Roadmap / Mejoras Futuras

- [ ] Exportar resultados a PDF
- [ ] Temporizador por pregunta
- [ ] Modo práctica vs modo evaluación
- [ ] Dashboard de administración
- [ ] Estadísticas globales de todos los candidatos
- [ ] Más categorías (TypeScript, Testing, etc.)
- [ ] Soporte para múltiples idiomas

## Contribuir

Para agregar más preguntas o mejorar el sistema:

1. Agrega preguntas en `exercises.js`
2. Actualiza los estilos en `global.css` si es necesario
3. Prueba todas las funcionalidades
4. Documenta los cambios

## Licencia

Este proyecto es de uso interno para evaluaciones técnicas.

---

Desarrollado con ❤️ para facilitar el proceso de entrevistas técnicas.

