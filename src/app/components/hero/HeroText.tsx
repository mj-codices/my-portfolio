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
export default function HeroText({
  pushSpace,
  pushSpaceBtm,
}: HeroTextProps) {
  return (
    <div className="shrink-para-wrapper max-w-lg">
      {/* 
        1. DRIVE MOVEMENT: 
        Keep marginTop and marginBottom in style. 
        Remove the 'transition' and 'viewport' props from THIS div. 
        MotionValues handle their own "smoothness" via the useSpring 
        you set up in the parent.
      */}
      <motion.div
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
      >
        <motion.div
       
        >
          <p className="text-lg leading-[2.3rem] tracking-[.06rem]">
            Hello! I’m <span className="text-white">Michael J. White</span>{" "}
            (most people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
