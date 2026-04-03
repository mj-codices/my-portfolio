import HeroHeading from "./HeroHeading";
import HeroText from "./HeroText";
import HeroCluster from "./HeroCluster";

import FadeInDirectionalWrapper from "../wrappers/FadeInDirectionalWrapper";
import { FadeSection } from "../wrappers/FadeSection";

import { MotionValue, useTransform } from "framer-motion";
import "../../styles/components/button.css";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

export default function Hero({ scrollYProgress }: HeroProps) {
  /* ------------------------------
     Transform values for HeroText spacing
     Adjusted based on scroll progress
  ------------------------------- */
  const pushSpace = useTransform(scrollYProgress, [0.55, 0.65], [0, 40]);
  const pushSpaceBtm = useTransform(scrollYProgress, [0.58, 0.68], [0, 55]);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-start
                 overflow-x-hidden overflow-y-hidden"
    >
      {/* ==========================
          LEFT SIDE: HERO TEXT CONTENT
      ========================== */}
      <div
        className="mt-[-3rem] flex-1 pl-35 lg:pl-45 remove-padding shrink-con
                      max-[1060px]:flex-none max-[1060px]:text-center text-left z-10"
      >
        {/* Heading */}
        <HeroHeading />

        {/* Animated Hero Text */}
        <FadeInDirectionalWrapper direction="up" delay={2.1} duration={0.7}>
          <HeroText pushSpace={pushSpace} pushSpaceBtm={pushSpaceBtm} />
        </FadeInDirectionalWrapper>

        {/* Animated CTA Button */}
        <FadeInDirectionalWrapper direction="down" delay={2.1} duration={0.7}>
          <button
            className="ml-1 px-4 py-5 bg-[var(--color-accent)]
                             text-[var(--color-secondary)] rounded font-semibold
                             text-lg tracking-wide cursor-pointer
                             button button--calypso
                             max-[1060px]:mx-auto max-[1060px]:block"
          >
            <span>LET'S CONNECT</span>
            <span>SEND A MESSAGE</span>
          </button>
        </FadeInDirectionalWrapper>
      </div>

      {/* ==========================
          RIGHT SIDE: HERO CLUSTER VISUALS
      ========================== */}
      <div className="absolute left-1/2 top-1/2 max-[1060px]:hidden">
        <FadeInDirectionalWrapper direction="right" delay={2.1} duration={0.7}>
          <FadeSection>
            {(scrollYProgress) => (
              <HeroCluster scrollYProgress={scrollYProgress} />
            )}
          </FadeSection>
        </FadeInDirectionalWrapper>
      </div>
    </section>
  );
}
