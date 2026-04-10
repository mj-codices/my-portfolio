import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface FadeSectionProps {
  children:
    | React.ReactNode
    | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
}

/**
 * FadeSection
 * A wrapper component that fades in/out its content based on scroll position.
 * Can accept children directly, or a render function that receives scroll progress.
 */
export function FadeSection({ children }: FadeSectionProps) {
  const ref = useRef(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Start fading when section enters viewport
  });

  // Map scroll progress to opacity values
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.55, 0.75], // scroll positions
    [0, 1, 1, 0.4], // opacity at each scroll point
  );

  return (
    <motion.section ref={ref} className="fade-wrapper">
      <motion.div style={{ opacity }}>
        {typeof children === "function"
          ? children(scrollYProgress) // Pass scroll value if using render prop
          : children}
      </motion.div>
    </motion.section>
  );
}
