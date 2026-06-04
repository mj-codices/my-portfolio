import Image from "next/image";
import { useState, useEffect } from "react";
import {
  useTime,
  motion,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import "./HeroCluster.css";
import { FadeSection } from "../../wrappers/FadeSection";
import React from "react";

interface HeroClusterProps {
  /** Global scroll tracking sequence reference used to drive kinetic exit and entry animations */
  scrollYProgress: MotionValue<number>;
}

/**
 * HeroCluster Component
 * * A high-performance, multilayered 3D visual cluster for the landing area.
 * Blends custom mathematical breathing curves ($f(t) = \sin(t)^{1.5}$), independent
 * scroll-linked micro-parallax displacement tiers, and twin high-tension spring launch
 * wrappers to slide interactive elements out of frame while maintaining background depth isolation.
 */
export default function HeroCluster({ scrollYProgress }: HeroClusterProps) {
    const [isStacked, setIsStacked] = useState(false);

  // Dynamic Viewport Listener
  useEffect(() => {
    const handleResize = () => {
      setIsStacked(window.innerWidth <= 1132);
    };

    // Run on mount to check initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /* ----------------------------------------------------------------
     PARALLAX / SCROLL MOTION
     Dislodges targeted vector nodes relative to initial scroll bounds 
     to establish multi-layered depths.
  ---------------------------------------------------------------- */
  const topDislodgeRaw = useTransform(scrollYProgress, [0, 0.07], [0, -35]);
  const topY = useSpring(topDislodgeRaw, { stiffness: 300, damping: 40 });

  /* ----------------------------------------------------------------
     IDLE ORGANIC BREATHING WAVE
     Uses system time loops to establish an asynchronous breathing cycle.
  ---------------------------------------------------------------- */
  const time = useTime();

  /*
    Generates a continuous custom breathing scale curve.
    - 3740ms cycle duration decouples it visually from standard CSS animations.
    - Raising the absolute sine wave to a power of 1.5 forces the curve to spend
      more time resting at the bottom scale value (1.0) and peak snappily at (1.03),
      mimicking natural breathing behavior.
  */
  const progress = useTransform(time, (t) => {
    const cycle = (t / 3740) % 1;
    return Math.pow(Math.sin(cycle * Math.PI), 1.5);
  });
  const iconScale = useTransform(progress, [0, 1], [1.03, 1]);

  /* ----------------------------------------------------------------
     KINETIC EXIT LAUNCH VEHICLE
     Transforms micro-scroll milestones into extreme structural translations.
  ---------------------------------------------------------------- */
  const launchRaw = useTransform(scrollYProgress, [0, 3.5], [0, -2000]);

  const launchY = useSpring(launchRaw, {
    stiffness: 1000, // Extreme tension parameters driving instant lift velocity
    damping: 50, // Prevents positional jittering at the tail end of calculation loops
    mass: 0.5, // Lighter mass allows immediate kinetic engine acceleration responses
    restDelta: 0.01, // Halts memory calculation cycles the moment properties clear screen bounds
  });

  return (
    <div className="flex relative mx-25">
      {/* -----------------------------------------------------------
          BACKGROUND AMBIENCE (LOW-TIER DEPTH - STATIC)
          Static blurred backplates providing ambient color fields.
          ----------------------------------------------------------- */}
      <FadeSection disabled={isStacked}>
        <div className="blur-xs">
          <div
            id="square-1"
            className="z-5 absolute top-12 left-[-2rem] bg-[#545454] opacity-20 backdrop-blur-sm w-[50px] h-[50px] rounded-xl rotate-14"
          />
        </div>
      </FadeSection>

      {/* ===========================================================
          ESCAPE LAYER MATRIX 1: Tracks Git and Node elements
          =========================================================== */}
      <motion.div style={{ y: launchY }}>
        <FadeSection disabled={isStacked}>
          {/* Git Icon Asset Block */}
          <div
            id="square-3"
            className="gitGlow z-15 absolute top-15 left-8  w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] 
             backdrop-blur-md rounded-xl relative overflow-visible"
            style={{
              backgroundColor: "rgba(50, 50, 43, 0.02)",
            }}
          >
            {/* Vector Mask Rim Highlight Rim Layer */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: ".8px",
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
              <Image
                width={70}
                height={70}
                src={"/decorations/git.svg"}
                alt="Git engineering resource logo"
                className="opacity-90"
              />
            </div>
          </div>
        </FadeSection>

        <FadeSection disabled={isStacked}>
          {/* Node JS Asset Block */}
          <motion.div
            style={{ y: topY }}
            className="z-15 absolute bottom-60 left-13 w-[70px] h-[70px] sm:w-[80px] sm:h-[80px]"
          >
            <motion.div
              id="square-4"
              className="w-full h-full backdrop-blur-md rounded-xl rotate-5 rotate-x-40 rotate-z-40 relative overflow-visible"
              style={{
                backgroundColor: "rgba(84, 84, 84, 0.06)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
                <Image
                  width={70}
                  height={70}
                  alt="Node JS platform identity visual asset"
                  src={"/decorations/node.svg"}
                  className="opacity-85"
                />
              </div>
            </motion.div>
          </motion.div>
        </FadeSection>
      </motion.div>

      {/* -----------------------------------------------------------
          CHROMATIC VISUAL ACCENTS (STATIC LAYER SANDWICHED BETWEEN TILES)
          These are placed outside the motion.div streams so they stay locked in place.
          ----------------------------------------------------------- */}
      <FadeSection disabled={isStacked}>
        <div className="blur-xs">
          <div
            id="circle-1"
            className="z-5 absolute left-27 bottom-5 bg-[#FF6F61] rounded-full w-[20px] h-[20px]"
          />
        </div>
      </FadeSection>
      <FadeSection disabled={isStacked}>
        <div className="blur-lg">
          <div
            id="circle-2"
            className="z-5 absolute left-25 top-20 bg-[#FF6F61] rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>

      {/* ===========================================================
          ESCAPE LAYER MATRIX 2: Tracks React and Code elements
          Splitting this block allows the static background circles above
          to remain anchored without layout disruption.
          =========================================================== */}
      <motion.div style={{ y: launchY }}>
        {/* Core Focal Element: React Tile (Consumes mathematical breathing scales) */}
        <motion.div
          id="square-6"
          className="z-15 absolute left-30 top-10 w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] rounded-xl rotate-7 backdrop-blur-sm relative"
          style={{
            scale: iconScale,
          }}
        >
          <FadeSection disabled={isStacked}>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0) 50%, rgba(255,255,255,0.15))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
          </FadeSection>

          <FadeSection disabled={isStacked}>
            <div className="flex items-center justify-center w-full h-full p-5">
              <Image
                src={"/decorations/react.svg"}
                width={130}
                height={130}
                alt="React engine development framework identifier"
              />
            </div>
          </FadeSection>
        </motion.div>

        {/* Vector Alpha-Mask Vector Block */}
        <FadeSection disabled={isStacked}>
          <motion.div
            style={{ y: topY }}
            className="z-15 absolute bottom-45 right-[-9rem]"
          >
            <motion.div
              id="square-5"
              className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] backdrop-blur-xl rounded-xl rotate-350 relative overflow-visible"
              style={{
                backgroundColor: "#32322b99AA",
              }}
            >
              {/* LAYER 1: GRADIENT BORDER RING
      Uses a composite exclusion mask to punch out the center area (content-box).
      This leaves a clean, hardware-accelerated 1px perimeter ring that displays 
      the linear gradient without bleeding into the backdrop-blurred center.
  */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(225deg, rgba(255,255,255,0.5), rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.03))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative z-10 w-full h-full p-3">
                {/* LAYER 2: VECTOR GLYPH MASK
        Tailwind's arbitrary mask utilities automatically output cross-browser 
        standard and webkit prefixes to cleanly stamp the code.svg geometry out 
        of the underlying vibrant background gradient.
    */}
                <div
                  className="
                    w-full h-full
                    bg-gradient-to-tr from-[#ff5757] to-[#9e005d]
                    mask-[url('/decorations/code.svg')] mask-center mask-no-repeat mask-contain
                    [-webkit-mask-image:url('/decorations/code.svg')]
                    [-webkit-mask-position:center]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-size:contain]
                  "
                />
              </div>
            </motion.div>
          </motion.div>
        </FadeSection>
      </motion.div>

      {/* Ambient Midground Shadow Elements (STATIC BACKGROUNDS) */}
      <FadeSection disabled={isStacked}>
        <div className="blur-[3px]">
          <div
            id="circle-3"
            className="z-5 absolute top-5 left-50 bg-[#545454] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>
      <FadeSection disabled={isStacked}>
        <div className="blur-[3px]">
          <div
            id="circle-4"
            className="z-5 absolute top-55 right-20 bg-black opacity-30 backdrop-blur-lg rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>
    </div>
  );
}
