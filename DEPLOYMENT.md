# 🎯 Despliegue y Uso

## ⚠️ Importante: Versión de Node.js

Este proyecto requiere **Node.js 18+** para ejecutarse localmente debido a Vite 5.

Si tu versión local de Node es anterior a la 18, tienes dos opciones:

### ✅ Opción 1: Usar StackBlitz (Recomendado - Sin instalación)

StackBlitz ejecuta el proyecto en la nube con Node.js moderno. **No necesitas instalar nada**.

**Pasos**:
1. Sube tu código a GitHub
2. Abre: `https://stackblitz.com/github/TU_USUARIO/TU_REPOSITORIO`
3. ¡Listo! El proyecto se ejecutará automáticamente

Ver más detalles en [STACKBLITZ.md](./STACKBLITZ.md)

### ✅ Opción 2: Actualizar Node.js localmente

```bash
# Usando nvm (Node Version Manager)
nvm install 18
nvm use 18

# O descarga directamente desde
# https://nodejs.org/ (versión 18 LTS o superior)
```

Luego ejecuta:
```bash
npm install
npm run dev
```

## 🚀 Despliegue en producción

### Netlify (Recomendado)

1. Conecta tu repositorio de GitHub
2. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` o superior
3. Deploy automático en cada push

### Vercel

1. Importa tu proyecto desde GitHub
2. Vercel detectará automáticamente que es un proyecto Vite
3. Deploy automático

### GitHub Pages

```bash
# 1. Construir el proyecto
npm run build

# 2. Subir el contenido de la carpeta dist/
# a la rama gh-pages o configurar GitHub Pages
# para leer desde la carpeta /dist en tu rama principal
```

## 📊 Estructura actual del proyecto

```
fullstack-interview/
├── 📄 index.html              ← HTML principal
├── 📄 package.json            ← Dependencias
├── 📄 vite.config.js          ← Config de Vite
├── 📄 .stackblitzrc           ← Config StackBlitz
├── 📁 src/                    ← Código fuente
│   ├── App.jsx
│   ├── main.jsx
│   ├── data/exercises.js
│   ├── pages/
│   └── styles/
└── 📁 node_modules/           ← Dependencias instaladas
```

## ✅ Cambios realizados para StackBlitz

1. ✅ **Estructura aplanada**: Movimos todo de `client/` a la raíz
2. ✅ **package.json unificado**: Un solo package.json con todas las dependencias
3. ✅ **`.stackblitzrc`**: Configuración automática para StackBlitz
4. ✅ **Eliminado el backend**: Proyecto 100% frontend
5. ✅ **Documentación actualizada**: README, DOCUMENTACION y STACKBLITZ.md

## 🎮 Probar localmente (Node 18+)

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con hot reload)
npm run dev
# → http://localhost:5173

# Build de producción
npm run build
# → Genera carpeta dist/

# Vista previa del build
npm run preview
# → http://localhost:4173
```

## 🐛 Solución de problemas

### Error: "command not found: vite"
**Causa**: Vite no está instalado o Node < 18
**Solución**: 
- Ejecuta `npm install`
- O actualiza Node a versión 18+
- O usa StackBlitz

### Error: "Unsupported engine"
**Causa**: Tu versión de Node es < 18
**Solución**: 
- Actualiza Node con `nvm install 18 && nvm use 18`
- O usa StackBlitz (no requiere Node local)

### El proyecto funciona en StackBlitz pero no localmente
**Causa**: Versión de Node incompatible
**Solución**: StackBlitz usa Node moderno automáticamente. Actualiza tu Node local a 18+

## 📦 Tamaño del proyecto

- **Código fuente**: ~50 KB
- **Dependencias (node_modules)**: ~150 MB (no se suben a StackBlitz)
- **Build final (dist)**: ~200 KB

## 🌐 URLs de ejemplo

- **StackBlitz**: `https://stackblitz.com/github/usuario/repo`
- **Netlify**: `https://nombre-proyecto.netlify.app`
- **Vercel**: `https://nombre-proyecto.vercel.app`
- **GitHub Pages**: `https://usuario.github.io/repo`

---

💡 **Recomendación**: Si solo quieres probar o compartir el proyecto rápidamente, usa StackBlitz. Si necesitas un deployment permanente, usa Netlify o Vercel.

