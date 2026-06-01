import { useEffect, useMemo, useState } from 'react';
import { fetchContactSettings } from '../api/contactSettings';
import { hasApi } from '../api/config';
import {
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_NUMBER,
  buildProjectWhatsAppUrl,
  buildWhatsAppUrl,
} from '../utils/constants';

const FALLBACK = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE),
  whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
};

export function useContactSettings() {
  const [contact, setContact] = useState(FALLBACK);
  const [syncing, setSyncing] = useState(hasApi);

  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchContactSettings({ signal: controller.signal });
        if (!controller.signal.aborted && data?.whatsappNumber) {
          setContact({
            whatsappNumber: data.whatsappNumber,
            whatsappUrl: data.whatsappUrl ?? buildWhatsAppUrl(data.whatsappDefaultMessage),
            whatsappDefaultMessage: data.whatsappDefaultMessage ?? WHATSAPP_DEFAULT_MESSAGE,
          });
        }
      } catch {
        /* Pakai fallback statis */
      } finally {
        if (!controller.signal.aborted) {
          setSyncing(false);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  return useMemo(
    () => ({
      ...contact,
      syncing,
      buildProjectWhatsAppUrl: (params) =>
        buildProjectWhatsAppUrl({ ...params, whatsappNumber: contact.whatsappNumber }),
      openProjectWhatsApp: (params) => {
        window.location.assign(
          buildProjectWhatsAppUrl({ ...params, whatsappNumber: contact.whatsappNumber }),
        );
      },
    }),
    [contact, syncing],
  );
}
