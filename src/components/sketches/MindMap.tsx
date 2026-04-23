import { motion } from "framer-motion";
import { DrawPath } from "../motion/DrawPath";

const CENTER = { cx: 450, cy: 300, r: 42 };

type Sub = {
  label: string;
  endpoint: [number, number];
  labelPos: [number, number];
  labelAnchor: "start" | "middle" | "end";
  path: string;
};

type Primary = {
  label: string;
  hub: [number, number];
  hubR: number;
  labelPos: [number, number];
  centerPath: string;
  subs: Sub[];
};

const primaries: Primary[] = [
  {
    label: "SYSTEMS",
    hub: [450, 80],
    hubR: 30,
    labelPos: [450, 48],
    centerPath: "M 450 258 Q 440 180 450 110",
    subs: [
      {
        label: "Strategy",
        endpoint: [290, 20],
        labelPos: [290, -4],
        labelAnchor: "middle",
        path: "M 424 68 Q 360 38 298 24",
      },
      {
        label: "AI",
        endpoint: [450, -100],
        labelPos: [450, -124],
        labelAnchor: "middle",
        path: "M 450 50 Q 440 -20 450 -92",
      },
      {
        label: "Crestwood Digital",
        endpoint: [610, 20],
        labelPos: [610, -4],
        labelAnchor: "middle",
        path: "M 476 68 Q 540 38 602 24",
      },
    ],
  },
  {
    label: "KNOWLEDGE",
    hub: [260, 490],
    hubR: 30,
    labelPos: [260, 538],
    centerPath: "M 420 330 Q 355 395 282 468",
    subs: [
      {
        label: "Philosophy",
        endpoint: [80, 540],
        labelPos: [62, 544],
        labelAnchor: "end",
        path: "M 231 498 Q 160 508 88 538",
      },
      {
        label: "Frameworks",
        endpoint: [55, 625],
        labelPos: [37, 628],
        labelAnchor: "end",
        path: "M 235 506 Q 155 570 62 621",
      },
      {
        label: "Curiosity",
        endpoint: [190, 650],
        labelPos: [190, 676],
        labelAnchor: "middle",
        path: "M 247 518 Q 215 580 193 643",
      },
    ],
  },
  {
    label: "IDEAS",
    hub: [640, 490],
    hubR: 30,
    labelPos: [640, 538],
    centerPath: "M 480 330 Q 548 395 618 468",
    subs: [
      {
        label: "Signal Check",
        endpoint: [830, 450],
        labelPos: [846, 454],
        labelAnchor: "start",
        path: "M 669 482 Q 745 458 822 452",
      },
      {
        label: "Question Everything",
        endpoint: [920, 560],
        labelPos: [936, 564],
        labelAnchor: "start",
        path: "M 669 498 Q 790 520 912 557",
      },
      {
        label: "Pattern Seeker",
        endpoint: [750, 660],
        labelPos: [750, 686],
        labelAnchor: "middle",
        path: "M 657 514 Q 695 588 746 653",
      },
    ],
  },
];

const T_CENTER_START = 0;
const T_ME_LABEL = 1.1;
const T_PRIMARY_PATHS = 1.6;
const T_PRIMARY_HUBS = 3.4;
const T_PRIMARY_LABELS = 3.8;
const T_SUB_PATHS = 4.2;
const T_SUB_ENDPOINTS = 5.8;
const T_SUB_LABELS = 6.2;

function circlePath(cx: number, cy: number, r: number) {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
}

type MindMapProps = {
  className?: string;
};

export function MindMap({ className }: MindMapProps) {
  return (
    <svg
      viewBox="-250 -200 1400 960"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.text
        x={-235}
        y={-126}
        fontSize={19}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        // mind map
      </motion.text>

      <DrawPath
        d={circlePath(CENTER.cx, CENTER.cy, CENTER.r)}
        delay={T_CENTER_START}
        duration={2.2}
        strokeWidth={1.8}
      />
      <DrawPath
        d={circlePath(CENTER.cx, CENTER.cy, 7)}
        delay={T_CENTER_START + 0.8}
        duration={0.6}
        strokeWidth={1.4}
      />
      <motion.text
        x={CENTER.cx}
        y={CENTER.cy + 62}
        textAnchor="middle"
        fontSize={15}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: T_ME_LABEL }}
      >
        // me
      </motion.text>

      {primaries.map((p, i) => (
        <g key={p.label}>
          <DrawPath
            d={p.centerPath}
            delay={T_PRIMARY_PATHS + i * 0.1}
            duration={1.8}
            strokeWidth={1.5}
          />
          <DrawPath
            d={circlePath(p.hub[0], p.hub[1], p.hubR)}
            delay={T_PRIMARY_HUBS + i * 0.08}
            duration={0.7}
            strokeWidth={1.6}
          />
          <motion.text
            x={p.labelPos[0]}
            y={p.labelPos[1]}
            textAnchor="middle"
            fontSize={19}
            fontFamily="'Architects Daughter', cursive"
            fill="#634832"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: T_PRIMARY_LABELS + i * 0.08,
            }}
          >
            {p.label}
          </motion.text>

          {p.subs.map((s, j) => (
            <g key={s.label}>
              <DrawPath
                d={s.path}
                delay={T_SUB_PATHS + i * 0.15 + j * 0.12}
                duration={1.6}
                strokeWidth={1.1}
              />
              <DrawPath
                d={circlePath(s.endpoint[0], s.endpoint[1], 8)}
                delay={T_SUB_ENDPOINTS + i * 0.15 + j * 0.08}
                duration={0.5}
                strokeWidth={1.3}
              />
              <motion.text
                x={s.labelPos[0]}
                y={s.labelPos[1]}
                textAnchor={s.labelAnchor}
                fontSize={14}
                fontFamily="'Architects Daughter', cursive"
                fontStyle="italic"
                fill="#634832"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: T_SUB_LABELS + i * 0.15 + j * 0.08,
                }}
              >
                {s.label}
              </motion.text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
