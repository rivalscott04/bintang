import { useEffect, useState } from 'react';
import { fetchProjectBySlug } from '../api/projects';
import { hasApi } from '../api/config';
import { getProjectBySlug } from '../utils/projects';

/** Data lokal dulu jika ada; fetch API hanya untuk refresh / slug tanpa cache statis. */
export function useProject(slug) {
  const fallback = slug ? getProjectBySlug(slug) : undefined;
  const [project, setProject] = useState(fallback);
  const [loading, setLoading] = useState(Boolean(slug) && !fallback && hasApi);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(!fallback && Boolean(slug));

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    const local = getProjectBySlug(slug);

    if (!hasApi) {
      setProject(local);
      setLoading(false);
      setNotFound(!local);
      return;
    }

    const controller = new AbortController();
    if (!local) {
      setLoading(true);
    }
    setError(null);

    (async () => {
      try {
        const data = await fetchProjectBySlug(slug, { signal: controller.signal });
        if (!controller.signal.aborted) {
          setProject(data);
          setNotFound(false);
        }
      } catch (err) {
        if (!controller.signal.aborted && err.name !== 'AbortError') {
          if (err.status === 404 && !local) {
            setNotFound(true);
            setProject(undefined);
          } else if (!local) {
            setError(err);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [slug]);

  return { project, loading, error, notFound };
}
