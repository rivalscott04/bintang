import { useCallback } from 'react';
import { scrollToElement } from '../utils/scroll';

function resolveHash(href) {
  if (!href) return null;
  if (href.startsWith('#')) return href;
  const idx = href.indexOf('#');
  if (idx === -1) return null;
  return href.slice(idx);
}

/**
 * Handler untuk anchor #section di beranda (/#amenities atau #amenities).
 */
export function useSmoothScroll(onNavigate) {
  return useCallback(
    (e) => {
      const target = e.currentTarget;
      const href = target.getAttribute('href');
      const hash = resolveHash(href);
      if (!hash || hash === '#') return;

      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();
      scrollToElement(el);
      history.pushState(null, '', hash);
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });

      if (typeof onNavigate === 'function') onNavigate();
    },
    [onNavigate],
  );
}
