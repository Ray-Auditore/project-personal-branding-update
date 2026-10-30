import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { asset, useReveal } from "@/lib/hooks";

type Memory = {
  id: string;
  grade: string;
  year: string;
  caption: string;
  note: string;
  img: string;
  rotate: string;
  top: string;
  left: string;
  position?: string;
};

const MEMORIES: Memory[] = [
  {
    id: "M-01",
    grade: "Kelas PRA-10",
    year: "Year One",
    caption: "First Day on the Beat",
    note: "The first time I walked into that classroom. Everything smelled of chalk dust and possibility. I didn't know yet that this was where the case would begin.",
    img: "prasmak.jpg",
    rotate: "-rotate-3",
    top: "3%",
    left: "10%",
  },
  {
    id: "M-02",
    grade: "Kelas 10",
    year: "Semester I",
    caption: "The Squad - Part I",
    note: "Growing up on the beat. The nights in the room get louder, friendships get tighter, and the journey starts taking real shape.",
    img: "kelas11k.jpg",
    rotate: "rotate-2",
    top: "3%",
    left: "58%",
  },
  {
    id: "M-03",
    grade: "Kelas 11",
    year: "Semester II",
    caption: "The Squad - Part II",
    note: "Another angle of the dorm life. Late night talks, laughter, and building memories we'll never forget.",
    img: "kelas11asli.jpg",
    rotate: "rotate-3",
    top: "52%",
    left: "12%",
  },
  {
    id: "M-04",
    grade: "Kelas 12",
    year: "Graduation",
    caption: "Badge Pinned",
    note: "They handed me a piece of paper and shook my hand. But the real certificate was everything between that first day and this one. Case closed. Next.",
    img: "kelas12k.jpg",
    rotate: "-rotate-1",
    top: "52%",
    left: "60%",
  },
];

export default function MemoryBoard() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div ref={ref} className="mt-16">
      <h3 className="font-typewriter text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
        <span className="w-8 h-px bg-ink" /> Memory Board
      </h3>
      <p className="font-courier italic text-sm opacity-70 mb-6">
        Evidence pinned to the wall — from grades 10 to 12. Click a photo to inspect it.
      </p>

      {/* Papan gabus — tata letak tersemat di desktop, tumpukan di mobile */}
      <div className="relative w-full bg-[#b8a88a] border-4 border-ink shadow-hard overflow-hidden">
        {/* Tekstur gabus */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(60,40,20,0.25) 1px, transparent 2px), radial-gradient(circle at 65% 55%, rgba(60,40,20,0.2) 1px, transparent 2px), radial-gradient(circle at 85% 15%, rgba(60,40,20,0.22) 1px, transparent 2px), radial-gradient(circle at 35% 75%, rgba(60,40,20,0.18) 1px, transparent 2px)",
            backgroundSize: "12px 12px, 16px 16px, 10px 10px, 14px 14px",
          }}
        />

        {/* Benang penghubung antar foto (desktop) — tergambar saat masuk layar */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[
            [20, 14, 22, 60],
            [68, 14, 70, 60],
            [22, 14, 68, 14],
            [22, 60, 70, 60],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#8b1a1a"
              strokeWidth="0.35"
              opacity="0.65"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="1000"
              strokeDashoffset={visible ? 0 : 1000}
              style={{
                transition: `stroke-dashoffset 1.6s ease-out ${900 + i * 300}ms`,
              }}
            />
          ))}
        </svg>

        {/* Mobile */}
        <div className="md:hidden relative z-20 p-5 flex flex-col items-center gap-8">
          {MEMORIES.map((m, i) => (
            <PinnedPhoto
              key={m.id}
              mem={m}
              index={i}
              visible={visible}
              pinned={false}
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative h-[900px]">
          {MEMORIES.map((m, i) => (
            <PinnedPhoto
              key={m.id}
              mem={m}
              index={i}
              visible={visible}
              pinned
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>

        <div className="absolute bottom-3 right-3 stamp text-xs px-3 py-1.5 bg-paper/80 z-30 text-night">
          Evidence Wall
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-6 font-terminal text-sm uppercase tracking-widest opacity-70">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ink" /> Kelas 10 &amp; 11
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-ink border border-paper" /> Kelas 12
        </span>
      </div>

      {lightbox !== null && (
        <Lightbox index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

function PinnedPhoto({
  mem,
  index,
  visible,
  pinned,
  onOpen,
}: {
  mem: Memory;
  index: number;
  visible: boolean;
  pinned: boolean;
  onOpen: () => void;
}) {
  const delay = 300 + index * 150;
  return (
    <div
      className={`${pinned ? "absolute" : "relative"} z-20 transition-all duration-700 ease-out hover:z-40 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
      style={{
        ...(pinned ? { top: mem.top, left: mem.left } : {}),
        width: pinned ? "250px" : "260px",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {/* Elemen dalam yang miring & bereaksi saat hover */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Inspect photo: ${mem.caption}`}
        className={`group block w-full text-left relative ${mem.rotate} hover:!rotate-0 hover:scale-105 hover:-translate-y-2 focus-visible:!rotate-0 focus-visible:scale-105 transition-transform duration-300 ease-out`}
      >
        {/* Pin */}
        <div
          className={`absolute -top-2 left-1/2 -translate-x-1/2 z-30 ${visible ? "animate-pinDrop" : "opacity-0"}`}
          style={{ animationDelay: `${delay + 400}ms` }}
        >
          <div className="w-4 h-4 rounded-full bg-[#8b1a1a] shadow-md ring-2 ring-night/30" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-night/30 rounded-full" />
        </div>

        {/* Bingkai polaroid */}
        <div className="bg-cream text-night p-3 pb-12 shadow-[4px_6px_8px_rgba(0,0,0,0.35)] group-hover:shadow-[8px_14px_18px_rgba(0,0,0,0.4)] transition-shadow duration-300 border border-night/10 relative">
          <div className="aspect-[4/5] overflow-hidden bg-night/20 relative">
            <img
              src={asset(mem.img)}
              alt={mem.caption}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-night/30 pointer-events-none" />
            <div className="absolute inset-0 hidden md:flex items-center justify-center bg-night/0 group-hover:bg-night/25 transition-colors">
              <ZoomIn className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <p className="font-typewriter text-xs text-center mt-3 font-semibold leading-tight">{mem.caption}</p>

          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center font-terminal text-[10px] uppercase tracking-wider opacity-70 border-t border-night/10 pt-1">
            <span>{mem.grade}</span>
            <span>{mem.year}</span>
          </div>
        </div>

        {/* Sticky note saat hover (desktop) */}
        <div className="hidden md:block absolute -bottom-2 -right-3 w-36 bg-aged text-ink border border-ink/20 p-2 shadow-md rotate-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-40">
          <p className="font-courier text-[10px] leading-snug italic">{mem.note}</p>
        </div>
      </button>

      {/* Catatan selalu tampil di mobile */}
      <div className="md:hidden mt-3 bg-aged text-ink border border-ink/20 p-2 shadow-sm">
        <p className="font-courier text-[11px] leading-snug italic">{mem.note}</p>
      </div>
    </div>
  );
}

function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const m = MEMORIES[index];
  const prev = useCallback(() => onChange((index + MEMORIES.length - 1) % MEMORIES.length), [index, onChange]);
  const next = useCallback(() => onChange((index + 1) % MEMORIES.length), [index, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={m.caption}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-night/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        key={m.id}
        onClick={(e) => e.stopPropagation()}
        className="relative animate-modalIn bg-cream text-night max-w-md w-full max-h-[92vh] overflow-y-auto p-4 pb-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        <img
          src={asset(m.img)}
          alt={m.caption}
          className="w-full max-h-[55vh] object-contain bg-night/10 grayscale-[40%]"
        />
        <div className="flex items-center justify-between font-terminal text-sm uppercase tracking-wider mt-3 opacity-70">
          <span>
            {m.id} · {m.grade}
          </span>
          <span>{m.year}</span>
        </div>
        <h4 className="font-typewriter text-lg mt-1">{m.caption}</h4>
        <p className="font-courier text-sm italic leading-relaxed mt-1">{m.note}</p>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="p-2 border-2 border-night hover:bg-night hover:text-cream transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-terminal text-sm tracking-widest">
            {index + 1} / {MEMORIES.length}
          </span>
          <button
            onClick={next}
            aria-label="Next photo"
            className="p-2 border-2 border-night hover:bg-night hover:text-cream transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center bg-night text-cream border-2 border-cream hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
