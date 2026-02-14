import { useMemo } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Recipe } from "@/types/recipe.js";

interface ComboboxItem {
  readonly slug: string;
  readonly title: string;
}

const CUSTOM_ITEM: ComboboxItem = { slug: "-1", title: "Custom" };

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

  const items: ComboboxItem[] = useMemo(
    () => [CUSTOM_ITEM, ...mainRecipes.map((r) => ({ slug: r.slug, title: r.title }))],
    [mainRecipes],
  );

  const selectedValue = useMemo(() => {
    if (customRecipeTitle !== undefined) return CUSTOM_ITEM;
    if (recipe) return { slug: recipe.slug, title: recipe.title };
    return null;
  }, [customRecipeTitle, recipe]);

  const handleValueChange = (value: ComboboxItem | null): void => {
    if (!value) {
      return onUpdate({});
    }

    if (value.slug === CUSTOM_ITEM.slug) {
      return onUpdate({ customRecipeTitle: "" });
    }

    const selected = mainRecipes.find((r) => r.slug === value.slug);
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
        <button type="button" onClick={() => onUpdate({})} className="btn btn-alt">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <Combobox.Root
      items={items}
      value={selectedValue}
      onValueChange={handleValueChange}
      isItemEqualToValue={(a, b) => a.slug === b.slug}
      itemToStringLabel={(item) => item.title}
      autoHighlight
    >
      <div className="combobox-trigger w-full">
        <Combobox.Input id={id} placeholder="Search recipes..." className="combobox-input" />
        <Combobox.Clear className="combobox-clear" aria-label="Clear selection">
          <XMarkIcon className="size-3" />
        </Combobox.Clear>
      </div>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup className="combobox-popup">
            <Combobox.Empty className="combobox-empty">No recipes found.</Combobox.Empty>
            <Combobox.List className="combobox-list">
              {(item: ComboboxItem) => (
                <Combobox.Item key={item.slug} value={item} className="combobox-item">
                  <Combobox.ItemIndicator className="combobox-item-indicator">
                    ✓
                  </Combobox.ItemIndicator>
                  <span>{item.title}</span>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
