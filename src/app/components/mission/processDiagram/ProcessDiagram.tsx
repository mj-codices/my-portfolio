import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import "./ProcessDiagram.css";

interface ProcessDiagramProps {
  scrollYProgress: MotionValue<number>; // Strongly type the Framer Motion value
}

export default function ProcessDiagram({
  scrollYProgress,
}: ProcessDiagramProps) {
  const diagramRef = useRef<HTMLDivElement | null>(null);

  // Local scroll progress scoped to the diagram
  // Enables independent timing separate from the main section scroll
  const { scrollYProgress: diagramProgress } = useScroll({
    target: diagramRef,
    offset: ["start end", "end start"], // diagram enters viewport → fully passed
  });

  const headingPYRaw = useTransform(scrollYProgress, [0.3, 0.9], [70, 0]);
  const headingPY = useSpring(headingPYRaw, {
    stiffness: 90,
    damping: 42,
  });

  const clusterYRaw = useTransform(diagramProgress, [0.03, 0.3], [60, 0]);
  const clusterY = useSpring(clusterYRaw, {
    stiffness: 75,
    damping: 28,
  });

  const paraYRaw = useTransform(diagramProgress, [0.07, 0.3], [77, 0]);
  const paraY = useSpring(paraYRaw, {
    stiffness: 80,
    damping: 26, // Slightly higher damping for a silky settle
    mass: 0.7, // Lighter mass for the "swoop" feel
  });

  /* ---------------------------------------------
     Circle 1 Y-Motion Tracking
     - Entrance: 0.01 -> 0.05 (slides up from 150 to 0)
     - Plateau:  0.05 -> 0.75 (stays at 0 while user reads)
     - Exit:     0.75 -> 0.95 (slides down from 0 to 100 as text leaves)
  --------------------------------------------- */
  const circle1YRaw = useTransform(
    diagramProgress,
    [0, 0.05, 0.45, 1], // Input timeline
    [100, 0, 0, 160] // Output Y positions
  );

  const circle1Y = useSpring(circle1YRaw, {
    stiffness: 90,
    damping: 42,
  });

  /* ---------------------------------------------
     Circle 2 Y-Motion Tracking
     - Staggers slightly behind Circle 1 on exit
     - Exit: 0.72 -> 0.92 (slides down from 0 to 120)
  --------------------------------------------- */
  const circle2YRaw = useTransform(
    diagramProgress,
    [0, 0.05, 0.45, 1], // Input timeline
    [100, 0, 0, 100] // Output Y positions (slightly deeper travel for parallax)
  );

  const circle2Y = useSpring(circle2YRaw, {
    stiffness: 90,
    damping: 42,
  });

  /* ---------------------------------------------
   Cluster Heading & Icon Opacity
   - Pairs with clusterY (0.1 -> 0.3)
--------------------------------------------- */
  const clusterOpacityRaw = useTransform(diagramProgress, [0.03, 0.3], [0, 1]);
  const clusterOpacity = useSpring(clusterOpacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  // Opacity: Fades in early (0 to 0.2), stays at 1, fades out late (0.75 to 0.95)
  const circle1OpacityRaw = useTransform(
    diagramProgress,
    [0.05, 0.2, 0.75, 0.95],
    [0, 0.3, 0.6, 0.2]
  );
  const circle1Opacity = useSpring(circle1OpacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  // Opacity: Staggers slightly behind Circle 1 for both fading in and out
  const circle2OpacityRaw = useTransform(
    diagramProgress,
    [0.08, 0.25, 0.72, 0.92],
    [0, 0.3, 0.6, 0.2]
  );
  const circle2Opacity = useSpring(circle2OpacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  return (
    <motion.div
      ref={diagramRef}
      className="relative w-[520px] right-[-6rem] top-40"
    >
      {/* ==========================
          BACKGROUND CIRCLES
      ========================== */}

      <motion.div
        id="mission-circle-1"
        className="absolute top-25 right-26 w-[145px] h-[145px] rounded-full bg-[#ff6f61] z-0 blur-md"
        style={{ opacity: circle1Opacity, y: circle1Y }}
      />

      <motion.div
        id="mission-circle-2"
        className="absolute right-5 mt-26 -translate-x-115 w-[130px] h-[123px] rounded-full 
                   bg-gradient-to-br from-[#ff5757] to-[#9e005d] opacity-60 z-0 blur-sm"
        style={{ opacity: circle2Opacity, y: circle2Y }}
      />

      {/* ==========================
          HEADING AND CHEVRONS
      ========================== */}
      <div className="absolute inset-0 z-15">
        {/* <FadeSection> */}
        <motion.div
          className="relative flex -translate-x-15 mt-[-4rem]"
          style={{ y: headingPY }}
        >
          <h2 className="pt-8 ml-13 mr-8 uppercase text-3xl font-bold tracking-[.25rem] opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2]">my</span> process
          </h2>
          <span className="top-[1.1rem] inline-flex overflow-hidden w-40 relative">
            <img
              className="w-6 opacity-80 chev chev-1"
              src="/decorations/chevron.svg"
              alt=""
            />
            <img
              className="w-6 opacity-80 chev chev-2"
              src="/decorations/chevron.svg"
              alt=""
            />
            <img
              className="w-6 opacity-80 chev chev-3"
              src="/decorations/chevron.svg"
              alt=""
            />
          </span>
        </motion.div>

        {/* ==========================
              PROCESS PANELS
          ========================== */}

        <motion.div>
          <motion.div style={{ y: paraY, opacity: clusterOpacity }}>
            <img
              className="absolute w-48 translate-x-17 translate-y-44"
              src="/decorations/dotted.svg"
              alt=""
            />
          </motion.div>
          {/* Discovery Panel */}
          <div className="-translate-x-11 translate-y-7 mt-6">
            <motion.div style={{ y: clusterY, opacity: clusterOpacity }}>
              <img
                className="w-8 ml-[-.2rem] opacity-80"
                src="/icons/discovery.svg"
                alt=""
              />
              <h3 className="text-lg text-[#b4b4b4] mt-1 font-bold">
                Discovery
              </h3>
            </motion.div>
            <motion.p
              style={{ y: paraY, opacity: clusterOpacity }}
              className="w-50 pt-3 panel-para leading-6 opacity-85"
            >
              Defining project goals, user personas, and technical requirements.
            </motion.p>
          </div>
          {/* Development Panel */}
          <div className="translate-x-35 -translate-y-3 mt-3">
            <motion.div style={{ y: clusterY, opacity: clusterOpacity }}>
              <img
                className="w-9 translate-x-44"
                src="/icons/panel-code.svg"
                alt=""
              />
              <h3 className="text-lg text-[#b4b4b4] text-center -translate-x-27 font-bold">
                Development
              </h3>
            </motion.div>
            <motion.p
              style={{ y: paraY, opacity: clusterOpacity }}
              className="w-45 pt-3 panel-para leading-6 text-end translate-x-8 opacity-85"
            >
              Writing clean, scalable code and architectural implementation.
            </motion.p>
          </div>
          {/* Deployment Panel */}
          <div className="translate-x-[-.5rem] -translate-y-15">
            <motion.div style={{ y: clusterY, opacity: clusterOpacity }}>
              <img
                className="w-7 ml-[-.2rem] pb-2 opacity-80"
                src="/icons/bolt.svg"
                alt=""
              />
              <h3 className="text-lg text-[#b4b4b4] font-bold">Deployment</h3>
            </motion.div>
            <motion.p
              style={{ y: paraY, opacity: clusterOpacity }}
              className="w-50 pt-3 panel-para leading-6 opacity-85"
            >
              Cloud delivery, server monitoring, and continuous maintenance.
            </motion.p>
          </div>
        </motion.div>
        {/* </FadeSection> */}
      </div>
    </motion.div>
  );
}
