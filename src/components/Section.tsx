import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section
      id={id}
      className="relative mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-32 md:py-48"
    >
      {eyebrow && (
        <p className="font-hand text-sm uppercase tracking-widest text-brown-accent/80">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mt-2 text-3xl md:text-5xl text-brown">{title}</h2>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}
