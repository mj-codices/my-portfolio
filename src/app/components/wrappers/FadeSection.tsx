import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FadeSectionProps {
  children: React.ReactNode;
}

export function FadeSection({ children }: FadeSectionProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0.45, 1], [1, 0.2]);

  return (
    <motion.section ref={ref} className="fade-wrapper">
      <motion.div style={{ opacity: heroOpacity }}>{children}</motion.div>
    </motion.section>
  );
}
