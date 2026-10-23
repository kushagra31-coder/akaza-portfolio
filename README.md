# Akaza Portfolio (Kushagra Singh Tomar)

Spider-Verse style comic portfolio built with Next.js (App Router). All art and effects are original:
halftone panels, glitch text, a live web-network background, click sound effects and a comic avatar.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit your content

Everything (projects, certificates, timeline, links) lives in `lib/data.js`.

- Project links: fill the `links: []` arrays, e.g. `{ label: "GitHub", href: "https://github.com/..." }`
- Ultron: replace the `classified: true` entry with its real title, description, stack and links
- Certificate images: put the file in `public/certs/`, then set `img` in `lib/data.js`
- Avatar: `public/avatar.png`
- Colours: CSS variables at the top of `app/globals.css`

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com choose Add New Project, import the repo and press Deploy.
   No settings are needed. Vercel detects Next.js automatically.

## Privacy note

Your resume contains your address, phone number, date of birth and father's name. None of these are on
the site, and the resume PDF is not linked. If you add a Download Resume button later, use a trimmed copy.
