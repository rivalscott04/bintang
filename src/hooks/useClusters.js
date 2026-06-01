import { useEffect, useState } from 'react';
import { fetchClusters } from '../api/clusters';
import { hasApi } from '../api/config';
import { CLUSTERS } from '../data/clusters';

export function useClusters() {
  const [clusters, setClusters] = useState(CLUSTERS);
  const [syncing, setSyncing] = useState(hasApi);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchClusters({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setClusters(data);
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

  return { clusters, loading: false, syncing, error };
}
