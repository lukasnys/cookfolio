import {
  object,
  string,
  number,
  array,
  type InferInput,
  optional,
  picklist,
} from "valibot";

export const IngredientSchema = object({
  name: string(),
  quantity: number(),
  unit: string(),
});
export type Ingredient = InferInput<typeof IngredientSchema>;

export const RecipeSchema = object({
  title: string(),
  category: optional(picklist(["dessert", "main"] as const)),
  ingredients: array(IngredientSchema),
});
export type Recipe = InferInput<typeof RecipeSchema>;
