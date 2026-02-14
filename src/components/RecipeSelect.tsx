import { useMemo } from "react";
import type { Recipe } from "@/types/recipe.js";

const CUSTOM_RECIPE_ID = "-1";

interface RecipeSelectProps {
  readonly id: string;
  readonly recipe?: Recipe;
  readonly customRecipeTitle?: string;
  readonly recipes: readonly Recipe[];
  readonly onUpdate: (value: { recipe?: Recipe; customRecipeTitle?: string }) => void;
}

export function RecipeSelect({
  id,
  recipe,
  customRecipeTitle,
  recipes,
  onUpdate,
}: RecipeSelectProps): React.ReactElement {
  const mainRecipes = useMemo(() => recipes.filter((r) => r.category === "main"), [recipes]);

  const selectValue = customRecipeTitle !== undefined ? CUSTOM_RECIPE_ID : (recipe?.slug ?? "");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;

    if (value === CUSTOM_RECIPE_ID) {
      onUpdate({ customRecipeTitle: "" });
      return;
    }

    const selected = mainRecipes.find((r) => r.slug === value);
    onUpdate({ recipe: selected });
  };

  const handleCustomTitleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onUpdate({ customRecipeTitle: event.target.value });
  };

  if (customRecipeTitle !== undefined) {
    return (
      <div className="custom-recipe-input w-full">
        <input
          type="text"
          id={`${id}-custom`}
          name={`${id}-custom`}
          placeholder="Enter custom recipe name..."
          value={customRecipeTitle}
          className="flex-1 min-w-0"
          onChange={handleCustomTitleInput}
        />
        <button
          type="button"
          onClick={() => onUpdate({ customRecipeTitle: undefined })}
          className="btn btn-alt"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <select id={id} name={id} value={selectValue} className="w-full" onChange={handleSelectChange}>
      <option value="">Select a recipe</option>
      <option value={CUSTOM_RECIPE_ID}>Other (Custom)</option>
      {mainRecipes.map((r) => (
        <option key={r.slug} value={r.slug}>
          {r.title}
        </option>
      ))}
    </select>
  );
}
