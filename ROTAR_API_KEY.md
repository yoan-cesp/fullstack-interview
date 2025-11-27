# 🔒 Rotar API Key de Firebase (URGENTE)

GitHub detectó que tu API Key de Firebase fue expuesta públicamente en el código. **Debes rotarla inmediatamente** para prevenir acceso no autorizado.

## ⚠️ Pasos Urgentes

### 1. Revocar la API Key Actual en Firebase

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto: **interviewer-2543c**
3. Ve a **APIs & Services** → **Credentials**
4. Busca la API Key: `AIzaSyAcAVKB-qNakr5GFJWuND0ZQbTa2XaTg2U`
5. Click en la API Key para editarla
6. Click en **Restrict key** (Restringir clave)
7. O mejor aún, **DELETE** la clave y crea una nueva

### 2. Crear una Nueva API Key

1. En **APIs & Services** → **Credentials**
2. Click en **+ CREATE CREDENTIALS** → **API Key**
3. Copia la nueva API Key
4. (Opcional) Restringe la clave:
   - **Application restrictions**: HTTP referrers (web sites)
   - Agrega: `https://TU_USUARIO.github.io/*`
   - Y: `http://localhost:*` (para desarrollo)

### 3. Actualizar Variables de Entorno

**Local (.env):**
```env
VITE_FIREBASE_API_KEY=TU_NUEVA_API_KEY_AQUI
# ... resto de variables igual
```

**GitHub Secrets:**
1. Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**
2. Encuentra `VITE_FIREBASE_API_KEY`
3. Click en **Update** (o elimínala y créala de nuevo)
4. Pega la nueva API Key
5. Click en **Update secret**

### 4. Verificar Seguridad

1. Verifica que el código ya NO tiene valores hardcodeados
2. El archivo `src/utils/firebaseConfig.js` ahora solo usa variables de entorno
3. Haz commit y push de los cambios
4. Verifica que GitHub ya no muestra la alerta

### 5. Monitorear Uso

1. En Google Cloud Console, ve a **APIs & Services** → **Dashboard**
2. Monitorea el uso de la API Key
3. Si ves actividad sospechosa, revoca inmediatamente

## ✅ Checklist de Seguridad

- [ ] API Key antigua revocada/eliminada
- [ ] Nueva API Key creada
- [ ] Variables de entorno actualizadas (local y GitHub)
- [ ] Código sin valores hardcodeados
- [ ] Cambios commiteados y pusheados
- [ ] GitHub Secrets actualizados
- [ ] Deploy exitoso en GitHub Pages
- [ ] Alerta de GitHub cerrada

## 🛡️ Prevención Futura

- ✅ **NUNCA** hardcodear credenciales en el código
- ✅ **SIEMPRE** usar variables de entorno
- ✅ Verificar que `.env` está en `.gitignore`
- ✅ Usar GitHub Secrets para producción
- ✅ Revisar alertas de GitHub regularmente

## 📝 Nota

Si la API Key antigua ya fue comprometida, considera:
- Revisar logs de Firebase para actividad sospechosa
- Cambiar todas las credenciales relacionadas si es necesario
- Revisar reglas de seguridad de Firebase Realtime Database

