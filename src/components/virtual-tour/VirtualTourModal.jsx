import { lazy, Suspense } from 'react';

const VirtualTour3D = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../sections/virtual-tour/VirtualTour3D'),
);

export default function VirtualTourModal({ open, onClose, tourConfig, meta }) {
  if (!open || !tourConfig?.rooms?.length) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-200 bg-night flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-white/10 border border-secondary/30 flex items-center justify-center text-3xl text-secondary animate-pulse-glow">
              <i className="fa-solid fa-circle-notch fa-spin" />
            </div>
            <p className="text-white font-display text-xl mb-2 font-bold">Memuat Engine 3D...</p>
            <p className="text-white/60 text-sm font-light">Mengunduh library Three.js (sekali saja).</p>
          </div>
        </div>
      }
    >
      <VirtualTour3D onClose={onClose} tourConfig={tourConfig} meta={meta} />
    </Suspense>
  );
}
