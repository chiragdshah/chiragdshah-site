import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import headshot from "../assets/headshot.webp";
import { HeroSketchScene } from "./HeroSketchScene";

function DictionaryEntry() {
  return (
    <>
      <p>
        <span className="block font-hero text-lg text-brown md:text-xl">
          applied polymath
        </span>
        <span
          title="commonly mispronounced as: generalist"
          className="cursor-help font-body text-xs text-brown/60"
        >
          /əˈplīd ˈpä-lē-ˌmath/
        </span>
        <span className="ml-2 font-body text-xs italic text-brown/50">n.</span>
      </p>
      <p className="mt-3 pl-3 font-body text-sm leading-relaxed text-brown/80">
        one who{" "}
        <span className="relative inline-block">
          <span className="text-brown/40 line-through decoration-brown-accent/70">
            collects
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 rotate-[-4deg] font-hand text-sm text-brown-accent"
          >
            connects
          </span>
        </span>{" "}
        disparate domains to build working systems.
      </p>
      <svg
        aria-hidden
        className="ml-3 mt-4 h-3 w-[72px] text-brown-accent/45"
        viewBox="0 0 72 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 4 7 Q 16 2, 28 7 T 52 7 T 68 5"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <p className="mt-2 pl-3 font-body text-xs italic leading-relaxed text-brown/70">
        "Doesn't just read about systems; builds them."
        <span className="mt-1 block not-italic text-brown/50">
          — origin uncertain, ca. 2026
        </span>
      </p>
    </>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headshotY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const headshotOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6"
    >
      <HeroSketchScene />
      <motion.div
        aria-hidden
        style={{ y: headshotY, opacity: headshotOpacity }}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden md:block"
      >
        <div className="relative h-[40vh] max-h-[320px] w-[min(28vw,280px)] lg:max-h-[400px] lg:w-[min(26vw,360px)] xl:max-h-[560px] xl:w-[min(30vw,500px)] 2xl:max-h-[760px] 2xl:w-[min(34vw,720px)]">
          <img
            src={headshot}
            alt=""
            className="h-full w-full object-contain object-left"
            style={{
              transform: "scaleX(-1)",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 65% at 53% 48%, rgba(0,0,0,0.95) 32%, rgba(0,0,0,0) 66%)",
              maskImage:
                "radial-gradient(ellipse 72% 65% at 53% 48%, rgba(0,0,0,0.95) 32%, rgba(0,0,0,0) 66%)",
            }}
          />
        </div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute left-[2%] top-[58%] z-10 hidden w-[min(22vw,280px)] -translate-y-1/2 -rotate-[1.2deg] lg:block"
      >
        <div className="card-paper p-5">
          <DictionaryEntry />
        </div>
        <svg
          aria-hidden
          className="pointer-events-none absolute -top-[44px] -right-[64px] h-[64px] w-[90px] text-brown-accent/65"
          viewBox="0 0 90 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 80 10 Q 50 22, 22 50"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0, ease: "easeInOut" }}
          />
          <motion.path
            d="M 32 44 L 22 50 L 26 40"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.65 }}
          />
        </svg>
      </motion.aside>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-hero text-5xl leading-tight text-brown md:text-8xl"
        >
          Chirag D. Shah
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 font-hand text-2xl tracking-wide text-brown-accent md:text-4xl"
        >
          Applied Polymath
        </motion.p>
        <svg
          aria-hidden
          className="mx-auto mt-1 h-3 w-[170px] text-brown-accent/55 md:h-4 md:w-[250px]"
          viewBox="0 0 250 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 6 10 Q 40 4, 80 10 T 160 10 T 244 8"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 flex max-w-sm flex-col items-stretch gap-3 text-left lg:hidden"
        >
          <svg
            aria-hidden
            className="mx-auto h-10 w-6 text-brown-accent/55"
            viewBox="0 0 24 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 12 2 Q 18 10, 10 18 T 14 36"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
            />
          </svg>
          <div className="card-paper p-4">
            <DictionaryEntry />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-brown/70 md:text-lg"
        >
          Working across business, technology, and the philosophy of both.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#connect"
            className="font-hero rounded-md bg-brown-accent px-6 py-3 text-cream-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Let's Connect
          </a>
          <a
            href="#signal-check"
            className="card-glass font-hero rounded-md px-6 py-3 text-brown transition hover:-translate-y-0.5"
          >
            Signal Check
          </a>
        </motion.div>
      </div>
    </section>
  );
}
