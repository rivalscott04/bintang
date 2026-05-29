import { WHATSAPP_URL } from '../../utils/constants';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      aria-label="Hubungi Sales via WhatsApp"
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-[30px] right-[30px] w-[60px] h-[60px] min-w-[48px] min-h-[48px] rounded-full bg-[#25D366] text-white hidden md:flex items-center justify-center text-[2rem] no-underline z-999 transition-all duration-400 ease-luxury hover:scale-110 hover:-translate-y-1 shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)]"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
      <span className="absolute right-[76px] bg-primary text-white px-4 py-2 rounded-full text-[0.8rem] font-bold tracking-wider whitespace-nowrap opacity-0 pointer-events-none translate-x-2.5 transition-all duration-400 ease-luxury border border-white/10 group-hover:opacity-100 group-hover:translate-x-0">
        Hubungi Kami
      </span>
    </a>
  );
}
