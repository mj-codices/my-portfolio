import HeroText from "./HeroText";
import HeroCluster from "./heroCluster/HeroCluster";
import "./Hero.css";
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
        <h1 className="text-7xl shrink-heading font-bold mt-15 mb-6 uppercase leading-[3.9rem] tracking-[-.2rem]">
          <span className="block gradient-text">Full-stack</span>

          <span className="block text-white max-[1060px]:pl-0 pl-4">
            Developer
          </span>
        </h1>

        {/* Animated Hero Text */}

        <HeroText pushSpace={pushSpace} pushSpaceBtm={pushSpaceBtm} />

        {/* Animated CTA Button */}

        <button
          className="ml-1 px-3 py-5 bg-[var(--color-accent)]
                             text-[var(--color-secondary)] rounded font-semibold
                             text-lg tracking-wide cursor-pointer
                             button button--calypso
                             max-[1060px]:mx-auto max-[1060px]:block"
        >
          <span>LET'S CONNECT</span>
          <span className="text-base">START THE CONVERSATION</span>
        </button>
      </div>

      {/* ==========================
          RIGHT SIDE: HERO CLUSTER VISUALS
      ========================== */}
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
