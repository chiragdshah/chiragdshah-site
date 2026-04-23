import { motion } from "framer-motion";
import { DrawPath } from "../motion/DrawPath";

function circlePath(cx: number, cy: number, r: number) {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
}

const WEEKS = [
  { x: 200, label: "W1" },
  { x: 330, label: "W2" },
  { x: 460, label: "W3" },
  { x: 590, label: "W4" },
  { x: 720, label: "W5" },
  { x: 850, label: "W6" },
];

type SignalWaveformProps = {
  className?: string;
};

export function SignalWaveform({ className }: SignalWaveformProps) {
  return (
    <svg
      viewBox="-60 -60 1100 580"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* eyebrow */}
      <motion.text
        x={95}
        y={-18}
        fontSize={11}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        // signal vs noise
      </motion.text>

      {/* Y-axis */}
      <DrawPath
        d="M 80 80 L 80 400"
        delay={0}
        duration={1.4}
        strokeWidth={1.4}
      />
      {/* X-axis */}
      <DrawPath
        d="M 80 400 L 920 400"
        delay={0.4}
        duration={1.8}
        strokeWidth={1.4}
      />
      {/* Y-axis arrowhead */}
      <DrawPath
        d="M 74 86 L 80 78 L 86 86"
        delay={1.2}
        duration={0.3}
        strokeWidth={1.2}
      />
      {/* X-axis arrowhead */}
      <DrawPath
        d="M 914 394 L 922 400 L 914 406"
        delay={2.0}
        duration={0.3}
        strokeWidth={1.2}
      />

      {/* horizontal grid lines */}
      {[160, 240, 320].map((y, i) => (
        <DrawPath
          key={`hgrid-${y}`}
          d={`M 80 ${y} L 920 ${y}`}
          delay={2.2 + i * 0.1}
          duration={1.5}
          strokeWidth={0.8}
          strokeDasharray="3 4"
        />
      ))}

      {/* week tick marks */}
      {WEEKS.map((w, i) => (
        <DrawPath
          key={`wtick-${w.label}`}
          d={`M ${w.x} 400 L ${w.x} 408`}
          delay={2.4 + i * 0.05}
          duration={0.3}
          strokeWidth={1.0}
        />
      ))}

      {/* main signal curve — (400, 180) is the unique global peak */}
      <DrawPath
        d="M 80 330 Q 140 300 200 310 Q 270 320 330 250 Q 380 200 400 180 Q 420 200 460 250 Q 510 320 560 290 Q 620 260 680 220 Q 740 205 800 215 Q 860 230 920 210"
        delay={3.2}
        duration={4.5}
        strokeWidth={2.0}
      />

      {/* noise curve below */}
      <DrawPath
        d="M 80 378 L 110 374 L 135 380 L 160 375 L 190 381 L 215 376 L 245 382 L 275 377 L 305 383 L 335 376 L 365 382 L 395 377 L 425 383 L 460 376 L 495 382 L 530 378 L 565 384 L 600 378 L 635 383 L 670 377 L 705 384 L 740 378 L 775 384 L 810 378 L 845 383 L 880 377 L 920 382"
        delay={5.6}
        duration={2.6}
        strokeWidth={1.0}
      />

      {/* peak marker circle */}
      <DrawPath
        d={circlePath(400, 180, 18)}
        delay={7.2}
        duration={0.9}
        strokeWidth={1.3}
        strokeDasharray="3 3"
      />

      {/* peak annotation leader line */}
      <DrawPath
        d="M 415 165 Q 470 120 520 110"
        delay={8.0}
        duration={0.8}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 515 107 L 520 110 L 517 116"
        delay={8.7}
        duration={0.3}
        strokeWidth={1.0}
      />

      {/* labels */}
      <motion.text
        x={530}
        y={112}
        fontSize={16}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 8.9 }}
      >
        peak signal
      </motion.text>

      {/* Y-axis label "amplitude" */}
      <motion.text
        x={50}
        y={230}
        textAnchor="middle"
        fontSize={14}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        opacity={0.7}
        transform="rotate(-90 50 230)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 3.0 }}
      >
        amplitude
      </motion.text>

      {/* X-axis label "time →" */}
      <motion.text
        x={940}
        y={406}
        fontSize={14}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        opacity={0.7}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 3.1 }}
      >
        time →
      </motion.text>

      {/* week labels */}
      {WEEKS.map((w, i) => (
        <motion.text
          key={`wlabel-${w.label}`}
          x={w.x}
          y={425}
          textAnchor="middle"
          fontSize={12}
          fontFamily="'Architects Daughter', cursive"
          fill="#634832"
          opacity={0.7}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 2.8 + i * 0.08 }}
        >
          {w.label}
        </motion.text>
      ))}

      {/* signal label pointing to main curve */}
      <motion.text
        x={160}
        y={345}
        fontSize={14}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 7.8 }}
      >
        signal
      </motion.text>

      {/* noise label */}
      <motion.text
        x={160}
        y={400}
        fontSize={14}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        opacity={0.7}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 8.3 }}
      >
        noise
      </motion.text>
      {/* small arrow from noise label to noise curve */}
      <DrawPath
        d="M 180 405 Q 200 395 220 385"
        delay={8.4}
        duration={0.4}
        strokeWidth={0.9}
      />

      {/* "now" marker at end of signal */}
      <DrawPath
        d={circlePath(920, 210, 5)}
        delay={8.0}
        duration={0.4}
        strokeWidth={1.3}
      />
      <motion.text
        x={935}
        y={196}
        fontSize={13}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 8.6 }}
      >
        now
      </motion.text>
    </svg>
  );
}
