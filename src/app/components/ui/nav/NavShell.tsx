"use client";

import { useState } from "react";
import Menu from "./NavIcon"; // Hamburger/menu icon component
import { NavDrawer } from "./NavDrawer"; // Slide-out navigation drawer
import NavScrim from "./NavScrim"; // Scroll-aware fade behind the menu icon (below desk)

export default function NavShell({ children }: { children: React.ReactNode }) {
  // State to track whether the navigation drawer is open
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Gradient backing for the menu icon once the page scrolls (mobile/tablet) */}
      <NavScrim />

      {/* Hamburger/Menu icon with toggle callback */}
      <Menu open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />

      {/* Navigation drawer that opens/closes based on state */}
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Render the rest of the page content inside the NavShell */}
      {children}
    </>
  );
}
