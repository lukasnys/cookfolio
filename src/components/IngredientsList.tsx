import type { Ingredient } from "@/types/recipe.js";

interface IngredientsListProps {
  readonly ingredients: readonly Ingredient[];
}

export function IngredientsList({ ingredients }: IngredientsListProps): React.ReactElement {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={`${ingredient.name}-${ingredient.unit}`}>
          {ingredient.quantity} {ingredient.unit} {ingredient.name}
        </li>
      ))}
    </ul>
  );
}
