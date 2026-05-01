import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import LiveTime from "../ui/status/LiveTime";
import LocationDisplay from "../ui/status/LocationDisplay";
import ExternalLinkIcon from "../ui/icons/ExternalLinkIcon";

export default function ClosingCTA() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 50%"],
  });

  const opacityRaw = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const opacity = useSpring(opacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  const scaleRaw = useTransform(scrollYProgress, [0.3, 0.6], [0.96, 1]);
  const scale = useSpring(scaleRaw, {
    stiffness: 90,
    damping: 22,
  });

  const yRaw = useTransform(scrollYProgress, [0.15, 0.7], [28, 0]);
  const y = useSpring(yRaw, {
    stiffness: 90,
    damping: 22,
  });

  const footerYRaw = useTransform(scrollYProgress, [0.25, 0.85], [40, 0]);

  const footerY = useSpring(footerYRaw, {
    stiffness: 70,
    damping: 20,
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-20 text-3xl">Interested in working together?</p>

        <motion.div
          ref={ref}
          className="relative flex flex-col items-center"
          style={{ y, scale, opacity }}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <motion.p
            className="cursor-pointer text-5xl font-bold"
            variants={{
              rest: { color: "#d1d5db" }, // optional default
              hover: { color: "#ffffff" },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            mjwhite.dev@gmail.com
          </motion.p>

          {/* Tooltip */}
          <motion.div
            className="flex items-center gap-2 pointer-events-none absolute top-full mt-5 px-5 py-3
             rounded-full
             bg-white/10 backdrop-blur-md
             border border-white/20
             text-2xl font-medium
             shadow-lg"
            variants={{
              rest: { opacity: 0, y: 15 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="pt-1 opacity-80">SEND EMAIL</p>
            <ExternalLinkIcon className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        style={{ y: footerY }}
        className="absolute bottom-5 left-10 flex space-x-3"
      >
        {/* <RotatingGlobe /> */}
        <img
          src="icons/globe.gif"
          width={30}
          height={30}
          className="opacity-70"
        />
        <LocationDisplay />
        <LiveTime />
      </motion.div>
      <motion.div
        style={{ y: footerY }}
        className="absolute bottom-5 right-10 text-lg"
      >
        <p className="opacity-60">
          Design by <span className="opacity-70">Michael J. White</span>
        </p>
      </motion.div>
    </div>
  );
}
