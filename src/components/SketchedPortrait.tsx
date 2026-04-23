import headshot from "../assets/headshot.webp";

type SketchedPortraitProps = {
  size?: number;
  alt?: string;
};

export function SketchedPortrait({
  size = 220,
  alt = "",
}: SketchedPortraitProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        aria-hidden
        className="absolute inset-[10%] rounded-2xl blur-2xl"
        style={{ background: "rgba(139, 69, 19, 0.18)" }}
      />
      <img
        src={headshot}
        alt={alt}
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}
