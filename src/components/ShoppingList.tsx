import { useMemo } from "react";

import type { Ingredient } from "@/types/recipe.js";
import type { IngredientCategory } from "@/data/ingredient-categories.js";
import { CATEGORY_LABELS, getIngredientCategory } from "@/data/ingredient-categories.js";

interface ShoppingListProps {
  readonly ingredients: readonly Ingredient[];
}

export function ShoppingList({ ingredients }: ShoppingListProps): React.ReactElement | null {
  const groupedByCategory = useMemo(() => {
    const groups = Map.groupBy(ingredients, (i) => getIngredientCategory(i.name));
    const orderedCategories = Object.keys(CATEGORY_LABELS) as IngredientCategory[];
    return orderedCategories
      .filter((cat) => groups.has(cat))
      .map((cat) => ({ category: cat, label: CATEGORY_LABELS[cat], items: groups.get(cat) ?? [] }));
  }, [ingredients]);

  if (groupedByCategory.length === 0) return null;

  return (
    <div className="week-result__body">
      {groupedByCategory.map(({ category, label, items }) => (
        <div key={category} className="week-result__category">
          <h4 className="week-result__category-title">{label}</h4>
          <ul className="week-result__ingredients">
            {items.map((ingredient) => (
              <li key={`${ingredient.name}-${ingredient.unit}`} className="week-result__ingredient">
                <span className="week-result__ingredient-qty">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
