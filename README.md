# Indulura Beauty Studio website

Six pages: Home, Services, Portfolio, About, Reviews and Book. Built with Vite, React, TypeScript, Tailwind CSS v4 and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production files in dist/
```

## Edit content

Everything you might change (prices, services, hours, reviews, photos, wording) is in `src/content.ts`.
Photos live in `public/media/`. The original downloads from Fresha are kept in `media/fresha/`.

## Publish

Upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, cPanel hosting).
Each page has its own folder in `dist/`, so `/services`, `/about` and the other pages open directly without extra server setup.
