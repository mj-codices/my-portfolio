"use client";

import { useState, useEffect } from "react";
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
  scrollYProgress: MotionValue<number>;
  setIsHoveringCTA: (value: boolean) => void;
}

export default function Hero({ scrollYProgress, setIsHoveringCTA }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isStacked, setIsStacked] = useState(false);

  // Dynamic Viewport Listener
  useEffect(() => {
    const handleResize = () => {
      setIsStacked(window.innerWidth <= 1132);
    };

    // Run on mount to check initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ----------------------------------------------------------------
     SCROLL-LINKED TYPOGRAPHIC SPACING INTERPOLATIONS
  ---------------------------------------------------------------- */
  const pushSpaceRaw = useTransform(scrollYProgress, [0.04, 0.05], [0, 15]);
  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.04, 0.08], [0, 11]);

  const tightSpring = { stiffness: 400, damping: 35, restDelta: 0.001 };
  const pushSpace = useSpring(pushSpaceRaw, tightSpring);
  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, tightSpring);

  /* ----------------------------------------------------------------
     HIGH-VELOCITY SECTION LAUNCH VIEWPORT MATRIX
  ---------------------------------------------------------------- */
  const launchRaw = useTransform(scrollYProgress, [0, 2.3], ["0vh", "-100vh"]);
  const launchY = useSpring(launchRaw, {
    stiffness: 800,
    damping: 40,
    mass: 0.65,
    restDelta: 0.01,
  });

  /**
   * INITIAL ENTRANCE ORCHESTRATION (Framer Motion)
   * Manages the one-time top-down slide & fade transition of the chevron container.
   * NOTE: The 0.36s delay triggers the Framer Motion entrance mid-way through
   * the parent container's 0.5s CSS stretch entrance, layering the reveals.
   */
  const chevronVariants = {
    idle: {
      opacity: 0,
      y: -30,
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.36, // The anchor point for your synchronization delay
        ease: "easeInOut" as const,
      },
    },
  };

  const handleRelease = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full h-screen flex items-center max-[1132px]:justify-center justify-start overflow-hidden">
      <FadeSection disabled={isStacked}>
        <motion.div
          style={{ y: launchY }}
          className="max-[1132px]:relative absolute max-[1132px]:left-43 max-[1132px]:translate-y-48 right-1/2 top-1/4 max-[1231px]:translate-x-8 mx-15 mt-[-1rem] text-left z-5"
        >
          {/* Main Presentational Header */}
          <h1 className="max-[1132px]:text-6xl text-7xl shrink-heading font-bold mt-15 max-[1132px]:text-center uppercase -translate-y-6 leading-[3.9rem] tracking-[-.2rem]">
            <span className="block hero-heading whitespace-nowrap">
              Full-stack
            </span>
            <span className="block pl-4 brightness-130">Developer</span>
          </h1>

          {/* Abstracted Subtitle Typographic Module */}
          <HeroText
            pushSpace={pushSpace}
            pushSpaceBtm={pushSpaceBtm}
            isStacked={isStacked}
          />

          {/* Interactive Button CTA Hub */}
          <div className="inline-block relative group ml-3 max-[1132px]:ml-0">
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
              className="px-3 py-5 bg-[var(--color-accent)]
 text-[var(--color-secondary)] rounded font-semibold
 max-[1132px]:text-base text-lg tracking-wide cursor-pointer
 button button--calypso 
 max-[1132px]:mx-44 block z-10"
            >
              {/* Layout Layer 1: Baseline Idle Presentation Text */}
              <span className="whitespace-nowrap">LET'S CONNECT</span>

              {/* ===========================================================
                  LAYOUT LAYER 2: HYBRID HOVER OVERLAY STREAM
                  - Outer Wrapper (.btn-hover-content): Runs the one-time 0.5s 
                    CSS stretch entrance triggered via button.css.
                  - Text Node (#mouseTextCTA): Inherits a 0.8s handoff delay 
                    to begin its infinite, dampened CSS cinch loop (Hero.css).
                  - Chevron Container (<motion.span>): Uses Framer Motion variants 
                    to handle the initial fade-in/drop entrance layout reveal.
                  =========================================================== */}
              <span className="max-[1132px]:text-base text-lg btn-hover-content">
                {/* Prevents internal frame collisions with your CSS */}
                <span
                  id="mouseTextCTA"
                  className="translate-x-16 leading-6 mt-[-.1rem]"
                >
                  JUMP TO CONTACT
                </span>

                {/* Animated Inner Kinetic Indicator Icon Vector */}
                <motion.span
                  variants={chevronVariants}
                  className="inline-block translate-x-13"
                >
                  <CTAChevrons />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </FadeSection>

      <div className="max-[1132px]:relative absolute max-[1132px]:top-[-7rem] max-[1132px]:left-[-22rem] left-1/2 top-1/2  max-[1231px]:-translate-x-10 ">
        <HeroCluster scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
