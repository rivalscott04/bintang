import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ContactModal from '../components/contact/ContactModal';
import Toast from '../components/ui/Toast';
import { useGlobalContactLinkInterceptor } from '../hooks/useGlobalContactLinkInterceptor';
import { useToast } from '../hooks/useToast';

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
  const [state, setState] = useState({ open: false, defaultCluster: null, defaultProject: null });
  const { toast, show, dismiss } = useToast();

  const openContactModal = useCallback((options = {}) => {
    setState({
      open: true,
      defaultCluster: options.defaultCluster ?? null,
      defaultProject: options.defaultProject ?? null,
    });
  }, []);

  useGlobalContactLinkInterceptor(openContactModal);

  const closeContactModal = useCallback(() => {
    setState({ open: false, defaultCluster: null, defaultProject: null });
  }, []);

  const handleSubmit = useCallback(
    (data) => {
      closeContactModal();
      show({
        title: 'Pesan Terkirim!',
        message: `Halo ${data.name}, pengajuan brosur klaster ${data.cluster} berhasil kami terima. Tim kami akan segera menghubungi Anda via WhatsApp.`,
        type: 'success',
      });
    },
    [closeContactModal, show],
  );

  const value = useMemo(
    () => ({ openContactModal, closeContactModal, isOpen: state.open }),
    [openContactModal, closeContactModal, state.open],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal
        open={state.open}
        defaultCluster={state.defaultCluster}
        defaultProject={state.defaultProject}
        onClose={closeContactModal}
        onSubmit={handleSubmit}
      />
      <Toast toast={toast} onClose={dismiss} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return ctx;
}
