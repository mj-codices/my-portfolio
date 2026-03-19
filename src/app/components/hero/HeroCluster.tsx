import Image from "next/image";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface HeroClusterProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroCluster({ scrollYProgress }: HeroClusterProps) {
  const pushSpace = useTransform(
    scrollYProgress,
    [0.75, 0.95], // START MUCH EARLIER
    [0, 40],
  );

  const pushSpaceBtm = useTransform(
    scrollYProgress,
    [0.75, 0.95], // START MUCH EARLIER
    [0, 55],
  );

  return (
    <div className="flex relative mx-25">
      <div className="blur-xs">
        <div
          id="square-1"
          className="z-5 absolute top-12 left-[-2rem] bg-[#545454] opacity-20 backdrop-blur-sm w-[50px] h-[50px] rounded-xl rotate-14"
        ></div>
      </div>
      <div
        id="square-3"
        className="z-15 absolute top-15 left-8 bg-[#32322b44] backdrop-blur-md w-[80px] h-[80px] rounded-xl border-[1px] border-white/4 p-2 overflow-hidden"
      >
     
        <Image width={70} height={70} src={"/git.svg"} alt="git icon"></Image>
      </div>

      <motion.div
        id="square-4"
        className="z-15 absolute bottom-20 left-20 bg-[#54545411] backdrop-blur-md w-[80px] h-[80px] rounded-xl rotate-5 border-solid border-[.8px] border-white/7 p-3 rotate-x-40 rotate-z-40 overflow-hidden"
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0, // small delay in seconds
        }}
      >
        <Image
          width={70}
          height={70}
          alt="vs code logo"
          src={"/vscode.svg"}
          className="opacity-85"
        ></Image>

      </motion.div>

      

      <div className="blur-xs">
        <div
          id="circle-1"
          className="z-5 absolute left-47 bottom-8 bg-[#FF6F61] rounded-full w-[20px] h-[20px]"
        ></div>
      </div>
      <div
        id="square-6"
        className="z-15 absolute left-50 top-10 bg-[#54545411] backdrop-blur-sm w-[150px] h-[150px] rounded-xl rotate-7 border-solid border-[.7px] border-white/10 p-5 overflow-hidden"
      >
        <div className="top-mask absolute w-[10rem] h-[14rem] top-[-.8rem] left-2 rotate-353 opacity-40" />
        <Image
          src={"/react.svg"}
          width={130}
          height={130}
          alt="react logo"
        ></Image>
      </div>
      <motion.div
        id="square-2"
        className="z-20 absolute left-68 top-40 bg-[#54545433] backdrop-blur-lg w-[50px] h-[50px] rounded-xl rotate-3 border-solid border-[.5px] border-white/7 p-2"
              style={{
                marginTop: pushSpace,
                marginBottom: pushSpaceBtm,
              }}
              transition={{
                duration: .5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0, // small delay in seconds
              }}
      >
        <Image
          src={"/play.svg"}
          width={50}
          height={50}
          alt="play button"
        ></Image>
      </motion.div>

      <motion.div
        id="square-5"
        className="z-15 absolute bottom-5 left-80 w-[80px] h-[80px] bg-[#32322b44] backdrop-blur-md rounded-xl rotate-350 border-solid border-[1px] border-white/4 p-3 overflow-hidden"
        style={{
          marginTop: pushSpace,
          marginBottom: pushSpaceBtm,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0, // small delay in seconds
        }}
      >
        <div
          className="
      w-full h-full
      bg-gradient-to-tr from-[#ff5757] to-[#9e005d]
      mask-[url('/code.svg')] mask-center mask-no-repeat mask-contain
      [-webkit-mask-image:url('/code.svg')]
      [-webkit-mask-position:center]
      [-webkit-mask-repeat:no-repeat]
      [-webkit-mask-size:contain]
      
    "
        />
        <div className="top-mask absolute w-[10rem] h-[14rem] top-[-.8rem] left-2 rotate-353 opacity-40" />
      </motion.div>
      <div className="blur-[3px]">
        <div
          id="circle-2"
          className="z-5 absolute top-5 left-110 bg-[#545454] opacity-20 backdrop-blur-md rounded-full w-[30px] h-[30px]"
        ></div>
      </div>
    </div>
  );
}
