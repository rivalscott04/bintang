import { useEffect, useState } from 'react';
import { fetchClusterBySlug } from '../api/clusters';
import { hasApi } from '../api/config';
import { CLUSTERS } from '../data/clusters';

export function useCluster(slug) {
  const fallback = CLUSTERS.find((c) => c.id === slug || c.slug === slug) ?? null;
  const [cluster, setCluster] = useState(fallback);
  const [loading, setLoading] = useState(hasApi && !fallback);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setCluster(CLUSTERS.find((c) => c.id === slug || c.slug === slug) ?? null);
    setNotFound(false);
    setError(null);

    if (!hasApi) {
      setLoading(false);
      setNotFound(!CLUSTERS.some((c) => c.id === slug || c.slug === slug));
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const data = await fetchClusterBySlug(slug, { signal: controller.signal });
        if (!controller.signal.aborted) {
          setCluster(data);
          setNotFound(false);
          setError(null);
        }
      } catch (err) {
        if (controller.signal.aborted || err.name === 'AbortError') return;
        if (err.status === 404) {
          setNotFound(true);
          setCluster(null);
        } else {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [slug]);

  return { cluster, loading, error, notFound };
}
