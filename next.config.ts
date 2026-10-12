import type { NextConfig } from "next";

// Next.js configuration for the app.
// This file is used to customize build behavior, routing, and performance settings.
//
// Add options here as needed (e.g. images, headers, redirects).
// Avoid unnecessary config—only include what the app actually uses.
const nextConfig: NextConfig = {
  // Dev only: lets phones/tablets on the same Wi-Fi load the dev server via
  // the Mac's LAN IP (e.g. http://192.168.1.25:3000) for real-device testing.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
