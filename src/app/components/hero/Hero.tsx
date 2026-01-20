import Image from "next/image";
import HeroHeading from "./HeroHeading";
import FadeInWrapper from "../FadeInWrapper";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-[var(--color-secondary)] flex flex-col md:flex-row items-center justify-center
    overflow-x-hidden overflow-y-hidden"
    >
      {/* Left Side - Text */}
      <div className="flex-1 text-center md:text-left pl-35">
        <HeroHeading />
        <FadeInWrapper delay={1500} duration={500}>
          <p className="text-lg mb-10 max-w-lg leading-[2.3rem] tracking-[.06rem]">
            Hello! I’m <span className="text-white">Michael White</span> (most
            people call me Julian). I build thoughtful, scalable, and
            production-ready web apps.
          </p>
        </FadeInWrapper>

        <FadeInWrapper delay={1500} duration={500}>
          <button className="ml-1 px-5 py-5 bg-[var(--color-accent)] text-[var(--color-secondary)] rounded font-semibold text-xl tracking-wider cursor-pointer button button--calypso">
            <span>LET'S CONNECT</span>
            <span>SEND A MESSAGE</span>
          </button>
        </FadeInWrapper>
      </div>

      {/* Right Side - Image */}
      {/* Decorative Hero Image (out of document flow) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-75 pointer-events-none
      translate-x-68
"
      >
        <Image
          src="/image_fake.svg"
          alt="Michael White"
          width={1250}
          height={1200}
          className="opacity-90"
        />
      </div>

      <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 opacity-50 chevron-bounce">
        <Image
          src="/chevron.svg"
          alt="Scroll down"
          width={200}
          height={10}
          className="block" // Removes inline whitespace gaps
          priority // Ensures it loads immediately for bottom-of-screen UX
        />
      </div>
    </section>
  );
}
