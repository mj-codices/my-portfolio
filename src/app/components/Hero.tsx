import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-[var(--color-secondary)] flex flex-col md:flex-row items-center justify-center
    overflow-x-hidden overflow-y-hidden"
    >
      {/* Left Side - Text */}
      <div className="flex-1 text-center md:text-left pl-35">
        <div className="tracking-[-.2rem]">
          <h1 className="text-7xl font-bold mt-10 mb-6 uppercase leading-[3.9rem]">
            <span className="gradient-text">Full-stack</span>
            <br />
            <span className="pl-5 text-white">Developer</span>
          </h1>
        </div>
        <p className="text-lg mb-10 max-w-lg leading-[2.3rem] tracking-[.06rem]">
          Hello! I’m <span className="text-white">Michael White</span> (most
          people call me Julian). I build thoughtful, scalable, and
          production-ready web apps.
        </p>
        <button className="ml-1 px-5 py-5 bg-[var(--color-accent)] text-[var(--color-secondary)] rounded font-semibold text-xl tracking-wider cursor-pointer button button--calypso">
          <span>LET'S CONNECT</span>
          <span>SEND A MESSAGE</span>
        </button>
      </div>

      {/* Right Side - Image */}
      {/* Decorative Hero Image (out of document flow) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-75 pointer-events-none
      translate-x-72
"
      >
        <Image
          src="/image_fake.svg"
          alt="Michael White"
          width={1300}
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
