import ContactForm from '../contact/ContactForm';
import {
  COMPANY_ADDRESS,
  COMPANY_WEBSITE,
  COMPANY_WEBSITE_DISPLAY,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  WORK_HOURS,
} from '../../utils/constants';
import SectionHeader from '../ui/SectionHeader';

export default function Contact({ onSubmit }) {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container-x">
        <SectionHeader
          label="KONSULTASI GRATIS"
          title="Mulai Rencana Hidup Anda Hari Ini"
          description="Tim marketing professional kami siap membantu memberikan informasi brosur, price list, promo subsidi, dan menemani Anda melakukan survei lokasi."
        />

        <div className="grid grid-cols-[1fr_520px] max-lg:grid-cols-[1fr_420px] max-md:grid-cols-1 gap-12 max-lg:gap-8 items-start">
          <div className="flex flex-col gap-8">
            <div className="bg-surface rounded-md p-9 border border-primary/2">
              <h3 className="text-[1.4rem] mb-4 font-bold">Marketing Gallery</h3>
              <p className="text-base text-mute mb-4 flex gap-3">
                <i className="fa-solid fa-location-dot text-secondary mt-1" /> {COMPANY_ADDRESS}
              </p>
              <p className="text-[0.95rem] text-mute flex gap-3">
                <i className="fa-solid fa-clock text-secondary mt-1" /> {WORK_HOURS}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <ContactLink
                href={`tel:${PHONE_NUMBER}`}
                icon="fa-solid fa-phone"
                label="Telepon Kantor"
                value={PHONE_DISPLAY}
              />
              <ContactLink
                href={COMPANY_WEBSITE}
                icon="fa-solid fa-globe"
                label="Website Resmi"
                value={COMPANY_WEBSITE_DISPLAY}
                external
              />
            </div>
          </div>

          <div className="bg-surface rounded-lg p-10 max-md:p-6 shadow-soft border border-primary/2">
            <ContactForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, label, value, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="bg-white border border-primary/6 rounded-sm p-5 flex items-center gap-5 no-underline text-ink transition-all duration-400 ease-luxury hover:border-secondary hover:shadow-soft hover:translate-x-1"
    >
      <span className="w-12 h-12 rounded-full bg-secondary/10 text-secondary-dark flex items-center justify-center text-[1.25rem]">
        <i className={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-[0.75rem] text-mute">{label}</span>
        <strong className="font-display font-bold text-[1.1rem] text-primary">{value}</strong>
      </div>
    </a>
  );
}
