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

## Deploy (Dokploy or any Docker host)

- **Dockerfile build type (recommended):** builds the site and serves it with nginx
  on port **80**.
- **Nixpacks build type:** runs `npm run build` then `npm start`, which serves the
  build on `$PORT` (default 3000).

In Dokploy set the application's branch (e.g. `prod`) and the matching container
port (80 for Dockerfile, 3000 for Nixpacks) on the domain.

## Structure

```
index.html                    page <head> (title, SEO / social meta, favicon) + #main mount point
src/
  main.jsx                    entry; router + styles in cascade order
  App.jsx                     routes: /, /programmes(/:format), /career(/:topic), /about(/:topic), /contact, /verify-certificate
  pages/                      one component per page (HomePage = the original design)
  components/
    layout/                   Navbar (utility bar, dropdowns, mobile menu), SiteFooter, Logo
    page/PageParts.jsx        shared blocks for inner pages (hero, section heading, photos, CTA)
    sections/*.jsx            homepage sections
    fx/                       scroll progress, back-to-top, click sparks, spotlight, shiny text
    FaqItem.jsx, Lightbox.jsx, DotPattern.jsx, SvgTemplates.jsx
  data/
    navigation.js             menu structure (navbar, mobile menu and footer all use this)
    programmes.js             programme catalogue on /programmes
    pages.js                  Career and About page content
    site.js                   contact e-mail, institutions, gallery photos
    faq.js                    FAQ questions & answers
  effects/                    homepage animations (settings taken from the Framer project)
  styles/
    framer.css, fonts.css, breakpoints.css   original design styles (verbatim)
    edutou.css, enhancements.css, responsive.css   homepage additions and mobile fixes
    layout.css, pages.css     header/footer and inner pages
public/images/                campus gallery photos
public/brand/                 logo mark and wordmark
legacy/index.html             the previous single-file HTML site, kept for reference
```

## Editing content

- **Menu items:** `src/data/navigation.js`
- **Programmes (catalogue, formats, domain filters):** `src/data/programmes.js`
- **Career / About pages:** `src/data/pages.js` (items marked `TODO` need real details)
- **Contact e-mail, institutions, gallery photos:** `src/data/site.js`
- **FAQ:** `src/data/faq.js`
- **Homepage section text:** the matching file in `src/components/sections/`
- **Homepage section order:** `src/pages/HomePage.jsx`

## Notes

- Responsive layouts work the same way as the original: each breakpoint's version
  is in the markup and CSS media queries (`hidden-*` classes) show the right one
  (desktop ≥ 1200px, tablet 810–1199px, phone < 810px).
- Buttons that still link to Framer template pages (`framer.com`) are hidden by
  `src/styles/edutou.css`, exactly as on the previous site.
- Fonts and the design's images are loaded from `framerusercontent.com` /
  Google Fonts, as before.
