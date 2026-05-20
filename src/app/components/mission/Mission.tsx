import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef } from "react";
import { FadeSection } from "../wrappers/FadeSection";
import MissionStatement from "./missionStatement/MissionStatement";
import AboutText from "./AboutText";
import ProcessDiagram from "./processDiagram/ProcessDiagram";

export default function Mission() {
  /* ---------------------------------------------
     Scroll References
     - `ref` tracks the entire Mission section
  --------------------------------------------- */
  const ref = useRef(null);

  /* ---------------------------------------------
     1. Entrance Timeline (Your current hook)
     - Reaches 1.0 when the section hits the upper-mid viewport
  --------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"],
  });

  /* ---------------------------------------------
     2. Dedicated Exit Timeline (The Fix)
     - Tracks the section leaving the top of the viewport
     - 0.0 means the section is fully in view.
     - 1.0 means the bottom of the section is passing the top of the screen.
  --------------------------------------------- */
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  /* ---------------------------------------------
     Mission Statement Animation
     - Subtle upward compression of the divider line
  --------------------------------------------- */

  const pushUpRaw = useTransform(scrollYProgress, [0, 1], [120, 60]);
  const pushUp = useSpring(pushUpRaw, {
    stiffness: 140,
    damping: 55,
  });

  const missionScaleRaw = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const missionScale = useSpring(missionScaleRaw, {
    stiffness: 120,
    damping: 22,
  });

  /* ---------------------------------------------
     About Section Animations
     - Heading rises into place
     - Paragraphs stagger in with delayed motion
  --------------------------------------------- */
  const headingYRaw = useTransform(scrollYProgress, [0, 0.9], [90, 0]);
  const headingY = useSpring(headingYRaw, {
    stiffness: 90,
    damping: 22,
  });

  const p1YRaw = useTransform(scrollYProgress, [0.2, 0.9], [115, 0]); // delayed start
  const p1Y = useSpring(p1YRaw, {
    stiffness: 90,
    damping: 22,
  });

  const p1Ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: p1Progress } = useScroll({
    target: p1Ref,
    offset: ["start 100%", "start 50%"],
  });

  const p1OpacityRaw = useTransform(p1Progress, [0.02, 0.4], [0, 1]);
  const p1Opacity = useSpring(p1OpacityRaw, {
    stiffness: 90,
    damping: 22,
  });

  // Start moving immediately (0) and finish mid-scroll (0.5)
  const p2YRaw = useTransform(scrollYProgress, [0.3, 0.9], [195, 0]);
  const p2Y = useSpring(p2YRaw, {
    stiffness: 80, // Match P1 stiffness
    damping: 28, // Match P1 damping
    mass: 0.85,
  });

  const launchRaw = useTransform(scrollYProgress, [0.3, 0.8], [0, -120]); // Reduced distance for a subtler push

  const launchY = useSpring(launchRaw, {
    stiffness: 140, // Much lower tension for a "gentle" feel
    damping: 28, // Higher damping ratio to prevent any bouncy "boing"
    mass: 0.45, // Standard weight gives it a natural sense of inertia
    restDelta: 0.001, // More precision for a silky smooth stop
  });

  /* ---------------------------------------------
     Dedicated Exit Launch Hook
     - Sits completely idle at 0 until the section is almost gone
     - Snaps up by 50px right at the finish line
  --------------------------------------------- */
  const exitLaunchRaw = useTransform(
    exitProgress,
    [0.0, 0.25, 1.0],
    [0, 0, -75]
  );

  const exitLaunchY = useSpring(exitLaunchRaw, {
    stiffness: 100, // Snappy kick out
    damping: 22,
    mass: 1.5,
  });

  /* ---------------------------------------------
     Dedicated Exit Opacity Hook
     - Matches exitProgress timeline perfectly
     - Stays fully visible (1) until 0.45 progress
     - Fades completely out (0) as the component launches away
  --------------------------------------------- */
  const exitOpacityRaw = useTransform(
    exitProgress,
    [0.0, 1.0],
    [1, 0.2] // Fully visible -> Starts fading -> Completely gone
  );

  const exitOpacity = useSpring(exitOpacityRaw, {
    stiffness: 180, // Matches the snappy spring of your launch
    damping: 22, // Smoothly kills the animation energy at the end
  });

  return (
    <section
      ref={ref}
      className="flex w-[100vw] bg-black-90 px-50 text-5xl mb-60"
    >
      {/* Mission statement (top of section) */}
      <motion.div style={{ y: exitLaunchY, opacity: exitOpacity }}>
        <motion.div style={{ y: launchY }}>
          <FadeSection mode="in-only">
            <MissionStatement missionScale={missionScale} pushUp={pushUp} />
          </FadeSection>
          {/* Main content row: text + process diagram */}
          <motion.div className="flex row" style={{ y: exitLaunchY }}>
            {/* Left: About text with staggered scroll animations */}

            <AboutText
              p1Y={p1Y}
              p2Y={p2Y}
              headingY={headingY}
              p1Ref={p1Ref}
              p1Opacity={p1Opacity}
            />

            {/* Right: Visual process diagram with floating elements */}
            <div className="flex-shrink-0">
              <ProcessDiagram scrollYProgress={scrollYProgress} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
