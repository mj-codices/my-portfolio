import Image from "next/image";
import {
  useTime,
  motion,
  MotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import "./HeroCluster.css";

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
  // Scroll-driven spacing (primary motion)
  // Used for larger, more noticeable elements
  // ---------------------------
  const pushSpaceRaw = useTransform(scrollYProgress, [0.55, 0.8], [0, -40]);

  const pushSpace = useSpring(pushSpaceRaw, {
    stiffness: 90,
    damping: 22,
  });

  const pushSpaceBtmRaw = useTransform(scrollYProgress, [0.55, 0.8], [0, -55]);

  const pushSpaceBtm = useSpring(pushSpaceBtmRaw, {
    stiffness: 90,
    damping: 22,
  });

  const time = useTime();

  /*
  Time-driven ambient pulse system.

  Creates a smooth looping 0 → 1 → 0 curve using a sine wave,
  which drives:
  
  - subtle scaling

  Math.pow(..., 1.5) softens the peak so the pulse feels
  organic instead of perfectly symmetrical/mechanical.
*/
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
      <div className="blur-xs">
        <div
          id="square-1"
          className="z-5 absolute top-12 left-[-2rem] bg-[#545454] opacity-20 backdrop-blur-sm w-[50px] h-[50px] rounded-xl rotate-14"
        />
      </div>

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

      {/* Accent circle */}
      <div className="blur-xs">
        <div
          id="circle-1"
          className="z-5 absolute left-6 bottom-40 bg-[#FF6F61] rounded-full w-[20px] h-[20px]"
        />
      </div>

      <div className="blur-lg">
        <div
          id="circle-1"
          className="z-5 absolute left-5 bottom-0 bg-[#FF6F61] rounded-full w-[30px] h-[30px]"
        />
      </div>

      {/* React tile (larger focal element) */}
      <div className="">
        <motion.div
          id="square-6"
          className="z-15 absolute left-10 top-10 w-[150px] h-[150px] rounded-xl rotate-7 backdrop-blur-sm relative"
          style={{
            scale: iconScale,
          }}
        >
          {/* BORDER LAYER: This uses an absolute inset to avoid shifting the icon */}
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

          {/* ICON: Animated container remains untouched */}
          <motion.div
            className="flex items-center justify-center w-full h-full p-5"
            // style={{ opacity: iconOpacity }}
          >
            <Image
              src={"/decorations/react.svg"}
              width={130}
              height={130}
              alt="react logo"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        id="square-2"
        className="z-20 absolute right-10 top-45 w-[50px] h-[50px] 
             backdrop-blur-sm rounded-xl rotate-3 
            relative overflow-visible"
        style={{
          /* Lowered background opacity (0.1 is ~10% visibility) */
          backgroundColor: "rgba(84, 84, 84, .15)",
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

      {/* Code tile with gradient mask */}
      <motion.div
        id="square-5"
        /* 1. REMOVED 'opacity-80' and 'bg-[#32322b44]' from here */
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

      {/* Background accent circle */}
      <div className="blur-[3px]">
        <div
          id="circle-2"
          className="z-5 absolute bottom-25 left-0 bg-[#545454] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
        />
      </div>
      <div className="blur-[3px]">
        {/* <div
          id="circle-2"
          className="z-5 absolute bottom-15 right-50 bg-[#FF6F61] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
        /> */}
      </div>
      <div className="blur-[3px]">
        <div
          id="circle-2"
          className="z-5 absolute top-55 right-75 bg-black opacity-30 backdrop-blur-lg rounded-full w-[30px] h-[30px]"
        />
      </div>
    </div>
  );
}
