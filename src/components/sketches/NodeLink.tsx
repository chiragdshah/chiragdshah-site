import { DrawPath } from "../motion/DrawPath";

type NodeLinkProps = {
  className?: string;
  delay?: number;
};

export function NodeLink({ className, delay = 0 }: NodeLinkProps) {
  return (
    <svg
      viewBox="0 0 160 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DrawPath
        d="M16 34 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0"
        delay={delay}
        duration={2.0}
      />
      <DrawPath
        d="M144 34 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0"
        delay={delay + 0.6}
        duration={2.0}
      />
      <DrawPath
        d="M26 34 Q80 18 134 34"
        delay={delay + 2.2}
        duration={2.4}
        strokeDasharray="3 3"
      />
    </svg>
  );
}
