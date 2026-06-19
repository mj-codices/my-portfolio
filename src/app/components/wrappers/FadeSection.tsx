import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface FadeSectionProps {
  children:
    | React.ReactNode
    | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
  mode?: "in-out" | "in-only";
  className?: string; // 1. Define the prop in the interface
  disabled?: boolean;
  inputRange?: number[];
  outputRange?: number[];
}

/**
 * FadeSection
 * accepts className
 */
export function FadeSection({
  children,
  disabled = false,
  mode = "in-out",
  className = "",
  inputRange,
  outputRange,
}: FadeSectionProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const defaultInput = mode === "in-only" ? [0, 0.2, 1] : [0, 0.18, 0.55, 0.75];
  const defaultOutput = mode === "in-only" ? [0, 1, 1] : [0, 1, 1, 0.3];

  const opacity = useTransform(
    scrollYProgress,
    inputRange ?? defaultInput,
    outputRange ?? defaultOutput
  );

  return (
    <motion.section
      ref={ref}
      /* 3. Pass the className to the motion element */
      className={className}
    >
      <motion.div style={{ opacity: disabled ? 1 : opacity }}>
        {typeof children === "function" ? children(scrollYProgress) : children}
      </motion.div>
    </motion.section>
  );
}
