import { Section } from "../components/Section";
import { Parallax } from "../components/motion/Parallax";
import { SignalWaveform } from "../components/sketches/SignalWaveform";

export function SignalCheck() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={1.2}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SignalWaveform className="w-[min(1500px,100vw)] opacity-[0.35]" />
        </Parallax>
      </div>
      <Section
        id="signal-check"
        eyebrow="// the newsletter"
        title="Signal Check"
      >
        <div className="card-paper mx-auto max-w-2xl rounded-xl p-8 md:p-12">
          <p className="font-body text-lg leading-relaxed text-brown/90">
            Signal Check is where I surface the signal in the noise. The best
            of what's worth knowing from the week — what I've read, seen,
            heard, built, and written. Published every Saturday.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const email = new FormData(e.currentTarget).get("email");
              if (typeof email === "string" && email) {
                window.location.href = `https://cshah.substack.com/subscribe?email=${encodeURIComponent(email)}`;
              }
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@domain.com"
              className="flex-1 rounded-md border border-brown/30 bg-white/60 px-4 py-3 font-body text-brown placeholder:text-brown/40 focus:border-brown-accent focus:outline-none"
            />
            <button
              type="submit"
              className="font-hero rounded-md bg-brown px-6 py-3 text-cream-50 transition hover:-translate-y-0.5 hover:bg-brown-accent"
            >
              Subscribe on Substack
            </button>
          </form>
          <p className="mt-4 font-body text-sm text-brown/60">
            Signal Check is the weekly dispatch from{" "}
            <a
              href="https://cshah.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brown/30 underline-offset-2 transition hover:decoration-brown"
            >
              The Pattern Seeker
            </a>
            , my Substack.
          </p>
        </div>
      </Section>
    </div>
  );
}
