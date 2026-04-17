import { motion, MotionValue } from "framer-motion";
import "./MissionStatement.css";

type MissionStatementProps = {
  pushUp: MotionValue<number>; // motion value controlling vertical spacing of the bottom border
};

export default function MissionStatement({ pushUp }: MissionStatementProps) {
  return (
    <div>
      {/* ---------------------------------------------
          Mission Text
          - Centered paragraph describing your mission
          - Gradient text using bg-clip-text + text-transparent
          - Large red dot at the end for visual emphasis
      --------------------------------------------- */}
      <p className="-translate-y-10 mission-text text-center leading-[58px] bg-gradient-to-b from-[#ffff] to-[#b4b4b4] bg-clip-text text-transparent">
        My mission is to craft pixel-perfect web experiences where clarity in
        design and strength in architecture unite to create lasting, meaningful
        digital products
        <span className="px-1 text-[#ff5757] text-7xl leading-7 whitespace-nowrap">
          .
        </span>
      </p>

      {/* ---------------------------------------------
          Animated Border
          - Uses Framer Motion to move the bottom border up/down
          - Controlled by `pushUp` MotionValue from parent
          - Semi-transparent for subtle emphasis
      --------------------------------------------- */}
      <motion.div
        style={{ marginTop: pushUp }}
        className="border border-b opacity-20 mission-border"
      />
    </div>
  );
}
