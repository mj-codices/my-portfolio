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

  const p1Ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: p1Progress } = useScroll({
    target: p1Ref,
    offset: ["start 100%", "start 85%"],
  });

  const p1OpacityRaw = useTransform(p1Progress, [0.2, 0.9], [0, 1]);
  const p1Opacity = useSpring(p1OpacityRaw, {
    stiffness: 90,
    damping: 22,
  });
  const p2OpacityRaw = useTransform(p2Progress, [0.3, 0.6], [0, 1]);
  const p2Opacity = useSpring(p2OpacityRaw, {
    stiffness: 90,
    damping: 22,
  });
  return (
    <section ref={ref} className="w-[100vw] bg-black-90 px-50 text-5xl mb-60">
      {/* Mission statement (top of section) */}
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
            p2Ref={p2Ref}
            p1Opacity={p1Opacity}
            p2Opacity={p2Opacity}
          />
        </FadeSection>

        {/* Right: Visual process diagram with floating elements */}
        <div className="flex-shrink-0">
          <ProcessDiagram
            circleY1={circleY1}
            circleY2={circleY2}
            headingY={headingY}
          />
        </div>
      </div>
    </section>
  );
}
