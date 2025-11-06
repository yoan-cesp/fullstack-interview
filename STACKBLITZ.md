# 🚀 Guía de StackBlitz

Este proyecto está **100% optimizado para StackBlitz** y se ejecutará sin ninguna configuración adicional.

## ⚡ Cómo abrir el proyecto en StackBlitz

### Opción 1: Desde GitHub (Recomendado)

Si tu proyecto está en GitHub, simplemente usa esta URL:

```
https://stackblitz.com/github/TU_USUARIO/TU_REPOSITORIO
```

Ejemplo:
```
https://stackblitz.com/github/yoan/fullstack-interview
```

### Opción 2: Importar desde URL

1. Ve a [StackBlitz](https://stackblitz.com)
2. Haz clic en "Import from GitHub"
3. Pega la URL de tu repositorio
4. ¡Listo! El proyecto se abrirá automáticamente

### Opción 3: Subir archivos manualmente

1. Ve a [StackBlitz](https://stackblitz.com)
2. Haz clic en "New Project" → "React"
3. Elimina los archivos por defecto
4. Arrastra y suelta todos los archivos de este proyecto (excepto `node_modules` y `.git`)

## ✅ Verificación

Una vez abierto en StackBlitz, deberías ver:

1. ✅ El proyecto instalando dependencias automáticamente
2. ✅ El servidor de desarrollo iniciándose
3. ✅ La aplicación ejecutándose en la vista previa
4. ✅ La URL de la aplicación lista para compartir

## 🎯 Características optimizadas

Este proyecto está configurado específicamente para StackBlitz:

- ✅ **Estructura plana**: Todos los archivos en la raíz (no subdirectorios)
- ✅ **`.stackblitzrc`**: Configuración automática incluida
- ✅ **Vite**: Build tool rápido y compatible
- ✅ **React 18**: Versión estable y bien soportada
- ✅ **Sin backend**: 100% frontend, sin necesidad de servidor
- ✅ **LocalStorage**: Persistencia sin base de datos

## 🔧 Solución de problemas

### Si el proyecto no se ejecuta automáticamente:

1. Verifica que las dependencias se hayan instalado (revisa la consola)
2. Si no se instalaron, ejecuta manualmente:
   ```bash
   npm install
   ```
3. Luego ejecuta:
   ```bash
   npm run dev
   ```

### Si aparece un error de dependencias:

1. Limpia e instala de nuevo:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Si el puerto está ocupado:

StackBlitz maneja esto automáticamente, pero si tienes problemas, simplemente recarga la página.

## 📦 Dependencias del proyecto

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

## 🌐 Compartir tu proyecto

Una vez que el proyecto esté ejecutándose en StackBlitz:

1. Haz clic en "Share" en la esquina superior derecha
2. Copia el enlace generado
3. Comparte el enlace con cualquiera
4. El proyecto se abrirá listo para usar, sin necesidad de instalación

## 💡 Consejos

- **Guarda cambios**: StackBlitz guarda automáticamente tus cambios
- **Forkea el proyecto**: Si quieres hacer cambios permanentes, crea un fork
- **Conecta con GitHub**: Puedes conectar StackBlitz con tu cuenta de GitHub para sincronizar cambios
- **Hot Reload**: Los cambios se reflejan instantáneamente en la vista previa

## 📝 Notas adicionales

- No necesitas Node.js instalado localmente
- No necesitas configurar nada
- Todo se ejecuta en el navegador
- Compatible con todos los navegadores modernos

---

¿Problemas? Revisa la [documentación oficial de StackBlitz](https://developer.stackblitz.com/docs/platform/)

