export type IngredientUnit = "g" | "ml" | "el" | "tl" | "kl" | "teen" | "stuk" | "beetje";

export interface Ingredient {
  readonly name: string;
  readonly quantity: number;
  readonly unit: IngredientUnit;
}

export interface Recipe {
  readonly title: string;
  readonly slug: string;
  readonly ingredients: readonly Ingredient[];
  readonly category: "main" | "dessert" | "side";
}
