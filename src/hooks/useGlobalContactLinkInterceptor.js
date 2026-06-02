import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isContactLinkHref } from '../utils/contactLink';

function readContactOptions(anchor) {
  const cluster = anchor.dataset.contactCluster?.trim();
  const project = anchor.dataset.contactProject?.trim();
  return {
    defaultCluster: cluster || undefined,
    defaultProject: project || undefined,
  };
}

/**
 * Semua link ke #contact di luar beranda → modal (bukan redirect ke landing).
 */
export function useGlobalContactLinkInterceptor(openContactModal) {
  const location = useLocation();

  useEffect(() => {
    const onDocumentClick = (e) => {
      if (location.pathname === '/') return;

      const anchor = e.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!isContactLinkHref(href)) return;

      e.preventDefault();
      e.stopPropagation();
      openContactModal(readContactOptions(anchor));
    };

    document.addEventListener('click', onDocumentClick, true);
    return () => document.removeEventListener('click', onDocumentClick, true);
  }, [location.pathname, openContactModal]);
}
