import { useEffect, useMemo, useState } from 'react';
import { fetchDefaultVirtualTour } from '../api/virtualTour';
import { hasApi } from '../api/config';
import { buildStaticVirtualTour, buildTourSceneConfig, getTourMeta } from '../utils/virtualTour';

const STATIC_TOUR = buildStaticVirtualTour();

export function useVirtualTour() {
  const [tour, setTour] = useState(null);
  const [syncing, setSyncing] = useState(hasApi);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchDefaultVirtualTour({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setTour(data);
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

  const activeTour = tour ?? STATIC_TOUR;
  const meta = useMemo(() => getTourMeta(activeTour), [activeTour]);
  const scene = useMemo(() => buildTourSceneConfig(activeTour), [activeTour]);

  return { tour, meta, scene, syncing, error };
}
