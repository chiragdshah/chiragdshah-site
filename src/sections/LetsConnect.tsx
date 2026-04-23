import { Section } from "../components/Section";
import { Parallax } from "../components/motion/Parallax";
import { ProcessFlow } from "../components/sketches/ProcessFlow";

export function LetsConnect() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={1.2}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ProcessFlow className="w-[min(1400px,100vw)] opacity-[0.32]" />
        </Parallax>
      </div>
      <Section id="connect" eyebrow="// get in touch" title="Let's Connect">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-20">
          <div className="card-glass rounded-xl p-8">
            <h3 className="font-hand text-2xl uppercase tracking-wider text-brown">Work together</h3>
            <p className="mt-3 font-body text-brown/80">
              For advisory, builds, and collaborations. The kinds of things
              that turn into systems, products, or conversations worth having.
            </p>
            <a
              href="https://calendly.com/chirag-crestwood/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-hero rounded-md bg-brown-accent px-6 py-3 text-cream-50 transition hover:-translate-y-0.5"
            >
              Book a call
            </a>
          </div>
          <div className="card-glass rounded-xl p-8">
            <h3 className="font-hand text-2xl uppercase tracking-wider text-brown">Elsewhere</h3>
            <ul className="mt-4 space-y-2 font-body text-brown/90">
              <li>
                <a
                  className="hover:text-brown-accent"
                  href="https://www.linkedin.com/in/chiragdshah/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brown-accent"
                  href="https://x.com/chiragdshah"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X / Twitter →
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brown-accent"
                  href="https://github.com/chiragdshah"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
