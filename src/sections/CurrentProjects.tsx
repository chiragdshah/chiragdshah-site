import { Section } from "../components/Section";
import { UIWireframe } from "../components/sketches/UIWireframe";

type Project = {
  name: string;
  description: string;
  status?: string;
  href?: string;
};

const running: Project = {
  name: "CRESTWOOD DIGITAL",
  description: "AI automation for publishing & media.",
  href: "https://crestwood.digital",
};

const building: Project[] = [
  {
    name: "STET",
    description: "The AI editorial teammate inside Slack.",
    status: "Pilot",
    href: "https://crestwood.digital/stet",
  },
  {
    name: "MEDIA DISPLACEMENT INDEX",
    description:
      "An interactive data story mapping AI displacement across 22 media occupations.",
    status: "Live",
    href: "https://crestwood.digital/media-displacement-index",
  },
  {
    name: "KORRAL",
    description:
      "Multi-modal capture and AI synthesis for conference notes.",
    status: "In Dev",
    href: "https://korral.ai",
  },
  {
    name: "ZEROLIST",
    description: "A privacy-first universal wishlist Chrome extension.",
    status: "Live",
    href: "https://zerolist.io",
  },
];

const publishing: Project[] = [
  {
    name: "QUESTION EVERYTHING\n(EXCEPT THIS PODCAST!)",
    description:
      "A philosophy-of-life podcast on meaning, morality, and the tradeoffs behind a deliberate life. With Sunay Shah.",
    href: "https://questioneverythingetp.com/",
  },
  {
    name: "PATTERN SEEKER",
    description:
      "Notes from inside the machine: how things get built, how work gets done.",
    href: "https://cshah.substack.com/",
  },
  {
    name: "SIGNAL CHECK",
    description: "Surfacing the signal in the noise — every Saturday.",
    href: "https://cshah.substack.com/s/signal-check",
  },
];

function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="whitespace-pre-line font-hand text-xl uppercase tracking-wider text-brown">
          {project.name}
        </h3>
        {project.status && (
          <span className="mt-1 shrink-0 rounded-full border border-brown/30 px-2.5 py-0.5 font-hand text-[10px] uppercase tracking-widest text-brown-accent">
            {project.status}
          </span>
        )}
      </div>
      <p className="mt-3 font-body text-brown/80">{project.description}</p>
    </>
  );

  const cardClass = `card-paper${wide ? " card-paper-wide" : ""}`;

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClass} block rounded-lg p-6 transition hover:-translate-y-0.5`}
      >
        {body}
      </a>
    );
  }

  return <article className={`${cardClass} rounded-lg p-6`}>{body}</article>;
}

function GroupHeader({ label }: { label: string }) {
  return (
    <p className="mt-12 mb-4 font-hand text-sm uppercase tracking-widest text-brown-accent/80">
      // {label}
    </p>
  );
}

export function CurrentProjects() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[90px] md:top-[140px]">
        <div className="relative mx-auto h-full w-full max-w-[1320px]">
          <UIWireframe
            className="h-auto w-full opacity-[0.22]"
            preserveAspectRatio="xMidYMin meet"
          />
        </div>
      </div>
      <Section id="projects" eyebrow="// on the workbench" title="Active Projects">
        <GroupHeader label="running" />
        <ProjectCard project={running} wide />

        <GroupHeader label="building" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {building.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>

        <GroupHeader label="publishing" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {publishing.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
