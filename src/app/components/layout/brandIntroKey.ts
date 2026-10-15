// sessionStorage key shared by BrandIntro (client) and the pre-paint script in
// layout.tsx (server). Lives in its own plain module because a server file
// can't import plain values from a "use client" file.
export const INTRO_SEEN_KEY = "brand-intro-seen";
