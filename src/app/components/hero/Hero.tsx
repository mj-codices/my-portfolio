import HeroHeading from "./HeroHeading";
import FadeInDirectionalWrapper from "../wrappers/FadeInDirectionalWrapper";
import { FadeSection } from "../wrappers/FadeSection";
import HeroCluster from "./HeroCluster";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface FadeSectionProps {
  children:
    | React.ReactNode
    | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
}

export default function Hero({ scrollYProgress }: FadeSectionProps) {
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

  // negative moves it up
  // const pushSpringRaw = useTransform(scrollYProgress, [0.65, 0.75], [0, -20]);

  // const pushSpring = useSpring(pushSpringRaw, {
  //   stiffness: 200,
  //   damping: 20,
  // });

  return (
    <section
      className="relative w-full h-screen flex flex-row items-center justify-start
    overflow-x-hidden overflow-y-hidden"
    >
      {/* Left Side - Text */}
      <div className="mt-[-3rem] flex-1 max-[1060px]:text-center text-left pl-35 lg:pl-45 remove-padding shrink-con max-[1060px]:flex-none z-10">
        <HeroHeading />
        <FadeInDirectionalWrapper direction="up" delay={2.1} duration={0.7}>
          <div className="shrink-para-wrapper mb-10 max-w-lg">
            <motion.div
              // initial={{ opacity: 0, y: 40, scale: 1 }}
              // whileInView={{ opacity: 1, y: 0, scale: 1 }}
              style={{
                marginTop: pushSpace,
                marginBottom: pushSpaceBtm,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0, // small delay in seconds
              }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <motion.div
                // style={{ y: pushSpring }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg leading-[2.3rem] tracking-[.06rem]">
                  Hello! I’m <span className="text-white">Michael White</span>{" "}
                  (most people call me Julian). I build thoughtful, scalable,
                  and production-ready web apps.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </FadeInDirectionalWrapper>

        <FadeInDirectionalWrapper direction="down" delay={2.1} duration={0.7}>
          <button className="ml-1 px-4 py-5 bg-[var(--color-accent)] text-[var(--color-secondary)] rounded font-semibold text-lg tracking-wide cursor-pointer button button--calypso max-[1060px]:mx-auto max-[1060px]:block">
            <span>LET'S CONNECT</span>
            <span>SEND A MESSAGE</span>
          </button>
        </FadeInDirectionalWrapper>
      </div>

      {/* Right Side - Image */}
      {/* Decorative Hero Image (out of document flow) */}

      <div
        className="absolute left-1/2 top-1/2 max-[1060px]:hidden
"
      >
        <FadeInDirectionalWrapper direction="right" delay={2.1} duration={0.7}>
         <FadeSection>
  {(scrollYProgress) => <HeroCluster scrollYProgress={scrollYProgress} />}
</FadeSection>
        </FadeInDirectionalWrapper>
      </div>
    </section>
  );
}
