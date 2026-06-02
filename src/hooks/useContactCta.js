import { useCallback } from 'react';
import { useContactModal } from '../context/ContactModalContext';

/** Buka modal kontak dari kode (tombol non-link). */
export function useContactCta(defaultCluster, defaultProject) {
  const { openContactModal } = useContactModal();

  const openContact = useCallback(
    (options = {}) => {
      openContactModal({
        defaultCluster: options.defaultCluster ?? defaultCluster,
        defaultProject: options.defaultProject ?? defaultProject,
      });
    },
    [openContactModal, defaultCluster, defaultProject],
  );

  return { openContact };
}
