import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import "./ProcessDiagram.css";
import { useIsDesk } from "@/hooks/useIsDesk";

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

  /* --- HEADER TRANSLATION TIMELINE ---
     Desktop: the diagram sits beside My Story, so the heading rides the Mission
     section's entrance. Stacked (below `desk`): the diagram is far below the
     section top, so it follows its own viewport position and lands just ahead
     of the steps (which settle at 0.35).
  */
  const isDesk = useIsDesk();
  const headingPYRaw = useTransform(
    isDesk ? scrollYProgress : diagramProgress,
    isDesk ? [0.15, 1] : [0, 0.25],
    [60, 0]
  );
  const headingPY = useSpring(headingPYRaw, {
    stiffness: 90,
    damping: 42,
  });

  /* --- PROCESS DIAGRAM: KINETIC GAP-CLOSING ENGINE --- */

  // Cluster: Enters later, travels a shorter distance, and locks in tightly
  const clusterYRaw = useTransform(diagramProgress, [0, 0.35], [60, 0]);
  const clusterY = useSpring(clusterYRaw, {
    stiffness: 100, // Crisper snap to grid
    damping: 24,
  });

  // Paragraph: Enters slightly earlier, but shares the exact same 0.3 finish line.
  // Traveling 90px over this window forces it to move faster than the cluster,
  // creating the visual "catch-up" illusion that collapses the structural gap.
  const paraYRaw = useTransform(diagramProgress, [0, 0.35], [85, 0]);
  const paraY = useSpring(paraYRaw, {
    stiffness: 75, // Slightly softer stiffness allows the trailing absorption look
    damping: 25, // Prevents harsh oscillating bounces
    mass: 0.8,
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
  const clusterOpacityRaw = useTransform(diagramProgress, [0, 0.35], [0, 1]);
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
    /* LAYOUT MODES
       - Phones + tablets (base, sm:): vertical timeline in the page's left gutter —
         icon + title rows joined by a dashed rail. Tablets scale up type and spacing
         and cap the width to the My Story paragraph measure (max-w-xl).
       - Desktop (desk:): the original zig-zag diagram pinned beside My Story.
    */
    <motion.div
      ref={diagramRef}
      className="relative w-full mt-16 pb-6 sm:mt-20 sm:max-w-xl desk:w-[520px] desk:max-w-none desk:mt-0 desk:pb-0 desk:top-40"
    >
      {/* ===========================================================
          BACKGROUND GRAPHICS MATRIX (LOWEST Z-INDEX)
          Timeline layouts: tucked behind the timeline's right and left edges.
          =========================================================== */}
      <motion.div
        id="mission-circle-1"
        className="absolute top-25 -right-10 sm:-right-16 desk:right-26 w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] desk:w-[145px] desk:h-[145px] rounded-full bg-[#ff6f61] z-0 blur-md"
        style={{ opacity: circle1Opacity, y: circle1Y }}
      />

      <motion.div
        id="mission-circle-2"
        className="absolute -left-14 sm:-left-20 top-72 sm:top-80 desk:top-auto desk:left-auto desk:right-5 desk:mt-26 desk:-translate-x-115 w-[100px] h-[95px] sm:w-[115px] sm:h-[110px] desk:w-[130px] desk:h-[123px] rounded-full 
                   bg-gradient-to-br from-[#ff5757] to-[#9e005d] opacity-60 z-0 blur-sm"
        style={{ opacity: circle2Opacity, y: circle2Y }}
      />

      {/* ===========================================================
          FOREGROUND LAYOUT GRID CONTAINMENT
          In normal flow below `desk` so the stacked section gets a real height;
          an absolute overlay at `desk` (the original side-column layout).
          =========================================================== */}
      <div className="relative desk:absolute desk:inset-0 z-15">
        {/* HEADER SECTION TIER */}
        <motion.div
          className="relative flex items-center desk:items-stretch desk:-translate-x-15 desk:mt-[-4rem]"
          style={{ y: headingPY }}
        >
          <h2 className="desk:pt-8 desk:ml-13 mr-4 desk:mr-8 uppercase text-3xl font-bold tracking-[.25rem] opacity-80 text-[#ffff]">
            <span className="text-[#a3a2a2]">my</span> process
          </h2>
          <span className="desk:top-[1.1rem] inline-flex overflow-hidden w-16 desk:w-40 relative">
            <Image
              className="w-6 opacity-80 chev chev-1 h-auto"
              src="/decorations/chevron.svg"
              width={45}
              height={45}
              alt=""
            />
            <Image
              className="w-6 opacity-80 chev chev-2 h-auto"
              src="/decorations/chevron.svg"
              width={45}
              height={45}
              alt=""
            />
            <Image
              className="w-6 opacity-80 chev chev-3 h-auto"
              src="/decorations/chevron.svg"
              width={45}
              height={45}
              alt=""
            />
          </span>
        </motion.div>

        {/* CONTENT LAYOUT WRAPPER */}
        <div>
          {/* Decorative Dotted Connector Graphic Track (desktop zig-zag only) */}
          <motion.div style={{ y: paraY, opacity: clusterOpacity }}>
            <Image
              className="hidden desk:block absolute w-48 translate-x-17 translate-y-44 h-auto"
              src="/decorations/dotted.svg"
              width={45}
              height={45}
              alt=""
            />
          </motion.div>

          {/* PROCESS STEP: Discovery */}
          <div className="relative pb-10 sm:pb-12 desk:pb-0 mt-10 sm:mt-12 desk:mt-6 desk:-translate-x-11 desk:translate-y-7">
            <TimelineRail opacity={clusterOpacity} />
            <motion.div
              style={{ y: clusterY, opacity: clusterOpacity }}
              className="flex items-center gap-4 desk:block"
            >
              <Image
                className="w-8 shrink-0 desk:ml-[-.2rem] opacity-80 h-auto"
                src="/icons/discovery.svg"
                width={45}
                height={45}
                alt=""
              />
              <h3 className={`${stepTitle} desk:mt-1`}>Discovery</h3>
            </motion.div>
            <motion.p
              style={{ y: paraY, opacity: clusterOpacity }}
              className={`${stepBody} desk:w-50`}
            >
              Defining project goals, user personas, and technical requirements.
            </motion.p>
          </div>

          {/* PROCESS STEP: Development */}
          <div className="relative pb-10 sm:pb-12 desk:pb-0 desk:mt-3 desk:translate-x-35 desk:-translate-y-3">
            <TimelineRail opacity={clusterOpacity} />
            <motion.div
              style={{ y: clusterY, opacity: clusterOpacity }}
              className="flex items-center gap-4 desk:block"
            >
              <Image
                className="w-8 desk:w-9 shrink-0 desk:translate-x-44 h-auto"
                src="/icons/panel-code.svg"
                width={45}
                height={45}
                alt=""
              />
              <h3
                className={`${stepTitle} desk:text-center desk:-translate-x-27`}
              >
                Development
              </h3>
            </motion.div>
            <motion.p
              style={{ y: paraY, opacity: clusterOpacity }}
              className={`${stepBody} desk:w-45 desk:text-end desk:translate-x-8`}
            >
              Writing clean, scalable code and architectural implementation.
            </motion.p>
          </div>

          {/* PROCESS STEP: Deployment */}
          <div className="relative desk:translate-x-[-.5rem] desk:-translate-y-15">
            <motion.div
              style={{ y: clusterY, opacity: clusterOpacity }}
              className="flex items-center gap-4 desk:block"
            >
              <Image
                className="w-7 mx-0.5 desk:mr-0 shrink-0 desk:ml-[-.2rem] desk:pb-2 opacity-80 h-auto"
                src="/icons/bolt.svg"
                width={45}
                height={45}
                alt=""
              />
              <h3 className={stepTitle}>Deployment</h3>
            </motion.div>
            <motion.p
              style={{ y: paraY, opacity: clusterOpacity }}
              className={`${stepBody} desk:w-50`}
            >
              Cloud delivery, server monitoring, and continuous maintenance.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Shared step typography. Titles and descriptions step up on tablets to match
   the My Story paragraphs (sm:text-lg); desktop keeps the original 18px / 15px.
   Descriptions are indented past the 32px icon column (pl-12) to sit under the title. */
const stepTitle = "text-lg sm:text-xl desk:text-lg text-[#b4b4b4] font-bold";
const stepBody =
  "pl-12 desk:pl-0 pt-1 sm:pt-2 desk:pt-3 text-[15px] sm:text-[17px] desk:text-[15px] leading-6 sm:leading-7 desk:leading-6 opacity-85";

/**
 * TimelineRail (phones + tablets)
 * Dashed segment running from beneath a step's icon down to the next step's
 * icon — the vertical stand-in for the zig-zag's dotted connector. Centered on
 * the 32px (w-8) icon column. Shares the steps' fade so the rail draws in with them.
 */
function TimelineRail({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className="desk:hidden absolute left-4 top-11 bottom-3 border-l border-dashed border-[#b4b4b4]/35"
    />
  );
}
