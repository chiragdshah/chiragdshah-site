import { DrawPath } from "../motion/DrawPath";

type DimensionLineProps = {
  className?: string;
  delay?: number;
  label?: string;
};

export function DimensionLine({
  className,
  delay = 0,
  label,
}: DimensionLineProps) {
  return (
    <svg
      viewBox="0 0 160 30"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DrawPath d="M6 6 L6 20" delay={delay} duration={0.8} />
      <DrawPath d="M154 6 L154 20" delay={delay + 0.3} duration={0.8} />
      <DrawPath d="M6 13 L154 13" delay={delay + 0.8} duration={2.4} />
      {label && (
        <text
          x="80"
          y="27"
          textAnchor="middle"
          fontSize="8"
          fontFamily="'Architects Daughter', cursive"
          fill="#634832"
          opacity="0.7"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
