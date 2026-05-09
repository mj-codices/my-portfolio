import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import LiveTime from "../ui/status/LiveTime";
import LocationDisplay from "../ui/status/LocationDisplay";
import ExternalLinkIcon from "../ui/icons/ExternalLinkIcon";

export default function ClosingCTA() {
  const ref = useRef<HTMLDivElement | null>(null);

  /*
  Tracks this section's visibility within the viewport.

  Motion begins once the top of the section reaches 95% of the viewport
  and completes near 50%, creating a delayed entrance instead of
  animating immediately on scroll.
*/
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 50%"],
  });

  /*
  Raw transforms map scroll progress directly to values.
  Springs are layered on top to avoid rigid 1:1 scroll motion.
*/
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

  /*
  Slight vertical offset gives the CTA a softer upward reveal
  instead of fading/scaling in place.
*/
  const yRaw = useTransform(scrollYProgress, [0.15, 0.7], [28, 0]);

  const y = useSpring(yRaw, {
    stiffness: 90,
    damping: 22,
  });

  /*
  Footer motion is intentionally slower/later than the main CTA
  to create subtle separation between the content layers.
*/
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

          <motion.div
            className="flex items-center gap-2 pointer-events-none absolute top-full mt-5 px-5 py-3
             rounded-full bg-white/5 backdrop-blur-md text-white
             text-2xl font-medium shadow-2xl relative"
            variants={{
              rest: { opacity: 0, y: 15 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 rounded-full p-[2px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.1))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* CONTENT */}
            <p className="relative z-10 pt-1 opacity-80 tracking-wide">
              SEND EMAIL
            </p>
            <ExternalLinkIcon className="relative z-10 w-6 h-6 opacity-80" />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        style={{ y: footerY }}
        className="absolute bottom-5 left-0 w-full px-10 flex items-end justify-between"
      >
        {/* 1. LEFT SIDE: Globe, Location, Time */}
        <div className="flex space-x-3 items-center">
          <img
            src="icons/globe.gif"
            width={30}
            height={30}
            className="opacity-70 mt-[-3px]"
            alt="Globe"
          />
          <LocationDisplay />
          <LiveTime />
        </div>

        {/* 2. CENTER: GitHub Oval Link */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2">
          <motion.a
            href="https://x.com" // Updated with your likely handle
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
        px-3 py-2 
        rounded-full border border-white/20
        bg-white/5 backdrop-blur-md
        text-white font-medium
        transition-all duration-300
        hover:bg-white/10 hover:border-white/40
        flex items-center justify-center
        group overflow-hidden
      "
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 uppercase text-sm opacity-40 group-hover:opacity-100 transition-opacity">
              TWITTER
            </span>
          </motion.a>
          <motion.a
            href="https://instagram.com" // Updated with your likely handle
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
        px-3 py-2 
        rounded-full border border-white/20
        bg-white/5 backdrop-blur-md
        text-white font-medium
        transition-all duration-300
        hover:bg-white/10 hover:border-white/40
        flex items-center justify-center
        group overflow-hidden
      "
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 uppercase text-sm opacity-40 group-hover:opacity-100 transition-opacity">
              INSTAGRAM
            </span>
          </motion.a>
          <motion.a
            href="https://github.com/mjwhite-dev" // Updated with your likely handle
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
        px-3 py-2 
        rounded-full border border-white/20
        bg-white/5 backdrop-blur-md
        text-white font-medium
        transition-all duration-300
        hover:bg-white/10 hover:border-white/40
        flex items-center justify-center
        group overflow-hidden
      "
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 uppercase text-sm opacity-40 group-hover:opacity-100 transition-opacity">
              GitHub
            </span>
          </motion.a>
        </div>

        {/* 3. RIGHT SIDE: Credits */}
        <div className="text-lg">
          <p className="opacity-60 text-lg tracking-tight">
            Design by{" "}
            <span className="opacity-50 font-medium">Michael J. White</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
