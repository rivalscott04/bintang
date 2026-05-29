import { STICKY_NAV_ITEMS } from '../../data/stickyNav';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function StickyMobileNav() {
  const handleScroll = useSmoothScroll();

  return (
    <div
      className="flex md:hidden fixed bottom-0 left-0 w-full bg-primary backdrop-blur-md border-t border-white/10 z-998 justify-around items-center"
      style={{
        height: 'calc(68px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {STICKY_NAV_ITEMS.map((item) => {
        const baseClass =
          'flex flex-col items-center gap-1 no-underline text-[0.65rem] font-medium w-1/5 transition-colors duration-400 ease-luxury';

        const isCta = item.highlight;
        const colorClass = isCta ? 'text-[#25D366]' : 'text-white/60 hover:text-secondary focus:text-secondary';

        return (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            onClick={item.external ? undefined : handleScroll}
            className={`${baseClass} ${colorClass}`}
          >
            {isCta ? (
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366]/10 border border-[#25D366]/20 shadow-[0_4px_10px_rgba(37,211,102,0.15)] -mt-3 transition-all duration-400 ease-luxury">
                <i className={`${item.icon} text-[1.3rem]`} />
              </span>
            ) : (
              <i className={`${item.icon} text-[1.15rem]`} />
            )}
            <span>{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}
