import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeSection } from "../wrappers/FadeSection";
import MissionStatement from "./MissionStatement";
import AboutText from "./AboutText";
import ProcessDiagram from "./ProcessDiagram";

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
  const pushUp = useTransform(scrollYProgress, [0, 1], [100, 60]);

  /* ---------------------------------------------
     About Section Animations
     - Heading rises into place
     - Paragraphs stagger in with delayed motion
  --------------------------------------------- */
  const headingY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const p1Y = useTransform(scrollYProgress, [0.55, 1], [80, 0]); // delayed start
  const p2Y = useTransform(p2Progress, [0.25, 1], [6, 0]); // tighter, more subtle motion

  /* ---------------------------------------------
     Process Diagram Animations
     - Floating circles drift upward into position
  --------------------------------------------- */
  const circleY1 = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const circleY2 = useTransform(scrollYProgress, [0.1, 1], [-60, 0]);

  return (
    <section ref={ref} className="w-[100vw] bg-black-90 px-50 text-5xl mb-60">
      {/* Mission statement (top of section) */}
      <FadeSection>
        <MissionStatement pushUp={pushUp} />
      </FadeSection>

      {/* Main content row: text + process diagram */}
      <div className="flex row">
        {/* Left: About text with staggered scroll animations */}
        <AboutText p1Y={p1Y} p2Y={p2Y} p2Ref={p2Ref} headingY={headingY} />

        {/* Right: Visual process diagram with floating elements */}
        <ProcessDiagram
          headingY={headingY}
          circleY1={circleY1}
          circleY2={circleY2}
        />
      </div>
    </section>
  );
}
