import AnimatedBackground from "./components/AnimatedBackground"
// components/AppShell.tsx
export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* UI / content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}