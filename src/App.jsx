import { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import StickyMobileNav from './components/layout/StickyMobileNav';
import Hero from './components/sections/Hero';
import LazyWhenVisible from './components/ui/LazyWhenVisible';
import Toast from './components/ui/Toast';
import { useToast } from './hooks/useToast';

const Clusters = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './components/sections/Clusters'),
);
const VirtualTour = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './components/sections/VirtualTour'),
);
const Amenities = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './components/sections/Amenities'),
);
const KPRCalculator = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './components/sections/KPRCalculator'),
);
const About = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './components/sections/About'),
);
const Contact = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './components/sections/Contact'),
);

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

        <LazyWhenVisible minHeight="800px">
          <Suspense fallback={null}>
            <Clusters />
          </Suspense>
        </LazyWhenVisible>

        <LazyWhenVisible minHeight="600px">
          <Suspense fallback={null}>
            <VirtualTour />
          </Suspense>
        </LazyWhenVisible>

        <LazyWhenVisible minHeight="520px">
          <Suspense fallback={null}>
            <Amenities />
          </Suspense>
        </LazyWhenVisible>

        <LazyWhenVisible minHeight="400px">
          <Suspense fallback={null}>
            <KPRCalculator />
          </Suspense>
        </LazyWhenVisible>

        <LazyWhenVisible minHeight="400px">
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </LazyWhenVisible>

        <LazyWhenVisible minHeight="480px">
          <Suspense fallback={null}>
            <Contact onSubmit={handleLeadSubmit} />
          </Suspense>
        </LazyWhenVisible>
      </main>

      <Footer />

      <FloatingWhatsApp />
      <StickyMobileNav />
      <Toast toast={toast} onClose={dismiss} />
    </>
  );
}
