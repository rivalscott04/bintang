import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import StickyMobileNav from './components/layout/StickyMobileNav';
import Hero from './components/sections/Hero';
import Clusters from './components/sections/Clusters';
import VirtualTour from './components/sections/VirtualTour';
import Amenities from './components/sections/Amenities';
import KPRCalculator from './components/sections/KPRCalculator';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Toast from './components/ui/Toast';
import { useToast } from './hooks/useToast';

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
        <Clusters />
        <VirtualTour />
        <Amenities />
        <KPRCalculator />
        <About />
        <Contact onSubmit={handleLeadSubmit} />
      </main>

      <Footer />

      <FloatingWhatsApp />
      <StickyMobileNav />
      <Toast toast={toast} onClose={dismiss} />
    </>
  );
}
