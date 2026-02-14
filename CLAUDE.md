# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cookfolio — personal recipe site with weekly meal planner, shopping list generation, and calendar export. Built with VitePress, Vue 3, TypeScript, Tailwind v4. Fully static, no backend.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build → .vitepress/dist
pnpm preview      # preview production build
pnpm lint         # all linters (types + units + recipes + prettier)
pnpm lint:types   # vue-tsc --noEmit
pnpm lint:units   # validate ingredient units against allowed list
pnpm lint:recipes # validate recipe frontmatter against valibot schema
pnpm prettier:check
pnpm prettier:write
```

## Architecture

- **Content**: markdown files in `docs/recipes/` with YAML frontmatter (title, category, ingredients)
- **Data loading**: `src/recipes.data.ts` (VitePress data loader) transforms markdown into typed recipe data
- **Validation**: valibot schemas in `scripts/utils/constants.ts` validate recipes at lint time
- **Components**: Vue 3 `<script setup lang="ts">` in `src/components/`
- **Styling**: Tailwind v4 via `@tailwindcss/vite` plugin + VitePress theme CSS variables
- **VitePress config**: `.vitepress/config.mts`, source dir is `docs/`, base path `/cookfolio/`
- **Path alias**: `@` → `src/`

### Key features

- **WeekPlanner** (`src/components/WeekPlanner.vue`): 7-day meal planner with recipe selection or custom entries
- **WeekResult** (`src/components/WeekResult.vue`): aggregated shopping list + ICS calendar export
- **Calendar export** (`src/utils/calendar-events.ts`): generates ICS events with smart reminders (chicken defrost day before, minced meat morning-of)
- **Recipe display**: `Recipe.vue` renders frontmatter ingredients, `RecipeList.vue` lists all recipes

### Recipe format

Recipes use `template.md` as reference. Allowed units: g, ml, el, tl, kl, teen, stuk, beetje (Dutch).

## CI/CD

GitHub Actions deploys to GitHub Pages on push to `main`. Jobs: prettier check, type check, recipe/unit lint, build, deploy.
