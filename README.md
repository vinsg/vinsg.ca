# vinsg.ca

Personal site built with [Astro 5](https://astro.build), Tailwind CSS, and Reveal.js.

## Development

```bash
npm run dev      # start local dev server at localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Content

### Long-form posts

Create `src/content/posts/YYYY-MM-DD-slug.md`:

```md
---
title: My Post Title
pubDate: 2026-02-20
description: One-sentence summary for SEO and RSS.
author: vinsg
tags: [tag1, tag2]
draft: false        # omit or set true to hide in production
---

Post body in Markdown…
```

### Short-form notes

Create `src/content/notes/YYYY-MM-DD-slug.md`. Three types:

**note** — plain thought or observation:
```md
---
pubDate: 2026-02-20
type: note
---
Quick thought here. No title needed.
```

**link** — link post with commentary:
```md
---
pubDate: 2026-02-20
type: link
url: https://example.com/article
source: Author / Site Name
---
Why this is interesting or what I took from it.
```

**quote** — pulled quote with attribution:
```md
---
pubDate: 2026-02-20
type: quote
quote: The actual quoted text goes here.
source: Author Name
---
Optional additional commentary below the quote.
```

### Slide decks

Create `src/content/slides/slug.md` with Reveal.js-compatible Markdown. Frontmatter:

```md
---
title: Talk Title
date: 2026-02-20
description: Brief description.
---
```

## RSS

The feed at `/rss.xml` includes both posts and notes, sorted by date.

## Deploy

Static build — output goes to `dist/`. Deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

```bash
npm run build
# upload dist/ to your host
```
