import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  AlertCircle,
  Github,
  Copy,
} from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { SectionHeader } from "./About";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

const EMAIL = "rayyanauditore@gmail.com";
// Opsional: isi VITE_FORM_ENDPOINT di file .env (mis. endpoint Formspree) agar pesan terkirim langsung
// tanpa membuka aplikasi email. Jika kosong, form membuka aplikasi email dengan pesan terisi otomatis.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

// Konfigurasi link media sosial
const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/Ray-Auditore", // Ganti dengan URL GitHub kamu
    label: "GitHub",
  },
 
];

export default function Contact() {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject required";
    if (form.message.trim().length < 10) e.message = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setStatus("sending");
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("bad response");
      } else {
        const body = `${form.message}\n\n— ${form.name} (${form.email})`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus("sent");
      setForm(EMPTY);
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  const field = (
    key: keyof FormState,
    label: string,
    type = "text",
    textarea = false,
  ) => {
    const common = {
      id: `f-${key}`,
      value: form[key],
      "aria-invalid": !!errors[key],
      "aria-describedby": errors[key] ? `e-${key}` : undefined,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setForm({ ...form, [key]: e.target.value });
        if (errors[key]) setErrors({ ...errors, [key]: undefined });
      },
      className: `w-full bg-paper border-2 p-3 font-courier text-base focus:outline-none focus:shadow-hard-sm focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all mt-1 ${
        errors[key] ? "border-dashed border-ink animate-shake" : "border-ink"
      }`,
    };
    return (
      <div>
        <label htmlFor={`f-${key}`} className="font-terminal text-sm uppercase tracking-widest flex items-center gap-1">
          {label}
          {errors[key] && (
            <span id={`e-${key}`} role="alert" className="flex items-center gap-1 text-xs normal-case text-ink/70">
              <AlertCircle className="w-3 h-3" /> {errors[key]}
            </span>
          )}
        </label>
        {textarea ? (
          <>
            <textarea {...common} rows={5} maxLength={1000} className={`${common.className} resize-none`} placeholder="Describe the case..." />
            <div className="text-right font-terminal text-xs opacity-50 tabular-nums">{form[key].length}/1000</div>
          </>
        ) : (
          <input {...common} type={type} autoComplete={key === "email" ? "email" : key === "name" ? "name" : "off"} />
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="relative py-24 px-4 bg-aged paper-grain">
      <div ref={ref} className="max-w-5xl mx-auto">
        <SectionHeader
          code="04"
          title="Tip Line"
          subtitle="Got a case? Leave a message — confidential."
          show={visible}
        />

        <div className="grid md:grid-cols-5 gap-8 mt-12">
          {/* Contact intel */}
          <div
            className={`md:col-span-2 space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
          >
            <div className="bg-night text-cream p-5 border-4 border-ink shadow-hard relative">
              <div className="absolute top-2 right-2 stamp text-[10px] px-2 py-1 bg-cream text-night">
                Tip Line
              </div>
              <h3 className="font-typewriter text-xl uppercase mb-4">
                Reach the Detective
              </h3>
              <ul className="space-y-4 font-terminal text-base">
                <ContactRow
                  icon={Mail}
                  label="Wire"
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                  action={
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="shrink-0 flex items-center gap-1 border border-cream/60 px-2 py-1 text-xs uppercase tracking-widest hover:bg-cream hover:text-night transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  }
                />
                <ContactRow
                  icon={Phone}
                  label="Call"
                  value="+62 823-1086-3537"
                  href="tel:+6282310863537"
                />
                <ContactRow
                  icon={MapPin}
                  label="Beat"
                  value="Jakarta, Indonesia"
                />
              </ul>
              <div className="mt-6 pt-4 border-t border-cream/20">
                <span className="font-terminal text-xs uppercase tracking-widest opacity-60">
                  Informant Network
                </span>
                <div className="flex gap-3 mt-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, href, label }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 border-2 border-cream flex items-center justify-center hover:bg-cream hover:text-night hover:-translate-y-1 transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-2 border-ink p-4 bg-paper">
              <p className="font-courier text-sm leading-relaxed italic">
                "Every tip is followed up. No case too cold, no bug too small.
                Discretion guaranteed — I never read the README either."
              </p>
              <p className="font-typewriter text-xs uppercase tracking-widest mt-2 text-right">
                — R. Auditore
              </p>
            </div>
          </div>

          {/* Form — styled as an intake report */}
          <form
            onSubmit={submit}
            noValidate
            className={`md:col-span-3 bg-paper border-2 border-ink p-6 shadow-hard transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-ink border-dashed">
              <span className="font-typewriter text-sm uppercase tracking-widest">
                Intake Report
              </span>
              <span className="font-terminal text-sm opacity-60">
                FORM 24-A
              </span>
            </div>

            <div className="space-y-4">
              {field("name", "Informant Name")}
              {field("email", "Return Address", "email")}
              {field("subject", "Case Subject")}
              {field("message", "Statement", "text", true)}
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="mt-6 w-full flex items-center justify-center gap-2 btn-shine bg-ink text-paper px-5 py-3 font-typewriter uppercase tracking-widest text-sm shadow-hard-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sent" ? (
                <>
                  <Check className="w-4 h-4" /> Case Filed
                </>
              ) : status === "sending" ? (
                <>Transmitting...</>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Tip
                </>
              )}
            </button>

            <div aria-live="polite" className="min-h-[2.5rem]">
              {status === "sent" && (
                <p className="mt-3 font-terminal text-sm text-center animate-fadeUp">
                  {FORM_ENDPOINT
                    ? "Your tip has been received. The detective will be in touch. Check your wire."
                    : "Your mail app should now be open with the message ready — hit send to file the case."}
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 font-terminal text-sm text-center animate-fadeUp">
                  The wire went dead. Try again, or write straight to {EMAIL}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  action?: React.ReactNode;
}) {
  const content = (
    <>
      <span className="flex items-center gap-2 opacity-60 text-xs uppercase tracking-widest">
        <Icon className="w-4 h-4" /> {label}
      </span>
      <span className="text-lg break-all link-underline">{value}</span>
    </>
  );
  return (
    <li className="flex items-end justify-between gap-3">
      {href ? (
        <a href={href} className="block min-w-0 hover:opacity-80 transition-opacity">
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
      {action}
    </li>
  );
}