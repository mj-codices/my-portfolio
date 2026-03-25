import HeroHeading from "./HeroHeading";
import FadeInDirectionalWrapper from "../wrappers/FadeInDirectionalWrapper";
import { FadeSection } from "../wrappers/FadeSection";
import HeroCluster from "./HeroCluster";
import HeroText from "./HeroText";
import { MotionValue, useTransform } from "framer-motion";
import "../../styles/components/button.css"

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

export default function Hero({ scrollYProgress }: HeroProps) {
  const pushSpace = useTransform(
    scrollYProgress,
    [0.55, 0.65], // START MUCH EARLIER
    [0, 40],
  );

  const pushSpaceBtm = useTransform(
    scrollYProgress,
    [0.58, 0.68], // START MUCH EARLIER
    [0, 55],
  );

  return (
    <section
      className="relative w-full h-screen flex flex-row items-center justify-start
    overflow-x-hidden overflow-y-hidden"
    >
      {/* Left Side - Text */}
      <div className="mt-[-3rem] flex-1 max-[1060px]:text-center text-left pl-35 lg:pl-45 remove-padding shrink-con max-[1060px]:flex-none z-10">
        
        <HeroHeading />

        <FadeInDirectionalWrapper direction="up" delay={2.1} duration={0.7}>
          <HeroText pushSpace={pushSpace} pushSpaceBtm={pushSpaceBtm} />
        </FadeInDirectionalWrapper>

        <FadeInDirectionalWrapper direction="down" delay={2.1} duration={0.7}>
          <button className="ml-1 px-4 py-5 bg-[var(--color-accent)] text-[var(--color-secondary)] rounded font-semibold text-lg tracking-wide cursor-pointer button button--calypso max-[1060px]:mx-auto max-[1060px]:block">
            <span>LET'S CONNECT</span>
            <span>SEND A MESSAGE</span>
          </button>
        </FadeInDirectionalWrapper>
      </div>

      <div
        className="absolute left-1/2 top-1/2 max-[1060px]:hidden
"
      >
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
