import { motion, type MotionValue } from "framer-motion";

type AboutTextProps = {
  /** Map-interpolated vertical offset stream driving the core section header translation */
  headingY: MotionValue<number>;

  /** Kinetic displacement trajectory applied to the primary narrative block to establish baseline scroll speed */
  p1Y: MotionValue<number>;

  /** Independent trailing vertical offset trajectory applied to paragraph 2 to produce a parallax separation effect */
  p2Y: MotionValue<number>;

  /** Master alpha-channel opacity map synchronized directly across targeted layout visibility thresholds */
  p1Opacity: MotionValue<number>;

  /** Element bounding-box anchor used by the scroll container to calculate contextual viewport intersection milestones */
  p1Ref: React.RefObject<HTMLDivElement | null>;
};

export default function AboutMe({
  headingY,
  p1Y,
  p2Y,
  p1Ref,
  p1Opacity,
}: AboutTextProps) {
  return (
    <div className="mt-5 flex relative">
      <div className="ml-15 relative z-10 pt-10">
        {/* ===========================================================
            1. TYPOGRAPHIC ANCHOR & ACCENT
            - Driven by headingY spatial interpolation stream.
            - Asterisk uses a hardware-accelerated CSS composite layer rotation matrix (.spin-slow).
            =========================================================== */}
        <motion.div
          className="relative flex -translate-x-15"
          style={{ y: headingY }}
        >
          <img
            className="spin-slow w-12 h-auto mr-9 -translate-y-5"
            src={"/decorations/aster.svg"}
            alt="decorative asterisk"
          />
          <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2]">my</span> story
          </h2>
        </motion.div>

        {/* ===========================================================
            2. NARRATIVE BLOCK PRIMARY (VELOCITY FIELD A)
            - Synchronizes independent vertical offset (p1Y) with viewport-linked opacity fade (p1Opacity).
            - Hosts the DOM reference node (p1Ref) to stream layout metrics to the global scroll engine.
            =========================================================== */}
        <motion.div style={{ y: p1Y, opacity: p1Opacity }} ref={p1Ref}>
          <p className="text-lg w-120 leading-9 ml-7 mb-3 tracking-wide">
            I’m a full-stack software developer based in Southern California. My
            passion for programming stems from a love of polished, intuitive
            user experiences, and this is why I thrive at the intersection of
            design and engineering.
          </p>
        </motion.div>

        {/* ===========================================================
            3. NARRATIVE BLOCK SECONDARY (VELOCITY FIELD B - PARALLAX TRAIL)
            - Tracks along p2Y to produce a dynamic, fluid separation from the text above.
            - Inherits root layout alpha channels to enforce uniform visual exit thresholds.
            =========================================================== */}
        <motion.div style={{ y: p2Y, opacity: p1Opacity }} className="relative">
          <p className="text-lg w-120 leading-9 ml-7 tracking-wide">
            When I’m not pushing pixels, you can find me jamming to Aphex Twin,
            cheering for my hometown Lakers, or camping along the Pacific Coast
            with my wife and our dog.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
