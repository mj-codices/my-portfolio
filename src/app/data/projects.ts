// Listed newest first. Display numbers ("01", "02", …) come from list order,
// so reordering projects never means renumbering them.
// images[0] is the front screenshot (and the only one shown on phones, cropped
// 4:3 from the top); images[1] sits behind it in the stacked display.
const projectList = [
  {
    id: 2,
    title: "7th Gear Tire Works",
    year: "2026",
    description:
      "A professional platform for 7th Gear Tire Works built with Next.js, TypeScript, and Tailwind CSS. Shaped around the operations of a commercial tire business, it offers three clear customer pathways (tire distribution, shop service, and mobile fleet installation) with form workflows that streamline quoting, fitment, and service coordination.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    images: ["/projects/7thgear_home.webp", "/projects/7thgear_contact.webp"],
    link: "https://www.7thgeartireworks.net/",
  },
  {
    id: 1,
    title: "Riverside Lyric Opera",
    year: "2026",
    description:
      "A modern, content-first website for Riverside Lyric Opera built with Next.js, TypeScript, and Tailwind CSS. Guided by a client-provided designer, the project leans into bold typography and a structured layout, prioritizing clarity and usability.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    images: ["/projects/rlo_home.webp", "/projects/rlo_calendar.webp"],
    link: "https://www.riversidelyricopera.org/",
  },
];

export const projects = projectList.map((project, i) => ({
  ...project,
  number: String(i + 1).padStart(2, "0"),
}));
