# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cookfolio — personal recipe site with weekly meal planner, shopping list generation, and calendar export. Built with Astro, React, TypeScript, Tailwind v4. Fully static, no backend.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build → dist/
pnpm preview      # preview production build
pnpm lint         # all linters (types + prettier)
pnpm lint:types   # astro check
pnpm prettier:check
pnpm prettier:write
```

## Architecture

- **Content**: markdown files in `src/content/recipes/` with YAML frontmatter (title, category, ingredients)
- **Data loading**: Astro content collections with Zod schema in `src/content.config.ts` — validates frontmatter at build time
- **Components**: React TSX in `src/components/`, rendered as Astro islands with `client:load`
- **Styling**: Tailwind v4 via `@tailwindcss/vite` plugin + custom CSS in `src/styles/index.css`
- **Astro config**: `astro.config.mts`, source dir is `src/`, base path `/cookfolio/`
- **Path alias**: `@` → `src/`

### Key features

- **WeekPlanner** (`src/components/WeekPlanner.tsx`): 7-day meal planner with recipe selection or custom entries — single React island
- **WeekResult** (`src/components/WeekResult.tsx`): aggregated shopping list + ICS calendar export
- **Calendar export** (`src/utils/calendar-events.ts`): generates ICS events with smart reminders (chicken defrost day before, minced meat morning-of)
- **Recipe search** (`src/pages/index.astro`): client-side search input filters recipes by title/category — vanilla JS inline script
- **Recipe pages**: Astro renders frontmatter ingredients + markdown instructions — zero JS

### Recipe format

Allowed units: g, ml, el, tl, kl, teen, stuk, beetje (Dutch). Validated by Zod schema at build time.

## CI/CD

GitHub Actions deploys to GitHub Pages on push to `main`. Jobs: prettier check, type check, build, deploy.
