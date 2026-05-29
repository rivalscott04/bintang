import { useCallback, useEffect, useRef, useState } from 'react';

const AUTO_DISMISS_MS = 6000;

export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    setToast(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const show = useCallback(
    ({ title, message, type = 'success' }) => {
      setToast({ title, message, type });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setToast(null);
        timerRef.current = null;
      }, AUTO_DISMISS_MS);
    },
    [],
  );

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return { toast, show, dismiss };
}
