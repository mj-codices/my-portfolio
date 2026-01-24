import { div } from "framer-motion/client";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function NavDrawer({ open, onClose }: DrawerProps) {
  return (
    <div>
      {/* overlay */}
      <div
        className={`fixed h-full w-screen inset-0 bg-black transition-opacity duration-300 z-40 ${
          open
            ? "opacity-70 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* drawer */}
      <aside
        className={`
        fixed top-0 right-0 h-full w-1/3
        bg-[#111111] z-50
        transform transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <nav>
          <ul></ul>
        </nav>
      </aside>
    </div>
  );
}
