# Honing the Edge — Juan de Paula

A single-page e-portfolio: who I was in Brazil, who I am now in Ireland, who I
want to be, and what I want out of life. Plain HTML/CSS/JS, no build step.

## Structure

```
index.html       markup
css/style.css    tokens + all styling
js/main.js       parallax, scroll reveals, chapter nav, ember particles
images/          photos (already resized/compressed for the web)
```

## Run locally

Any static file server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open the printed URL in a browser.

## Deploy to Vercel

**Option A — Vercel CLI (fastest, no GitHub needed)**

```bash
npm i -g vercel      # one-time install
vercel login         # opens a browser to authenticate
vercel                # first deploy, follow the prompts (framework: "Other")
vercel --prod         # promote to your production URL
```

**Option B — GitHub + Vercel dashboard**

```bash
git init                                   # if not already a repo
git add -A
git commit -m "Initial e-portfolio"
gh repo create e-portfolio --public --source=. --push
# or push manually to a repo you created on github.com
```

Then on [vercel.com/new](https://vercel.com/new), import the repository.
No framework preset or build command is needed — it's a static site, so leave
the build command empty and the output directory as `.` (root).

## Notes

- Fonts (Fraunces, Work Sans, IBM Plex Mono) load from Google Fonts.
- All animation respects `prefers-reduced-motion`.
- Photos are shown in their original color, no filters applied.
