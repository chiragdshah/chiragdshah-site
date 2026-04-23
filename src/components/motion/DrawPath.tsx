import { motion } from "framer-motion";
import type { SVGMotionProps } from "framer-motion";

type DrawPathProps = SVGMotionProps<SVGPathElement> & {
  d: string;
  delay?: number;
  duration?: number;
  amount?: number;
};

export function DrawPath({
  d,
  delay = 0,
  duration = 3,
  amount = 0.3,
  stroke = "#634832",
  strokeWidth = 1.5,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  ...rest
}: DrawPathProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        pathLength: { duration, delay, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.4, delay },
      }}
      {...rest}
    />
  );
}
