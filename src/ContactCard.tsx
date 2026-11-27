import { useRef, type ReactElement } from "react";
import { motion } from "framer-motion";
import photo from "./assets/chirag-shah.webp";

/**
 * chiragdshah.com, cut down to a contact card (2026-11-26). The site's one job now is to
 * get someone from Chirag's name to Crestwood Digital: save the contact, reach him, or go
 * to crestwood.digital. Old business cards land here (their QR goes crestwood.digital/chirag
 * → chiragdshah.com). Brand, photo and contact file match crestwood.digital and the 2026
 * business card. The earlier portfolio sections are in git history (before this commit).
 */

type Icon = (props: { className?: string }) => ReactElement;

const stroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

const ContactIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
    <circle cx="9" cy="11" r="2" {...stroke} />
    <path d="M5.5 16.5c.8-1.5 2-2 3.5-2s2.7.5 3.5 2M15 10h4M15 13h3" {...stroke} />
  </svg>
);
const MailIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
    <path d="m4 7 8 6 8-6" {...stroke} />
  </svg>
);
const CalendarIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="3.5" y="5" width="17" height="15" rx="2" {...stroke} />
    <path d="M3.5 10h17M8 3v4M16 3v4" {...stroke} />
  </svg>
);
const LinkedInIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6 0h3.8v1.6h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.55 4.78 5.86V21H17.6v-5.2c0-1.24-.02-2.84-1.84-2.84-1.85 0-2.13 1.35-2.13 2.75V21H9V9.5Z" />
  </svg>
);
const XIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" />
  </svg>
);
const ArrowIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" {...stroke} />
  </svg>
);

const UTM = "utm_source=chiragdshah&utm_medium=referral";

const actions: { label: string; href: string; Icon: Icon; external?: boolean; primary?: boolean }[] = [
  { label: "Save contact", href: "/chirag-shah.vcf", Icon: ContactIcon, primary: true },
  { label: "Email", href: "mailto:chirag@crestwood.digital", Icon: MailIcon },
  { label: "Book a call", href: "https://cal.com/chiragdshah/intro", Icon: CalendarIcon, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdshah/", Icon: LinkedInIcon, external: true },
  { label: "X", href: "https://x.com/chiragdshah", Icon: XIcon, external: true },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export function ContactCard() {
  const qrDialog = useRef<HTMLDialogElement>(null);

  return (
    <main className="cw-card relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-12">
      <div aria-hidden className="cw-mark" />

      <motion.img
        {...rise(0)}
        src={photo}
        alt="Chirag D. Shah"
        width={600}
        height={600}
        className="relative h-36 w-36 rounded-full border-2 border-white/15 object-cover shadow-xl md:h-40 md:w-40"
      />

      <motion.h1 {...rise(0.08)} className="cw-display relative mt-6 text-center text-4xl font-bold text-white md:text-5xl">
        Chirag D. Shah
      </motion.h1>
      <motion.p {...rise(0.14)} className="cw-mono relative mt-3 text-center text-xs uppercase tracking-[0.18em] text-[#ea580c]">
        Founder · Crestwood Digital
      </motion.p>
      <motion.p {...rise(0.2)} className="relative mt-3 text-center text-[15px] text-slate-300">
        AI for publishing and media teams.
      </motion.p>

      <motion.div {...rise(0.28)} className="relative mt-8 grid w-full max-w-sm grid-cols-2 gap-3">
        {actions.map(({ label, href, Icon, external, primary }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={
              "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition active:translate-y-0.5 " +
              (primary
                ? "col-span-2 bg-[#ea580c] text-white shadow-lg shadow-[#ea580c]/20 hover:bg-[#c2410c]"
                : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10")
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </a>
        ))}
      </motion.div>

      <motion.a
        {...rise(0.36)}
        href={`https://crestwood.digital/?${UTM}`}
        className="group relative mt-3 flex w-full max-w-sm items-center justify-between rounded-xl bg-white px-5 py-4 text-[#020617] shadow-lg transition hover:shadow-xl"
      >
        <span className="flex flex-col">
          <span className="cw-display text-lg font-bold">Visit Crestwood Digital</span>
          <span className="text-xs text-slate-500">What we build, our research, and the 2-minute diagnostic</span>
        </span>
        <ArrowIcon className="h-5 w-5 shrink-0 text-[#ea580c] transition group-hover:translate-x-0.5" />
      </motion.a>

      <motion.button
        {...rise(0.44)}
        type="button"
        onClick={() => qrDialog.current?.showModal()}
        className="cw-mono relative mt-6 text-xs uppercase tracking-[0.16em] text-slate-400 underline decoration-slate-600 underline-offset-4 hover:text-white"
      >
        Show QR code to share
      </motion.button>

      <img
        src="/brand/crestwood-horizontal-white.svg"
        alt="Crestwood Digital"
        className="relative mt-10 h-5 w-auto opacity-70"
      />

      <dialog
        ref={qrDialog}
        aria-label="QR code for this card"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="w-[min(340px,calc(100vw-32px))] rounded-2xl bg-white p-6 text-center text-[#020617] backdrop:bg-black/60"
      >
        <img src="/qr.svg" alt="QR code linking to chiragdshah.com" width={280} height={280} className="mx-auto w-full rounded-lg bg-white p-2" />
        <p className="mt-4 text-[15px] text-slate-600">Scan to open this card</p>
        <form method="dialog">
          <button className="cw-mono mt-2 text-xs uppercase tracking-[0.16em] text-[#ea580c] underline underline-offset-4">Close</button>
        </form>
      </dialog>
    </main>
  );
}
