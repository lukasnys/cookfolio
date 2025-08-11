import { safeParse } from "valibot";
import { RecipeSchema } from "./utils/constants.js";
import { getRecipes } from "./utils/get-recipes.js";

let hasErrors = false;

const recipes = getRecipes();
recipes.forEach((recipe) => {
  const result = safeParse(RecipeSchema, recipe);
  if (!result.success) {
    hasErrors = true;

    console.error(`❌ Invalid recipe "${recipe.title}"`);
    result.issues.forEach((issue) => {
      console.error(`   ↳ ${issue.message}`);
    });
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log("✅ All recipes are valid");
}
