import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { SketchedPortrait } from "../components/SketchedPortrait";

type Icon = (props: { className?: string }) => ReactElement;

const ContactCardIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M5.5 16.5c.8-1.5 2-2 3.5-2s2.7.5 3.5 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15 10h4M15 13h3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const LinkedInIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6 0h3.8v1.6h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.55 4.78 5.86V21H17.6v-5.2c0-1.24-.02-2.84-1.84-2.84-1.85 0-2.13 1.35-2.13 2.75V21H9V9.5Z" />
  </svg>
);

const ExternalIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-10A1.5 1.5 0 0 1 5 18.5v-10A1.5 1.5 0 0 1 6.5 7H11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M5 4.5A1.5 1.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19V4.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M5 17.5A1.5 1.5 0 0 1 6.5 16H19"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const MicIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect
      x="9"
      y="3"
      width="6"
      height="12"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M6 11a6 6 0 0 0 12 0M12 17v4M8.5 21h7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CalendarIcon: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <rect
      x="3.5"
      y="5"
      width="17"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M3.5 10h17M8 3v4M16 3v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

type Tile = {
  label: string;
  href: string;
  Icon: Icon;
  external?: boolean;
  variant?: "solid" | "outline";
  download?: boolean;
};

const tiles: Tile[] = [
  {
    label: "Save Contact",
    href: "/chirag-shah.vcf",
    Icon: ContactCardIcon,
    download: true,
    variant: "outline",
  },
  {
    label: "Book a Consult",
    href: "https://calendly.com/chirag-crestwood/30min",
    Icon: CalendarIcon,
    external: true,
    variant: "solid",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chiragdshah/",
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Crestwood",
    href: "https://crestwood.digital",
    Icon: ExternalIcon,
    external: true,
  },
  {
    label: "Substack",
    href: "https://cshah.substack.com/",
    Icon: BookIcon,
    external: true,
  },
  {
    label: "Podcast",
    href: "https://questioneverythingetp.com/",
    Icon: MicIcon,
    external: true,
  },
];

export function MobileCard() {
  return (
    <section
      id="mobile-card"
      aria-label="Digital business card"
      className="fixed inset-0 z-0 flex flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-10 md:hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <SketchedPortrait size={180} alt="Chirag D. Shah" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-5 font-hero text-4xl text-brown"
      >
        Chirag D. Shah
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 font-hand text-sm uppercase tracking-[0.18em] text-brown-accent"
      >
        Applied Polymath
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="mt-3 max-w-xs text-center font-body text-[15px] leading-snug text-brown/80"
      >
        Systems, writing, and
        <br />
        the questions between.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.44 }}
        className="mt-7 grid w-full max-w-sm grid-cols-2 gap-3"
      >
        {tiles.map(({ label, href, Icon, external, variant, download }) => {
          const base =
            "flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-body text-sm transition active:translate-y-0.5";
          const styled =
            variant === "solid"
              ? "bg-brown-accent text-cream-50 shadow-sm hover:shadow-md"
              : variant === "outline"
                ? "border-2 border-brown-accent bg-cream-50/60 text-brown-accent hover:bg-cream-50"
                : "card-glass text-brown";
          return (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              download={download ? "" : undefined}
              className={`${base} ${styled}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </a>
          );
        })}
      </motion.div>

    </section>
  );
}
