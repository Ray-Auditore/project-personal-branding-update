import { useEffect, useState } from 'react';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useActiveSection, useTheme } from '@/lib/hooks';

const LINKS = [
  { id: 'home', label: 'Home', code: '01' },
  { id: 'about', label: 'Dossier', code: '02' },
  { id: 'projects', label: 'Case Files', code: '03' },
  { id: 'contact', label: 'Tip Line', code: '04' },
];
const IDS = LINKS.map((l) => l.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(IDS);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu mobile dengan Escape, kunci scroll saat terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const barOn = scrolled || open;

  return (
    <header
      className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
        barOn ? 'bg-night text-cream shadow-hard-sm' : 'bg-transparent text-ink'
      }`}
    >
      <div className="border-b-2 border-current mx-4 md:mx-8">
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between px-2 transition-all duration-300 ${
            scrolled ? 'py-2' : 'py-3'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2 group" aria-label="Back to home">
            <Search className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span className="font-typewriter text-lg tracking-widest uppercase">Rayyan G.A</span>
            <span className="hidden sm:inline font-terminal text-sm opacity-60">// P.I.</span>
          </button>

          <div className="flex items-center gap-1">
            <nav className="hidden md:flex items-center gap-1" aria-label="Main">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className="relative px-3 py-1.5 font-terminal text-lg tracking-wide uppercase hover:opacity-70 transition-opacity"
                >
                  <span className="opacity-50 mr-1">{l.code}</span>
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 bg-current origin-left transition-transform duration-300 ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              ))}
            </nav>

            <button
              onClick={toggle}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode (lights off)'}
              title={dark ? 'Lights on' : 'Lights off'}
              className="p-2 ml-1 hover:rotate-12 hover:scale-110 transition-transform"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden grid transition-all duration-300 bg-night text-cream ${
          open ? 'grid-rows-[1fr] border-b-2 border-cream/60' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                tabIndex={open ? 0 : -1}
                className={`text-left py-3 font-terminal text-xl tracking-wide uppercase border-b border-cream/20 last:border-0 transition-all duration-300 ${
                  open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                } ${active === l.id ? 'pl-3 border-l-4 border-l-cream' : ''}`}
                style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
              >
                <span className="opacity-50 mr-2">{l.code}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
