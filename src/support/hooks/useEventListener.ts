import { useEffect } from 'react';

export default function useEventListener(eventType: string, callback: any) {
  useEffect(() => {
    window.addEventListener(eventType, callback, { passive: false });
    return () => {
      window.removeEventListener(eventType, callback);
    };
  }, [eventType, callback]);

  return null;
}
