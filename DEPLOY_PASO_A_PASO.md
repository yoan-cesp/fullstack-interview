# 🚀 Deploy a GitHub Pages - Paso a Paso

Ya configuraste los secrets en GitHub. Ahora sigue estos pasos para desplegar:

## ✅ Paso 1: Verificar Cambios Locales

Asegúrate de que los cambios estén listos:

```bash
git status
```

Deberías ver cambios en:
- `src/utils/firebaseConfig.js` (sin valores hardcodeados)
- `.github/workflows/pages.yml` (configurado para usar secrets)

## ✅ Paso 2: Commit y Push

```bash
# Agregar los cambios
git add src/utils/firebaseConfig.js .github/workflows/pages.yml

# Hacer commit
git commit -m "🔒 Configurar Firebase con GitHub Secrets y eliminar valores hardcodeados"

# Push a GitHub
git push
```

## ✅ Paso 3: Verificar el Workflow

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. Deberías ver el workflow **"Deploy to GitHub Pages"** ejecutándose
4. Espera a que termine (puede tardar 2-5 minutos)

## ✅ Paso 4: Verificar el Deploy

1. Ve a **Settings** → **Pages** en tu repositorio
2. Verifica que el deploy está activo
3. Tu sitio estará en: `https://TU_USUARIO.github.io/fullstack-interview/`

## ✅ Paso 5: Probar Firebase

1. Abre tu sitio desplegado
2. Abre la consola del navegador (F12)
3. Intenta crear una sesión de monitoreo
4. Verifica que no hay errores de Firebase en la consola

## 🆘 Si el Deploy Falla

### Error: "Variable not found"
- Verifica que agregaste **todos los 7 secrets** en GitHub
- Verifica que los nombres coinciden exactamente (case-sensitive)
- Los nombres deben ser:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_DATABASE_URL`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`

### Error: "Build failed"
- Revisa los logs del workflow en **Actions**
- Verifica que los valores de los secrets son correctos
- Asegúrate de que no hay espacios extra en los valores

### Firebase no funciona en producción
- Verifica que las variables están correctas en los secrets
- Revisa la consola del navegador para errores específicos
- Verifica que las reglas de Firebase Realtime Database permiten lectura/escritura

## 🎯 Disparar Manualmente el Workflow

Si quieres disparar el workflow sin hacer push:

1. Ve a **Actions** en GitHub
2. Selecciona **"Deploy to GitHub Pages"** en el menú lateral
3. Click en **"Run workflow"** (botón arriba a la derecha)
4. Selecciona la rama (main o master)
5. Click en **"Run workflow"**

## ✅ Checklist Final

- [ ] Secrets configurados en GitHub (7 variables)
- [ ] Cambios commiteados y pusheados
- [ ] Workflow ejecutado exitosamente
- [ ] Sitio desplegado en GitHub Pages
- [ ] Firebase funciona correctamente
- [ ] No hay errores en la consola del navegador

¡Listo! Tu aplicación debería estar funcionando con Firebase en producción. 🎉

