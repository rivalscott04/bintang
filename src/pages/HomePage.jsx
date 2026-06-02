import { lazy, Suspense, useEffect } from 'react';
import HomeSectionFallback from '../components/home/HomeSectionFallback';
import HomeSnapSection from '../components/home/HomeSnapSection';
import Hero from '../components/sections/Hero';
import ProjectsPreview from '../components/sections/ProjectsPreview';
import Toast from '../components/ui/Toast';
import { useHomeScrollSnap } from '../hooks/useHomeScrollSnap';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { useToast } from '../hooks/useToast';
import '../styles/home-scroll-snap.css';

const ClustersPreview = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/ClustersPreview'),
);
const VirtualTour = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/VirtualTour'),
);
const Amenities = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/Amenities'),
);
const KPRCalculator = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/KPRCalculator'),
);
const About = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/About'),
);
const Contact = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/Contact'),
);

export default function HomePage() {
  useHomeScrollSnap();
  useScrollToHash();
  const { toast, show, dismiss } = useToast();

  useEffect(() => {
    document.title = 'Grand Kota Bintang | Modern Living Superblock & Residential Bekasi';
  }, []);

  const handleLeadSubmit = (data) => {
    show({
      title: 'Pesan Terkirim!',
      message: `Halo ${data.name}, pengajuan brosur klaster ${data.cluster} berhasil kami terima. Tim kami akan segera menghubungi Anda via WhatsApp.`,
      type: 'success',
    });
  };

  return (
    <>
      <main id="content">
        <HomeSnapSection fullViewport ariaLabel="Beranda">
          <Hero />
        </HomeSnapSection>

        <HomeSnapSection fullViewport ariaLabel="Proyek">
          <ProjectsPreview />
        </HomeSnapSection>

        <HomeSnapSection ariaLabel="Klaster hunian">
          <Suspense fallback={<HomeSectionFallback />}>
            <ClustersPreview />
          </Suspense>
        </HomeSnapSection>

        <HomeSnapSection ariaLabel="Tur virtual 3D">
          <Suspense fallback={<HomeSectionFallback />}>
            <VirtualTour />
          </Suspense>
        </HomeSnapSection>

        <HomeSnapSection ariaLabel="Amenitas dan lokasi">
          <Suspense fallback={<HomeSectionFallback minHeight="520px" />}>
            <Amenities />
          </Suspense>
        </HomeSnapSection>

        <HomeSnapSection ariaLabel="Simulasi KPR">
          <Suspense fallback={<HomeSectionFallback minHeight="400px" />}>
            <KPRCalculator />
          </Suspense>
        </HomeSnapSection>

        <HomeSnapSection ariaLabel="Tentang Grand Kota Bintang">
          <Suspense fallback={<HomeSectionFallback minHeight="400px" />}>
            <About />
          </Suspense>
        </HomeSnapSection>

        <HomeSnapSection ariaLabel="Hubungi kami">
          <Suspense fallback={<HomeSectionFallback minHeight="480px" />}>
            <Contact onSubmit={handleLeadSubmit} />
          </Suspense>
        </HomeSnapSection>
      </main>

      <Toast toast={toast} onClose={dismiss} />
    </>
  );
}
