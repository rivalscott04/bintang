import { useMemo, useState } from 'react';
import { calculateMortgage } from '../../utils/calculateMortgage';
import { formatRupiah } from '../../utils/formatRupiah';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import SectionHeader from '../ui/SectionHeader';

const TENOR_OPTIONS = [
  { value: 5, label: '5 Tahun (60 Bulan)' },
  { value: 10, label: '10 Tahun (120 Bulan)' },
  { value: 15, label: '15 Tahun (180 Bulan)' },
  { value: 20, label: '20 Tahun (240 Bulan)' },
  { value: 25, label: '25 Tahun (300 Bulan)' },
];

const clampInterest = (val) => {
  if (Number.isNaN(val) || val < 0.5) return 0.5;
  if (val > 25) return 25;
  return val;
};

const labelClass = 'font-display font-bold text-[0.95rem] text-primary';
const inputBaseClass =
  'w-full bg-surface border border-primary/8 rounded-sm px-4 py-3 outline-none font-body text-[0.95rem] transition-all duration-400 ease-luxury focus:border-secondary focus:bg-white';

const PRICE_MIN = 1_000_000_000;
const PRICE_MAX = 10_000_000_000;
const DP_MIN = 10;
const DP_MAX = 50;

const rangeFillStyle = (value, min, max) => ({
  '--value': `${((value - min) / (max - min)) * 100}%`,
});

export default function KPRCalculator() {
  const [price, setPrice] = useState(1_800_000_000);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenorYears, setTenorYears] = useState(15);
  const [interestRate, setInterestRate] = useState(6.5);

  const handleScroll = useSmoothScroll();

  const { dpAmount, loanAmount, monthlyInstalment } = useMemo(
    () => calculateMortgage({ price, dpPercent, tenorYears, annualInterest: interestRate }),
    [price, dpPercent, tenorYears, interestRate],
  );

  return (
    <section id="kpr-calculator" className="py-24 bg-surface">
      <div className="container-x">
        <SectionHeader
          label="PERENCANAAN FINANSIAL"
          title="Kalkulator Simulasi KPR"
          description="Hitung estimasi angsuran bulanan kepemilikan unit impian Anda secara realistis dengan bunga pasar terbaru."
        />

        <div className="bg-white rounded-lg overflow-hidden shadow-medium grid grid-cols-[1fr_400px] max-lg:grid-cols-[1fr_340px] max-md:grid-cols-1 border border-primary/2">
          <div className="p-12 max-lg:p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label htmlFor="propPrice" className={labelClass}>
                  Harga Properti (Rp)
                </label>
                <span className="font-display font-bold text-secondary-dark">
                  {formatRupiah(price)}
                </span>
              </div>
              <input
                id="propPrice"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={50_000_000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={rangeFillStyle(price, PRICE_MIN, PRICE_MAX)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label htmlFor="dpPercent" className={labelClass}>
                  Uang Muka / DP (%)
                </label>
                <span className="font-display font-bold text-secondary-dark">
                  {dpPercent}%{' '}
                  <span className="font-normal text-[0.85em] text-mute ml-1">
                    ({formatRupiah(dpAmount)})
                  </span>
                </span>
              </div>
              <input
                id="dpPercent"
                type="range"
                min={DP_MIN}
                max={DP_MAX}
                step={5}
                value={dpPercent}
                onChange={(e) => setDpPercent(Number(e.target.value))}
                style={rangeFillStyle(dpPercent, DP_MIN, DP_MAX)}
              />
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="tenorYears" className={labelClass}>
                  Jangka Waktu (Tenor)
                </label>
                <select
                  id="tenorYears"
                  value={tenorYears}
                  onChange={(e) => setTenorYears(Number(e.target.value))}
                  className={inputBaseClass}
                >
                  {TENOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interestRate" className={labelClass}>
                  Suku Bunga KPR (%)
                </label>
                <input
                  id="interestRate"
                  type="number"
                  min={1}
                  max={15}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  onBlur={(e) => setInterestRate(clampInterest(Number(e.target.value)))}
                  className={inputBaseClass}
                />
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-12 max-lg:p-8 flex flex-col justify-center border-l border-white/5 max-md:border-l-0 max-md:border-t">
            <h3 className="text-white text-[1.3rem] mb-6 text-center">Estimasi Angsuran Anda</h3>

            <div className="bg-white/5 border border-white/10 rounded-md p-6 text-center mb-8">
              <span className="text-[0.8rem] tracking-wider text-white/60 block mb-2 uppercase">
                Angsuran / Bulan
              </span>
              <span className="font-display font-extrabold text-[2rem] text-secondary">
                {formatRupiah(monthlyInstalment)}
              </span>
            </div>

            <div className="flex flex-col gap-4 mb-9">
              <div className="flex justify-between text-[0.9rem] text-white/70">
                <span>Jumlah Pinjaman</span>
                <strong className="text-white">{formatRupiah(loanAmount)}</strong>
              </div>
              <div className="flex justify-between text-[0.9rem] text-white/70">
                <span>Uang Muka (DP)</span>
                <strong className="text-white">{formatRupiah(dpAmount)}</strong>
              </div>
              <div className="flex justify-between text-[0.9rem] text-white/70">
                <span>Suku Bunga Tetap</span>
                <span>{interestRate}% p.a.</span>
              </div>
            </div>

            <a
              href="#contact"
              className="btn-primary btn-full btn-large justify-center"
              onClick={handleScroll}
            >
              <i className="fa-solid fa-percent" /> Ajukan KPR / Hubungi Bank{' '}
              <i className="fa-solid fa-chevron-right" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
