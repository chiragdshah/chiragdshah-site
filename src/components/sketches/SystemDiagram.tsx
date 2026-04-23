import { motion } from "framer-motion";
import { DrawPath } from "../motion/DrawPath";

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  drawDelay: number;
  drawDuration: number;
  labelDelay: number;
};

type Arrow = {
  path: string;
  head: string;
  delay: number;
  duration: number;
  label?: { text: string; x: number; y: number; delay: number };
};

const boxes: Box[] = [
  {
    x: 430,
    y: 40,
    w: 140,
    h: 60,
    label: "CLIENT",
    drawDelay: 0,
    drawDuration: 1.3,
    labelDelay: 1.2,
  },
  {
    x: 430,
    y: 150,
    w: 140,
    h: 60,
    label: "GATEWAY",
    drawDelay: 1.2,
    drawDuration: 1.3,
    labelDelay: 2.4,
  },
  {
    x: 240,
    y: 260,
    w: 140,
    h: 60,
    label: "API",
    drawDelay: 2.8,
    drawDuration: 1.2,
    labelDelay: 3.9,
  },
  {
    x: 620,
    y: 260,
    w: 140,
    h: 60,
    label: "AUTH",
    drawDelay: 2.8,
    drawDuration: 1.2,
    labelDelay: 3.9,
  },
  {
    x: 80,
    y: 400,
    w: 140,
    h: 60,
    label: "QUEUE",
    drawDelay: 4.4,
    drawDuration: 1.2,
    labelDelay: 5.5,
  },
  {
    x: 430,
    y: 400,
    w: 140,
    h: 60,
    label: "DATABASE",
    drawDelay: 4.5,
    drawDuration: 1.2,
    labelDelay: 5.6,
  },
  {
    x: 780,
    y: 400,
    w: 140,
    h: 60,
    label: "CACHE",
    drawDelay: 4.6,
    drawDuration: 1.2,
    labelDelay: 5.7,
  },
];

const arrows: Arrow[] = [
  {
    path: "M 500 100 L 500 148",
    head: "M 495 142 L 500 148 L 505 142",
    delay: 1.0,
    duration: 0.7,
  },
  {
    path: "M 470 210 L 470 240 L 310 240 L 310 258",
    head: "M 305 252 L 310 258 L 315 252",
    delay: 2.3,
    duration: 1.0,
  },
  {
    path: "M 530 210 L 530 240 L 690 240 L 690 258",
    head: "M 685 252 L 690 258 L 695 252",
    delay: 2.3,
    duration: 1.0,
    label: { text: "JWT", x: 600, y: 232, delay: 4.2 },
  },
  {
    path: "M 280 320 L 280 360 L 150 360 L 150 398",
    head: "M 145 392 L 150 398 L 155 392",
    delay: 4.0,
    duration: 1.0,
    label: { text: "async", x: 220, y: 378, delay: 5.8 },
  },
  {
    path: "M 340 320 L 340 360 L 500 360 L 500 398",
    head: "M 495 392 L 500 398 L 505 392",
    delay: 4.0,
    duration: 1.0,
  },
  {
    path: "M 720 320 L 720 360 L 850 360 L 850 398",
    head: "M 845 392 L 850 398 L 855 392",
    delay: 4.1,
    duration: 1.0,
    label: { text: "cached", x: 790, y: 378, delay: 5.9 },
  },
];

function BoxShape({ box }: { box: Box }) {
  const d = `M ${box.x} ${box.y} L ${box.x + box.w} ${box.y} L ${box.x + box.w} ${box.y + box.h} L ${box.x} ${box.y + box.h} Z`;
  return (
    <g>
      <DrawPath
        d={d}
        delay={box.drawDelay}
        duration={box.drawDuration}
        strokeWidth={1.6}
      />
      <motion.text
        x={box.x + box.w / 2}
        y={box.y + box.h / 2 + 6}
        textAnchor="middle"
        fontSize={17}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: box.labelDelay }}
      >
        {box.label}
      </motion.text>
    </g>
  );
}

function ArrowShape({ arrow }: { arrow: Arrow }) {
  return (
    <g>
      <DrawPath
        d={arrow.path}
        delay={arrow.delay}
        duration={arrow.duration}
        strokeWidth={1.2}
      />
      <DrawPath
        d={arrow.head}
        delay={arrow.delay + arrow.duration - 0.15}
        duration={0.3}
        strokeWidth={1.1}
      />
      {arrow.label && (
        <motion.text
          x={arrow.label.x}
          y={arrow.label.y}
          textAnchor="middle"
          fontSize={12}
          fontFamily="'Architects Daughter', cursive"
          fontStyle="italic"
          fill="#634832"
          opacity={0.75}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.75 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: arrow.label.delay }}
        >
          {arrow.label.text}
        </motion.text>
      )}
    </g>
  );
}

type SystemDiagramProps = {
  className?: string;
};

export function SystemDiagram({ className }: SystemDiagramProps) {
  return (
    <svg
      viewBox="-80 -40 1120 560"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.text
        x={-44}
        y={20}
        fontSize={15}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        // data flow
      </motion.text>

      {boxes.map((b) => (
        <BoxShape key={b.label} box={b} />
      ))}
      {arrows.map((a, i) => (
        <ArrowShape key={`arrow-${i}`} arrow={a} />
      ))}

      <DrawPath
        d="M 80 500 L 80 515"
        delay={6.2}
        duration={0.3}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 920 500 L 920 515"
        delay={6.3}
        duration={0.3}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 80 508 L 920 508"
        delay={6.5}
        duration={1.4}
        strokeWidth={1.0}
      />
      <motion.text
        x={500}
        y={534}
        textAnchor="middle"
        fontSize={13}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        opacity={0.8}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 7.6 }}
      >
        service boundary
      </motion.text>
    </svg>
  );
}
