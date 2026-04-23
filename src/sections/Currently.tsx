import { Section } from "../components/Section";
import { Parallax } from "../components/motion/Parallax";
import { SystemDiagram } from "../components/sketches/SystemDiagram";

type Item = {
  channel: "ESSAY" | "DISPATCH" | "PODCAST";
  source: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

const items: Item[] = [
  {
    channel: "ESSAY",
    source: "The Pattern Seeker",
    title:
      "The Media Displacement Index: How 22 Roles Are Actually Adapting to AI",
    description:
      "Analysis of 2.8 million workers reveals three categories of AI impact — and four roles that turned historical decline into projected growth.",
    date: "Apr 8, 2026",
    href: "https://cshah.substack.com/p/the-media-displacement-index-how",
  },
  {
    channel: "DISPATCH",
    source: "Signal Check",
    title: "The Thread: No Trim Required",
    description:
      "The week's signal in the noise — what's worth knowing from what I've read, seen, heard, built, and written.",
    date: "Apr 18, 2026",
    href: "https://cshah.substack.com/p/signal-check-2026-04-18",
  },
  {
    channel: "PODCAST",
    source: "Question Everything\n(Except This Podcast!)",
    title: "From Company Founder to Earthling Tribe — ?E! #30",
    description:
      "A first-principles conversation about identity, scale, and what it means to build something bigger than a company.",
    date: "Mar 23, 2026",
    href: "https://www.youtube.com/watch?v=bnXSrxERpZ0",
  },
];

function CurrentlyCard({ item }: { item: Item }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-glass group flex flex-col rounded-lg p-6 transition hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-brown/30 px-2.5 py-0.5 font-hand text-[10px] uppercase tracking-widest text-brown-accent">
          {item.channel}
        </span>
        <span className="font-body text-xs text-brown/60">{item.date}</span>
      </div>
      <p className="mt-4 whitespace-pre-line font-hand text-xs uppercase tracking-wider text-brown/60">
        {item.source}
      </p>
      <h3 className="mt-1 font-hand text-xl leading-snug text-brown">
        {item.title}
      </h3>
      <p className="mt-3 font-body text-sm text-brown/80">{item.description}</p>
      <span className="mt-4 font-hand text-sm text-brown-accent transition group-hover:translate-x-0.5">
        Read →
      </span>
    </a>
  );
}

export function Currently() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={1.2}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SystemDiagram className="w-[min(1150px,95vw)] opacity-[0.22]" />
        </Parallax>
      </div>
      <Section id="currently" eyebrow="// latest" title="Across Channels">
        <p className="mb-8 max-w-2xl font-body text-brown/75">
          The most recent thing from each channel.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <CurrentlyCard key={item.source} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}
