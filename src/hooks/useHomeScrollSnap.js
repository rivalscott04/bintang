import { useEffect } from 'react';
import { isIOSDevice, supportsScrollSnap } from '../utils/device';

const SNAP_CLASS = 'home-scroll-snap';
const IOS_CLASS = 'home-scroll-snap-ios';

/**
 * Scroll-snap beranda — Chrome/Edge/Firefox (desktop & Android), Safari iOS.
 * iOS: snap di `body` (WebKit); lainnya: snap di `html`.
 */
export function useHomeScrollSnap(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !supportsScrollSnap()) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add(SNAP_CLASS);
    if (isIOSDevice()) {
      root.classList.add(IOS_CLASS);
    }

    return () => {
      root.classList.remove(SNAP_CLASS, IOS_CLASS);
    };
  }, [enabled]);
}
