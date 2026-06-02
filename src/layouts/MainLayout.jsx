import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import StickyMobileNav from '../components/layout/StickyMobileNav';
import { ContactModalProvider } from '../context/ContactModalContext';

export default function MainLayout() {
  return (
    <ContactModalProvider>
      <a href="#content" className="skip-link">
        Lewati ke konten
      </a>

      <Header />

      <Outlet />

      <Footer />
      <ScrollToTopButton />
      <FloatingWhatsApp />
      <StickyMobileNav />
    </ContactModalProvider>
  );
}
