import { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import StickyMobileNav from './components/layout/StickyMobileNav';
import Hero from './components/sections/Hero';
import Toast from './components/ui/Toast';
import { useToast } from './hooks/useToast';

const Clusters = lazy(() => import('./components/sections/Clusters'));
const VirtualTour = lazy(() => import('./components/sections/VirtualTour'));
const Amenities = lazy(() => import('./components/sections/Amenities'));
const KPRCalculator = lazy(() => import('./components/sections/KPRCalculator'));
const About = lazy(() => import('./components/sections/About'));
const Contact = lazy(() => import('./components/sections/Contact'));

function SectionFallback({ minHeight = 320 }) {
  return (
    <div
      className="py-24 bg-surface animate-pulse"
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const { toast, show, dismiss } = useToast();

  const handleLeadSubmit = (data) => {
    show({
      title: 'Pesan Terkirim!',
      message: `Halo ${data.name}, pengajuan brosur klaster ${data.cluster} berhasil kami terima. Sales kami akan segera menghubungi Anda via WhatsApp.`,
      type: 'success',
    });
  };

  return (
    <>
      <a href="#content" className="skip-link">
        Lewati ke konten
      </a>

      <Header />

      <main id="content">
        <Hero />
        <Suspense fallback={null}>
          <Clusters />
          <VirtualTour />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={480} />}>
          <Amenities />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <KPRCalculator />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={400} />}>
          <Contact onSubmit={handleLeadSubmit} />
        </Suspense>
      </main>

      <Footer />

      <FloatingWhatsApp />
      <StickyMobileNav />
      <Toast toast={toast} onClose={dismiss} />
    </>
  );
}
