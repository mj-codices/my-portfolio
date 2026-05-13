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
     Scroll Progress Values
     - Main section progress drives most animations
  --------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"], // section enters → mid viewport
  });

  /* ---------------------------------------------
     Mission Statement Animation
     - Subtle upward compression of the divider line
  --------------------------------------------- */

  const pushUpRaw = useTransform(scrollYProgress, [0, 1], [80, 40]);
  const pushUp = useSpring(pushUpRaw, {
    stiffness: 90,
    damping: 22,
  });

  const missionScaleRaw = useTransform(scrollYProgress, [0, 0.4], [0.97, 1]);

  const missionScale = useSpring(missionScaleRaw, {
    stiffness: 90,
    damping: 22,
  });

  /* ---------------------------------------------
     About Section Animations
     - Heading rises into place
     - Paragraphs stagger in with delayed motion
  --------------------------------------------- */
  const headingYRaw = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const headingY = useSpring(headingYRaw, {
    stiffness: 90,
    damping: 22,
  });

  const p1YRaw = useTransform(scrollYProgress, [0.3, 1], [100, 0]); // delayed start
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
const p2YRaw = useTransform(scrollYProgress, [0.4, 1], [85, 0]);
  const p2Y = useSpring(p2YRaw, {
    stiffness: 90, // Match P1 stiffness
    damping: 22, // Match P1 damping
  });

  const launchRaw = useTransform(scrollYProgress, [0.3, 0.5], [0, -80]); // Reduced distance for a subtler push

  const launchY = useSpring(launchRaw, {
    stiffness: 130, // Much lower tension for a "gentle" feel
    damping: 45, // Higher damping ratio to prevent any bouncy "boing"
    mass: 0.4, // Standard weight gives it a natural sense of inertia
    restDelta: 0.001, // More precision for a silky smooth stop
  });

  return (
    <section ref={ref} className="w-[100vw] bg-black-90 px-50 text-5xl mb-60">
      {/* Mission statement (top of section) */}
      <motion.div style={{ y: launchY }}>
        <FadeSection mode="in-only">
          <MissionStatement missionScale={missionScale} pushUp={pushUp} />
        </FadeSection>
        {/* Main content row: text + process diagram */}
        <div className="flex row">
          {/* Left: About text with staggered scroll animations */}
          <FadeSection>
            <AboutText
              p1Y={p1Y}
              p2Y={p2Y}
              headingY={headingY}
              p1Ref={p1Ref}
              p1Opacity={p1Opacity}
            />
          </FadeSection>

          {/* Right: Visual process diagram with floating elements */}
          <div className="flex-shrink-0">
            {/* <ProcessDiagram
            circleY1={circleY1}
            circleY2={circleY2}
            headingY={headingY}
          /> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
