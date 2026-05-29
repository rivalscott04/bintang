const SOCIALS = [
  {
    href: 'https://www.instagram.com/grand.kotabintang/',
    icon: 'fa-brands fa-instagram',
    label: 'Instagram Resmi Grand Kota Bintang',
  },
  {
    href: 'https://www.tiktok.com/@grandkotabintang',
    icon: 'fa-brands fa-tiktok',
    label: 'Tiktok Resmi Grand Kota Bintang',
  },
  {
    href: '#',
    icon: 'fa-brands fa-youtube',
    label: 'Youtube Grand Kota Bintang',
  },
];

export default function Footer() {
  return (
    <footer className="bg-night text-white/60 pt-20 pb-[120px] border-t border-white/5">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-8 border-b border-white/5 pb-10 mb-10 max-md:flex-col max-md:items-start">
          <div className="footer-brand max-w-[520px]">
            <img
              src="/assets/logo.webp"
              alt="Grand Kota Bintang - Modern Integrated District"
              className="h-24 max-md:h-20 w-auto block mb-5 brightness-0 invert"
            />
            <p className="text-[0.95rem] font-light leading-[1.7]">
              Destinasi superblock modern di perbatasan Jakarta dan Bekasi, menghadirkan integrasi
              hunian eksklusif dan ruko komersial yang prestisius.
            </p>
          </div>

          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                className="w-12 h-12 rounded-full bg-white/3 border border-white/8 text-white flex items-center justify-center text-[1.15rem] no-underline transition-all duration-400 ease-luxury hover:bg-secondary hover:text-primary hover:border-secondary hover:-translate-y-0.5"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-[0.85rem]">
          <p>&copy; {new Date().getFullYear()} Grand Kota Bintang Superblock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
