import { Fingerprint, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-night text-cream py-10 px-4 border-t-4 border-ink">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-typewriter uppercase tracking-widest group">
          <Fingerprint className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-1000" />
          R. Auditore — P.I.
        </div>
        <p className="font-terminal text-sm opacity-60 text-center">
          Case files sealed {new Date().getFullYear()}. No bugs were harmed in the making of this site.
        </p>
        <a
          href="https://github.com/Ray-Auditore"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-terminal text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
      </div>
    </footer>
  );
}
