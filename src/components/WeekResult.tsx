import { useMemo } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

import type { Ingredient, Recipe } from "@/types/recipe.js";
import { getIcsBlob } from "@/utils/calendar-events.js";
import type { WeekPlannerEntry } from "@/types/week-planner-entry.js";
import { IngredientsList } from "./IngredientsList.js";

interface WeekResultProps {
  readonly weekData: readonly WeekPlannerEntry[];
}

export function WeekResult({ weekData }: WeekResultProps): React.ReactElement {
  const downloadIcsFile = (): void => {
    const icsBlob = getIcsBlob([...weekData]);
    const url = URL.createObjectURL(icsBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "week-planner.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const customRecipes = useMemo(
    () => weekData.map((day) => day.customRecipeTitle).filter((title): title is string => !!title),
    [weekData],
  );

  const ingredients = useMemo(() => {
    const grouped = weekData
      .map((day) => day.recipe)
      .filter((recipe): recipe is Recipe => !!recipe)
      .flatMap((recipe) => recipe.ingredients)
      .reduce<Map<string, Ingredient>>((acc, ingredient) => {
        const key = `${ingredient.name}|${ingredient.unit}`;
        const prev = acc.get(key);
        acc.set(
          key,
          prev ? { ...prev, quantity: prev.quantity + ingredient.quantity } : { ...ingredient },
        );
        return acc;
      }, new Map());

    return [...grouped.values()];
  }, [weekData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <h3>Ingredients Required</h3>
        <button
          className="btn btn-alt btn-icon"
          onClick={downloadIcsFile}
          aria-label="Download calendar file"
        >
          <ArrowDownTrayIcon className="size-5" />
        </button>
      </div>

      <IngredientsList ingredients={ingredients} />

      {customRecipes.length > 0 && (
        <div className="custom-recipes-reminder">
          <h4>Custom Recipes Reminder</h4>
          <p>Don&apos;t forget to add the ingredients of these recipe(s) to your shopping list:</p>
          <ul>
            {customRecipes.map((title) => (
              <li key={title}>
                <strong>{title}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
