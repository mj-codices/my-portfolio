"use client";

import { useState } from "react";
import {
  type MotionValue,
  useTransform,
  useSpring,
  motion,
} from "framer-motion";
import HeroText from "./HeroText";
import HeroCluster from "./heroCluster/HeroCluster";
import CTAChevrons from "../ui/icons/CTAChevrons";
import { FadeSection } from "../wrappers/FadeSection";
import "../../styles/components/button.css";
import "./Hero.css";

interface HeroProps {
  /** The scroll progress tracking value mapped across the global viewport (0 to 1) */
  scrollYProgress: MotionValue<number>;
  /** Bubble hook to notify parent layout systems to scale or morph the custom cursor matrix */
  setIsHoveringCTA: (value: boolean) => void;
}

/**
 * Hero Component
 * * The flagship entrance area of the portfolio. Displays typography layout matrices,
 * manages smooth spring-interpolated letter expansion loops based on early scroll thresholds,
 * and handles a high-velocity viewport launch transition when deep-linking down to content bounds.
 */
export default function Hero({ scrollYProgress, setIsHoveringCTA }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false);

  /* ----------------------------------------------------------------
     SCROLL-LINKED TYPOGRAPHIC SPACING INTERPOLATIONS
     Spreads letter and word spacing as the user initiates their scroll path.
     Using split offsets handles independent movement speeds across different text rows.
  ---------------------------------------------------------------- */
  const pushSpaceRaw = useTransform(scrollYProgress, [0.04, 0.05], [0, 15]);
  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.04, 0.08], [0, 11]);

  // High-frequency responsive spring loop to prevent jagged layout stepping on rapid scrolls
  const tightSpring = {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  };

  const pushSpace = useSpring(pushSpaceRaw, tightSpring);
  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, tightSpring);

  /* ----------------------------------------------------------------
     HIGH-VELOCITY SECTION LAUNCH VIEWPORT MATRIX
     Tracks early scroll progress. Once it crosses the threshold trigger bounds, 
     the entire container wrapper launches vertically off-screen to create a clean exit.
  ---------------------------------------------------------------- */
  // CHANGED: Converted from absolute pixels (-2000) to relative viewport height (-100vh)
  // to guarantee complete cross-device coverage on high-density 4K displays.
  const launchRaw = useTransform(scrollYProgress, [0, 2.3], ["0vh", "-100vh"]);

  const launchY = useSpring(launchRaw, {
    stiffness: 800, // Aggressive tension curve for snappier acceleration look
    damping: 40, // Balanced deceleration factor to eliminate end-point bounce structural jitters
    mass: 0.65, // Lightweight setting to allow instantaneous kinetic response
    restDelta: 0.01, // Cuts background animation thread calculations immediately upon clearing view
  });

  /**
   * Micro-interaction Variants for CTA Button Inner Chevrons
   * Slides the chevrons down into view on hover while simultaneously fading them in.
   */
  const chevronVariants = {
    idle: {
      opacity: 0,
      y: -30, // Positioned 30px up inside the overflow mask boundary
    },
    hover: {
      opacity: 1,
      y: 0, // Smoothly drops down into standard layout line-height tracking bounds
      transition: {
        duration: 0.85,
        delay: 0.36,
        ease: "easeInOut" as const,
      },
    },
  };
  /**
   * Triggers a programmatic smooth layout sweep down to the base contact section form bounds.
   */
  const handleRelease = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
      <FadeSection>
        {/* Core Animated Frame Canvas Layer */}
        <motion.div
          style={{ y: launchY }}
          className="mt-[-3rem] flex-1 pl-35 lg:pl-45 remove-padding shrink-con max-[1060px]:flex-none max-[1060px]:text-center text-left z-10"
        >
          {/* Main Presentational Header */}
          <h1 className="text-7xl shrink-heading font-bold mt-15 uppercase -translate-y-6 leading-[3.9rem] tracking-[-.2rem]">
            <span className="block hero-heading">Full-stack</span>
            <span className="block max-[1060px]:pl-0 pl-4 brightness-130">
              Developer
            </span>
          </h1>

          {/* Abstracted Subtitle Typographic Module */}
          <HeroText pushSpace={pushSpace} pushSpaceBtm={pushSpaceBtm} />

          {/* Interactive Button CTA Hub */}
          <div className="inline-block relative ml-1 group">
            <motion.button
              animate={isHovered ? "hover" : "idle"}
              onMouseEnter={() => {
                setIsHoveringCTA(true);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHoveringCTA(false);
                setIsHovered(false);
              }}
              onMouseUp={handleRelease}
              className="ml-1 px-3 py-5 bg-[var(--color-accent)]
             text-[var(--color-secondary)] rounded font-semibold
             text-lg tracking-wide cursor-pointer
             button button--calypso 
             max-[1060px]:mx-auto max-[1060px]:block z-10"
            >
              {/* Layout Layer 1: Baseline Idle Presentation Text */}
              <span>LET'S CONNECT</span>

              {/* Layout Layer 2: Active Hover Slide Overlay Stream */}
              <span className="text-lg btn-hover-content">
                <span className="translate-x-5 leading-6">JUMP TO CONTACT</span>

                {/* Animated Inner Kinetic Indicator Icon Vector */}
                <motion.span
                  variants={chevronVariants}
                  className="inline-block translate-x-1"
                >
                  <CTAChevrons />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </FadeSection>

      {/* Side-Car Graphical Visual Asset Cluster Canvas Layer */}
      <div className="absolute left-1/2 top-1/2 max-[1060px]:hidden">
        <HeroCluster scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
