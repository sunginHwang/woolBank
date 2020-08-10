import { useEffect } from 'react';

export default function useEventListener(eventType: string, callback: () => void) {
  useEffect(() => {
    window.addEventListener(eventType, callback);
    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, [eventType, callback]);

  return null;
}