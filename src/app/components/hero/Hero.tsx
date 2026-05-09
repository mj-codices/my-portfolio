import HeroText from "./HeroText";
import HeroCluster from "./heroCluster/HeroCluster";
import "./Hero.css";
import { FadeSection } from "../wrappers/FadeSection";
import { MotionValue, useTransform, useSpring, motion } from "framer-motion";
import "../../styles/components/button.css";
import { useState } from "react";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
  setIsHoveringCTA: (value: boolean) => void;
}

export default function Hero({ scrollYProgress, setIsHoveringCTA }: HeroProps) {
  const pushSpaceRaw = useTransform(scrollYProgress, [0.55, 0.65], [0, 40]);
  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.58, 0.68], [0, 55]);

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

  const springConfig = { stiffness: 90, damping: 22 };
  const pushSpace = useSpring(pushSpaceRaw, springConfig);
  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, springConfig);

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
      <div className="mt-[-3rem] flex-1 pl-35 lg:pl-45 remove-padding shrink-con max-[1060px]:flex-none max-[1060px]:text-center text-left z-10">
        <h1 className="text-7xl shrink-heading font-bold mt-15 mb-6 uppercase leading-[3.9rem] tracking-[-.2rem]">
          <span className="block hero-heading">Full-stack</span>
          <span className="block text-white max-[1060px]:pl-0 pl-4">
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
            onMouseUp={handleRelease}    // BLAST OFF
            className="ml-1 px-3 py-5 bg-[var(--color-accent)]
                       text-[var(--color-secondary)] rounded font-semibold
                       text-lg tracking-wide cursor-pointer
                       button button--calypso
                       max-[1060px]:mx-auto max-[1060px]:block z-10"
          >
            <span>LET'S CONNECT</span>
            <span className="text-lg">JUMP TO CONTACT</span>
          </button>

          {/* 4. DYNAMIC CLASS WRAPPER */}
          <div
            className={`absolute top-full left-0 w-full mt-3
             opacity-0 translate-y-[-15px] transition-all duration-500
             group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-500
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
      </div>

      <div className="absolute left-1/2 top-1/2 max-[1060px]:hidden">
        <FadeSection>
          {(scrollYProgress) => (
            <HeroCluster scrollYProgress={scrollYProgress} />
          )}
        </FadeSection>
      </div>
    </section>
  );
}
