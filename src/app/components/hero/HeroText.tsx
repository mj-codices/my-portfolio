import { motion, MotionValue } from "framer-motion";

type HeroTextProps = {
  /** Dynamic tracking unit pushing top vertical margins based on early scroll steps */
  pushSpace: MotionValue<number>;
  /** Dynamic tracking unit pushing bottom vertical margins based on early scroll steps */
  pushSpaceBtm: MotionValue<number>;
  isStacked: boolean;
};

// -----------------------------------------------------------------
// HeroText
// -----------------------------------------------------------------
// Purpose:
// Renders the primary introduction description block in the hero section
// featuring dynamic, scroll-linked vertical padding expansion properties.
//
// Behavior:
// - Consumes spring-wrapped MotionValues to smoothly translate letter
//   and block layouts downstream as the user initiates scroll path inputs.
// - Note: The intro text fade-in sequence is fully managed by the parent
//   layout wrapper (FadeSection), not directly inside this subcomponent.
// -----------------------------------------------------------------
export default function HeroText({ pushSpace, pushSpaceBtm, isStacked }: HeroTextProps) {
  return (
    <div className="max-w-md mx-17 max-[500px]:mx-25 sm:mx-0 sm:max-w-lg">
      {/* Scroll-Linked Margin Spacer: 
        Transforms real-time window tracking parameters directly into 
        layout separation variables above and below the paragraph block.
      */}
      <motion.div
     style={{
          marginTop: isStacked ? 0 : pushSpace,
          marginBottom: isStacked ? 0 : pushSpaceBtm,
        }}
      >
        <div>
          <p className="text-base sm:text-lg max-[400px]:pt-3 max-[400px]:pb-10 max-[400px]:leading-[2.5rem] max-[1132px]:leading-[1.8rem] leading-[2.3rem] tracking-[.06rem] max-[1132px]:pb-7 pb-10 max-[1132px]:text-center mt-[-1rem] sm:mt-0">
            Hello! I’m <span className="text-white">Michael J. White</span>{" "}
            (most people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
