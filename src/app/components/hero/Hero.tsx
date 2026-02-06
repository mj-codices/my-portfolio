import Image from "next/image";
import HeroHeading from "./HeroHeading";
import FadeInDirectionalWrapper from "../wrappers/FadeInDirectionalWrapper";
import HeroBackground from "./HeroBackground";
import HeroCluster from "./HeroCluster";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-[var(--color-secondary)] flex flex-row items-center justify-start
    overflow-x-hidden overflow-y-hidden"
    >
      <HeroBackground></HeroBackground>
      {/* Left Side - Text */}
      <div className="mt-[-3rem] flex-1 max-[1060px]:text-center text-left pl-35 lg:pl-40 remove-padding shrink-con max-[1060px]:flex-none z-10">
        <HeroHeading />
        <FadeInDirectionalWrapper direction="up" delay={2.1} duration={0.7}>
          <p className="shrink-para text-lg mb-10 max-w-lg leading-[2.3rem] tracking-[.06rem]">
            Hello! I’m <span className="text-white">Michael White</span> (most
            people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
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
          <HeroCluster />
        </FadeInDirectionalWrapper>
      </div>

      <div className="absolute bottom-35 left-1/2 -translate-x-1/2 z-20 opacity-40">
        <FadeInDirectionalWrapper delay={2.1} duration={0.7} direction="down">
          <ScrollIndicator></ScrollIndicator>
        </FadeInDirectionalWrapper>
      </div>
    </section>
  );
}
