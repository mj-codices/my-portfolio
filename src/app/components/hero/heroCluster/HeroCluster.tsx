import Image from "next/image";
import {
  useTime,
  motion,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import "./HeroCluster.css";
import { FadeSection } from "../../wrappers/FadeSection";

interface HeroClusterProps {
  scrollYProgress: MotionValue<number>;
}
// ---------------------------
// HeroCluster
// ---------------------------
// Purpose:
// Decorative cluster of floating UI elements/icons in the hero section.
//
// Behavior:
// - Elements are positioned absolutely to form a "floating cluster"
// - Subtle vertical motion is driven by scroll progress
// - Different motion ranges create depth (parallax-like effect)
// ---------------------------
export default function HeroCluster({ scrollYProgress }: HeroClusterProps) {
  // --- PARALLAX / SCROLL MOTION ---
  // Micro-parallax calculation to dislodge floating tiles slightly on initial scroll
  const topDislodgeRaw = useTransform(scrollYProgress, [0, 0.07], [0, -35]);
  const topY = useSpring(topDislodgeRaw, { stiffness: 300, damping: 40 });

  // --- IDLE ORGANIC TIMING ---
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

  // Global exit kinetic launch mapping
  const launchRaw = useTransform(scrollYProgress, [0, 3.5], [0, -2000]);
  // 2. The Momentum Spring
  // This is where the 'momentum' comes from. A high stiffness with low damping
  // makes the entire Hero 'snap' and fly upward.
  const launchY = useSpring(launchRaw, {
    stiffness: 1000, // High tension for a high-velocity launch
    damping: 50, // Enough damping to stop it from jittering, but low enough to stay fast
    mass: 0.5, // Lighter weight allows it to accelerate instantly
    restDelta: 0.01, // Tells the engine to stop calculating sooner once it's off-screen
  });
  return (
    <div className="flex relative mx-25">
      {/* ---------------------------
          Background decorative shapes (blurred)
          --------------------------- */}
      <FadeSection>
        <div className="blur-xs">
          <div
            id="square-1"
            className="z-5 absolute top-12 left-[-2rem] bg-[#545454] opacity-20 backdrop-blur-sm w-[50px] h-[50px] rounded-xl rotate-14"
          />
        </div>
      </FadeSection>
      {/* FOREGROUND ESCAPE VEHICLE (Launches everything inside upward) */}
      <motion.div style={{ y: launchY }}>
        <FadeSection>
          {/* Git icon tile */}
          <div
            id="square-3"
            className="gitGlow z-15 absolute top-15 left-8 w-[80px] h-[80px] 
             backdrop-blur-md rounded-xl relative overflow-visible"
            style={{
              /* Lowered background opacity for a clearer glass effect */
              backgroundColor: "rgba(50, 50, 43, 0.02)",
            }}
          >
            {/* THE GRADIENT BORDER LAYER */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: ".8px", // Slightly thicker for the 'gitGlow' effect
                /* 45deg puts the bright highlight on the Bottom-Left */
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* ICON */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
              <Image
                width={70}
                height={70}
                src={"/decorations/git.svg"}
                alt="git icon"
                className="opacity-90"
              />
            </div>
          </div>
        </FadeSection>

        <FadeSection>
          {/* Node tile (scroll-reactive) */}
          <motion.div
            style={{ y: topY }}
            className="z-15 absolute bottom-60 left-13 w-[80px] h-[80px]"
          >
            <motion.div
              id="square-4" // CSS handles the "Idle Float" here
              className="w-full h-full backdrop-blur-md rounded-xl rotate-5 rotate-x-40 rotate-z-40 relative overflow-visible"
              style={{
                backgroundColor: "rgba(84, 84, 84, 0.06)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* THE GRADIENT BORDER LAYER */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  padding: "1px",
                  /* Defaulting to a top-left shine (135deg) for this 3D tile to catch the 'overhead' light */
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* CONTENT LAYER */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
                <Image
                  width={70}
                  height={70}
                  alt="node js logo"
                  src={"/decorations/node.svg"}
                  className="opacity-85"
                />
              </div>
            </motion.div>
          </motion.div>
        </FadeSection>
      </motion.div>
      {/* Accent circle */}
      <FadeSection>
        <div className="blur-xs">
          <div
            id="circle-1"
            className="z-5 absolute left-27 bottom-5 bg-[#FF6F61] rounded-full w-[20px] h-[20px]"
          />
        </div>
      </FadeSection>
      <FadeSection>
        <div className="blur-lg">
          <div
            id="circle-1"
            className="z-5 absolute left-25 top-20 bg-[#FF6F61] rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>

      <motion.div style={{ y: launchY }}>
        {/* React tile (larger focal element) */}

        <motion.div
          id="square-6"
          className="z-15 absolute left-30 top-10 w-[150px] h-[150px] rounded-xl rotate-7 backdrop-blur-sm relative"
          style={{
            scale: iconScale,
          }}
        >
          {/* BORDER LAYER: This uses an absolute inset to avoid shifting the icon */}
          <FadeSection>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: "1px", // This is your border thickness
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

          {/* ICON: Animated container remains untouched */}
          <FadeSection>
            <div className="flex items-center justify-center w-full h-full p-5">
              <Image
                src={"/decorations/react.svg"}
                width={130}
                height={130}
                alt="react logo"
              />
            </div>
          </FadeSection>
        </motion.div>

        {/* Code tile with gradient mask */}
        <FadeSection>
          {/* Code tile with gradient mask */}
          <motion.div
            style={{ y: topY }} // Framer Motion handles the 'dislodge' launch here
            className="z-15 absolute bottom-45 right-[-9rem]"
          >
            <motion.div
              id="square-5" // CSS handles the multi-animation float/sway here
              className="w-[80px] h-[80px] backdrop-blur-xl rounded-xl rotate-350 relative overflow-visible"
              style={{
                backgroundColor: "#32322b99AA",
              }}
            >
              {/* THE GRADIENT BORDER LAYER */}
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

              {/* CONTENT LAYER */}
              <div className="relative z-10 w-full h-full p-3">
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
      {/* Background accent circle */}
      <FadeSection>
        <div className="blur-[3px]">
          <div
            id="circle-2"
            className="z-5 absolute top-5 left-50 bg-[#545454] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>
      <FadeSection>
        <div className="blur-[3px]">
          <div
            id="circle-2"
            className="z-5 absolute top-55 right-20 bg-black opacity-30 backdrop-blur-lg rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>
    </div>
  );
}
