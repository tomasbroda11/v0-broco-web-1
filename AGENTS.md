# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router project (TypeScript) synced from v0. Route files live in `app/` (for example `app/page.tsx`, `app/privacy/page.tsx`, `app/api/contact/route.ts`). Shared UI lives in `components/` and `components/ui/` (shadcn-style primitives). Reusable helpers go in `lib/` (see `lib/utils.ts`). Static assets are in `public/` (`public/images`, `public/brand`). Global styles are in `app/globals.css` and `styles/`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server.
- `npm run build`: production build.
- `npm run start`: run built app.
- `npm run lint`: run Next.js lint checks.

Example: `npm run dev` then open `http://localhost:3000`.

## Coding Style & Naming Conventions
Use TypeScript with strict mode (`tsconfig.json`). Prefer functional React components and App Router patterns. Use 2-space indentation and double quotes, consistent with current files.  
Import internal modules via `@/*` aliases (example: `@/components/ui/button`).  
Name React components in PascalCase; keep route folders and utility filenames lowercase (kebab-case where appropriate).

## Testing Guidelines
There is currently no automated test framework configured in `package.json`. At minimum, run:
1. `npm run lint`
2. `npm run build`
3. Manual smoke test of critical pages and form/API flows (`/`, `/privacy`, `/automatizaciones`, `/eternum`, `/api/contact`).

If you add tests, place them next to the feature or under a dedicated `__tests__/` folder and document the command in `package.json`.

## Commit & Pull Request Guidelines
Follow the commit style used in history: conventional prefixes such as `feat:`, `fix:`, followed by a short imperative summary (example: `feat: add contact form validation`). Keep commits focused and small.  
PRs should include:
- clear description of user-facing changes,
- linked issue/task (if available),
- screenshots/video for UI updates,
- verification notes (lint/build/manual paths tested).

## Security & Configuration Tips
Email delivery in `app/api/contact/route.ts` requires `RESEND_API_KEY`. Optional: `EMAIL_TO`, `EMAIL_FROM`. Store secrets in `.env.local`; never commit credentials.

## UI Change Guardrails (Broco website)
For landing/product page updates, prioritize incremental changes and preserve the existing v0-based design system.

- Do not redesign pages or rewrite unrelated sections.
- Keep typography, spacing scale, color palette, and existing UI patterns unchanged unless explicitly requested.
- Implement changes phase-by-phase with small, reviewable diffs.
- Before editing, identify the exact files/components to modify.
- After editing, summarize changes by file.
- Reuse existing components (especially modal/dialog, cards, buttons) whenever possible.
- For missing assets, use sober placeholders until real assets are provided.
- When integrating logos, use a consistent public asset path and avoid layout shifts.
- External links must use `target="_blank"` and `rel="noopener noreferrer"`.
- For UI tasks, avoid adding flashy animations or unnecessary visual effects.
