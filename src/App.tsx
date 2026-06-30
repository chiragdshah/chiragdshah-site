import { BackgroundLayer } from "./components/BackgroundLayer";
import { CornerWatermark } from "./components/CornerWatermark";
import { SiteHeader } from "./components/SiteHeader";
import { MobileCard } from "./sections/MobileCard";
import { Hero } from "./sections/Hero";
import { CurrentProjects } from "./sections/CurrentProjects";
import { Currently } from "./sections/Currently";
import { SignalCheck } from "./sections/SignalCheck";
import { LetsConnect } from "./sections/LetsConnect";

  return (
    <>
      <BackgroundLayer variant="bold" />
      <CornerWatermark />
      <SiteHeader />
      <main className="relative min-h-screen">
        <MobileCard />
        <div aria-hidden className="h-[calc(100svh-56px)] md:hidden" />
        <div className="relative z-10 bg-variant-bold rounded-t-3xl shadow-[0_-18px_40px_rgba(99,72,50,0.18)] md:contents">
          <div
            aria-hidden
            className="flex justify-center pt-3 pb-1 md:hidden"
          >
            <span className="h-1 w-10 rounded-full bg-brown/25" />
          </div>
          <Hero />
          <CurrentProjects />
          <Currently />
          <SignalCheck />
          <LetsConnect />
          <footer className="flex flex-col items-center gap-1 py-10 text-center font-body text-sm text-brown/60">
            <div>© {new Date().getFullYear()} Chirag D. Shah</div>
            <div>Built with sketchbooks, pour-overs, & curiosity.</div>
            <div className="text-brown/40">
              (okay, really: Claude Code, React, Vite & Tailwind —{" "}
              <a
                href="https://github.com/chiragdshah/chiragdshah-site"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-brown transition-colors"
              >
                source on GitHub
              </a>
              )
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

export default App;
