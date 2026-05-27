import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef } from "react";
import { FadeSection } from "../wrappers/FadeSection";
import MissionStatement from "./missionStatement/MissionStatement";
import AboutText from "./AboutText";
import ProcessDiagram from "./processDiagram/ProcessDiagram";

/**
 * Mission Section Master Orchestrator Component
 * * Acts as the centralized timeline matrix for the Mission and Process zones.
 * Tracks structural viewports via decoupled intersection observers to map simultaneous
 * entrance acceleration tracking vectors, micro-staggers, and high-velocity kinetic exit launches.
 */
export default function Mission() {
  /* ----------------------------------------------------------------
     SCROLL OBSERVER DOM PROXIES
     ---------------------------------------------------------------- */
  const ref = useRef<HTMLDivElement | null>(null);
  const p1Ref = useRef<HTMLDivElement | null>(null);

  /* Entrance Timeline Tracker
     0.0 -> Container top crosses the lower viewport threshold (90%)
     1.0 -> Container top ascends to upper viewport limits (20%)
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"],
  });

  /* Dedicated Exit Timeline Tracker
     0.0 -> Container top perfectly aligns with viewport top (start start)
     1.0 -> Container bottom completely clears viewport top bounds (end start)
  */
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Paragraph Focus Tracker
     Scopes custom intersection properties directly to body narrative positions.
  */
  const { scrollYProgress: p1Progress } = useScroll({
    target: p1Ref,
    offset: ["start 100%", "start 50%"],
  });

  /* ----------------------------------------------------------------
     MISSION STATEMENT SPRING SYSTEM (ENTRANCE)
     ---------------------------------------------------------------- */
  const pushUpRaw = useTransform(scrollYProgress, [0, 1], [120, 60]);
  const pushUp = useSpring(pushUpRaw, { stiffness: 140, damping: 55 });

  const missionScaleRaw = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const missionScale = useSpring(missionScaleRaw, {
    stiffness: 120,
    damping: 22,
  });

  /* ----------------------------------------------------------------
     NARRATIVE & ACCENT SWEEP SYSTEMS (ENTRANCE)
     ---------------------------------------------------------------- */
  const headingYRaw = useTransform(scrollYProgress, [0, 0.9], [90, 0]);
  const headingY = useSpring(headingYRaw, { stiffness: 90, damping: 22 });

  const p1YRaw = useTransform(scrollYProgress, [0.2, 0.9], [115, 0]);
  const p1Y = useSpring(p1YRaw, { stiffness: 90, damping: 22 });

  const p1OpacityRaw = useTransform(p1Progress, [0.02, 0.4], [0, 1]);
  const p1Opacity = useSpring(p1OpacityRaw, { stiffness: 90, damping: 22 });

  const p2YRaw = useTransform(scrollYProgress, [0.3, 0.9], [170, 0]);
  const p2Y = useSpring(p2YRaw, { stiffness: 80, damping: 28, mass: 0.85 });

  /* ----------------------------------------------------------------
     KINETIC EXIT VEHICLE SPRING DRIVERS (EXIT TIMELINE)
     ---------------------------------------------------------------- */

  /* Macro Scroll Exit Launch
     Gradually offsets elements as page depth accelerates (0px -> -120px)
  */
  const launchRaw = useTransform(scrollYProgress, [0.3, 0.8], [0, -120]);
  const launchY = useSpring(launchRaw, {
    stiffness: 140,
    damping: 28,
    mass: 0.45,
    restDelta: 0.001,
  });

  /* High-Velocity Section Terminal Exit Kick
     Remains perfectly flat at 0px until 25% exit track, then violently 
     snaps items upward by -75px at the edge of the viewport boundary.
  */
  const exitLaunchRaw = useTransform(
    exitProgress,
    [0.0, 0.25, 1.0],
    [0, 0, -75]
  );
  const exitLaunchY = useSpring(exitLaunchRaw, {
    stiffness: 100,
    damping: 22,
    mass: 1.5,
  });

  /* Linear Section Alpha Dissolve
     Fades visual components from solid opaque (1.0) down to a deep background 
     presence (0.2) uniformly as the exit track progresses to preserve GPU resources.
  */
  const exitOpacityRaw = useTransform(exitProgress, [0.0, 1.0], [1, 0.2]);
  const exitOpacity = useSpring(exitOpacityRaw, {
    stiffness: 180,
    damping: 22,
  });

  return (
    <section
      ref={ref}
      className="flex w-[100vw] bg-black-90 px-50 text-5xl mb-60"
    >
      {/* SECTION EXIT FIELD DECAY CONTAINER */}
      <motion.div style={{ opacity: exitOpacity }} className="w-full">
        {/* ENTRANCE/EXIT ACCELERATION WRAPPER */}
        <motion.div style={{ y: launchY }} className="w-full">
          {/* TOP TIER: Core Statement Visual Module */}
          <FadeSection mode="in-only">
            <MissionStatement missionScale={missionScale} pushUp={pushUp} />
          </FadeSection>

          {/* LOWER TIER: Narrative Row & Process Diagram Data Stack
              Employs independent exitLaunchY parameters to bypass parent transform scaling.
          */}
          <motion.div className="flex row w-full" style={{ y: exitLaunchY }}>
            {/* LEFT COLUMN: Narrative Data Layer */}
            <AboutText
              p1Y={p1Y}
              p2Y={p2Y}
              headingY={headingY}
              p1Ref={p1Ref}
              p1Opacity={p1Opacity}
            />

            {/* RIGHT COLUMN: Visual Architecture Track Diagram */}
            <div className="flex-shrink-0">
              <ProcessDiagram scrollYProgress={scrollYProgress} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
