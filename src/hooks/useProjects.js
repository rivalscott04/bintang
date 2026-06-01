import { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projects';
import { hasApi } from '../api/config';
import { PROJECTS } from '../data/projects';

/**
 * Tampilkan data statis dulu (LCP cepat), sinkronkan dari API di background bila tersedia.
 */
export function useProjects() {
  const [projects, setProjects] = useState(PROJECTS);
  const [syncing, setSyncing] = useState(hasApi);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchProjects({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSyncing(false);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  return { projects, loading: false, syncing, error };
}
