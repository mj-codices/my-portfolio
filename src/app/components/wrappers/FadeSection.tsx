import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface FadeSectionProps {
  children:
    | React.ReactNode
    | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
}

export function FadeSection({ children }: FadeSectionProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.55, 0.75],
    [0, 1, 1, 0.4]
  );

  return (
    <motion.section ref={ref} className="fade-wrapper">
      <motion.div style={{ opacity }}>
        {typeof children === "function"
          ? children(scrollYProgress)
          : children}
      </motion.div>
    </motion.section>
  );
}