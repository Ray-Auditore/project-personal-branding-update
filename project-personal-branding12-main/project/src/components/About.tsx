import { Fingerprint, Briefcase, Coffee, Skull } from 'lucide-react';
import { asset, useCountUp, useReveal } from '@/lib/hooks';
import { Reveal } from './Extras';
import Tilt from './Tilt';
import MemoryBoard from './MemoryBoard';

const SKILLS = [
  { name: 'TypeScript', level: 60 },
  { name: 'React / Next.js', level: 95 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Tailwind CSS', level: 96 },
  { name: 'Forensic Debugging', level: 89 },
];

const FACTS = [
  { icon: Briefcase, label: 'Years on the Beat', value: 3, suffix: '+' },
  { icon: Coffee, label: 'Cases Closed', value: 42, suffix: '+' },
  { icon: Skull, label: 'Bugs Eliminated', value: 2840, suffix: '' },
];

export default function About() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-24 px-4 bg-aged paper-grain">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader code="02" title="Personnel Dossier" subtitle="Subject: R. Auditore — P.I." show={visible} />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* ID Card */}
          <Reveal show={visible} from="left" className="md:col-span-1">
            <Tilt max={7}>
              <div className="bg-night text-cream p-5 border-4 border-ink shadow-hard relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-terminal text-sm uppercase tracking-widest opacity-70">I.D. No.</span>
                  <span className="font-terminal text-sm">1947-NOIR</span>
                </div>
                <div className="aspect-[3/4] bg-cream border-2 border-cream/30 mb-4 relative overflow-hidden group">
                  <img
                    src={asset('profile.jpg')}
                    alt="Rayyan Auditore seated on a motorcycle"
                    width={900}
                    height={1600}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-95 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-cream/10 pointer-events-none" />
                  {/* Garis pindai ala mesin sidik jari */}
                  <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-cream/25 to-transparent animate-scan pointer-events-none" />
                  <div className="absolute top-2 right-2 stamp text-night text-[10px] px-2 py-1 bg-cream">
                    Confidential
                  </div>
                </div>
                <dl className="space-y-2 font-terminal text-base">
                  <Row label="Name" value="Rayyan Auditore" />
                  <Row label="Alias" value="The Bug Whisperer" />
                  <Row label="Base" value="Downtown, Internet" />
                  <Row label="Status" value="Active" live />
                </dl>
              </div>
            </Tilt>
          </Reveal>

          {/* Bio */}
          <div className="md:col-span-2 space-y-6">
            <Reveal show={visible} delay={150}>
              <p className="font-courier text-lg leading-relaxed">
                Subject is a seasoned frontend operative with a reputation for taking on the cases others walk away
                from. Trained in the classics — semantic HTML, untangled CSS, and the lost art of the
                zero-dependency solution. Known to work late, speak plainly, and never leave a console error behind.
              </p>
              <p className="font-courier text-lg leading-relaxed mt-4">
                Current MO:{' '}
                <span className="redact" tabIndex={0} title="Hover to declassify">
                  {' '}
                  ███████{' '}
                </span>{' '}
                building interfaces that feel inevitable — fast, accessible, and a little suspicious of unnecessary
                abstractions.
              </p>
            </Reveal>

            {/* Stats */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-3">
              {FACTS.map((f, i) => (
                <Fact key={f.label} fact={f} show={visible} delay={300 + i * 120} />
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-typewriter text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-ink" /> Known Associates (Skills)
              </h3>
              <div className="space-y-3">
                {SKILLS.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between font-terminal text-base mb-0.5">
                      <span>{s.name}</span>
                      <span className="opacity-60 tabular-nums">{visible ? s.level : 0}%</span>
                    </div>
                    <div
                      className="h-3 border border-ink bg-paper overflow-hidden"
                      role="progressbar"
                      aria-valuenow={s.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={s.name}
                    >
                      <div
                        className="relative h-full bg-ink overflow-hidden transition-[width] duration-1000 ease-out"
                        style={{ width: visible ? `${s.level}%` : '0%', transitionDelay: `${400 + i * 120}ms` }}
                      >
                        <span
                          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-paper/40 to-transparent animate-shimmer"
                          style={{ animationDelay: `${i * 300}ms` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Memory Board */}
        <MemoryBoard />
      </div>
    </section>
  );
}

function Fact({
  fact,
  show,
  delay,
}: {
  fact: (typeof FACTS)[number];
  show: boolean;
  delay: number;
}) {
  const n = useCountUp(fact.value, show);
  return (
    <Reveal show={show} delay={delay}>
      <div className="bg-paper border-2 border-ink p-3 shadow-hard-sm hover:-translate-y-1 hover:shadow-hard transition-all duration-300 h-full">
        <fact.icon className="w-5 h-5 mb-2" />
        <div className="font-typewriter text-2xl tabular-nums">
          {n.toLocaleString('en-US')}
          {fact.suffix}
        </div>
        <div className="font-terminal text-xs uppercase tracking-wider opacity-70">{fact.label}</div>
      </div>
    </Reveal>
  );
}

function Row({ label, value, live = false }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="flex justify-between border-b border-cream/20 pb-1">
      <dt className="opacity-60 uppercase text-xs tracking-wider pt-0.5">{label}</dt>
      <dd className="text-right flex items-center gap-2">
        {live && <span className="w-2 h-2 rounded-full bg-cream animate-flicker" aria-hidden="true" />}
        {value}
      </dd>
    </div>
  );
}

export function SectionHeader({
  code,
  title,
  subtitle,
  show = true,
}: {
  code: string;
  title: string;
  subtitle: string;
  show?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center transition-all duration-700 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <span className="font-terminal text-sm uppercase tracking-[0.3em] opacity-50">File {code}</span>
      <h2 className="font-typewriter text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide mt-1">{title}</h2>
      <p className="font-courier italic text-base md:text-lg opacity-70 mt-2">{subtitle}</p>
      <div className="flex items-center gap-2 mt-4">
        <span className={`h-px bg-ink transition-all duration-1000 delay-300 ${show ? 'w-16' : 'w-0'}`} />
        <Fingerprint className="w-4 h-4" />
        <span className={`h-px bg-ink transition-all duration-1000 delay-300 ${show ? 'w-16' : 'w-0'}`} />
      </div>
    </div>
  );
}
