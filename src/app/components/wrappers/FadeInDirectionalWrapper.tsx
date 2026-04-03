"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

type Direction = "left" | "right" | "up" | "down";
interface FadeInDirectionalProps {
  children: ReactNode;
  direction?: Direction; // Animation direction
  duration?: number; // Animation duration in seconds
  delay?: number; // Animation delay in seconds
  className?: string; // Optional CSS class names
}

/**
 * Returns Framer Motion variants for directional fade animations
 * @param direction - the direction from which the element should fade in/out
 */
const getVariants = (direction: Direction = "up"): Variants => {
  const distance = 20; // How far (px) the element moves during animation
  const offsets = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
  };

  return {
    initial: { opacity: 0, ...offsets[direction] }, // Start off-screen + invisible
    animate: { opacity: 1, x: 0, y: 0 }, // Fade into place
    exit: { opacity: 0, ...offsets[direction] }, // Exit in same direction
  };
};

/**
 * FadeInDirectionalWrapper
 * Wraps content in a motion.div that fades in/out from a specified direction
 */
export default function FadeInDirectionalWrapper({
  children,
  direction = "up",
  duration = 1,
  delay = 0,
  className,
}: FadeInDirectionalProps) {
  const variants = getVariants(direction);

  return (
    <motion.div
      className={clsx(className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getVariants(direction)} // Apply the directional variants
      transition={{
        duration, // Controls speed of fade
        ease: "easeOut", // Smooth easing
        delay, // Optional delay for staggering
      }}
    >
      {children}
    </motion.div>
  );
}
