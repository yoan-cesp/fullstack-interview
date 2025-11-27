// Firebase imports - solo se cargan si está disponible
let firebaseApp = null;
let firebaseDatabase = null;
let firebaseInitialized = false;

// Importación dinámica de firebaseConfig
async function getFirebaseConfig() {
  try {
    const configModule = await import('./firebaseConfig.js');
    return { 
      firebaseConfig: configModule.firebaseConfig, 
      isFirebaseConfigured: configModule.isFirebaseConfigured 
    };
  } catch {
    return { 
      firebaseConfig: null, 
      isFirebaseConfigured: () => false 
    };
  }
}

// Lazy load Firebase para evitar errores si no está instalado
async function initFirebase() {
  if (firebaseInitialized) return;
  
  try {
    const { initializeApp } = await import('firebase/app');
    const { getDatabase } = await import('firebase/database');
    const { firebaseConfig, isFirebaseConfigured } = await getFirebaseConfig();
    
    if (isFirebaseConfigured && isFirebaseConfigured()) {
      firebaseApp = initializeApp(firebaseConfig);
      firebaseDatabase = getDatabase(firebaseApp);
      firebaseInitialized = true;
    } else {
      firebaseInitialized = false;
    }
  } catch (error) {
    // Firebase no instalado o no configurado - modo desarrollo local
    firebaseInitialized = false;
  }
}

/**
 * Genera un ID de sesión único (2 dígitos: 00-99)
 * Si hay más de 100 sesiones activas, usa alfanumérico
 */
export function generateSessionId() {
  // Genera un ID de 2 dígitos (00-99)
  const randomNum = Math.floor(Math.random() * 100);
  return randomNum.toString().padStart(2, '0');
}

/**
 * Valida que un sessionId tenga formato válido
 */
export function validateSessionId(sessionId) {
  return /^[0-9a-zA-Z]{2,8}$/.test(sessionId);
}

/**
 * Escribe datos del candidato a Firebase
 */
export async function updateCandidateData(sessionId, data) {
  await initFirebase();
  
  console.log('📤 updateCandidateData - firebaseDatabase:', !!firebaseDatabase, 'sessionId:', sessionId);
  
  if (!firebaseDatabase) {
    // Fallback a modo local
    console.log('📻 Usando BroadcastChannel para enviar (Firebase no disponible)');
    publishCandidateUpdateLocal(sessionId, data);
    return Promise.resolve();
  }

  try {
    console.log('🔥 Enviando a Firebase Realtime Database');
    const { ref, set, serverTimestamp } = await import('firebase/database');
    const sessionRef = ref(firebaseDatabase, `sessions/${sessionId}/candidate`);
    const dataToSend = {
      ...data,
      lastUpdate: serverTimestamp()
    };
    console.log('🔥 Firebase: Enviando datos a path:', `sessions/${sessionId}/candidate`, 'datos:', dataToSend);
    return set(sessionRef, dataToSend).then(() => {
      console.log('✅ Firebase: Datos enviados exitosamente');
    }).catch((err) => {
      console.error('❌ Firebase: Error al enviar:', err);
      throw err;
    });
  } catch (error) {
    console.warn('❌ Error actualizando Firebase, usando modo local:', error);
    publishCandidateUpdateLocal(sessionId, data);
    return Promise.resolve();
  }
}

/**
 * Suscribe a cambios en los datos del candidato
 * @param {string} sessionId 
 * @param {function} callback Función que recibe los datos actualizados
 * @returns {function} Función para desuscribirse
 */
export async function subscribeToCandidate(sessionId, callback) {
  await initFirebase();
  
  console.log('🔍 subscribeToCandidate - firebaseDatabase:', !!firebaseDatabase, 'sessionId:', sessionId);
  
  if (!firebaseDatabase) {
    // Fallback: usar BroadcastChannel para desarrollo local
    console.log('📻 Usando BroadcastChannel (Firebase no disponible)');
    return subscribeToCandidateLocal(sessionId, callback);
  }

  try {
    console.log('🔥 Usando Firebase Realtime Database');
    const { ref, onValue, off, get } = await import('firebase/database');
    const sessionRef = ref(firebaseDatabase, `sessions/${sessionId}/candidate`);
    
    console.log('🔥 Suscribiéndose a path:', `sessions/${sessionId}/candidate`);
    
    // Primero verificar si hay datos existentes
    try {
      const snapshot = await get(sessionRef);
      if (snapshot.exists()) {
        console.log('🔥 Firebase: Datos existentes encontrados al suscribirse:', snapshot.val());
        callback(snapshot.val());
      } else {
        console.log('🔥 Firebase: No hay datos existentes aún');
      }
    } catch (getError) {
      console.warn('🔥 Firebase: Error al leer datos existentes:', getError);
      console.warn('🔥 Firebase: Esto puede ser por reglas de seguridad. Verifica las reglas en Firebase Console.');
      console.warn('🔥 Firebase: Código de error:', getError.code, 'Mensaje:', getError.message);
    }
    
    // onValue se dispara inmediatamente y luego en cada cambio
    const unsubscribe = onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      const exists = snapshot.exists();
      console.log('🔥 Firebase onValue disparado - exists:', exists, 'data:', data);
      
      if (exists && data) {
        console.log('🔥 Firebase: Datos válidos recibidos, llamando callback');
        callback(data);
      } else {
        console.log('🔥 Firebase: No hay datos aún o snapshot es null');
      }
    }, (error) => {
      console.error('🔥 Firebase: Error en onValue listener:', error);
      console.error('🔥 Firebase: Detalles del error:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
    });

    console.log('🔥 Firebase: Listener onValue registrado correctamente');

    // Retorna función de cleanup
    return () => {
      console.log('🔥 Firebase: Desuscribiéndose de sesión:', sessionId);
      unsubscribe();
    };
  } catch (error) {
    console.warn('❌ Error suscribiendo a Firebase, usando modo local:', error);
    console.error('❌ Detalles del error:', error);
    return subscribeToCandidateLocal(sessionId, callback);
  }
}

/**
 * Fallback local usando BroadcastChannel (solo mismo navegador)
 */
function subscribeToCandidateLocal(sessionId, callback) {
  const channelName = `interview-session-${sessionId}`;
  const channel = new BroadcastChannel(channelName);
  
  console.log('📻 BroadcastChannel creado para sesión:', sessionId, 'canal:', channelName);
  
  // Guardar referencia para debug
  window._broadcastChannels = window._broadcastChannels || {};
  window._broadcastChannels[sessionId] = channel;
  
  channel.onmessage = (event) => {
    console.log('📻 BroadcastChannel recibió mensaje:', event.data);
    console.log('📻 Tipo de mensaje:', typeof event.data, 'Tiene type?', event.data?.type, 'Tiene status?', event.data?.status);
    
    if (event.data && typeof event.data === 'object') {
      if (event.data.type === 'candidate-update') {
        // Mensaje con wrapper
        console.log('📻 Procesando mensaje con wrapper, payload:', event.data.payload);
        callback(event.data.payload);
      } else if (event.data.status) {
        // Mensaje directo sin wrapper (para compatibilidad)
        console.log('📻 Procesando mensaje directo:', event.data);
        callback(event.data);
      } else {
        console.warn('📻 Mensaje recibido pero formato desconocido:', event.data);
      }
    } else {
      console.warn('📻 Mensaje no es un objeto:', event.data);
    }
  };

  // También escuchar errores
  channel.onerror = (error) => {
    console.error('📻 Error en BroadcastChannel:', error);
  };

  return () => {
    console.log('📻 Cerrando BroadcastChannel para sesión:', sessionId);
    delete window._broadcastChannels?.[sessionId];
    channel.close();
  };
}

/**
 * Publica actualización local (para desarrollo sin Firebase)
 */
export function publishCandidateUpdateLocal(sessionId, data) {
  try {
    const channelName = `interview-session-${sessionId}`;
    console.log('📤 Publicando en BroadcastChannel, sesión:', sessionId, 'canal:', channelName, 'datos:', data);
    const channel = new BroadcastChannel(channelName);
    
    // Enviar con wrapper
    const wrappedMessage = {
      type: 'candidate-update',
      payload: data
    };
    console.log('📤 Enviando mensaje con wrapper:', wrappedMessage);
    channel.postMessage(wrappedMessage);
    
    // También enviar directo para compatibilidad
    console.log('📤 Enviando mensaje directo:', data);
    channel.postMessage(data);
    
    // No cerrar el canal inmediatamente, dejar que se cierre automáticamente
    setTimeout(() => {
      try {
        channel.close();
        console.log('📤 Canal BroadcastChannel cerrado');
      } catch (e) {
        console.warn('📤 Error al cerrar canal:', e);
      }
    }, 500); // Aumentado a 500ms para dar más tiempo
  } catch (error) {
    console.error('❌ BroadcastChannel no disponible:', error);
  }
}

/**
 * Verifica si una sesión existe
 */
export async function checkSessionExists(sessionId) {
  await initFirebase();
  
  if (!firebaseDatabase) {
    return Promise.resolve(false);
  }

  try {
    const { ref, onValue, off } = await import('firebase/database');
    return new Promise((resolve) => {
      const sessionRef = ref(firebaseDatabase, `sessions/${sessionId}/candidate`);
      onValue(sessionRef, (snapshot) => {
        resolve(snapshot.exists());
        off(sessionRef);
      }, { onlyOnce: true });
    });
  } catch (error) {
    return Promise.resolve(false);
  }
}

/**
 * Limpia una sesión (opcional, para cleanup)
 */
export async function cleanupSession(sessionId) {
  await initFirebase();
  
  if (!firebaseDatabase) {
    return Promise.resolve();
  }

  try {
    const { ref, set } = await import('firebase/database');
    const sessionRef = ref(firebaseDatabase, `sessions/${sessionId}`);
    return set(sessionRef, null);
  } catch (error) {
    console.warn('Error limpiando sesión:', error);
    return Promise.resolve();
  }
}

