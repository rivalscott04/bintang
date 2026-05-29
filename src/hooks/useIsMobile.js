import { useEffect, useState } from 'react';

/**
 * useIsMobile — track apakah viewport width ≤ breakpoint (default 768px).
 *
 * Pakai matchMedia listener biar reactive kalau user rotate device atau resize browser.
 * SSR-safe: kalau di server, return false (asumsi desktop sebagai default render).
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}
