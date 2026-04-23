import { DrawPath } from "../motion/DrawPath";

type WireframeBoxProps = {
  className?: string;
  delay?: number;
  label?: string;
};

export function WireframeBox({
  className,
  delay = 0,
  label,
}: WireframeBoxProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DrawPath
        d="M4 6 Q3 4 6 4 L114 5 Q117 4 116 7 L117 74 Q117 77 113 76 L6 76 Q3 77 4 73 Z"
        delay={delay}
        duration={3.5}
      />
      <DrawPath
        d="M4 18 L116 18"
        delay={delay + 1.4}
        duration={1.6}
        strokeDasharray="2 3"
      />
      <DrawPath
        d="M104 6 L116 18"
        delay={delay + 2.0}
        duration={0.9}
        strokeWidth={1}
      />
      {label && (
        <text
          x="10"
          y="14"
          fontSize="6"
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
