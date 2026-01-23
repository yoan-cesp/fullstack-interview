export const DEFAULT_QUESTION_COUNT = 7;
export const MULTI_STACK_QUESTION_COUNT = 10;

export const LEVELS = [
  {
    id: "intermedio",
    label: "Intermedio",
    description: "Fortalece los fundamentos y profundiza en patrones comunes.",
    difficulties: ["Básico", "Intermedio"],
  },
  {
    id: "intermedio-avanzado",
    label: "Intermedio Avanzado",
    description: "Ya construyes features complejas y buscas consolidar buenas prácticas.",
    difficulties: ["Intermedio", "Avanzado"],
  },
  {
    id: "avanzado",
    label: "Avanzado",
    description: "Lideras decisiones de arquitectura y necesitas escenarios abiertos.",
    difficulties: ["Avanzado"],
  },
];

export const TECH_STACKS = [
  {
    id: "react",
    label: "React",
    icon: "⚛️",
    description: "Componentes, Hooks, Suspense, optimización y patrones de composición.",
    focus: "SPA, manejadores de estado y performance.",
  },
  {
    id: "next",
    label: "Next.js",
    icon: "⏭️",
    description: "SSR, ISR, App Router, caching y data fetching híbrido.",
    focus: "Renderizado en el servidor y distribución global.",
  },
  {
    id: "nestjs",
    label: "NestJS",
    icon: "🧱",
    description: "Inyección de dependencias, pipes, interceptors y módulos.",
    focus: "Backend modular sobre Node.js.",
  },
  {
    id: "relational-db",
    label: "Bases de datos relacionales",
    icon: "🗄️",
    description: "Modelado normalizado, SQL avanzado, índices y transacciones.",
    focus: "Integridad referencial y consultas eficientes.",
  },
  {
    id: "nosql",
    label: "Bases de datos NoSQL",
    icon: "🧩",
    description: "Modelado orientado al acceso, particionado y consistencia eventual.",
    focus: "Escalabilidad horizontal y agregaciones específicas.",
  },
  {
    id: "css",
    label: "CSS",
    icon: "🎨",
    description: "Layout moderno con Flexbox/Grid, cascada, scopes y animaciones.",
    focus: "Sistemas de diseño consistentes.",
  },
  {
    id: "git",
    label: "Git",
    icon: "🌱",
    description: "Flujos colaborativos, reflog, cherry-pick, rebase interactivo.",
    focus: "Control de versiones seguro.",
  },
  {
    id: "qa-automation",
    label: "QA Automation",
    icon: "🧪",
    description: "Estrategias de testing, pipelines CI, coverage y automatización E2E.",
    focus: "Calidad continua desde el pipeline hasta producción.",
  },
  {
    id: "system-design",
    label: "Arquitectura / System Design",
    icon: "🧠",
    description: "Diseño de servicios, patrones de escalabilidad y trade-offs cloud.",
    focus: "Decisiones de alto nivel para equipos senior.",
  },
  {
    id: "aws",
    label: "AWS",
    icon: "☁️",
    description: "IAM, EC2, S3, Lambda, redes y observabilidad en AWS.",
    focus: "Buenas practicas y trade-offs en infraestructura AWS.",
  },
  {
    id: "vue",
    label: "Vue.js",
    icon: "🟢",
    description: "Composition API, Reactivity, Directivas, Componentes y estado global.",
    focus: "Framework progresivo para interfaces de usuario.",
  },
  {
    id: "java",
    label: "Java",
    icon: "☕",
    description: "Hibernate ORM, Spring Framework, Beans, JPA, Annotations y patrones enterprise.",
    focus: "Backend enterprise con Spring y persistencia ORM.",
  },
  {
    id: "flutter",
    label: "Flutter",
    icon: "🦋",
    description: "Widgets, estado, async, performance y arquitectura en Dart.",
    focus: "Apps multiplataforma con Flutter.",
  },
  {
    id: "android",
    label: "Android",
    icon: "🤖",
    description: "Kotlin, coroutines, lifecycle, Room, RecyclerView y arquitectura.",
    focus: "Apps nativas Android.",
  },
  {
    id: "ios",
    label: "iOS",
    icon: "🍎",
    description: "Swift, UIKit, concurrency, Auto Layout y lifecycle.",
    focus: "Apps nativas iOS.",
  },
  {
    id: "business-analyst",
    label: "Business Analyst",
    icon: "📊",
    description: "Requisitos, stakeholders, KPIs, priorización MoSCoW, análisis de procesos y comunicación técnica.",
    focus: "Traducción de negocio a soluciones técnicas y toma de decisiones.",
  },
  {
    id: "product-designer",
    label: "Product Designer",
    icon: "🎨",
    description: "Figma avanzado, research con Maze/Hotjar, prototipado, Design Systems y colaboración.",
    focus: "Diseño centrado en usuario, storytelling y sistemas de diseño escalables.",
  },
];

export const STACK_DICTIONARY = TECH_STACKS.reduce((acc, stack) => {
  acc[stack.id] = stack;
  return acc;
}, {});

export const LEVEL_DICTIONARY = LEVELS.reduce((acc, level) => {
  acc[level.id] = level;
  return acc;
}, {});

export function getQuestionTargetByStacks(stacks = []) {
  return Array.isArray(stacks) && stacks.length > 1
    ? MULTI_STACK_QUESTION_COUNT
    : DEFAULT_QUESTION_COUNT;
}
