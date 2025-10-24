import type { Recipe } from "@/recipes.data.js";

export interface WeekPlannerEntry {
  /** YYYY-MM-DD */
  id: string;
  /**
   * The name of the selected recipe, or null if none is selected.
   */
  recipe?: Recipe;
  /**
   * The title of the custom recipe, or null if none is selected.
   */
  customRecipeTitle?: string;
}
