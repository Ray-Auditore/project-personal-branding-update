import { useState } from "react";
import { Folder, Lock, ExternalLink, ChevronRight, Tag, Calendar } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { SectionHeader } from "./About";
import Tilt from "./Tilt";

type Case = {
  id: string;
  title: string;
  classification: string;
  date: string;
  summary: string;
  evidence: string[];
  tags: string[];
  status: "CLOSED" | "OPEN" | "COLD";
  link?: string;
};

const CASES: Case[] = [
  {
    id: "CASE-001",
    title: "The Memory Leak",
    classification: "First Portofolio",
    date: "May 08, 2025",
    summary:
      "An outdated portfolio page breaking on modern mobile screens. Suspect: hundreds of lines of custom media queries cluttering the codebase. Verdict: redesigned using Tailwind’s responsive utilities — 70% less CSS code and seamless display across all devices.",
    evidence: ["React", "Tailwind", "Framer Motion", "Lucide"],
    tags: ["Responsive", "Realtime", "Performance"],
    status: "CLOSED",
    link: "https://portoray.netlify.app/",
  },
  {
    id: "CASE-002",
    title: "The Vanishing Checkout",
    classification: "E-commerce",
    date: "April 30, 2025",
    summary:
      "A multi-stack digital ecosystem struggling with disconnected features. Suspect: fragmented state management and isolated service architectures. Verdict: unified with a robust MERN and Spring Boot backend — seamless real-time chat, secure password management, and predictive analytics in a single cohesive platform.",
    evidence: ["React", "Tailwind", "Vite"],
    tags: ["Commerce", "Conversion", "Stripe"],
    status: "CLOSED",
    link: "https://project-rayyan.vercel.app/",
  },
  {
    id: "CASE-003",
    title: "Calculator of Health",
    classification: "Web Application",
    date: "May 21, 2025",
    summary:
      "A health calculator app with a backend that struggled under load. Suspect: inefficient job queue and database bottlenecks. Verdict: implemented Redis-backed BullMQ for job processing, optimized Postgres queries, and scaled the Node.js server — resulting in a 5x increase in throughput and near-zero downtime.",
    evidence: ["React", "Lucide", "Tailwind CSS", "Vite"],
    tags: ["Backend", "Reliability", "Queue"],
    status: "CLOSED",
    link: "https://quiet-hummingbird-e0eda8.netlify.app/",
  },
  {
    id: "CASE-004",
    title: "Tourism Portal",
    classification: "Web Application",
    date: "May 19, 2025",
    summary:
      "A tourism portal with slow load times and poor SEO. Suspect: unoptimized images and lack of caching strategies. Verdict: migrated to Astro, implemented CDN caching, converted images to AVIF format, and added GSAP animations — resulting in a 60% faster load time and improved search engine rankings.",
    evidence: ["Framer Motion", "React", "Tailwind"],
    tags: ["Performance", "Branding", "SEO"],
    status: "CLOSED",
    link: "https://candid-chaja-fd3cf8.netlify.app/",
  },
];

const STATUS_STYLE: Record<Case["status"], string> = {
  CLOSED: "border-ink text-ink",
  OPEN: "border-ink text-ink bg-ink/10",
  COLD: "border-ink/40 text-ink/50",
};

export default function Projects() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 bg-paper paper-grain">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader
          code="03"
          title="Case Files"
          subtitle="Selected investigations — all documented."
          show={visible}
        />

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-10 mt-14">
          {CASES.map((c, i) => {
            const isOpen = openId === c.id;
            const panelId = `${c.id}-panel`;
            return (
              <div
                key={c.id}
                className={`transition-all duration-700 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" }}
              >
                <Tilt max={4} className="h-full">
                  <article className="group relative h-full bg-aged border-2 border-ink shadow-hard hover:shadow-hard-lg transition-shadow duration-300">
                    {/* Tab map manila */}
                    <div className="file-tab absolute -top-5 left-4 bg-night text-cream px-3 pt-1 pb-2 font-terminal text-sm uppercase tracking-wider">
                      {c.id}
                    </div>

                    <div className="p-5 pt-7">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="font-terminal text-xs uppercase tracking-widest opacity-60">
                            {c.classification}
                          </span>
                          <h3 className="font-typewriter text-xl md:text-2xl uppercase leading-tight mt-0.5">
                            {c.title}
                          </h3>
                        </div>
                        <span
                          className={`shrink-0 font-typewriter text-[10px] uppercase tracking-widest border-2 px-2 py-1 ${STATUS_STYLE[c.status]} ${
                            visible ? "animate-stampIn" : "opacity-0"
                          }`}
                          style={{ animationDelay: `${600 + i * 150}ms` }}
                        >
                          {c.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-terminal text-xs uppercase tracking-wider opacity-60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {c.date}
                        </span>
                      </div>

                      <p className={`font-courier text-sm leading-relaxed ${isOpen ? "" : "line-clamp-3"}`}>
                        {c.summary}
                      </p>

                      <div
                        id={panelId}
                        className={`grid transition-all duration-500 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <h4 className="font-typewriter text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Tag className="w-3 h-3" /> Evidence Log
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {c.evidence.map((e) => (
                              <span key={e} className="font-terminal text-sm border border-ink px-2 py-0.5 bg-paper">
                                {e}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {c.tags.map((t) => (
                              <span key={t} className="font-terminal text-xs uppercase tracking-wider opacity-60">
                                #{t}
                              </span>
                            ))}
                          </div>
                          {c.link && (
                            <a
                              href={c.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isOpen ? 0 : -1}
                              className="inline-flex items-center gap-1 font-typewriter text-xs uppercase tracking-widest bg-ink text-paper px-3 py-2 hover:-translate-y-0.5 hover:shadow-hard-sm transition-all"
                            >
                              View evidence <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {!c.link && c.status === "COLD" && (
                            <span className="inline-flex items-center gap-1 font-typewriter text-xs uppercase tracking-widest opacity-50">
                              <Lock className="w-3 h-3" /> Files sealed
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setOpenId(isOpen ? null : c.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="mt-4 flex items-center gap-1 font-terminal text-sm uppercase tracking-widest hover:gap-2 transition-all"
                      >
                        {isOpen ? "Seal file" : "Open file"}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                      </button>
                    </div>

                    <Folder className="absolute bottom-3 right-3 w-6 h-6 opacity-10 group-hover:opacity-25 group-hover:-rotate-6 transition-all" />
                  </article>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
