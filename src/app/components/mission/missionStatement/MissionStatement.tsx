import { motion, type MotionValue } from "framer-motion";
import "./MissionStatement.css";

type MissionStatementProps = {
  /** High-velocity kinetic displacement value applied directly to the border's margin-top layout tracking grid */
  pushUp: MotionValue<number>;
  
  /** Dynamic scaling multiplier driving the master section container footprint dimensions */
  missionScale: MotionValue<number>;
};

/**
 * MissionStatement Component
 * * A high-visibility typography section that tracks scroll-driven interpolation states.
 * Consumes continuous parent motion values to dynamically alter system scale 
 * properties and element structural layout offsets simultaneously.
 */
export default function MissionStatement({
  pushUp,
  missionScale,
}: MissionStatementProps) {
  return (
    /* MASTER TRANSFORMS CONTAINER
       Consumes the missionScale MotionValue. Applying scale here handles the sizing 
       calculations at the GPU compositor tier, keeping animations completely fluid.
    */
    <motion.div style={{ scale: missionScale }}>
      
      {/* ---------------------------------------------
          MISSION TYPOGRAPHY BLOCK
          - Centers the layout narrative with custom tracking line heights.
          - Ends with an inline red emphasis dot to anchors visual focus.
          --------------------------------------------- */}
      <motion.p className="text-center leading-[58px] opacity-80">
        My mission is to craft pixel-perfect web experiences where clarity in
        design and strength in architecture unite to create lasting, meaningful
        digital products
        <span className="px-1 text-[#ff5757] text-5xl leading-7 whitespace-nowrap">
          .
        </span>
      </motion.p>

      {/* ---------------------------------------------
          REACTIVE LAYOUT SEPARATOR BORDER
          - Note: This element maps the pushUp MotionValue directly to `marginTop`.
          --------------------------------------------- */}
      <motion.div
        style={{ marginTop: pushUp }}
        className="border border-b opacity-20 mission-border"
      />
    </motion.div>
  );
}