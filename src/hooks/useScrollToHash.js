import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCROLL_HASH_DELAY_MS, scrollToElement } from '../utils/scroll';

const HASH_REDIRECTS = {
  amenities: '/lokasi',
};

function scrollToHashTarget(id, attempt = 0) {
  const el = document.getElementById(id);
  if (el) {
    scrollToElement(el);
    return;
  }
  if (attempt >= 30) return;
  window.setTimeout(() => scrollToHashTarget(id, attempt + 1), 100);
}

/** Scroll ke hash di beranda, atau redirect hash lama ke halaman khusus. */
export function useScrollToHash() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/' || !hash) return;

    const id = hash.replace('#', '');
    const redirect = HASH_REDIRECTS[id];
    if (redirect) {
      navigate(redirect, { replace: true });
      return;
    }

    const timer = window.setTimeout(() => scrollToHashTarget(id), SCROLL_HASH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, navigate]);
}
