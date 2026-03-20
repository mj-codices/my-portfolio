import { motion, MotionValue } from "framer-motion";
import { RefObject } from "react";
import { FadeSection } from "../wrappers/FadeSection";

type AboutTextProps = {
  headingY: MotionValue<number>;
  p1Y: MotionValue<number>;
  p2Y: MotionValue<number>;
  p2Ref: React.RefObject<HTMLDivElement | null>;
};

export default function AboutMe({ headingY, p1Y, p2Y, p2Ref }: AboutTextProps) {
  return (
    <div className="mt-40  flex relative">
  
      <FadeSection>
        <div className="ml-15 relative z-10 pt-10">
          <motion.div
            className="relative flex -translate-x-15"
            style={{ y: headingY }}
          >
            <img
              className="spin-slow w-12 h-auto mr-9 -translate-y-5"
              src={"/decorations/aster.svg"}
            ></img>
            <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
              <span className="text-[#a3a2a2] opacity-100">my</span> story
            </h2>
          </motion.div>
          <motion.div style={{ y: p1Y }}>
            <p className="text-lg w-110 leading-9 ml-7 mb-3">
              I’m a full-stack software developer based in Southern California.
              My passion for programming stems from a love of polished,
              intuitive user experiences, and this is why I thrive at the
              intersection of design and engineering.
            </p>
          </motion.div>
          <motion.div ref={p2Ref} style={{ y: p2Y }}>
            <p className="text-lg w-150 leading-9 ml-7">
              When I’m not pushing pixels, you can find me jamming to Aphex
              Twin, cheering for my hometown Lakers, or camping along the
              Pacific Coast with my wife and dog in our old VW wagon.
            </p>
          </motion.div>
        </div>
      </FadeSection>
    </div>
  );
}
