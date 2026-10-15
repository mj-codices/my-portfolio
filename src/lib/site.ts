// Canonical site URL, used for metadata, robots.txt, and sitemap.xml.
// On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set automatically to the
// production domain (your custom domain once it's connected), so this never
// needs editing. NEXT_PUBLIC_SITE_URL can override it; localhost is the
// local-dev fallback.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
