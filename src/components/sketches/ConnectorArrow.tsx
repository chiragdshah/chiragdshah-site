import { DrawPath } from "../motion/DrawPath";

type ConnectorArrowProps = {
  className?: string;
  delay?: number;
  variant?: "curve" | "elbow" | "wavy";
};

export function ConnectorArrow({
  className,
  delay = 0,
  variant = "curve",
}: ConnectorArrowProps) {
  const paths = {
    curve: "M6 10 Q40 -6 76 20 T140 40",
    elbow: "M6 10 L80 10 L80 46 L140 46",
    wavy: "M6 20 Q20 4 36 20 T68 20 T100 20 T140 20",
  };
  const tipOffset = {
    curve: { x1: 140, y1: 40, x2: 132, y2: 34, x3: 134, y3: 44 },
    elbow: { x1: 140, y1: 46, x2: 132, y2: 40, x3: 132, y3: 52 },
    wavy: { x1: 140, y1: 20, x2: 132, y2: 14, x3: 132, y3: 26 },
  };
  const tip = tipOffset[variant];

  return (
    <svg
      viewBox="0 0 146 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DrawPath d={paths[variant]} delay={delay} duration={2.8} />
      <DrawPath
        d={`M${tip.x2} ${tip.y2} L${tip.x1} ${tip.y1} L${tip.x3} ${tip.y3}`}
        delay={delay + 2.5}
        duration={0.7}
      />
    </svg>
  );
}
