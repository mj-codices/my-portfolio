# Michael White | Full-Stack Developer

## Overview

<!-- High-level description of the project -->

## Tech Stack

This portfolio is built with **Next.js** and **React** for a modern, component-driven frontend, enhanced with **Tailwind CSS** for responsive, utility-first styling and **Framer Motion** for smooth animations. Development is powered by **Typescript** for type safety, with ESLint and Prettier ensuring consistent code quality and formatting.

Additional utilities include **clsx** for dynamic class handling and **Lenis** for smooth scrolling. The project leverages standard **Next.js** scripts for development, building, and production deployment.

## Features

This portfolio features a **dynamic hero section** with an animated skill cluster, **animated content reveal** for smooth scrolling through About, Mission, and Process sections, and **scroll enhancements** powered by Lenis combined with **Framer Motion** for refined motion throughout. Floating circles, chevron conveyors, and decorative elements bring the **process visualization** to life, while **micro-interactions** on buttons and links provide subtle tactile feedback. The site is fully **responsive**, ensuring an engaging experience across devices, and is built with **performance** and **accessibility** in mind, delivering a polished and lively digital portfolio.

## Design Philosophy

<!-- Your approach to UI/UX and motion -->

## Architecture

The project follows a **feature-driven, component-based architecture** built on top of the **Next.js** App Router. The codebase is organized to separate concerns between **UI, data, styling**, and **global behavior**, making the application **scalable** and **easy to maintain**.

## Architectural Decisions

- **Feature-based organization**
  Components are grouped by section (e.g. hero, mission) rather than by type, improving readability and making each section self-contained.

- **Separation of concerns**
  components/ → UI + interaction logic
  data/ → static configuration (e.g. skill stack)
  styles/ → global and animation styling
  providers/ → app-wide behavior (Lenis scrolling)
- **Animation abstraction**
  Reusable wrappers like FadeSection and FadeInDirectionalWrapper encapsulate scroll-based animations, keeping components clean and declarative.

- **Hybrid asset strategy**
  public/ → static assets referenced by URL (/icons/...)
  src/app/assets/ → imported SVGs for component-driven rendering

- **Scalable styling approach**
  Combines **Tailwind CSS** for layout and utility styling with custom CSS for complex animations (e.g. floating elements, conveyors).

## Animations & Interactions

This portfolio leverages **Framer Motion** to create **smooth, interactive animations** across components, including **scroll-based transitions**, **hover micro-interactions**, and **content fade-ins**. **Lenis** is used to implement **seamless, buttery scrolling** that enhances the user experience. In addition, subtle **CSS keyframe animations** provide gentle motion for **decorative elements** such as **floating circles**, **spinning icons**, and **chevron conveyors**, adding **dynamic depth** without compromising **performance**. Together, these techniques ensure the site feels **polished, responsive, and engaging** while keeping interactions **intuitive and lightweight**.

## Challenges & Solutions

<!-- Problems you ran into and how you solved them -->

## Performance Considerations

The portfolio is optimized for **fast load times** and **smooth interactions**. **Images** and **SVGs** are locally hosted and sized for efficiency, while **Tailwind CSS** keeps styles lightweight. **Framer Motion** animations are carefully orchestrated to avoid **jank**, and **Lenis** smooth scrolling ensures consistent **frame rates**. **Code splitting** and **Next.js** built-in optimizations help maintain **minimal bundle** sizes, and **lazy loading** of non-critical assets improves **perceived performance** across devices. Overall, the site balances **rich visuals** and **interactivity** with **speed** and **responsiveness**.

## Future Improvements

Planned improvements include responsive display; enhanced accessibility for keyboard navigation, screen readers, and the visually impaired; day/night mode.

### Getting Started

Clone the repo and run `npm install` then `npm run dev` to start a local development server.

## Deployment

This portfolio is deployed on **Vercel**, providing **instant global hosting, automatic CI/CD**, and seamless integration with **Next.js**. Updates are deployed automatically from the **main branch**, while local development is powered by npm run dev or yarn dev, allowing the site to be previewed at http://localhost:3000 before pushing changes. The deployment workflow ensures that the live site always reflects the **latest tested and stable code**.

## Screenshots / Demo

<!-- Add images or links later -->
