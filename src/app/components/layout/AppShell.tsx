// ---------------------------
// AppShell
// ---------------------------
// Purpose: Wraps the app with a full-screen container
// and layers a background animation beneath UI content.
// This ensures the background is always visible, but
// does not interfere with clicks or scrolling.
//
// Structure:
// - Fixed background layer (z-0, pointer-events-none)
//   renders AnimatedBackground component
// - Foreground content layer (z-10) renders children
//   of the AppShell (pages, components, etc.)
// ---------------------------
import AnimatedBackground from "./AnimatedBackground"

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background layer: Animated visuals */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}