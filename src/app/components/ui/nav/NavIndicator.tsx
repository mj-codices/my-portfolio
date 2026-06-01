// src/components/ui/nav/NavIndicator.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Ambient Float Variants
 * * Generates an infinite, out-of-phase looping hover offset using keyframes.
 * Alternates horizontal directions based on whether the item index is even or odd (`i % 2 === 0`),
 * ensuring the list items drift independently rather than moving in lockstep.
 */
const floatVariants = {
  float: (i: number) => ({
    y: [0, -4, 0],
    x: [0, i % 2 === 0 ? 2 : -2, 0],
    transition: {
      duration: 3.5 + i * 0.6, // Dynamically scales duration so each tile cycles uniquely
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

interface NavIndicatorProps {
  /** Map loop array identifier used to seed variable, out-of-phase ambient float speeds */
  index: number;
  /** Active state flag propagated from parent hover tracking loops */
  isActive: boolean;
}

/**
 * NavIndicator Component
 * * An ultra-premium, interactive bullet indicator designed for menu layouts.
 * Combines an ambient floating animation cycle with a high-tension spring scale look.
 * Features an inner diagonal arrow mask trick that slides an arrow up from the
 * bottom-left vector space upon activation.
 */
export default function NavIndicator({ index, isActive }: NavIndicatorProps) {
  return (
    /* Layer 1: Ambient Float Wrapper
      Consumes the 'custom' prop to pass the list index up to the dynamic variant timeline.
    */
    <motion.div
      className="relative flex items-center justify-center"
      custom={index}
      variants={floatVariants}
      animate="float"
    >
      {/* Layer 2: Structural Scale & Physics Monitor
        Monitors the active boolean to cleanly scale the container background boundary (2x size snap)
        using a strict, high-stiffness spring engine to instantly command focus.
      */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isActive ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 620,
          damping: 26,
        }}
      >
        {/* Static Base Layer Asset */}
        <Image
          src="/ui/nav/navCircle.svg"
          width={20}
          height={20}
          alt="navigation dot indicator"
        />

        {/* Layer 3: Diagonal Arrow Mask Box
          An absolute-filled container constrained precisely to the circle geometry.
          Using 'overflow-hidden rounded-full' forms a perfect circular mask window, 
          allowing the child arrow icon to hide outside visible layout borders when idle.
        */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          {/* Layer 4: Kinetic Slidestream Element
            Orchestrates a combined linear translation tracking pathway. Moves the arrow 
            diagonally up and to the right from `[-8px, 8px]` to `[0px, 0px]`.
            Uses an opacity array timeline `[0, 0, 1]` to delay presentation until the arrow has 
            cleared the masked frame boundaries.
          */}
          <motion.div
            className="absolute flex items-center justify-center w-full h-full"
            initial={{ opacity: 0, x: -10, y: 10, scale: 0.5 }}
            animate={{
              x: isActive ? 0 : -8,
              y: isActive ? 0 : 8,
              scale: isActive ? 1 : 0.7,
              opacity: isActive ? [0, 0, 1] : 0, // Injected mid-point zero delays fade until slide is underway
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              delay: isActive ? 0.35 : 0, // Micro-delay allows the parent container circle scale to initiate first
              opacity: {
                duration: isActive ? 0.49 : 0.1,
                ease: "easeOut",
              },
            }}
          >
            <Image
              src="/icons/arrow.svg"
              width={8}
              height={8}
              alt="arrow indicator icon"
              className="rotate-320" // Structural turn matching your custom alignment coordinates
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
