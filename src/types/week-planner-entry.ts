import type { Recipe } from "@/types/recipe.js";

export interface WeekPlannerEntry {
  /** YYYY-MM-DD */
  readonly id: string;
  readonly recipe?: Recipe;
  readonly customRecipeTitle?: string;
}
