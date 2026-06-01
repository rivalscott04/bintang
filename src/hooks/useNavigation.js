import { useEffect, useState } from 'react';
import { fetchNavigation } from '../api/navigation';
import { hasApi } from '../api/config';
import { NAV_LINKS } from '../data/navigation';
import { mergeNavigationLinks } from '../utils/navigation';

/** Menu kanonik dari `navigation.js`; label bisa disinkron dari API. */
export function useNavigation() {
  const [links, setLinks] = useState(NAV_LINKS);
  const [syncing, setSyncing] = useState(hasApi);

  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchNavigation({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setLinks(mergeNavigationLinks(data));
        }
      } catch {
        /* Tetap pakai NAV_LINKS statis jika API gagal */
      } finally {
        if (!controller.signal.aborted) {
          setSyncing(false);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  return { links, loading: false, syncing };
}
