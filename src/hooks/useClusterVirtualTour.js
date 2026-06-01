import { useEffect, useMemo, useState } from 'react';
import { fetchVirtualTourByCluster } from '../api/virtualTour';
import { hasApi } from '../api/config';
import { getStaticTourForCluster } from '../utils/clusterTour';
import { buildTourSceneConfig, getTourMeta } from '../utils/virtualTour';

export function useClusterVirtualTour(clusterSlug) {
  const staticTour = clusterSlug ? getStaticTourForCluster(clusterSlug) : null;
  const [tour, setTour] = useState(staticTour);
  const [syncing, setSyncing] = useState(Boolean(clusterSlug) && hasApi && !staticTour);
  const [error, setError] = useState(null);
  const [unavailable, setUnavailable] = useState(!clusterSlug || (!staticTour && !hasApi));

  useEffect(() => {
    if (!clusterSlug) {
      setTour(null);
      setUnavailable(true);
      setSyncing(false);
      return;
    }

    const local = getStaticTourForCluster(clusterSlug);
    setTour(local);
    setUnavailable(!local && !hasApi);
    setError(null);

    if (!hasApi) {
      setSyncing(false);
      return;
    }

    const controller = new AbortController();
    setSyncing(!local);

    (async () => {
      try {
        const data = await fetchVirtualTourByCluster(clusterSlug, { signal: controller.signal });
        if (!controller.signal.aborted) {
          if (data) {
            setTour(data);
            setUnavailable(false);
          } else {
            setTour(null);
            setUnavailable(true);
          }
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted && err.name !== 'AbortError') {
          if (local) {
            setError(err);
          } else {
            setTour(null);
            setUnavailable(true);
            setError(err);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setSyncing(false);
        }
      }
    })();

    return () => controller.abort();
  }, [clusterSlug]);

  const activeTour = tour;
  const meta = useMemo(() => (activeTour ? getTourMeta(activeTour) : null), [activeTour]);
  const scene = useMemo(() => (activeTour ? buildTourSceneConfig(activeTour) : { rooms: [] }), [activeTour]);
  const hasTour = Boolean(activeTour?.rooms?.length);

  return { tour: activeTour, meta, scene, syncing, error, unavailable, hasTour };
}
