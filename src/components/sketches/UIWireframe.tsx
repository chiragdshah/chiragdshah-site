import { motion } from "framer-motion";
import { DrawPath } from "../motion/DrawPath";

function circlePath(cx: number, cy: number, r: number) {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
}

type UIWireframeProps = {
  className?: string;
  preserveAspectRatio?: string;
};

export function UIWireframe({ className, preserveAspectRatio }: UIWireframeProps) {
  return (
    <svg
      viewBox="-40 -20 1080 935"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* eyebrow */}
      <motion.text
        x={60}
        y={28}
        fontSize={12}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        // wireframe
      </motion.text>

      {/* browser frame */}
      <DrawPath
        d="M 40 40 L 960 40 L 960 875 L 40 875 Z"
        delay={0}
        duration={3.2}
        strokeWidth={1.7}
      />
      {/* window top bar divider */}
      <DrawPath
        d="M 40 80 L 960 80"
        delay={1.2}
        duration={1.0}
        strokeWidth={1.2}
      />
      {/* traffic lights */}
      <DrawPath
        d={circlePath(62, 60, 5)}
        delay={1.6}
        duration={0.4}
        strokeWidth={1.2}
      />
      <DrawPath
        d={circlePath(80, 60, 5)}
        delay={1.7}
        duration={0.4}
        strokeWidth={1.2}
      />
      <DrawPath
        d={circlePath(98, 60, 5)}
        delay={1.8}
        duration={0.4}
        strokeWidth={1.2}
      />
      {/* URL bar */}
      <DrawPath
        d="M 160 50 Q 155 50 155 55 L 155 65 Q 155 70 160 70 L 870 70 Q 875 70 875 65 L 875 55 Q 875 50 870 50 Z"
        delay={2.0}
        duration={1.2}
        strokeWidth={1.2}
      />

      {/* nav bar */}
      <DrawPath
        d="M 70 100 L 120 100 L 120 130 L 70 130 Z"
        delay={2.6}
        duration={0.8}
        strokeWidth={1.3}
      />
      <DrawPath
        d="M 720 112 L 770 112"
        delay={3.0}
        duration={0.4}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 790 112 L 840 112"
        delay={3.1}
        duration={0.4}
        strokeWidth={1.2}
      />
      <DrawPath
        d="M 860 112 L 910 112"
        delay={3.2}
        duration={0.4}
        strokeWidth={1.2}
      />

      {/* hero block frame */}
      <DrawPath
        d="M 70 160 L 930 160 L 930 310 L 70 310 Z"
        delay={3.2}
        duration={2.4}
        strokeDasharray="5 4"
        strokeWidth={1.3}
      />
      {/* hero text lines */}
      <DrawPath
        d="M 110 200 L 620 200"
        delay={4.0}
        duration={1.2}
        strokeWidth={2.2}
      />
      <DrawPath
        d="M 110 235 L 520 235"
        delay={4.4}
        duration={0.9}
        strokeWidth={1.1}
      />
      <DrawPath
        d="M 110 255 L 560 255"
        delay={4.6}
        duration={0.9}
        strokeWidth={1.1}
      />
      {/* CTA button */}
      <DrawPath
        d="M 115 275 Q 110 275 110 280 L 110 296 Q 110 301 115 301 L 210 301 Q 215 301 215 296 L 215 280 Q 215 275 210 275 Z"
        delay={5.0}
        duration={0.8}
        strokeWidth={1.3}
      />

      {/* card 1 */}
      <DrawPath
        d="M 70 340 L 350 340 L 350 510 L 70 510 Z"
        delay={5.2}
        duration={1.6}
        strokeWidth={1.3}
      />
      {/* card 1 image placeholder */}
      <DrawPath
        d="M 85 355 L 335 355 L 335 440 L 85 440 Z"
        delay={5.6}
        duration={1.0}
        strokeWidth={1.0}
      />
      {/* card 1 diagonal (image placeholder mark) */}
      <DrawPath
        d="M 85 355 L 335 440 M 335 355 L 85 440"
        delay={6.0}
        duration={0.8}
        strokeWidth={0.8}
      />
      {/* card 1 text lines */}
      <DrawPath
        d="M 90 458 L 260 458"
        delay={6.2}
        duration={0.6}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 90 478 L 320 478"
        delay={6.4}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 90 492 L 280 492"
        delay={6.5}
        duration={0.5}
        strokeWidth={0.9}
      />

      {/* card 2 */}
      <DrawPath
        d="M 360 340 L 640 340 L 640 510 L 360 510 Z"
        delay={5.3}
        duration={1.6}
        strokeWidth={1.3}
      />
      <DrawPath
        d="M 375 355 L 625 355 L 625 440 L 375 440 Z"
        delay={5.7}
        duration={1.0}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 375 355 L 625 440 M 625 355 L 375 440"
        delay={6.1}
        duration={0.8}
        strokeWidth={0.8}
      />
      <DrawPath
        d="M 380 458 L 550 458"
        delay={6.3}
        duration={0.6}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 380 478 L 610 478"
        delay={6.5}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 380 492 L 570 492"
        delay={6.6}
        duration={0.5}
        strokeWidth={0.9}
      />

      {/* card 3 */}
      <DrawPath
        d="M 650 340 L 930 340 L 930 510 L 650 510 Z"
        delay={5.4}
        duration={1.6}
        strokeWidth={1.3}
      />
      <DrawPath
        d="M 665 355 L 915 355 L 915 440 L 665 440 Z"
        delay={5.8}
        duration={1.0}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 665 355 L 915 440 M 915 355 L 665 440"
        delay={6.2}
        duration={0.8}
        strokeWidth={0.8}
      />
      <DrawPath
        d="M 670 458 L 840 458"
        delay={6.4}
        duration={0.6}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 670 478 L 900 478"
        delay={6.6}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 670 492 L 860 492"
        delay={6.7}
        duration={0.5}
        strokeWidth={0.9}
      />

      {/* card 4 */}
      <DrawPath
        d="M 70 540 L 350 540 L 350 710 L 70 710 Z"
        delay={6.8}
        duration={1.6}
        strokeWidth={1.3}
      />
      <DrawPath
        d="M 85 555 L 335 555 L 335 640 L 85 640 Z"
        delay={7.0}
        duration={1.0}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 85 555 L 335 640 M 335 555 L 85 640"
        delay={7.3}
        duration={0.8}
        strokeWidth={0.8}
      />
      <DrawPath
        d="M 90 658 L 260 658"
        delay={7.5}
        duration={0.6}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 90 678 L 320 678"
        delay={7.6}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 90 692 L 280 692"
        delay={7.7}
        duration={0.5}
        strokeWidth={0.9}
      />

      {/* card 5 */}
      <DrawPath
        d="M 360 540 L 640 540 L 640 710 L 360 710 Z"
        delay={6.9}
        duration={1.6}
        strokeWidth={1.3}
      />
      <DrawPath
        d="M 375 555 L 625 555 L 625 640 L 375 640 Z"
        delay={7.1}
        duration={1.0}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 375 555 L 625 640 M 625 555 L 375 640"
        delay={7.4}
        duration={0.8}
        strokeWidth={0.8}
      />
      <DrawPath
        d="M 380 658 L 550 658"
        delay={7.6}
        duration={0.6}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 380 678 L 610 678"
        delay={7.7}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 380 692 L 570 692"
        delay={7.8}
        duration={0.5}
        strokeWidth={0.9}
      />

      {/* card 6 */}
      <DrawPath
        d="M 650 540 L 930 540 L 930 710 L 650 710 Z"
        delay={7.0}
        duration={1.6}
        strokeWidth={1.3}
      />
      <DrawPath
        d="M 665 555 L 915 555 L 915 640 L 665 640 Z"
        delay={7.2}
        duration={1.0}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 665 555 L 915 640 M 915 555 L 665 640"
        delay={7.5}
        duration={0.8}
        strokeWidth={0.8}
      />
      <DrawPath
        d="M 670 658 L 840 658"
        delay={7.7}
        duration={0.6}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 670 678 L 900 678"
        delay={7.8}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 670 692 L 860 692"
        delay={7.9}
        duration={0.5}
        strokeWidth={0.9}
      />

      {/* footer divider */}
      <DrawPath
        d="M 70 725 L 930 725"
        delay={7.8}
        duration={1.2}
        strokeWidth={1.2}
      />
      {/* footer column 1 */}
      <DrawPath
        d="M 90 740 L 200 740"
        delay={8.0}
        duration={0.5}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 90 752 L 230 752"
        delay={8.1}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 90 762 L 210 762"
        delay={8.2}
        duration={0.5}
        strokeWidth={0.9}
      />
      {/* footer column 2 */}
      <DrawPath
        d="M 300 740 L 410 740"
        delay={8.1}
        duration={0.5}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 300 752 L 440 752"
        delay={8.2}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 300 762 L 420 762"
        delay={8.3}
        duration={0.5}
        strokeWidth={0.9}
      />
      {/* footer column 3 */}
      <DrawPath
        d="M 510 740 L 620 740"
        delay={8.2}
        duration={0.5}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 510 752 L 650 752"
        delay={8.3}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 510 762 L 630 762"
        delay={8.4}
        duration={0.5}
        strokeWidth={0.9}
      />
      {/* footer column 4 */}
      <DrawPath
        d="M 720 740 L 830 740"
        delay={8.3}
        duration={0.5}
        strokeWidth={1.5}
      />
      <DrawPath
        d="M 720 752 L 860 752"
        delay={8.4}
        duration={0.5}
        strokeWidth={0.9}
      />
      <DrawPath
        d="M 720 762 L 840 762"
        delay={8.5}
        duration={0.5}
        strokeWidth={0.9}
      />
      {/* footer bottom bar */}
      <DrawPath
        d="M 70 778 L 930 778"
        delay={8.8}
        duration={1.0}
        strokeWidth={1.0}
      />

      {/* annotations: arrow + label for nav */}
      <DrawPath
        d="M 980 110 Q 990 105 970 90"
        delay={7.0}
        duration={0.8}
        strokeWidth={1.1}
      />
      <DrawPath
        d="M 970 90 L 966 96 L 974 95"
        delay={7.7}
        duration={0.3}
        strokeWidth={1.0}
      />
      <motion.text
        x={990}
        y={125}
        fontSize={15}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 8.0 }}
      >
        nav
      </motion.text>

      {/* annotation: hero label */}
      <DrawPath
        d="M -20 230 Q -10 235 40 235"
        delay={7.2}
        duration={0.8}
        strokeWidth={1.1}
      />
      <DrawPath
        d="M 40 235 L 33 230 L 33 240"
        delay={7.9}
        duration={0.3}
        strokeWidth={1.0}
      />
      <motion.text
        x={-30}
        y={234}
        textAnchor="end"
        fontSize={15}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 8.1 }}
      >
        hero
      </motion.text>

      {/* annotation: cards label */}
      <motion.text
        x={500}
        y={718}
        textAnchor="middle"
        fontSize={15}
        fontFamily="'Architects Daughter', cursive"
        fontStyle="italic"
        fill="#634832"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 8.3 }}
      >
        project cards
      </motion.text>

      {/* dimension line at bottom */}
      <DrawPath
        d="M 40 880 L 40 900"
        delay={9.2}
        duration={0.3}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 960 880 L 960 900"
        delay={9.3}
        duration={0.3}
        strokeWidth={1.0}
      />
      <DrawPath
        d="M 40 890 L 960 890"
        delay={9.4}
        duration={1.4}
        strokeWidth={1.0}
      />
      <motion.text
        x={500}
        y={913}
        textAnchor="middle"
        fontSize={13}
        fontFamily="'Architects Daughter', cursive"
        fill="#634832"
        opacity={0.8}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 10.2 }}
      >
        1440px
      </motion.text>
    </svg>
  );
}
