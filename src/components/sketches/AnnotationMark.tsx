import { DrawPath } from "../motion/DrawPath";

type AnnotationMarkProps = {
  className?: string;
  delay?: number;
  symbol?: string;
};

export function AnnotationMark({
  className,
  delay = 0,
  symbol = "?",
}: AnnotationMarkProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DrawPath
        d="M30 30 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0"
        delay={delay}
        duration={2.4}
      />
      <text
        x="30"
        y="38"
        textAnchor="middle"
        fontSize="22"
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        opacity="0.75"
      >
        {symbol}
      </text>
    </svg>
  );
}
