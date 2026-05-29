import { useCallback } from 'react';

/**
 * Returns a click handler for anchor links that smooth-scrolls to the
 * target element, updates the URL hash silently, and re-focuses the
 * target for keyboard accessibility.
 */
export function useSmoothScroll(onNavigate) {
  return useCallback(
    (e) => {
      const target = e.currentTarget;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });

      if (typeof onNavigate === 'function') onNavigate();
    },
    [onNavigate],
  );
}
