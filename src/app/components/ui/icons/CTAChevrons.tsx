import { motion } from "framer-motion";

interface CTAChevronsProps {
  className?: string;
}

export default function CTAChevrons({
  className = "w-24 mr-1",
}: CTAChevronsProps) {
  return (
    <motion.span
      /* DOCUMENTATION UPDATE:
        This wrapper exposes the raw DOM nodes and IDs (#chevron-top, etc.) to the 
        global CSS pipeline. The infinite staggered loops are driven entirely by 
        Hero.css under a 0.8s calibrated delay, bypassing JavaScript inline style 
        overrides to maintain strict hardware-accelerated thread performance.
      */
      className={`${className} block overflow-visible cta-chevron-wrapper`}
    >
      <svg
        fill="none"
        height="100%"
        width="100%"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* BOTTOM CHEVRON: Driven by pulseBottom keyframes in Hero.css */}
        <g id="chevron-bottom">
          <g transform="translate(250,324)">
            <g transform="scale(1,1) translate(-132.596,-101.955)">
              <g transform="matrix(1,0,0,1,132.596,101.955)">
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="30"
                  stroke="#ff5757"
                  d="M57.596,-26.955C57.596,-26.955,-0.001,26.955,-0.001,26.955C-0.001,26.955,-57.597,-26.955,-57.597,-26.955"
                />
              </g>
            </g>
          </g>
        </g>

        {/* MIDDLE CHEVRON: Driven by pulseMiddle keyframes in Hero.css */}
        <g opacity="0.8" id="chevron-middle">
          <g transform="translate(250,251)">
            <g transform="scale(1,1) translate(-72.596,-41.955)">
              <g transform="matrix(1,0,0,1,72.596,41.955)">
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="30"
                  stroke="#ff5757"
                  d="M57.596,-26.955C57.596,-26.955,-0.001,26.955,-0.001,26.955C-0.001,26.955,-57.597,-26.955,-57.597,-26.955"
                />
              </g>
            </g>
          </g>
        </g>

        {/* TOP CHEVRON: Driven by pulseTop keyframes in Hero.css */}
        <g opacity="0.5" id="chevron-top">
          <g transform="translate(250,178)">
            <g transform="scale(1,1) translate(-72.596,-41.955)">
              <g transform="matrix(1,0,0,1,72.596,41.955)">
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="30"
                  stroke="#ff5757"
                  d="M57.596,-26.956C57.596,-26.956,-0.001,26.956,-0.001,26.956C-0.001,26.956,-57.597,-26.956,-57.597,-26.956"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </motion.span>
  );
}
