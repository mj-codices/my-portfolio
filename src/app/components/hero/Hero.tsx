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
  
const heroInputRange = isStacked
  ? [0, 0.4, 0.7, 0.9]   // Stacked mobile tracking
  : [0, 0.35, 0.5, 0.7]; // Desktop scroll tracking

const heroOutputRange = isStacked
  ? [1, 1, .8, 0.2]       // Stacked mobile opacity (still fades completely to 0)
  : [1, 1, 1, 0.2];    // Solid on load, dips to 50%, hits a floor of 20% (0.2)
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
    // Mobile-first: tiles stack above the text in normal flow.
    // At `desk:` both blocks are pulled out of flow into the two-column layout.
    <section className="relative w-full min-h-screen desk:h-screen flex flex-col desk:flex-row items-center justify-center desk:justify-start pt-25 pb-12 desk:p-0 overflow-hidden">
      {/* Tile cluster: a fixed-size box on tablets so the text below has a real
          footprint to stack against. The inner wrapper centers the cluster's
          visual mass (~400×430px, offset from its layout box by the absolute
          tiles). Hidden on phones and short (landscape) viewports so the
          headline leads. */}
      {/* Tablets: the box spans the hero text column (48px gutter → 32rem paragraph
          measure), so the tiles center over the text block rather than the screen. */}
      <div className="relative w-full max-sm:hidden [@media(max-height:500px)]:hidden h-[24rem] sm:self-start sm:ml-12 sm:w-lg desk:self-auto desk:ml-0 desk:absolute desk:left-1/2 desk:top-1/2 desk:w-auto desk:h-auto desk:max-[1231px]:-translate-x-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-[210px] -translate-y-[30px] origin-[165px_30px] scale-90 desk:static desk:translate-none desk:scale-100">
          <HeroCluster scrollYProgress={scrollYProgress} />
        </div>
      </div>

      <FadeSection
        inputRange={heroInputRange}
        outputRange={heroOutputRange}
        className="w-full desk:w-auto"
      >
        <motion.div
          style={{ y: launchY }}
          // Shares the page's left gutter below `desk` (px-8 phones / px-12 tablets,
          // same as Mission) so the hero flows into the content that follows.
          className="relative flex flex-col items-start text-left px-8 sm:px-12 desk:px-10 desk:pl-15 desk:block desk:absolute desk:right-1/2 desk:top-1/4 desk:max-[1231px]:translate-x-8 desk:mx-15 desk:mt-[-1rem] desk:max-w-none z-5"
        >
          {/* Main Presentational Header
              Below `desk`, size tracks viewport width so "FULL-STACK" (nowrap)
              fills narrow phones without overflowing, capping at desktop's 7xl. */}
          <h1 className="text-[clamp(2.75rem,14vw,4.5rem)] desk:text-7xl font-bold desk:mt-15 uppercase desk:-translate-y-6 leading-[.87] desk:leading-[3.9rem] tracking-[-.2rem]">
            <span className="block hero-heading whitespace-nowrap">
              Full-stack
            </span>
            <span className="block pl-[.11em] desk:pl-2 brightness-130">Developer</span>
          </h1>

          {/* Abstracted Subtitle Typographic Module */}
          <HeroText
            pushSpace={pushSpace}
            pushSpaceBtm={pushSpaceBtm}
            isStacked={isStacked}
          />

          {/* Interactive Button CTA Hub */}
          <div className="inline-block relative group desk:ml-3">
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
 text-base desk:text-lg tracking-wide cursor-pointer
 button button--calypso block z-10"
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
              <span className="text-base desk:text-lg btn-hover-content">
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
    </section>
  );
}
