import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { clusterPath, clusterTourPath } from '../utils/routes';

/**
 * Buka/tutup tur 3D via ?tour=1 atau path /klaster/:slug/tur (Opsi C).
 */
export function useClusterTourUrl(clusterSlug) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isTourRoute = location.pathname.endsWith('/tur');
  const isTourOpen = isTourRoute || searchParams.get('tour') === '1';

  const openTour = useCallback(() => {
    if (!clusterSlug) return;
    navigate(clusterTourPath(clusterSlug));
  }, [clusterSlug, navigate]);

  const closeTour = useCallback(() => {
    if (!clusterSlug) return;
    if (isTourRoute) {
      navigate(clusterPath(clusterSlug), { replace: true });
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.delete('tour');
    const qs = next.toString();
    navigate(`${clusterPath(clusterSlug)}${qs ? `?${qs}` : ''}`, { replace: true });
  }, [clusterSlug, isTourRoute, navigate, searchParams]);

  return useMemo(
    () => ({ isTourOpen, openTour, closeTour }),
    [isTourOpen, openTour, closeTour],
  );
}
