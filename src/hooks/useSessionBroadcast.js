import { useRef, useCallback } from 'react';
import { 
  updateCandidateData, 
  publishCandidateUpdateLocal
} from '../utils/firebaseSession.js';

/**
 * Hook para emitir eventos de sesión en tiempo real
 * Usa Firebase si está configurado, sino usa BroadcastChannel local
 */
export function useSessionBroadcast(sessionId) {
  const lastUpdateRef = useRef(null);
  const sessionIdRef = useRef(sessionId);

  // Mantener sessionId actualizado
  sessionIdRef.current = sessionId;

  // Throttle: actualizar máximo cada 500ms
  // Usar useCallback para mantener la misma referencia
  const throttledUpdate = useCallback((data) => {
    if (!sessionIdRef.current) return;
    
    const now = Date.now();
    if (lastUpdateRef.current && now - lastUpdateRef.current < 500) {
      return;
    }
    lastUpdateRef.current = now;

    // updateCandidateData detecta automáticamente si Firebase está disponible
    updateCandidateData(sessionIdRef.current, data).catch(err => {
      console.error('Error updating session data:', err);
    });
  }, []); // Sin dependencias, usa refs para valores actuales

  return {
    emit: throttledUpdate
  };
}

