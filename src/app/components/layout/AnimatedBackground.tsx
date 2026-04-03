// ---------------------------
// HeroBackground / AnimatedBackground
// ---------------------------
// Purpose: Renders a background layer with animated "balls"
// (or particles) for visual interest. Intended to be placed
// behind the UI (e.g., in AppShell) and use CSS animations.
//
// Notes:
// - The parent div should have z-index 0 or lower to sit behind content.
// - Each <span> represents one animated element (ball).
// - All animation styling is handled in CSS (.animated-bg and .ball)
// ---------------------------
export default function HeroBackground() {
  return (
    <div className="animated-bg z-0">
      {/* Individual balls / particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="ball" />
      ))}
    </div>
  );
}
