import { useEffect, useRef, useState } from 'react';

/** True once the element is near or inside the viewport (one-shot). */
export function useNearViewport({ rootMargin = '240px' } = {}) {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (isNear) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return { ref, isNear };
}
