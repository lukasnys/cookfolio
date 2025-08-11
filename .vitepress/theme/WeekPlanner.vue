<script setup lang="ts">
import { ref } from "vue";
import {
  data as recipes,
  type Ingredient,
  type Recipe,
} from "./recipes.data.ts";

import RecipeSelect from "./RecipeSelect.vue";

const weekData = ref<{ id: string; label: string; recipe: string | null }[]>([
  { id: "monday", label: "Monday", recipe: null },
  { id: "tuesday", label: "Tuesday", recipe: null },
  { id: "wednesday", label: "Wednesday", recipe: null },
  { id: "thursday", label: "Thursday", recipe: null },
  { id: "friday", label: "Friday", recipe: null },
  { id: "saturday", label: "Saturday", recipe: null },
  { id: "sunday", label: "Sunday", recipe: null },
]);

let ingredientsRequired = ref<Ingredient[] | undefined>(undefined);

const recipesByName = recipes.reduce<Record<string, Recipe>>((acc, recipe) => {
  acc[recipe.title] = recipe;
  return acc;
}, {});

const saveWeek = () => {
  const recipes = weekData.value
    .map((day) => day.recipe)
    .filter((value) => value !== null)
    .map((day) => recipesByName[day]);

  ingredientsRequired.value = recipes.reduce<Ingredient[]>((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const existing = acc.find(
        (i) => i.name === ingredient.name && i.unit === ingredient.unit,
      );
      if (existing) {
        existing.quantity += ingredient.quantity;
      } else {
        acc.push({ ...ingredient });
      }
    });

    return acc;
  }, []);
};
</script>

<template>
  <h2>Week Planner</h2>

  <div class="week-planner">
    <div v-for="(day, index) in weekData" :key="day.id" class="day-field">
      <label class="day-field__label" :for="day.id">{{ day.label }}</label>
      <div class="flex items-center gap-4">
        <RecipeSelect
          :selectedRecipe="day.recipe"
          :dayId="day.id"
          @update:recipe="(value) => (weekData[index].recipe = value)"
          class="flex-1"
        />

        <button
          v-if="day.recipe"
          class="btn btn-alt"
          :id="'popover-toggle-' + day.id"
          :popovertarget="'popover-' + day.id"
        >
          Check ingredients
        </button>

        <div
          v-if="day.recipe"
          popover
          class="ingredients-popover"
          :id="'popover-' + day.id"
          :anchor="'popover-toggle-' + day.id"
        >
          <ul>
            <li
              v-for="ingredient in recipesByName[day.recipe].ingredients"
              :key="ingredient.name"
            >
              {{ ingredient.quantity }} {{ ingredient.unit }}
              {{ ingredient.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <button class="btn btn-brand" @click="saveWeek">Save</button>

    <div v-if="ingredientsRequired">
      <h3>Ingredients Required</h3>
      <ul>
        <li v-for="ingredient in ingredientsRequired" :key="ingredient.name">
          {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.week-planner {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
}

.day-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);

  & .day-field__label {
    font-weight: 600;
  }
}

[popover] {
  position: absolute;
  inset: auto;
  margin: 0;
  padding: 0;
}

[popover].ingredients-popover {
  position-try-fallbacks: --top;

  top: anchor(bottom);
  right: anchor(right);
  margin-block-start: 8px;

  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--vp-c-border);
  border-radius: calc(var(--spacing) * 2);

  font-size: 0.875rem;
  line-height: 1.4;

  & ul {
    margin: 0;
  }

  & li + li {
    margin-top: var(--spacing);
  }
}

.btn {
  font-weight: 600;
  border-radius: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
}

.btn-brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

.btn-alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

@position-try --top {
  inset: auto;
  margin: 0;

  bottom: anchor(top);
  right: anchor(right);
  margin-block-end: 8px;
}
</style>
