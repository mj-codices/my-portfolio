import HeroText from "./HeroText";
import HeroCluster from "./heroCluster/HeroCluster";
import CTAChevrons from "../ui/icons/CTAChevrons";
import "./Hero.css";
import {
  MotionValue,
  useTransform,
  useSpring,
  motion,
  Variants,
} from "framer-motion";
import "../../styles/components/button.css";
import { useState } from "react";
import { FadeSection } from "../wrappers/FadeSection";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
  setIsHoveringCTA: (value: boolean) => void;
}

export default function Hero({ scrollYProgress, setIsHoveringCTA }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pushSpaceRaw = useTransform(scrollYProgress, [0.04, 0.05], [0, 15]);
  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.04, 0.08], [0, 11]);

  const tightSpring = {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  };

  const pushSpace = useSpring(pushSpaceRaw, tightSpring);
  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, tightSpring);

  // Define the fade-in parameters for the double chevrons
  const chevronVariants: Variants = {
    idle: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.55, // Adjust this decimal to perfectly match when your text finishes sliding up
        ease: "easeOut",
      },
    },
  };

  const handlePressDown = () => {
    // 1. Immediate physical feedback
    setIsLaunching(true);
  };

  const handleRelease = () => {
    // Scroll to the absolute bottom of the document
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    // Reset after transition
    setTimeout(() => setIsLaunching(false), 1500);
  };
  // States for hovering and the launch sequence
  const [isLaunching, setIsLaunching] = useState(false);

  // 1. Create the Launch Transform
  // We track from 0 (start) to your 0.04 trigger.
  // Once it hits 0.04, the 'y' value will have moved to -100vh (completely off-screen)
  const launchRaw = useTransform(scrollYProgress, [0, 2.3], [0, -2000]);

  const launchY = useSpring(launchRaw, {
    stiffness: 800, // High tension for a high-velocity launch
    damping: 30, // Enough damping to stop it from jittering, but low enough to stay fast
    mass: 0.65, // Lighter weight allows it to accelerate instantly
    restDelta: 0.01, // Tells the engine to stop calculating sooner once it's off-screen
  });

  return (
    <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
      <FadeSection>
        <motion.div
          style={{ y: launchY }}
          className="mt-[-3rem] flex-1 pl-35 lg:pl-45 remove-padding shrink-con max-[1060px]:flex-none max-[1060px]:text-center text-left z-10"
        >
          <h1 className="text-7xl shrink-heading font-bold mt-15 uppercase -translate-y-6 leading-[3.9rem] tracking-[-.2rem]">
            <span className="block hero-heading">Full-stack</span>
            <span className="block max-[1060px]:pl-0 pl-4 brightness-130">
              Developer
            </span>
          </h1>

          <HeroText pushSpace={pushSpace} pushSpaceBtm={pushSpaceBtm} />

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
                if (isLaunching) setIsLaunching(false);
              }}
              onMouseDown={handlePressDown}
              onMouseUp={handleRelease}
              className="ml-1 px-3 py-5 bg-[var(--color-accent)]
             text-[var(--color-secondary)] rounded font-semibold
             text-lg tracking-wide cursor-pointer
             button button--calypso 
             max-[1060px]:mx-auto max-[1060px]:block z-10"
            >
              {/* Default visible text layer */}
              <span>LET'S CONNECT</span>

              {/* Hover active text layer containing the GIF arrow */}
              <span className="text-lg btn-hover-content">
                <span className="translate-x-5 leading-6">JUMP TO CONTACT</span>

                {/* 2. Link your motion.span to the chevronVariants */}
                <motion.span
                  variants={chevronVariants}
                  className="display-inline-block translate-x-1" // Ensures cleaner layout rendering during opacity shifts
                >
                  <CTAChevrons />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </FadeSection>

      <div className="absolute left-1/2 top-1/2 max-[1060px]:hidden">
        <HeroCluster scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
