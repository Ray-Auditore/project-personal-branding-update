import { useEffect, useState } from 'react';

const LINES = [
  '> CONNECTING TO POLICE ARCHIVE...',
  '> VERIFYING CLEARANCE........ OK',
  '> OPENING FILE: RAYYAN AUDITORE',
  '> CASE STATUS: OPEN',
];

/** Layar pembuka bergaya terminal. Tampil sekali per sesi, bisa dilewati dengan klik / tombol apa saja. */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (leaving) return;
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLeaving(true), 450);
    return () => clearTimeout(t);
  }, [shown, leaving]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  useEffect(() => {
    const skip = () => setLeaving(true);
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      onClick={() => setLeaving(true)}
      className={`fixed inset-0 z-[100] bg-night text-cream flex items-center justify-center px-6 cursor-pointer transition-all duration-500 ${
        leaving ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-xl font-terminal text-xl md:text-2xl leading-snug">
        {LINES.slice(0, shown).map((l) => (
          <p key={l} className="animate-fadeUp">
            {l}
          </p>
        ))}
        <p>
          <span className="animate-blink">▋</span>
        </p>
        <div className="mt-6 h-1.5 w-full border border-cream/40">
          <div
            className="h-full bg-cream transition-all duration-300 ease-out"
            style={{ width: `${(shown / LINES.length) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-sm opacity-40 tracking-widest uppercase">Click to skip</p>
      </div>
    </div>
  );
}
