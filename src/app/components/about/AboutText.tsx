import { motion, MotionValue } from "framer-motion";
import { FadeSection } from "../wrappers/FadeSection";

type AboutTextProps = {
  headingY: MotionValue<number>; // controls vertical motion of the section heading
  p1Y: MotionValue<number>; // controls first paragraph scroll movement
  p2Y: MotionValue<number>; // controls second paragraph scroll movement
  p2Ref: React.RefObject<HTMLDivElement | null>; // used for scroll tracking / triggering animations
};

export default function AboutMe({ headingY, p1Y, p2Y, p2Ref }: AboutTextProps) {
  return (
    <div className="mt-40 flex relative">
      {/* ---------------------------------------------
          FadeSection
          - Handles section-level fade-in when entering viewport
          - Keeps animation concerns separated from content
      --------------------------------------------- */}
      <FadeSection>
        <div className="ml-15 relative z-10 pt-10">
          {/* ---------------------------------------------
              Section Heading
              - Scroll-linked vertical movement via `headingY`
              - Includes decorative spinning icon
          --------------------------------------------- */}
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
              <span className="text-[#a3a2a2] opacity-100">my</span> story
            </h2>
          </motion.div>

          {/* ---------------------------------------------
              Paragraph 1
              - Slight upward motion tied to scroll (`p1Y`)
              - Introduces background and focus
          --------------------------------------------- */}
          <motion.div style={{ y: p1Y }}>
            <p className="text-lg w-110 leading-9 ml-7 mb-3">
              I’m a full-stack software developer based in Southern California.
              My passion for programming stems from a love of polished,
              intuitive user experiences, and this is why I thrive at the
              intersection of design and engineering.
            </p>
          </motion.div>

          {/* ---------------------------------------------
              Paragraph 2
              - Continues scroll motion (`p2Y`)
              - `p2Ref` can be used for intersection/scroll triggers
          --------------------------------------------- */}
          <motion.div ref={p2Ref} style={{ y: p2Y }}>
            <p className="text-lg w-150 leading-9 ml-7">
              When I’m not pushing pixels, you can find me jamming to Aphex
              Twin, cheering for my hometown Lakers, or camping along the
              Pacific Coast with my wife, our dog, and our old VW wagon.
            </p>
          </motion.div>
        </div>
      </FadeSection>
    </div>
  );
}
