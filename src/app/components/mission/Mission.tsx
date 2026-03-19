import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Mission() {
  const ref = useRef(null);

  const p2Ref = useRef(null);

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

  const p2Y = useTransform(p2Progress, [0, 1], [12, 0]);

  const circleY1 = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  const circleY2 = useTransform(scrollYProgress, [0.1, 1], [-60, 0]);

  const circleY3 = useTransform(p2Progress, [0.2, 1], [12, 0]);

  return (
    <section ref={ref} className="w-[100vw] bg-black-90 px-50 text-5xl mb-50">
      <p className="mission-text text-center leading-[58px] bg-gradient-to-b from-[#ffff] to-[#b4b4b4] bg-clip-text text-transparent">
        My mission is to craft pixel-perfect web experiences where clarity in
        design and strength in architecture unite to create lasting, meaningful
        digital products
        <span className="px-1 text-[#ff5757] text-7xl leading-7 whitespace-nowrap">
          .
        </span>
      </p>

      <motion.div
        style={{ marginTop: pushUp }}
        className="border border-b opacity-20 mission-border"
      />

      {/* RELATIVE container for text + panel + decorations */}
      <div className="mt-40  flex relative">
        {/* Text content */}
        <div className="ml-15 relative z-10 pt-10">
          <motion.div
            className="relative flex -translate-x-15"
            style={{ y: headingY }}
          >
            <img
              className="spin-slow w-12 h-auto mr-9 -translate-y-5"
              src={"/aster.svg"}
            ></img>
            <h2 className="mb-10 text-3xl uppercase font-bold tracking-wider opacity-80 text-[#ffff]">
              my story
            </h2>
          </motion.div>
          <motion.div style={{ y: p1Y }}>
            <p className="text-lg w-110 leading-9 ml-7 mb-5">
              I’m a full-stack software developer based in Southern California.
              My passion for programming stems from a love of polished,
              intuitive user experiences, and this is why I thrive at the
              intersection of design and engineering.
            </p>
          </motion.div>
          <motion.div ref={p2Ref} style={{ y: p2Y }}>
            <p className="text-lg w-150 leading-10 ml-7">
              When I’m not pushing pixels, you can find me jamming to Aphex Twin,
              watching the Lakers, or camping along the Pacific Coast with my wife and dog.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative w-[520px] right-[-1rem] top-10"
          style={{ y: headingY }}
        >
          {/* Circle behind */}
          <motion.div
            id="mission-circle-1"
            className="absolute top-10 right-8 w-[145px] h-[145px] rounded-full bg-[#ff5757] opacity-60 z-0"
            style={{ y: circleY1 }}
          ></motion.div>
          <motion.div
            id="mission-circle-2"
            className="absolute top-[-3rem] right-20 -translate-x-95 w-[123px] h-[123px] rounded-full bg-gradient-to-br from-[#ff5757] to-[#9e005d] opacity-60 z-0"
            style={{ y: circleY2 }}
          ></motion.div>
          <motion.div
            id="mission-circle-3"
            className="absolute top-78 right-57 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#000000] to-[#545454] z-15"
            style={{ y: circleY3 }}
          ></motion.div>

          <div className="absolute inset-0 z-15">
            <div className="relative flex -translate-x-15">
              <h2 className="pt-8 ml-4 mr-3 uppercase text-3xl font-bold tracking-wider">
                my process
              </h2>
              <span className="top-[1.1rem] inline-flex overflow-hidden w-40 relative">
                <img
                  className="w-6 opacity-80 chev chev-1"
                  src="/chevron.svg"
                  alt=""
                />
                <img
                  className="w-6  opacity-80 chev chev-2"
                  src="/chevron.svg"
                  alt=""
                />
                <img
                  className="chev chev-3 w-6 opacity-80"
                  src="/chevron.svg"
                />
              </span>
            </div>
            <div>
              <img
                className="absolute w-30 translate-x-37 translate-y-18"
                src="/dotted.svg"
                alt=""
              />

              <div className="-translate-x-11 mt-3">
                <img
                  className="w-6 ml-[-.2rem] opacity-80"
                  src="/discovery.svg"
                  alt=""
                />
                <h3 className="text-base text-white">Discovery</h3>
                <p className="w-50 pt-1 panel-para leading-4">
                  Defining project goals, user personas, and technical
                  requirements.
                </p>
              </div>
              <div className="translate-x-30 -translate-y-14 mt-3">
                <img
                  className="w-6 translate-x-43"
                  src="/panel-code.svg"
                  alt=""
                />
                <h3 className="text-base text-white text-center -translate-x-16">
                  Development
                </h3>
                <p className="w-30 pt-1 panel-para leading-4 text-end translate-x-20">
                  Writing clean, scalable code and architectural implementation.
                </p>
              </div>
              <div className="translate-x-31 -translate-y-18 mt-3">
                <img
                  className="w-5 ml-[-.2rem] pb-2 opacity-80"
                  src="/bolt.svg"
                  alt=""
                />
                <h3 className="text-base text-white">Deployment</h3>
                <p className="w-50 pt-1 panel-para leading-4">
                  Cloud delivery, server monitoring, and continuous maintenance.
                </p>
              </div>
            </div>
          </div>
          {/* Glass panel SVG */}
          <svg
            viewBox="0 0 601 469"
            className="w-full h-auto relative z-10 right-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 1. Define the L-shape path for reuse */}
              <clipPath id="glass-clip">
                <path d="M283.586 468.811 C266.007 468.805 251.762 453.478 251.769 434.579 L251.775 352.067 L253.048 276.962 C253.516 267.654 250.393 265.542 240.162 266.063 L38.5677 265.989 C23.4662 265.983 -0.00831798 246.885 2.21112e-06 223.977 L0.0676558 41.4664 C0.076025 18.5579 17.3565 -0.00756045 38.6648 2.30973e-06 L561.459 0.190996 C582.767 0.199024 600.035 18.7771 600.027 41.6856 L599.959 224.196 C599.958 226.681 599.752 229.115 599.362 231.479 C599.749 233.615 599.955 235.822 599.954 238.08 L599.882 434.706 C599.875 453.606 585.618 468.922 568.039 468.915 L283.586 468.811 Z" />
              </clipPath>
            </defs>

            {/* 2. Apply backdrop-blur to a container clipped by the path */}
            <g clipPath="url(#glass-clip)">
              <foreignObject x="0" y="0" width="601" height="469">
                <div className="w-full h-full backdrop-blur-lg" />
              </foreignObject>
            </g>

            {/* 3. Re-draw the path for the border (stroke) and fine-tuning */}
            <path
              d="M283.586 468.811 C266.007 468.805 251.762 453.478 251.769 434.579 L251.775 352.067 L253.048 276.962 C253.516 267.654 250.393 265.542 240.162 266.063 L38.5677 265.989 C23.4662 265.983 -0.00831798 246.885 2.21112e-06 223.977 L0.0676558 41.4664 C0.076025 18.5579 17.3565 -0.00756045 38.6648 2.30973e-06 L561.459 0.190996 C582.767 0.199024 600.035 18.7771 600.027 41.6856 L599.959 224.196 C599.958 226.681 599.752 229.115 599.362 231.479 C599.749 233.615 599.955 235.822 599.954 238.08 L599.882 434.706 C599.875 453.606 585.618 468.922 568.039 468.915 L283.586 468.811 Z"
              fill="rgba(0, 0, 0, 0.03)" // glass fill
              stroke="rgba(255,255,255,0.1)" // border
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

// <svg
//     viewBox="0 0 601 469"
//     className="w-130 h-auto relative z-10 right-20"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M283.586 468.811
//        C266.007 468.805 251.762 453.478 251.769 434.579
//        L251.775 352.067
//        L253.048 276.962
//        C253.516 267.654 250.393 265.542 240.162 266.063
//        L38.5677 265.989
//        C23.4662 265.983 -0.00831798 246.885 2.21112e-06 223.977
//        L0.0676558 41.4664
//        C0.076025 18.5579 17.3565 -0.00756045 38.6648 2.30973e-06
//        L561.459 0.190996
//        C582.767 0.199024 600.035 18.7771 600.027 41.6856
//        L599.959 224.196
//        C599.958 226.681 599.752 229.115 599.362 231.479
//        C599.749 233.615 599.955 235.822 599.954 238.08
//        L599.882 434.706
//        C599.875 453.606 585.618 468.922 568.039 468.915
//        L283.586 468.811
//        Z"
//       fill="rgba(255,255,255,0.02)" // glass fill
//       stroke="rgba(255,255,255,0.1)" // border
//       strokeWidth="1"
//     />
//   </svg>
