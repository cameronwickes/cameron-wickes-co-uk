# Cameron Wickes - Personal Website

Personal portfolio and blog built with React, TypeScript, Tailwind CSS, and Vite.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Format check + type check + production build |
| `npm run format` | Format all source files with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project Structure

```
src/
  components/
    blog/           # Blog-specific components (card, header, renderer)
    effects/        # Visual effects (particles, glitch, scroll reveal, tilt)
    elements/       # Reusable UI primitives (section, tag, timeline, etc.)
    icons/          # SVG icon components
    layout/         # App shell (navbar, footer)
    sections/       # Homepage section composers
    theme/          # Theme provider and switcher
  pages/            # Route-level page components
  static/
    content/        # Markdown blog posts (auto-discovered by Vite)
    data/           # Static data (career, certs, technologies, etc.)
  utils/            # Shared helper functions
public/
  images/           # Blog images, cert badges, profile photo
  favicon.svg       # Site favicon
  robots.txt        # Search engine directives
  _redirects        # Netlify SPA redirect
```

## Blog Posts

Drop a `.md` file in `src/static/content/` with frontmatter:

```markdown
---
title: "Post Title"
category: "software"
summary: "Short description for the card."
intro: "Italic intro paragraph shown above the content."
image: "/images/blog/image.jpg"
---

Your markdown content here.
```

Posts are auto-discovered at build time via Vite glob imports. Reading time is calculated from word count.

## Themes

8 colour themes available via the floating picker (bottom-right). Selection persists in localStorage.

## Deployment

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, S3 + CloudFront, or any static host. The `_redirects` file handles SPA routing on Netlify.
