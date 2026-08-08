# LearnAIMTO

The public website for **The Malaysian Learn-a-thon**, a one-day, beginner-friendly AI building experience by AI Malaysia Takeover. It helps Malaysians discover the event, register, find practical guidance, and start building something useful.

- **Event:** 12 August 2026, 10am–6pm
- **Venue:** The Campus, Ampang, Kuala Lumpur
- **Registration:** [event.aimto.my/concierge-menu/registration](https://event.aimto.my/concierge-menu/registration)

## What is here

- A responsive public event experience at `/`, with event information, programme content, project inspiration, FAQs, partner recognition, and registration calls to action.
- A guided first AI learning experience at `/welcome`.
- A full-screen-friendly event countdown at `/countdown`.
- A permanent `/start` redirect to the Learn-a-thon destination on KrackedDevs.
- A no-index review version of the site at `/v2`; it is useful for organiser review and should not be promoted as the canonical public URL.

Event facts, registration URLs, SEO metadata, and structured event data are centralised in `src/lib/constants.ts` and `src/lib/seo.ts`. Images and logos live in `public/aimto-assets`.

## Stack

- [Next.js 16](https://nextjs.org/) with the App Router
- React 19 and TypeScript
- CSS Modules and global CSS
- `next/font` for Rethink Sans, Space Grotesk, and JetBrains Mono
- Vercel Analytics
- Vitest and Testing Library

## Run locally

Use Node.js 20.9 or later (Node 22 LTS is recommended).

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To test the production build locally:

```bash
npm run build
npm run start
```

## Checks

```bash
npm run lint
npm test
npm run build
```

Run the relevant checks before opening a pull request. For page or theme changes, also inspect the affected routes at desktop and mobile widths; a source diff alone is not visual QA.

## Project map

```text
src/app/
  page.tsx                 Canonical public homepage
  v2/                      No-index review version of the homepage
  welcome/                 Interactive first-learning experience
  countdown/               Event countdown display
  start/                   Server-side redirect route
  aimto/                   Shared AIMTO navigation, motion, and Learn-a-thon UI
src/lib/
  constants.ts             Event details, public URLs, and FAQ content
  seo.ts                   JSON-LD helpers
public/aimto-assets/       Event imagery, brand assets, and partner logos
```

## Content and release notes

- Treat the values in `src/lib/constants.ts` as the source for public event facts. Confirm date, time, venue, partner names, and registration destination with organisers before changing them.
- Keep `/` as the canonical public route. `/v2` deliberately has `noindex, nofollow` metadata for review work.
- Use only approved assets in `public/aimto-assets`; preserve image paths when moving components so social cards and page imagery do not break.
- Set `NEXT_PUBLIC_SITE_URL` to the production site URL in the deployment environment. It controls the metadata base URL used for canonical and social metadata; local development falls back to `http://localhost:3000`.

## Reuse and make it your own

This is an open-source starting point for your own learning event, community build day, or workshop. Fork it, adapt the code, change the design, and experiment with your own version of the Learn-a-thon.

If you deploy a fork, make the event and organisation clearly your own. Do not present your project as AI Malaysia Takeover, The Malaysian Learn-a-thon, or an official AIMTO event, and do not use the AIMTO name, logos, partner logos, event copy, or other brand assets without permission. Replace the event details in `src/lib/constants.ts`, update the metadata and imagery, and add a clear statement of independence where appropriate.

An easy marketing direction for a fork: lead with the practical outcome rather than the technology — for example, **“Bring an idea. Leave with something useful.”** Pair it with your local community, a welcoming beginner promise, real mentor support, and a show-and-tell moment. The point is to make the design and message recognisably yours.

## Contributing

1. Branch from an up-to-date `main`.
2. Keep changes focused and avoid overwriting unrelated work.
3. Run lint, tests, and a production build.
4. Include desktop and mobile render evidence for visual changes.
5. Open a pull request with the affected routes and validation results.

## License

The code is available to reuse and adapt. AIMTO and event branding remain their respective owners; see [Reuse and make it your own](#reuse-and-make-it-your-own) before publishing a fork.
