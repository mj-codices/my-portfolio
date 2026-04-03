import "./ScrollIndicator.css";

/**
 * ScrollIndicator
 * Displays a stylized mouse icon with animated paths and a "SCROLL" label.
 * Used as a visual cue for users to scroll on the hero section.
 */
export default function ScrollIndicator() {
  return (
    <div className="mouse-wrap">
      {/* Outer mouse container */}
      <div className="mouse">
        {/* Central frame of the mouse */}
        <div className="frame">
          <svg viewBox="0 0 54.9 91" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.4,3.6L27.4,3.6C14.2,3.6,3.5,14.3,3.5,27.5v36c0,13.2,10.7,23.9,23.9,23.9h0
                 c13.2,0,23.9-10.7,23.9-23.9v-36C51.4,14.3,40.7,3.6,27.4,3.6z"
            />
          </svg>
        </div>

        {/* Left half of the mouse, animated path */}
        <div className="mouse-left">
          <svg viewBox="0 0 27.4 91">
            <path
              className="Animate-Draw"
              d="M27.4,87.5L27.4,87.5c-13.2,0-23.9-10.7-23.9-23.9v-36
                 c0-13.2,10.7-23.9,23.9-23.9h0"
            />
          </svg>
        </div>

        {/* Right half of the mouse, animated path */}
        <div className="mouse-right">
          <svg viewBox="0 0 27.4 91">
            <path
              className="Animate-Draw"
              d="M0,3.6L0,3.6c13.2,0,23.9,10.7,23.9,23.9v36
                 c0,13.2-10.7,23.9-23.9,23.9h0"
            />
          </svg>
        </div>
      </div>

      {/* Text label below mouse */}
      <p id="mouseText">SCROLL</p>
    </div>
  );
}
