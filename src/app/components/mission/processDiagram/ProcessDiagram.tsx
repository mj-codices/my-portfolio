import { motion, MotionValue } from "framer-motion";
import { FadeSection } from "../../wrappers/FadeSection";
import "./ProcessDiagram.css";

type ProcessDiagramProps = {
  headingY: MotionValue<number>;
  circleY1: MotionValue<number>;
  circleY2: MotionValue<number>;
};

export default function ProcessDiagram({
  headingY,
  circleY1,
  circleY2,
}: ProcessDiagramProps) {
  return (
    <motion.div
      className="relative w-[520px] right-[-1rem] top-50"
      style={{ y: headingY }}
    >
      {/* ==========================
          BACKGROUND CIRCLES
      ========================== */}
      <motion.div
        id="mission-circle-1"
        className="absolute top-10 right-8 w-[145px] h-[145px] rounded-full bg-[#ff5757] opacity-60 z-0"
        style={{ y: circleY1 }}
      />
      <motion.div
        id="mission-circle-2"
        className="absolute top-[-3rem] right-20 -translate-x-95 w-[123px] h-[123px] rounded-full 
                   bg-gradient-to-br from-[#ff5757] to-[#9e005d] opacity-60 z-0"
        style={{ y: circleY2 }}
      />
      <motion.div
        id="mission-circle-3"
        className="absolute top-78 right-57 w-[60px] h-[60px] rounded-full 
                   bg-gradient-to-br from-[#000000] to-[#545454] z-15"
      />

      {/* ==========================
          HEADING AND CHEVRONS
      ========================== */}
      <div className="absolute inset-0 z-15">
        <FadeSection>
          <div className="relative flex -translate-x-15">
            <h2 className="pt-8 ml-4 mr-3 uppercase text-3xl font-bold tracking-wider">
              <span className="text-[#858383]">my</span> process
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
          </div>

          {/* ==========================
              PROCESS PANELS
          ========================== */}
          <div>
            <img
              className="absolute w-30 translate-x-37 translate-y-18"
              src="/decorations/dotted.svg"
              alt=""
            />

            {/* Discovery Panel */}
            <div className="-translate-x-11 mt-3">
              <img
                className="w-6 ml-[-.2rem] opacity-80"
                src="/icons/discovery.svg"
                alt=""
              />
              <h3 className="text-base text-white">Discovery</h3>
              <p className="w-50 pt-1 panel-para leading-4">
                Defining project goals, user personas, and technical
                requirements.
              </p>
            </div>

            {/* Development Panel */}
            <div className="translate-x-30 -translate-y-14 mt-3">
              <img
                className="w-6 translate-x-43"
                src="/icons/panel-code.svg"
                alt=""
              />
              <h3 className="text-base text-white text-center -translate-x-16">
                Development
              </h3>
              <p className="w-30 pt-1 panel-para leading-4 text-end translate-x-20">
                Writing clean, scalable code and architectural implementation.
              </p>
            </div>

            {/* Deployment Panel */}
            <div className="translate-x-31 -translate-y-18 mt-3">
              <img
                className="w-5 ml-[-.2rem] pb-2 opacity-80"
                src="/icons/bolt.svg"
                alt=""
              />
              <h3 className="text-base text-white">Deployment</h3>
              <p className="w-50 pt-1 panel-para leading-4">
                Cloud delivery, server monitoring, and continuous maintenance.
              </p>
            </div>
          </div>
        </FadeSection>
      </div>

      {/* ==========================
          GLASS PANEL SVG
      ========================== */}
      <svg
        viewBox="0 0 601 469"
        className="w-full h-auto relative z-10 right-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clip path for backdrop blur */}
          <clipPath id="glass-clip">
            <path
              d="M283.586 468.811 C266.007 468.805 251.762 453.478 251.769 434.579 
                     L251.775 352.067 L253.048 276.962 C253.516 267.654 250.393 265.542 240.162 266.063 
                     L38.5677 265.989 C23.4662 265.983 -0.00831798 246.885 2.21112e-06 223.977 
                     L0.0676558 41.4664 C0.076025 18.5579 17.3565 -0.00756045 38.6648 2.30973e-06 
                     L561.459 0.190996 C582.767 0.199024 600.035 18.7771 600.027 41.6856 
                     L599.959 224.196 C599.958 226.681 599.752 229.115 599.362 231.479 
                     C599.749 233.615 599.955 235.822 599.954 238.08 L599.882 434.706 
                     C599.875 453.606 585.618 468.922 568.039 468.915 L283.586 468.811 Z"
            />
          </clipPath>
        </defs>

        <g clipPath="url(#glass-clip)">
          <foreignObject x="0" y="0" width="601" height="469">
            <div className="w-full h-full backdrop-blur-lg" />
          </foreignObject>
        </g>

        {/* Stroke & subtle fill */}
        <path
          d="M283.586 468.811 C266.007 468.805 251.762 453.478 251.769 434.579 
             L251.775 352.067 L253.048 276.962 C253.516 267.654 250.393 265.542 240.162 266.063 
             L38.5677 265.989 C23.4662 265.983 -0.00831798 246.885 2.21112e-06 223.977 
             L0.0676558 41.4664 C0.076025 18.5579 17.3565 -0.00756045 38.6648 2.30973e-06 
             L561.459 0.190996 C582.767 0.199024 600.035 18.7771 600.027 41.6856 
             L599.959 224.196 C599.958 226.681 599.752 229.115 599.362 231.479 
             C599.749 233.615 599.955 235.822 599.954 238.08 L599.882 434.706 
             C599.875 453.606 585.618 468.922 568.039 468.915 L283.586 468.811 Z"
          fill="rgba(0, 0, 0, 0.03)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}
