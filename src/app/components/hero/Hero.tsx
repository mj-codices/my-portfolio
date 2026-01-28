import Image from "next/image";
import HeroHeading from "./HeroHeading";
import FadeInDirectionalWrapper from "../wrappers/FadeInDirectionalWrapper";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-[var(--color-secondary)] flex flex-row items-center justify-center
    overflow-x-hidden overflow-y-hidden"
    >
      {/* Left Side - Text */}
      <div className="flex-1 max-[1060px]:text-center text-left pl-35 remove-padding shrink-con max-[1060px]:flex-none">
        <HeroHeading />
        <FadeInDirectionalWrapper direction="up" delay={2.1} duration={.7}>
          <p className="shrink-para text-lg mb-10 max-w-lg leading-[2.3rem] tracking-[.06rem]">
            Hello! I’m <span className="text-white">Michael White</span> (most
            people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
        </FadeInDirectionalWrapper>

        <FadeInDirectionalWrapper direction="down" delay={2.1} duration={.7}>
          <button className="ml-1 px-5 py-5 bg-[var(--color-accent)] text-[var(--color-secondary)] rounded font-semibold text-xl tracking-wider cursor-pointer button button--calypso max-[1060px]:mx-auto max-[1060px]:block">
            <span>LET'S CONNECT</span>
            <span>SEND A MESSAGE</span>
          </button>
        </FadeInDirectionalWrapper>
      </div>

      {/* Right Side - Image */}
      {/* Decorative Hero Image (out of document flow) */}

      <div
        className="absolute right-0 top-1/2 -translate-y-75 shrink-frame pointer-events-none
      translate-x-68 max-[1060px]:hidden
"
      >
         <FadeInDirectionalWrapper direction="right" delay={2.1} duration={.7}>
          <Image
            src="/image_fake.svg"
            alt="Michael White"
            width={1250}
            height={1200}
            className="opacity-90 h-auto max-w-none shrink-image"
          />
        </FadeInDirectionalWrapper>
      </div>

      <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 opacity-50 chevron-bounce">
        <FadeInDirectionalWrapper delay={2.1} duration={.7} direction="down">
          <Image
            src="/chevron.svg"
            alt="Scroll down"
            width={200}
            height={10}
            className="block" // Removes inline whitespace gaps
            priority // Ensures it loads immediately for bottom-of-screen UX
          />
        </FadeInDirectionalWrapper>
      </div>
    </section>
  );
}
