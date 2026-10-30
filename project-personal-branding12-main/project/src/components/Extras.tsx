import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '@/lib/hooks';

/** Garis progres di paling atas layar. */
export function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-ink origin-left"
        style={{ transform: `scaleX(${p})`, transition: 'transform 80ms linear' }}
      />
    </div>
  );
}

/** Pita garis polisi berjalan sebagai pembatas antar section. */
export function TapeDivider({ text = 'CASE FILE — DO NOT CROSS', reverse = false }: { text?: string; reverse?: boolean }) {
  const row = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className="mx-6 font-typewriter text-sm md:text-base uppercase tracking-[0.3em] whitespace-nowrap">
      {text} <span className="mx-2">■</span>
    </span>
  ));
  return (
    <div
      className="relative overflow-hidden border-y-4 border-night bg-cream text-night select-none -rotate-1 scale-[1.02] z-10 shadow-hard-sm"
      aria-hidden="true"
    >
      <div className={`flex w-max py-2 animate-marquee ${reverse ? '[animation-direction:reverse]' : ''}`}>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}

/** Tombol kembali ke atas. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-5 right-5 z-[55] w-11 h-11 flex items-center justify-center bg-night text-cream border-2 border-ink shadow-hard-sm hover:-translate-y-1 hover:shadow-hard transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

/** Wrapper reveal-on-scroll yang konsisten (fade + geser) dengan delay opsional. */
export function Reveal({
  show,
  delay = 0,
  from = 'up',
  className = '',
  children,
}: {
  show: boolean;
  delay?: number;
  from?: 'up' | 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}) {
  const hidden = from === 'up' ? 'translate-y-8' : from === 'left' ? '-translate-x-8' : 'translate-x-8';
  return (
    <div
      className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hidden}`} ${className}`}
      style={{ transitionDelay: show ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
