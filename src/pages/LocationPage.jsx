import { Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeSectionFallback from '../components/home/HomeSectionFallback';
import { AmenitiesSection } from '../lazy/amenitiesSection';

export default function LocationPage() {
  useEffect(() => {
    document.title = 'Lokasi & Amenitas | Grand Kota Bintang';
  }, []);

  return (
    <main id="content" className="pt-28 pb-24 bg-white min-h-screen">
      <div className="container-x">
        <nav className="text-[0.85rem] text-mute mb-8" aria-label="Breadcrumb">
          <Link to="/" className="text-mute no-underline hover:text-secondary transition-colors">
            Beranda
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-primary font-medium">Lokasi</span>
        </nav>
      </div>
      <Suspense fallback={<HomeSectionFallback minHeight="520px" />}>
        <AmenitiesSection embedded />
      </Suspense>
    </main>
  );
}
