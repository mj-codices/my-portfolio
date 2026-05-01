import { motion, MotionValue } from "framer-motion";

type HeroTextProps = {
  pushSpace: MotionValue<number>; // dynamic top spacing (scroll-driven)
  pushSpaceBtm: MotionValue<number>; // dynamic bottom spacing (scroll-driven)
};

// ---------------------------
// HeroText
// ---------------------------
// Purpose:
// Renders the intro paragraph in the hero section with
// scroll-driven spacing and fade-in animation.
//
// Behavior:
// - Uses MotionValues to dynamically push spacing above/below text
// - Fades in when entering viewport
// ---------------------------
export default function HeroText({ pushSpace, pushSpaceBtm }: HeroTextProps) {
  return (
    <div className="shrink-para-wrapper mb-10 max-w-lg">
      {/* Wrapper that adjusts vertical spacing based on scroll */}
      <motion.div
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1], // smooth ease-out curve
          delay: 0,
        }}
        viewport={{ once: false, amount: 0.4 }} // triggers when ~40% in view
      >
        {/* Fade-in animation for text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg leading-[2.3rem] tracking-[.06rem]">
            Hello! I’m <span className="text-white">Michael J. White</span> (most
            people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
