import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import "./ProcessDiagram.css";

interface ProcessDiagramProps {
  /** Global root scroll tracking context used to coordinate macro viewport interactions */
  scrollYProgress: MotionValue<number>;
}

/**
 * ProcessDiagram Component
 * * A viewport-isolated progress sequence illustrating project delivery pipelines.
 * Creates an intersection-observer proxy using local element offsets to decouple
 * stagger effects, panel sweeps, and asymmetrical background parallax circles from the root page timeline.
 */
export default function ProcessDiagram({
  scrollYProgress,
}: ProcessDiagramProps) {
  const diagramRef = useRef<HTMLDivElement | null>(null);

  /* ----------------------------------------------------------------
     VIEWPORT ELEMENT SCROLL INTERSECTION
     Calculates intersection boundaries natively scoped to this element wrapper.
     ["start end", "end start"] -> Triggers when the top of the container hits the bottom of screen,
     completing when the bottom of the container fully exits the top of screen.
  ---------------------------------------------------------------- */
  const { scrollYProgress: diagramProgress } = useScroll({
    target: diagramRef,
    offset: ["start end", "end start"],
  });

  /* --- HEADER TRANSLATION TIMELINE --- */
  const headingPYRaw = useTransform(scrollYProgress, [0.3, 0.9], [70, 0]);
  const headingPY = useSpring(headingPYRaw, {
    stiffness: 90,
    damping: 42,
  });

  /* --- PANEL ENTRY VERTICAL SWEEPS --- */
  const clusterYRaw = useTransform(diagramProgress, [0.03, 0.3], [60, 0]);
  const clusterY = useSpring(clusterYRaw, {
    stiffness: 75,
    damping: 28,
  });

  const paraYRaw = useTransform(diagramProgress, [0.07, 0.3], [77, 0]);
  const paraY = useSpring(paraYRaw, {
    stiffness: 80,
    damping: 26, // Damped for a softer, trailing gravity settle effect
    mass: 0.7, // Lightened body allows rapid layout acceleration curves
  });

  /* ----------------------------------------------------------------
     ASYMMETRICAL BACKGROUND DEPTH TRACKING
     ---------------------------------------------------------------- */

  /* Circle 1 Y-Motion Tracking
     - Entrance: 0.00 -> 0.05 (Interpolates upward from 100px offset to resting 0 position)
     - Plateau:  0.05 -> 0.45 (Locks securely at 0 position while typography sits center-viewport)
     - Exit:     0.45 -> 1.00 (Exits downward from 0px to 160px deep travel)
  */
  const circle1YRaw = useTransform(
    diagramProgress,
    [0, 0.05, 0.45, 1],
    [100, 0, 0, 160]
  );
  const circle1Y = useSpring(circle1YRaw, {
    stiffness: 90,
    damping: 42,
  });

  /* Circle 2 Y-Motion Tracking
     - Staggers directly in line with Circle 1's timeline framework, but maps 
       a lower exit path (100px) to establish a trailing depth separation.
  */
  const circle2YRaw = useTransform(
    diagramProgress,
    [0, 0.05, 0.45, 1],
    [100, 0, 0, 100]
  );
  const circle2Y = useSpring(circle2YRaw, {
    stiffness: 90,
    damping: 42,
  });

  /* Panel Element Opacity Mapping
     - Tracks smoothly across the initial entry cluster range (0.03 -> 0.3)
  */
  const clusterOpacityRaw = useTransform(diagramProgress, [0.03, 0.3], [0, 1]);
  const clusterOpacity = useSpring(clusterOpacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  /* Circle 1 Opacity Ramp
     - Entry: Fades from 0 to 0.3 quickly (0.05 -> 0.20)
     - Core Peak: Increases to maximum visibility of 0.6 mid-read (0.20 -> 0.75)
     - Exit Fade: Relaxes down to 0.2 background presence as section clears (0.75 -> 0.95)
  */
  const circle1OpacityRaw = useTransform(
    diagramProgress,
    [0.05, 0.2, 0.75, 0.95],
    [0, 0.3, 0.6, 0.2]
  );
  const circle1Opacity = useSpring(circle1OpacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  /* Circle 2 Opacity Ramp
     - Intentionally offset by +3% scroll runtime frames behind Circle 1 to mask active transitions
  */
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
      {/* ===========================================================
          BACKGROUND GRAPHICS MATRIX (LOWEST Z-INDEX)
          =========================================================== */}
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

      {/* ===========================================================
          FOREGROUND LAYOUT GRID CONTAINMENT
          =========================================================== */}
      <div className="absolute inset-0 z-15">
        {/* HEADER SECTION TIER */}
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

        {/* CONTENT LAYOUT WRAPPER */}
        <div>
          {/* Decorative Dotted Connector Graphic Track */}
          <motion.div style={{ y: paraY, opacity: clusterOpacity }}>
            <img
              className="absolute w-48 translate-x-17 translate-y-44"
              src="/decorations/dotted.svg"
              alt=""
            />
          </motion.div>

          {/* PROCESS STEP: Discovery */}
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

          {/* PROCESS STEP: Development */}
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

          {/* PROCESS STEP: Deployment */}
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
        </div>
      </div>
    </motion.div>
  );
}
