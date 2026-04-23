import { motion } from "framer-motion";
import { DrawPath } from "../motion/DrawPath";

function rectPath(x: number, y: number, w: number, h: number) {
  return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
}

function diamondPath(cx: number, cy: number, w: number, h: number) {
  return `M ${cx} ${cy - h / 2} L ${cx + w / 2} ${cy} L ${cx} ${cy + h / 2} L ${cx - w / 2} ${cy} Z`;
}

type ProcessFlowProps = {
  className?: string;
};

export function ProcessFlow({ className }: ProcessFlowProps) {
  return (
    <svg
      viewBox="-60 -60 1120 720"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* eyebrow */}
      <motion.text
        x={70}
        y={-14}
        fontSize={12}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        // how we work
      </motion.text>

      {/* INQUIRY (start) */}
      <DrawPath
        d={ellipsePath(500, 50, 90, 28)}
        delay={0}
        duration={1.3}
        strokeWidth={1.6}
      />
      <motion.text
        x={500}
        y={56}
        textAnchor="middle"
        fontSize={17}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        INQUIRY
      </motion.text>

      {/* arrow INQUIRY → DISCOVERY */}
      <DrawPath d="M 500 80 L 500 128" delay={1.0} duration={0.7} strokeWidth={1.2} />
      <DrawPath
        d="M 495 122 L 500 128 L 505 122"
        delay={1.6}
        duration={0.3}
        strokeWidth={1.1}
      />

      {/* DISCOVERY CALL */}
      <DrawPath
        d={rectPath(410, 130, 180, 56)}
        delay={1.7}
        duration={1.4}
        strokeWidth={1.6}
      />
      <motion.text
        x={500}
        y={164}
        textAnchor="middle"
        fontSize={17}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 3.0 }}
      >
        DISCOVERY CALL
      </motion.text>

      {/* arrow DISCOVERY → DIAMOND */}
      <DrawPath
        d="M 500 186 L 500 220"
        delay={2.8}
        duration={0.6}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 495 214 L 500 220 L 505 214"
        delay={3.3}
        duration={0.3}
        strokeWidth={1.1}
      />

      {/* DIAMOND decision */}
      <DrawPath
        d={diamondPath(500, 275, 220, 120)}
        delay={3.4}
        duration={1.8}
        strokeWidth={1.6}
      />
      <motion.text
        x={500}
        y={270}
        textAnchor="middle"
        fontSize={16}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 5.2 }}
      >
        good fit?
      </motion.text>
      <motion.text
        x={500}
        y={290}
        textAnchor="middle"
        fontSize={11}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        opacity={0.7}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 5.4 }}
      >
        scope · fit · timing
      </motion.text>

      {/* left branch (NO) */}
      <DrawPath
        d="M 390 275 L 310 275 L 310 310"
        delay={5.4}
        duration={1.1}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 305 304 L 310 310 L 315 304"
        delay={6.3}
        duration={0.3}
        strokeWidth={1.1}
      />
      <motion.text
        x={360}
        y={268}
        textAnchor="middle"
        fontSize={13}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 6.5 }}
      >
        no
      </motion.text>

      {/* right branch (YES) */}
      <DrawPath
        d="M 610 275 L 690 275 L 690 310"
        delay={5.5}
        duration={1.1}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 685 304 L 690 310 L 695 304"
        delay={6.4}
        duration={0.3}
        strokeWidth={1.1}
      />
      <motion.text
        x={640}
        y={268}
        textAnchor="middle"
        fontSize={13}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 6.5 }}
      >
        yes
      </motion.text>

      {/* LATER terminator */}
      <DrawPath
        d={ellipsePath(310, 340, 85, 26)}
        delay={6.5}
        duration={1.2}
        strokeWidth={1.4}
      />
      <motion.text
        x={310}
        y={346}
        textAnchor="middle"
        fontSize={15}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        opacity={0.85}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.85 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 7.6 }}
      >
        maybe later
      </motion.text>

      {/* PROPOSAL */}
      <DrawPath
        d={rectPath(600, 312, 180, 56)}
        delay={6.6}
        duration={1.4}
        strokeWidth={1.6}
      />
      <motion.text
        x={690}
        y={346}
        textAnchor="middle"
        fontSize={17}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 7.9 }}
      >
        PROPOSAL
      </motion.text>

      {/* arrow PROPOSAL → BUILD */}
      <DrawPath
        d="M 690 368 L 690 412"
        delay={7.6}
        duration={0.7}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 685 406 L 690 412 L 695 406"
        delay={8.2}
        duration={0.3}
        strokeWidth={1.1}
      />

      {/* BUILD */}
      <DrawPath
        d={rectPath(600, 414, 180, 56)}
        delay={8.3}
        duration={1.4}
        strokeWidth={1.6}
      />
      <motion.text
        x={690}
        y={448}
        textAnchor="middle"
        fontSize={17}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 9.6 }}
      >
        BUILD
      </motion.text>

      {/* arrow BUILD → SHIP */}
      <DrawPath
        d="M 690 470 L 690 514"
        delay={9.4}
        duration={0.7}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 685 508 L 690 514 L 695 508"
        delay={10.0}
        duration={0.3}
        strokeWidth={1.1}
      />

      {/* SHIP (terminator) */}
      <DrawPath
        d={ellipsePath(690, 544, 90, 28)}
        delay={10.1}
        duration={1.4}
        strokeWidth={1.6}
      />
      <motion.text
        x={690}
        y={550}
        textAnchor="middle"
        fontSize={17}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 11.4 }}
      >
        SHIP
      </motion.text>

      {/* feedback loop — dashed arrow from SHIP back to INQUIRY */}
      <DrawPath
        d="M 600 544 Q 200 544 120 300 Q 80 60 410 48"
        delay={11.0}
        duration={2.8}
        strokeWidth={1.1}
        strokeDasharray="4 5"
      />
      <DrawPath
        d="M 414 42 L 410 48 L 418 54"
        delay={13.5}
        duration={0.3}
        strokeWidth={1.0}
      />
      <motion.text
        x={70}
        y={315}
        textAnchor="middle"
        fontSize={14}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        opacity={0.7}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 13.0 }}
      >
        iterate
      </motion.text>
    </svg>
  );
}
