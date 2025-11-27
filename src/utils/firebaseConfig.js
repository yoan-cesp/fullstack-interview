// Firebase Configuration
// Para usar: crea un proyecto en https://console.firebase.google.com
// Ve a Project Settings > General > Your apps > Web app
// Copia la configuración y reemplaza los valores abajo

// IMPORTANTE: En producción, usa variables de entorno
// Para desarrollo local, puedes poner los valores aquí temporalmente

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAcAVKB-qNakr5GFJWuND0ZQbTa2XaTg2U",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "interviewer-2543c.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://interviewer-2543c-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "interviewer-2543c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "interviewer-2543c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "359380120972",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:359380120972:web:3da519d936d524dab112a9"
};

// Verifica si Firebase está configurado
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && 
         firebaseConfig.apiKey !== "your-api-key" && 
         firebaseConfig.databaseURL && 
         firebaseConfig.databaseURL !== "https://your-project-default-rtdb.firebaseio.com";
};

