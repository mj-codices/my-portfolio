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
  // ---------------------------
  // Individual Fade Logic
  // ---------------------------

  // Standard fade for most elements (0 to 1 opacity between start and 30% scroll)
  // Adjust the [0, 0.2] range to control when they disappear
  const generalOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Special fade for the focal element (e.g., React) - stays visible longer or fades differently
  const specialOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Your existing parallax transforms
  const pushSpaceRaw = useTransform(scrollYProgress, [0.55, 0.8], [0, -40]);
  const pushSpace = useSpring(pushSpaceRaw, { stiffness: 90, damping: 22 });
  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.55, 0.8], [0, -55]);
  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, {
    stiffness: 90,
    damping: 22,
  });

  const time = useTime();
  const progress = useTransform(time, (t) => {
    const cycle = (t / 3740) % 1;
    return Math.pow(Math.sin(cycle * Math.PI), 1.5);
  });
  const iconScale = useTransform(progress, [0, 1], [1.03, 1]);

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
          id="square-4"
          className="z-15 absolute bottom-40 w-[80px] h-[80px] 
             backdrop-blur-md rounded-xl rotate-5 rotate-x-40 rotate-z-40 
             relative overflow-visible"
          style={{
            marginTop: pushSpace,
            marginBottom: pushSpaceBtm,
            /* Clearer background color */
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
      </FadeSection>

      {/* Accent circle */}
      <FadeSection>
        <div className="blur-xs">
          <div
            id="circle-1"
            className="z-5 absolute left-6 bottom-5 bg-[#FF6F61] rounded-full w-[20px] h-[20px]"
          />
        </div>
      </FadeSection>
      <FadeSection>
        <div className="blur-lg">
          <div
            id="circle-1"
            className="z-5 absolute left-5 top-20 bg-[#FF6F61] rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>

      {/* React tile (larger focal element) */}

      <motion.div
        id="square-6"
        className="z-15 absolute left-10 top-10 w-[150px] h-[150px] rounded-xl rotate-7 backdrop-blur-sm relative"
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

      <FadeSection className="z-20">
        <motion.div
          id="square-2"
          className="z-20 absolute right-10 top-45 w-[50px] h-[50px] 
             backdrop-blur-sm rounded-xl rotate-3 
            relative overflow-visible"
          style={{
            backgroundColor: "rgba(84, 84, 84, .15)",
            transformStyle: "preserve-3d",
            transform: "translateZ(50px)",
          }}
        >
          {/* THE GRADIENT BORDER LAYER */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              padding: ".8px",
              /* 45deg starts the highlight at the Bottom-Left */
              background:
                "linear-gradient(250deg, rgba(255,255,255,0.02), rgba(255,255,255,0.2) 50%, rgba(255,255,255,0))",
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
              src={"/decorations/play.svg"}
              width={50}
              height={50}
              alt="play button"
            />
          </div>
        </motion.div>
      </FadeSection>
      {/* Code tile with gradient mask */}
      <FadeSection>
        <motion.div
          id="square-5"
          className="z-15 absolute bottom-25 right-10 w-[80px] h-[80px] 
             backdrop-blur-xl rounded-xl 
             rotate-350 relative overflow-visible"
          style={{
            marginTop: pushSpace,
            marginBottom: pushSpaceBtm,
            /* 2. ADDED deeper background color here (changed 44 to 99) */
            /* 99 is roughly 60% opacity. For even deeper, use AA or BB */
            backgroundColor: "#32322b99AA",
          }}
        >
          {/* THE GRADIENT BORDER LAYER */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              padding: "1px",
              /* Using 225deg as you had it, which puts the shine at the Top-Right */
              background:
                "linear-gradient(225deg, rgba(255,255,255,0.5), rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.05))",
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
      </FadeSection>

      {/* Background accent circle */}
      <FadeSection>
        <div className="blur-[3px]">
          <div
            id="circle-2"
            className="z-5 absolute top-5 left-0 bg-[#545454] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>
      <FadeSection>
        <div className="blur-[3px]">
          <div
            id="circle-2"
            className="z-5 absolute top-55 right-75 bg-black opacity-30 backdrop-blur-lg rounded-full w-[30px] h-[30px]"
          />
        </div>
      </FadeSection>
    </div>
  );
}
