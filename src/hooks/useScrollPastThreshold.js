import { useEffect, useState } from 'react';

/** True setelah window di-scroll melewati `threshold` px. */
export function useScrollPastThreshold(threshold = 320) {
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastThreshold(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return pastThreshold;
}
