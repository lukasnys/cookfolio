import { object, string, number, array, type InferInput } from "valibot";

export const IngredientSchema = object({
  name: string(),
  quantity: number(),
  unit: string(),
});
export type Ingredient = InferInput<typeof IngredientSchema>;

export const RecipeSchema = object({
  title: string(),
  ingredients: array(IngredientSchema),
});
export type Recipe = InferInput<typeof RecipeSchema>;
