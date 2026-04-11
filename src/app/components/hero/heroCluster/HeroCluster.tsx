import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
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
  const pushSpace = useTransform(
    scrollYProgress,
    [0.75, 0.95], // begin movement near end of hero scroll
    [0, 40]
  );

  const pushSpaceBtm = useTransform(scrollYProgress, [0.75, 0.95], [0, 55]);

  // ---------------------------
  // Secondary motion (subtle / smaller elements)
  // Starts earlier and moves less distance
  // ---------------------------
  const pushSpaceShort = useTransform(scrollYProgress, [0, 1], [-30, 0]);
  const pushSpaceBtmShort = useTransform(scrollYProgress, [0, 1], [-40, 0]);

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
        className="gitGlow z-15 absolute top-15 left-8 bg-[#32322b44] backdrop-blur-md w-[80px] h-[80px] rounded-xl border-[1px] border-white/4 p-2 overflow-hidden"
      >
        <Image
          width={70}
          height={70}
          src={"/decorations/git.svg"}
          alt="git icon"
        />
      </div>

      {/* VS Code tile (scroll-reactive) */}
      <motion.div
        id="square-4"
        className="z-15 absolute bottom-20 left-20 bg-[#54545411] backdrop-blur-md w-[80px] h-[80px] rounded-xl rotate-5 border-solid border-[.8px] border-white/7 p-3 rotate-x-40 rotate-z-40 overflow-hidden"
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
      >
        <Image
          width={70}
          height={70}
          alt="vs code logo"
          src={"/decorations/vscode.svg"}
          className="opacity-85"
        />
      </motion.div>

      {/* Accent circle */}
      <div className="blur-xs">
        <div
          id="circle-1"
          className="z-5 absolute left-47 bottom-8 bg-[#FF6F61] rounded-full w-[20px] h-[20px]"
        />
      </div>

      {/* React tile (larger focal element) */}
      <div className="">
        <div
          id="square-6"
          className="reactGlow z-15 absolute left-50 top-10 bg-[#54545411] backdrop-blur-sm w-[150px] h-[150px] rounded-xl rotate-7 border-solid border-[.7px] border-white/10 p-5 overflow-hidden"
        >
          <div className="top-mask absolute w-[10rem] h-[14rem] top-[-.8rem] left-2 rotate-353 opacity-40" />
          <Image
            src={"/decorations/react.svg"}
            width={130}
            height={130}
            alt="react logo"
          />
        </div>
      </div>

      {/* Small interactive tile (faster motion) */}
      <motion.div
        id="square-2"
        className="opacity-90 z-20 absolute left-68 top-45 bg-[#54545433] backdrop-blur-lg w-[50px] h-[50px] rounded-xl rotate-3 border-solid border-[.5px] border-white/10 p-2"
        style={{
          marginTop: pushSpaceShort,
          marginBottom: pushSpaceBtmShort,
        }}
      >
        <Image
          src={"/decorations/play.svg"}
          width={50}
          height={50}
          alt="play button"
        />
      </motion.div>

      {/* Code tile with gradient mask */}
      <motion.div
        id="square-5"
        className="z-15 absolute bottom-5 left-80 w-[80px] h-[80px] bg-[#32322b44] backdrop-blur-md rounded-xl rotate-350 border-solid border-[1px] border-white/4 p-3 overflow-hidden"
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
      >
        {/* Gradient masked icon */}
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
        <div className="top-mask absolute w-[10rem] h-[14rem] top-[-.8rem] left-2 rotate-353 opacity-40" />
      </motion.div>

      {/* Background accent circle */}
      <div className="blur-[3px]">
        <div
          id="circle-2"
          className="z-5 absolute top-5 left-110 bg-[#545454] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
        />
      </div>
    </div>
  );
}
