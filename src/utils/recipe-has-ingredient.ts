import type { Recipe } from "@/recipes.data.js";

export function recipeHasIngredient(recipe: Recipe, ingredientName: string): boolean {
  return recipe.ingredients.some(
    (ingredient) => ingredient.name.toLowerCase() === ingredientName.toLowerCase(),
  );
}
