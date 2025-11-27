# 🔐 Configurar Variables de Entorno en GitHub Pages

Como GitHub Pages es un servicio de hosting estático, las variables de entorno deben configurarse como **GitHub Secrets** y pasarse durante el build.

## 📋 Pasos para Configurar

### 1. Obtener las Variables de tu `.env`

Abre tu archivo `.env` local y copia los valores de estas variables:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DATABASE_URL=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 2. Agregar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, busca **Secrets and variables** → **Actions**
4. Click en **New repository secret** (Nuevo secreto del repositorio)
5. Agrega cada variable una por una:

   **Secret 1:**
   - **Name:** `VITE_FIREBASE_API_KEY`
   - **Secret:** (pega el valor de `VITE_FIREBASE_API_KEY` de tu `.env`)

   **Secret 2:**
   - **Name:** `VITE_FIREBASE_AUTH_DOMAIN`
   - **Secret:** (pega el valor de `VITE_FIREBASE_AUTH_DOMAIN`)

   **Secret 3:**
   - **Name:** `VITE_FIREBASE_DATABASE_URL`
   - **Secret:** (pega el valor de `VITE_FIREBASE_DATABASE_URL`)

   **Secret 4:**
   - **Name:** `VITE_FIREBASE_PROJECT_ID`
   - **Secret:** (pega el valor de `VITE_FIREBASE_PROJECT_ID`)

   **Secret 5:**
   - **Name:** `VITE_FIREBASE_STORAGE_BUCKET`
   - **Secret:** (pega el valor de `VITE_FIREBASE_STORAGE_BUCKET`)

   **Secret 6:**
   - **Name:** `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - **Secret:** (pega el valor de `VITE_FIREBASE_MESSAGING_SENDER_ID`)

   **Secret 7:**
   - **Name:** `VITE_FIREBASE_APP_ID`
   - **Secret:** (pega el valor de `VITE_FIREBASE_APP_ID`)

### 3. Verificar el Workflow

El archivo `.github/workflows/pages.yml` ya está configurado para usar estos secrets. No necesitas hacer nada más.

### 4. Disparar el Deploy

Después de agregar los secrets, puedes:

**Opción A: Push a main/master**
```bash
git add .
git commit -m "Configurar variables de entorno"
git push
```

**Opción B: Disparar manualmente**
1. Ve a **Actions** en GitHub
2. Selecciona el workflow **Deploy to GitHub Pages**
3. Click en **Run workflow**
4. Selecciona la rama (main o master)
5. Click en **Run workflow**

## ✅ Verificar que Funcionó

1. Ve a **Actions** en GitHub
2. Verifica que el workflow se ejecutó correctamente (check verde)
3. Ve a **Settings** → **Pages**
4. Verifica que el sitio está desplegado
5. Abre tu sitio en `https://TU_USUARIO.github.io/fullstack-interview/`
6. Abre la consola del navegador (F12)
7. Verifica que no hay errores de Firebase

## 🔒 Seguridad

- ✅ Los secrets están encriptados en GitHub
- ✅ Solo son visibles durante el build
- ✅ No se exponen en el código fuente
- ✅ Solo los colaboradores con acceso pueden verlos (pero no sus valores)

## 🆘 Troubleshooting

### El build falla con "Variable not found"
- Verifica que agregaste todos los 7 secrets
- Verifica que los nombres coinciden exactamente (case-sensitive)
- Verifica que los valores están completos (sin espacios al inicio/final)

### Firebase no funciona en producción
- Verifica que las variables están correctas en los secrets
- Verifica que el build se completó exitosamente
- Revisa la consola del navegador para errores específicos
- Verifica que las reglas de Firebase Realtime Database permiten lectura/escritura

### ¿Puedo ver los valores de los secrets?
- No, GitHub no permite ver los valores una vez guardados
- Si necesitas cambiarlos, debes eliminarlos y crearlos de nuevo
- O simplemente actualiza el valor del secret existente

## 📝 Nota Importante

**NO** subas tu archivo `.env` a GitHub. Está en `.gitignore` por seguridad. Usa siempre GitHub Secrets para producción.

