import type { Recipe } from "@/types/recipe.js";
import { IngredientsList } from "./IngredientsList.js";

interface IngredientsPopoverProps {
  readonly id: string;
  readonly recipe: Recipe;
}

export function IngredientsPopover({ id, recipe }: IngredientsPopoverProps): React.ReactElement {
  const toggleId = `popover-toggle-${id}`;
  const popoverId = `popover-${id}`;

  return (
    <>
      <button className="btn btn-alt whitespace-nowrap" id={toggleId} popoverTarget={popoverId}>
        Check ingredients
      </button>

      {/* @ts-expect-error -- anchor is a valid HTML attribute but not yet in React types */}
      <div popover="" className="ingredients-popover" id={popoverId} anchor={toggleId}>
        <IngredientsList ingredients={recipe.ingredients} />
      </div>
    </>
  );
}
