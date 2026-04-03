"use client";

import { useState } from "react";
import Menu from "./NavIcon"; // Hamburger/menu icon component
import { NavDrawer } from "./NavDrawer"; // Slide-out navigation drawer

export default function NavShell({ children }: { children: React.ReactNode }) {
  // State to track whether the navigation drawer is open
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger/Menu icon with toggle callback */}
      <Menu open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />

      {/* Navigation drawer that opens/closes based on state */}
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Render the rest of the page content inside the NavShell */}
      {children}
    </>
  );
}
