# Edutou website (React)

React + Vite version of the Edutou landing page. The visual design is the original
Framer design, carried over 1:1 (same markup structure, class names, styles and
animations), now running as a normal React app with no Framer runtime.

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build
```

`dist/` is fully static and uses relative paths, so it can be hosted anywhere
(Netlify, Vercel, GitHub Pages, any web server or sub-folder).

## Structure

```
index.html                    page <head> (title, SEO / social meta) + #main mount point
src/
  main.jsx                    entry; imports styles in cascade order
  App.jsx                     page layout: section order lives here
  components/
    header/Header.jsx         fixed nav; hamburger menu on tablet/phone
    header/NavVariants.jsx    desktop / tablet / phone nav markup
    sections/*.jsx            one component per page section
    FaqItem.jsx               accordion row (data in src/data/faq.js)
    Footer.jsx, DotPattern.jsx, SvgTemplates.jsx
  data/
    site.js                   contact e-mail, institutions, gallery photos
    faq.js                    FAQ questions & answers
  effects/
    useFramerEffects.js       appear / scroll-reveal / loop / text animations
    effectsConfig.json        animation settings taken from the Framer project
    appearConfig.json         page-load animation settings (per breakpoint)
  styles/
    framer.css, fonts.css, breakpoints.css   original design styles (verbatim)
    edutou.css                Edutou sections + site-specific overrides
public/images/                campus gallery photos
legacy/index.html             the previous single-file HTML site, kept for reference
```

## Editing content

- **Contact e-mail, institutions, gallery photos:** `src/data/site.js`
- **FAQ:** `src/data/faq.js`
- **Section text:** the matching file in `src/components/sections/`
- **Section order:** `src/App.jsx`

## Notes

- Responsive layouts work the same way as the original: each breakpoint's version
  is in the markup and CSS media queries (`hidden-*` classes) show the right one
  (desktop ≥ 1200px, tablet 810–1199px, phone < 810px).
- Buttons that still link to Framer template pages (`framer.com`) are hidden by
  `src/styles/edutou.css`, exactly as on the previous site.
- Fonts and the design's images are loaded from `framerusercontent.com` /
  Google Fonts, as before.
