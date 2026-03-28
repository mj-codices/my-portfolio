import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeSection } from "../wrappers/FadeSection";
import MissionStatement from "./MissionStatement";
import AboutText from "./AboutText";import ProcessDiagram from "./ProcessDiagram";

export default function Mission() {
  const ref = useRef(null);

  const p2Ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"],
  });

  const { scrollYProgress: p2Progress } = useScroll({
    target: p2Ref,
    offset: ["start 100%", "start 90%"],
  });

  const pushUp = useTransform(scrollYProgress, [0, 1], [100, 60]);

  const headingY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const p1Y = useTransform(scrollYProgress, [0.55, 1], [80, 0]);

  const p2Y = useTransform(p2Progress, [0.25, 1], [6, 0]);

  const circleY1 = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  const circleY2 = useTransform(scrollYProgress, [0.1, 1], [-60, 0]);

  return (
    <section ref={ref} className="w-[100vw] bg-black-90 px-50 text-5xl mb-60">
      <FadeSection>
        <MissionStatement pushUp={pushUp} />
      </FadeSection>
      <div className="flex row">
        <AboutText p1Y={p1Y} p2Y={p2Y} p2Ref={p2Ref} headingY={headingY} />
        <ProcessDiagram
          headingY={headingY}
          circleY1={circleY1}
          circleY2={circleY2}
        />
      </div>
    </section>
  );
}
