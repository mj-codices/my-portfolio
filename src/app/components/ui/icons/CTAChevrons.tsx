import { motion } from "framer-motion";

interface CTAChevronsProps {
  className?: string;
}

export default function CTAChevrons({ className = "w-65" }: CTAChevronsProps) {
  return (
    <motion.span className={`${className} display-block overflow-visible cta-chevron-wrapper`}>
      <svg
        fill="none"
        height="100%"
        width="100%"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* We removed the <animateTransform> tags and rely on the IDs for CSS movement */}
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