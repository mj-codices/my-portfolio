import { motion } from "framer-motion";

interface CTAChevronsProps {
  className?: string;
}

export default function CTAChevrons({
  className = "w-65",
}: CTAChevronsProps) {
  return (
    <motion.span className={`${className} display-block overflow-visible`}>
      <svg
        fill="none"
        height="100%"
        width="100%"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="i0">
          <g transform="translate(250,324)">
            <animateTransform
              repeatCount="indefinite"
              type="translate"
              attributeName="transform"
              dur="1.133s"
              begin="0s"
              calcMode="spline"
              values="250 324; 250 324; 250 364; 250 324; 250 324"
              keyTimes="0; 0.117647; 0.529412; 1; 1"
              keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1"
              fill="freeze"
            />
            <g transform="scale(1,1) translate(-132.596,-101.955)">
              <g id="i1" transform="matrix(1,0,0,1,132.596,101.955)">
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
        <g opacity="0.8" id="i2">
          <g transform="translate(250,251)">
            <animateTransform
              repeatCount="indefinite"
              type="translate"
              attributeName="transform"
              dur="1.133s"
              begin="0s"
              calcMode="spline"
              values="250 251; 250 251; 250 291; 250 251; 250 251"
              keyTimes="0; 0.088235; 0.5; 0.941177; 1"
              keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1"
              fill="freeze"
            />
            <g transform="scale(1,1) translate(-72.596,-41.955)">
              <g id="i1" transform="matrix(1,0,0,1,72.596,41.955)">
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
        <g opacity="0.5" id="i3">
          <g transform="translate(250,178)">
            <animateTransform
              repeatCount="indefinite"
              type="translate"
              attributeName="transform"
              dur="1.133s"
              begin="0s"
              calcMode="spline"
              values="250 178; 250 178; 250 218; 250 178; 250 178"
              keyTimes="0; 0.058824; 0.470588; 0.882353; 1"
              keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1"
              fill="freeze"
            />
            <g transform="scale(1,1) translate(-72.596,-41.955)">
              <g id="i1" transform="matrix(1,0,0,1,72.596,41.955)">
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
