// Firebase Configuration
// IMPORTANTE: Todas las variables deben estar en variables de entorno
// NO hardcodear valores aquí por seguridad
//
// Para desarrollo local:
// 1. Crea un archivo .env en la raíz del proyecto
// 2. Agrega las variables VITE_FIREBASE_*
// 3. El archivo .env está en .gitignore y NO se sube a GitHub
//
// Para producción (GitHub Pages):
// 1. Configura GitHub Secrets (Settings → Secrets and variables → Actions)
// 2. El workflow las pasa durante el build
// 3. Ver CONFIGURAR_GITHUB_SECRETS.md para más detalles

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Verifica si Firebase está configurado correctamente
export const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey.trim() !== "" &&
    firebaseConfig.projectId && 
    firebaseConfig.projectId.trim() !== "" &&
    firebaseConfig.databaseURL && 
    firebaseConfig.databaseURL.trim() !== ""
  );
};

