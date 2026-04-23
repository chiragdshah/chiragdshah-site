import { Parallax } from "../components/motion/Parallax";
import { MindMap } from "../components/sketches/MindMap";

export function HeroSketchScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Parallax
        speed={1.4}
        className="absolute inset-0 flex items-center justify-center"
      >
        <MindMap className="w-[min(1100px,95vw)] opacity-[0.3]" />
      </Parallax>
    </div>
  );
}
