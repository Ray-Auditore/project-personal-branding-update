import { useEffect, useRef, useState } from 'react';
import { Search, Fingerprint, FileText, ChevronDown } from 'lucide-react';
import { prefersReducedMotion, useTypewriter } from '@/lib/hooks';

const CASE_LINE = '> CASE #1947-NOIR // STATUS: OPEN';
const NAME = 'RAYYAN GHIBRAN ANANTA';
const ROLE_LINES = ['Frontend Developer', 'UI/UX Plek Ketiplek', 'Bug Hunter Plenger'];

export default function Hero({ ready = true }: { ready?: boolean }) {
  const { display: caseDisplay } = useTypewriter(CASE_LINE, 38, 200, ready);
  const { display: nameDisplay, done: nameDone } = useTypewriter(NAME, 90, 600, ready);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleDisplay, setRoleDisplay] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  // Mengetik & menghapus bergantian (dengan cleanup lengkap)
  useEffect(() => {
    if (!nameDone) return;
    const role = ROLE_LINES[roleIdx];
    if (prefersReducedMotion()) {
      setRoleDisplay(role);
      return;
    }
    let i = 0;
    let erasing: ReturnType<typeof setInterval> | undefined;
    let pause: ReturnType<typeof setTimeout> | undefined;
    const typing = setInterval(() => {
      i += 1;
      setRoleDisplay(role.slice(0, i));
      if (i >= role.length) {
        clearInterval(typing);
        pause = setTimeout(() => {
          erasing = setInterval(() => {
            i -= 1;
            setRoleDisplay(role.slice(0, Math.max(i, 0)));
            if (i <= 0) {
              clearInterval(erasing);
              setRoleIdx((r) => (r + 1) % ROLE_LINES.length);
            }
          }, 28);
        }, 1800);
      }
    }, 55);
    return () => {
      clearInterval(typing);
      if (erasing) clearInterval(erasing);
      if (pause) clearTimeout(pause);
    };
  }, [roleIdx, nameDone]);


  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.style.setProperty('--spot', '1');
      });
    };
    const onLeave = () => el.style.setProperty('--spot', '0');
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center paper-grain pt-28 pb-20 px-4 overflow-hidden"
      style={{ ['--spot' as string]: 0 }}
    >
      {/* Lampu sorot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--spot)',
          background:
            'radial-gradient(circle 320px at var(--mx, 50%) var(--my, 50%), transparent 0%, rgb(var(--ink) / 0.13) 100%)',
        }}
      />

      {/* Fingerprint */}
      <Fingerprint
        aria-hidden="true"
        className="absolute -right-16 top-24 w-[26rem] h-[26rem] md:w-[34rem] md:h-[34rem] opacity-[0.06] animate-floaty pointer-events-none"
        strokeWidth={0.6}
      />

      <div className="relative max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-6 font-terminal text-base md:text-xl opacity-70 min-h-[1.75rem]">
          <Search className="w-4 h-4 animate-flicker" />
          <span className="tracking-widest">{caseDisplay}</span>
        </div>

        <div className="relative inline-block mb-4">
          <span className="font-terminal text-sm tracking-[0.3em] uppercase opacity-60 block mb-2">
            Confidential Personnel File
          </span>
          <h1
            data-text={nameDisplay}
            aria-label={NAME}
            className="glitch font-typewriter text-5xl sm:text-7xl md:text-9xl uppercase tracking-tight leading-none min-h-[1em]"
          >
            {nameDisplay}
            <span className="type-cursor inline-block" />
          </h1>
          {/* Cap "CLASSIFIED" mendarat setelah nama selesai diketik */}
          {nameDone && (
            <span className="stamp absolute -top-2 -right-4 md:-right-10 text-xs md:text-base px-2 py-1 animate-stampIn bg-paper/70 hidden sm:block">
              Classified
            </span>
          )}
        </div>

        <div className="h-10 flex items-center font-terminal text-2xl md:text-3xl tracking-wide mb-8">
          <span className="opacity-50 mr-2">&gt;</span>
          <span>{roleDisplay}</span>
          <span className="animate-blink ml-1">▋</span>
        </div>

        <div
          className={`max-w-xl border-l-4 border-ink pl-4 mb-10 font-courier text-base md:text-lg leading-relaxed transition-all duration-700 ${
            nameDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p>
            A code-slinger working the dim-lit back-alleys of the web. I take broken interfaces, cold leads, and
            unsolved bugs — and close the case before sunrise.
          </p>
        </div>

        <div
          className={`flex flex-wrap items-center gap-3 transition-all duration-700 delay-200 ${
            nameDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => go('projects')}
            className="btn-shine group flex items-center gap-2 bg-ink text-paper px-5 py-3 font-typewriter uppercase tracking-widest text-sm shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <FileText className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
            Open Case Files
          </button>
          <button
            onClick={() => go('contact')}
            className="group flex items-center gap-2 border-2 border-ink px-5 py-3 font-typewriter uppercase tracking-widest text-sm hover:bg-ink hover:text-paper transition-colors"
          >
            <Fingerprint className="w-4 h-4 group-hover:scale-125 transition-transform" />
            Leave a Tip
          </button>
        </div>

        <div
          className={`mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-terminal text-sm uppercase tracking-widest opacity-60 transition-opacity duration-1000 delay-500 ${
            nameDone ? '' : 'opacity-0'
          }`}
        >
          <span>Est. 1990</span>
          <span className="w-px h-4 bg-current" />
          <span>Licensed &amp; Bonded</span>
          <span className="w-px h-4 bg-current" />
          <span>24hr Service</span>
        </div>
      </div>

      <button
        onClick={() => go('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-terminal text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
      >
        Begin Investigation
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
