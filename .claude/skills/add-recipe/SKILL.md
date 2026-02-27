---
name: add-recipe
description: Add a new recipe to the cookfolio project. Use when the user provides a recipe (as an image, description, or list of ingredients) and wants it added to the site.
---

# Add Recipe Skill for Cookfolio

Guide the user through adding a new recipe to the Cookfolio site, proposing a name and structure, confirming with the user, then implementing, verifying, and pushing the changes.

## Workflow

Make a todo list for all the tasks in this workflow and work on them one after another.

### 1. Understand the Recipe

Read whatever the user has provided — an image, handwritten notes, or a description. Extract:

- Ingredients (names, quantities, units)
- Cooking method and temperature
- What dish it is / what it's usually served with

If the user mentions adapting the recipe (e.g. "we use this marinade for chicken instead"), apply that adaptation before proposing.

### 2. Explore Existing Recipes

Read 1–2 existing recipe files from `src/content/recipes/` and `src/content.config.ts` to confirm the current schema and naming style. Do NOT skip this — the schema evolves.

Key constraints to check:

- Allowed units (currently: g, ml, el, tl, kl, teen, stuk, beetje)
- Required frontmatter fields (title, category, ingredients)
- Allowed categories (main, dessert, side)
- Naming conventions (short, Dutch or Dutch/English mix, lowercase with hyphens for filename)

### 3. Propose Name and Recipe

Present the proposed recipe to the user **before creating any files**. Show:

- Proposed recipe name
- Full ingredient list with quantities and units (in Dutch)
- Proposed instructions (in Dutch)

Ask the user to confirm or adjust:

- Recipe name
- Ingredient names, quantities, units
- Whether to include common accompaniments (rice, bread, etc.) as ingredients — useful for the shopping list generator

Use the `AskUserQuestion` tool to ask 1–2 targeted confirmation questions.

### 4. Check Ingredient Categories

Read `src/data/ingredient-categories.ts` and check whether every ingredient in the recipe is already mapped. Note any missing ones.

Each missing ingredient needs to be added to the correct category:

- `vlees-vis` — meat, fish, poultry
- `groenten-fruit` — vegetables, fruit, fresh herbs
- `zuivel` — dairy, eggs
- `conserven-sauzen` — condiments, sauces, canned goods, stocks, vinegars
- `kruiden` — dried spices and herbs, salt, pepper
- `droge-voorraad` — dry goods: pasta, rice, oil, nuts, bread
- `bakken` — baking supplies: flour, sugar, chocolate
- `overig` — fallback (water, etc.)

Also check `src/utils/calendar-events.ts` for smart reminders. Currently:

- `kipfilet` → triggers "Defrost Chicken" reminder the evening before
- `gemengd gehakt` → triggers "Fetch Minced Meat" reminder the morning of

If the recipe contains a new type of meat that should have a reminder, flag this to the user.

### 5. Implement

After user confirms, create the recipe file and add any missing category entries.

**Recipe file:** `src/content/recipes/<slug>.md`

- Slug: lowercase, hyphens, no special characters, matches the title
- All ingredient names in Dutch
- Instructions in Dutch, as bullet points under `## Instructions`

**Categories:** add missing entries to `src/data/ingredient-categories.ts` in the correct section, keeping alphabetical order within each section where possible.

### 6. Verify

Run:

```bash
pnpm lint   # validates Zod schema + prettier
pnpm build  # confirms recipe page renders
```

Fix any errors before proceeding.

### 7. Commit and Push

Stage only the new/modified files:

- `src/content/recipes/<slug>.md`
- `src/data/ingredient-categories.ts` (if changed)

Commit with a clear message describing the recipe and any category additions. Push to the current feature branch.

## Wrap Up

Summarise what was done:

- Recipe name and file created
- Ingredients added to category map (if any)
- Lint and build results
- Any smart reminders that will trigger automatically (e.g. defrost chicken)
