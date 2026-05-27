import { motion, MotionValue } from "framer-motion";

type HeroTextProps = {
  /** Dynamic tracking unit pushing top vertical margins based on early scroll steps */
  pushSpace: MotionValue<number>;
  /** Dynamic tracking unit pushing bottom vertical margins based on early scroll steps */
  pushSpaceBtm: MotionValue<number>;
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
export default function HeroText({ pushSpace, pushSpaceBtm }: HeroTextProps) {
  return (
    <div className="shrink-para-wrapper max-w-lg">
      {/* Scroll-Linked Margin Spacer: 
        Transforms real-time window tracking parameters directly into 
        layout separation variables above and below the paragraph block.
      */}
      <motion.div
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
      >
        <div>
          <p className="text-lg leading-[2.3rem] tracking-[.06rem] pb-10">
            Hello! I’m <span className="text-white">Michael J. White</span>{" "}
            (most people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
