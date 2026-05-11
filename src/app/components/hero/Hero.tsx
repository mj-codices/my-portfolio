import HeroText from "./HeroText";
import HeroCluster from "./heroCluster/HeroCluster";
import "./Hero.css";
import { MotionValue, useTransform, useSpring, motion } from "framer-motion";
import "../../styles/components/button.css";
import { useState } from "react";
import { FadeSection } from "../wrappers/FadeSection";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
  setIsHoveringCTA: (value: boolean) => void;
}

export default function Hero({ scrollYProgress, setIsHoveringCTA }: HeroProps) {
  const pushSpaceRaw = useTransform(scrollYProgress, [0.04, 0.05], [0, 15]);
  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.04, 0.08], [0, 11]);

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

  const tightSpring = {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  };

  const pushSpace = useSpring(pushSpaceRaw, tightSpring);
  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, tightSpring);

  // 1. Create the Launch Transform
  // We track from 0 (start) to your 0.04 trigger.
  // Once it hits 0.04, the 'y' value will have moved to -100vh (completely off-screen)
  const launchRaw = useTransform(scrollYProgress, [0, 2.3], [0, -2000]);

  // 2. The Momentum Spring
  // This is where the 'momentum' comes from. A high stiffness with low damping
  // makes the entire Hero 'snap' and fly upward.
const launchY = useSpring(launchRaw, {
  stiffness: 1000,   // High tension for a high-velocity launch
  damping: 40,      // Enough damping to stop it from jittering, but low enough to stay fast
  mass: 0.5,        // Lighter weight allows it to accelerate instantly
  restDelta: 0.01   // Tells the engine to stop calculating sooner once it's off-screen
});
  // 2. THE LAUNCH HANDLER
  const handleLaunch = () => {
    if (isLaunching) return; // Prevent double clicks

    setIsLaunching(true);

    // Short delay to "rev the engine" before moving
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      // Reset the state once we've had time to scroll down
      setTimeout(() => setIsLaunching(false), 1500);
    }, 400);
  };

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
            <button
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => {
                setIsHoveringCTA(false);
                // Optional: if they drag the mouse off without releasing, reset the rev
                if (isLaunching) setIsLaunching(false);
              }}
              onMouseDown={handlePressDown} // TRIGGER ON CLICK DOWN
              onMouseUp={handleRelease} // BLAST OFF
              className="ml-1 px-3 py-5 bg-[var(--color-accent)]
                       text-[var(--color-secondary)] rounded font-semibold
                       text-lg tracking-wide cursor-pointer
                       button button--calypso mt-10
                       max-[1060px]:mx-auto max-[1060px]:block z-10"
            >
              <span>LET'S CONNECT</span>
              <span className="text-lg">JUMP TO CONTACT</span>
            </button>

            {/* 4. DYNAMIC CLASS WRAPPER */}
            <div
              className={`absolute top-full left-0 w-full mt-3
             opacity-0 translate-y-[-15px] transition-all duration-500
             group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-350
             ${isLaunching ? "is-launching" : ""}`}
            >
              {/* LEFT chevrons */}
              <motion.span
                className={`ml-6 absolute left-0 flex justify-center w-10 h-8 opacity-90 left-group 
              ${isLaunching ? "is-priming" : ""}`}
              >
                <img
                  className="w-8 btnChev btnChev-1"
                  src="/decorations/chevron.svg"
                  alt=""
                />
                <img
                  className="w-8 btnChev btnChev-2"
                  src="/decorations/chevron.svg"
                  alt=""
                />
                <img
                  className="w-8 btnChev btnChev-3"
                  src="/decorations/chevron.svg"
                  alt=""
                />
              </motion.span>

              {/* RIGHT chevrons */}
              <motion.span
                className={`mr-[-.65rem] absolute right-0 flex justify-center w-10 h-8 opacity-90 right-group 
              ${isLaunching ? "is-priming" : ""}`}
              >
                <img
                  className="w-8 btnChev btnChev-1"
                  src="/decorations/chevron.svg"
                  alt=""
                />
                <img
                  className="w-8 btnChev btnChev-2"
                  src="/decorations/chevron.svg"
                  alt=""
                />
                <img
                  className="w-8 btnChev btnChev-3"
                  src="/decorations/chevron.svg"
                  alt=""
                />
              </motion.span>
            </div>
          </div>
        </motion.div>
      </FadeSection>
      <div className="absolute left-1/2 top-1/2 max-[1060px]:hidden">
        <HeroCluster scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
