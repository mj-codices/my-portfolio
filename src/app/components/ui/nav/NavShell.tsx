"use client";

import { useState } from "react";
import Menu from "./NavIcon";
import { NavDrawer } from "./NavDrawer";

export default function NavShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Menu open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {children}
    </>
  );
}
