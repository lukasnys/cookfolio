import type { Recipe } from "@/types/recipe.js";

export interface WeekPlannerEntry {
  /** YYYY-MM-DD */
  readonly id: string;
  recipe?: Recipe;
  customRecipeTitle?: string;
}
