# 🚀 Usar directamente desde GitHub

He configurado **2 formas** de usar tu proyecto directamente desde GitHub sin instalar nada localmente:

---

## ⚡ Opción 1: GitHub Codespaces (RECOMENDADO)

**GitHub Codespaces** es un entorno de desarrollo completo en la nube. Es GRATIS para cuentas personales (60 horas al mes).

### 📋 Pasos:

1. **Sube tu código a GitHub** (si aún no lo has hecho):
```bash
cd /Users/yoan/Documents/Code/MINE/fullstack-interview
git add .
git commit -m "Sistema de evaluación técnica con Codespaces"
git push origin master
```

2. **Abre GitHub Codespaces**:
   - Ve a tu repositorio en GitHub
   - Haz clic en el botón verde **"Code"**
   - Selecciona la pestaña **"Codespaces"**
   - Haz clic en **"Create codespace on master"**

3. **¡Listo!** 
   - Se abrirá VS Code en tu navegador
   - Instalará dependencias automáticamente
   - Ejecutará `npm run dev`
   - Se abrirá el proyecto en el puerto 5173

### ✨ Ventajas de Codespaces:

- ✅ **Node 20** preconfigurado (funciona al 100%)
- ✅ **VS Code completo** en el navegador
- ✅ **Terminal integrado**
- ✅ **Git integrado**
- ✅ **60 horas gratis/mes** (suficiente para desarrollo)
- ✅ **Se ejecuta automáticamente** al abrir

### 🔗 Cómo compartir con candidatos:

Puedes darles el link directo:
```
https://github.com/TU_USUARIO/fullstack-interview
```

Y decirles: "Haz clic en Code → Codespaces → Create codespace"

---

## 🌐 Opción 2: GitHub Pages (Deploy estático)

**GitHub Pages** publica tu proyecto como un sitio web público.

### 📋 Pasos:

1. **Sube tu código** (si aún no lo has hecho):
```bash
git add .
git commit -m "Añadir GitHub Pages workflow"
git push origin master
```

2. **Activar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Click en **"Settings"**
   - En el menú lateral, click en **"Pages"**
   - En **"Source"**, selecciona **"GitHub Actions"**

3. **El workflow se ejecutará automáticamente**:
   - Ve a la pestaña **"Actions"** en tu repo
   - Verás el workflow "Deploy to GitHub Pages" ejecutándose
   - Espera 2-3 minutos

4. **Tu sitio estará disponible en**:
```
https://TU_USUARIO.github.io/fullstack-interview/
```

### ✨ Ventajas de GitHub Pages:

- ✅ **URL pública permanente**
- ✅ **Gratis para siempre**
- ✅ **Deploy automático** en cada push
- ✅ **Perfecto para compartir** con candidatos
- ✅ **SSL/HTTPS incluido**

### 🔗 Cómo compartir con candidatos:

Solo comparte el link:
```
https://TU_USUARIO.github.io/fullstack-interview/
```

---

## 📊 Comparación

| Característica | Codespaces | GitHub Pages |
|----------------|------------|--------------|
| **Propósito** | Desarrollo | Producción |
| **Costo** | Gratis 60h/mes | Gratis ilimitado |
| **Edición** | ✅ Sí | ❌ No |
| **URL pública** | ❌ Temporal | ✅ Permanente |
| **Hot reload** | ✅ Sí | ❌ No |
| **Mejor para** | Desarrollar | Compartir |

---

## 🎯 Mi recomendación

### Para ti (desarrollar):
→ Usa **GitHub Codespaces** (Opción 1)

### Para candidatos (evaluación):
→ Usa **GitHub Pages** (Opción 2)

---

## 🆘 Solución de problemas

### GitHub Codespaces no aparece

**Solución**: Es posible que necesites habilitar Codespaces en tu cuenta:
1. Ve a GitHub Settings (tu perfil)
2. Click en "Codespaces"
3. Habilita Codespaces

### GitHub Pages muestra 404

**Solución**: 
1. Verifica que el workflow se haya ejecutado correctamente en "Actions"
2. Espera 5-10 minutos después del primer deploy
3. Verifica que Pages esté habilitado en Settings → Pages

### El sitio en Pages no carga correctamente

**Causa**: El `base` en `vite.config.js` debe coincidir con el nombre de tu repo

**Solución**: Si tu repo NO se llama "fullstack-interview", edita `vite.config.js`:
```javascript
base: '/NOMBRE-DE-TU-REPO/',
```

---

## 📝 Archivos creados para GitHub

He agregado/modificado estos archivos:

1. **`.devcontainer/devcontainer.json`** - Configuración de Codespaces
2. **`.github/workflows/pages.yml`** - Deploy automático a Pages
3. **`vite.config.js`** - Actualizado para GitHub Pages

---

## 🚀 Próximos pasos

### 1. Sube todo a GitHub:
```bash
cd /Users/yoan/Documents/Code/MINE/fullstack-interview
git add .
git commit -m "Configuración para GitHub Codespaces y Pages"
git push origin master
```

### 2. Prueba GitHub Codespaces:
- Ve a tu repo en GitHub
- Code → Codespaces → Create codespace

### 3. Activa GitHub Pages:
- Settings → Pages → Source: GitHub Actions

### 4. ¡Comparte!
- Codespaces: Para desarrollo colaborativo
- Pages: `https://TU_USUARIO.github.io/fullstack-interview/`

---

## ✅ Ventajas de usar GitHub directamente

- ✅ **Sin Node local**: Todo en la nube
- ✅ **Sin instalaciones**: Solo necesitas un navegador
- ✅ **Gratis**: Ambas opciones son gratuitas
- ✅ **Fácil de compartir**: Solo un link
- ✅ **Siempre disponible**: 24/7 en la nube
- ✅ **Versionado automático**: Git integrado

---

**¡Tu proyecto está 100% listo para usar desde GitHub!** 🎉

