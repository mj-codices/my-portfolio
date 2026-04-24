import { useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { FadeSection } from "../wrappers/FadeSection";
import MissionStatement from "./missionStatement/MissionStatement";
import AboutText from "./AboutText";
import ProcessDiagram from "./processDiagram/ProcessDiagram";

export default function Mission() {
  /* ---------------------------------------------
     Scroll References
     - `ref` tracks the entire Mission section
     - `p2Ref` tracks the second paragraph for more precise timing
  --------------------------------------------- */
  const ref = useRef(null);
  const p2Ref = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------
     Scroll Progress Values
     - Main section progress drives most animations
     - Secondary progress allows fine control of p2 timing
  --------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"], // section enters → mid viewport
  });

  const { scrollYProgress: p2Progress } = useScroll({
    target: p2Ref,
    offset: ["start 100%", "start 90%"], // tighter trigger for paragraph 2
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
  const p2YRaw = useTransform(p2Progress, [0.35, 0.75], [15, 0]);
  const p2Y = useSpring(p2YRaw, {
    stiffness: 90,
    damping: 22,
  });

  /* ---------------------------------------------
     Process Diagram Animations
     - Floating circles drift upward into position
  --------------------------------------------- */
  const circleY1 = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const circleY2 = useTransform(scrollYProgress, [0.1, 1], [-30, 0]);

  return (
    <section ref={ref} className="w-[100vw] bg-black-90 px-50 text-5xl mb-60">
      {/* Mission statement (top of section) */}
      <FadeSection>
        <MissionStatement pushUp={pushUp} />
      </FadeSection>

      {/* Main content row: text + process diagram */}
      <div className="flex row">
        {/* Left: About text with staggered scroll animations */}
        <AboutText p1Y={p1Y} p2Y={p2Y} headingY={headingY} p2Ref={p2Ref} />

        {/* Right: Visual process diagram with floating elements */}
        <div className="flex-shrink-0">
          <ProcessDiagram circleY1={circleY1} circleY2={circleY2} />
        </div>
      </div>
    </section>
  );
}
