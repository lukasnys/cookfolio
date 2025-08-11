import { getRecipes } from "./utils/get-recipes.js";

export const ALLOWED_UNITS = [
  "g",
  "portie",
  "snuf",
  "el",
  "teen",
  "tl",
  "stuk",
  "blad",
  "tak",
  "ml",
  "kl",
  "scheut",
  "reep",
  "dl",
  "squirt",
];

let hasErrors = false;

const recipes = getRecipes();
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    if (!ALLOWED_UNITS.includes(ingredient.unit)) {
      hasErrors = true;

      console.error(
        `❌ Invalid unit "${ingredient.unit}" found in recipe "${recipe.title}" for ingredient "${ingredient.name}"`,
      );
    }
  });
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log("✅ All units are valid");
}
