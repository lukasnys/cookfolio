export interface Ingredient {
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;
}

export interface Recipe {
  readonly title: string;
  readonly slug: string;
  readonly ingredients: readonly Ingredient[];
  readonly category: "main" | "dessert" | "side";
}
