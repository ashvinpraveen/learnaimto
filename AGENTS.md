# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Next.js 16 (App Router, Turbopack, React 19)** marketing/onboarding site (`learnaimto`). Package manager is **npm** (`package-lock.json`). There is no backend, database, or external service — everything runs from the one Next.js dev server.

### Services

There is only one service: the Next.js app. Standard commands live in `package.json` `scripts`:
- Dev server: `npm run dev` (serves on `http://localhost:3000`).
- Lint: `npm run lint` (ESLint, flat config in `eslint.config.js`).
- Build: `npm run build`; production start: `npm start`.
- Tests: `npm test` (Vitest).

### Non-obvious notes

- `npm test` currently exits with code 1 with "No test files found" — there are **no test files** in the repo yet (the Vitest/jsdom/testing-library deps are installed but unused). This is expected, not a setup failure. Test infra (`jsdom`, `@testing-library/react`) is ready if you add `*.test.tsx` files.
- Routes worth knowing: `/welcome` (interactive onboarding quiz), `/countdown`, `/aimto/learnathon`, and `/start` (301 redirect to an external URL). `/aimto` itself has no `page.tsx` and returns 404 by design (only `/aimto/learnathon` exists).
- No env vars are required for local dev.
- To read Cleve public share notes (client-rendered; HTML scrape fails), see `docs/cleve-share-access.md`.
