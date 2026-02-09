"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ProgBar() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  // Move the gradient transition point as you scroll
  const gradientBg = useTransform(
    smoothProgress,
    (v) =>
      `linear-gradient(
        to bottom,
        #FF6F61
      )`
  );

  return (
    <div className="fixed right-8 bottom-1/3 -translate-y-20 w-[.5rem] h-28 bg-white/3 rounded-lg backdrop-blur-md overflow-hidden z-50 border border-white/4 overflow-hidden">
       <div className="top-mask absolute w-[10rem] h-[10rem] top-[-.95rem] left-2 rotate-350 opacity-53"/>
      <motion.div
        className="rounded w-full h-full origin-top"
        style={{
          scaleY: smoothProgress,
          backgroundImage: gradientBg,
        }}
      />
    </div>
  );
}