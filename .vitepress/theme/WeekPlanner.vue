<script setup lang="ts">
import { ref } from "vue";
import {
  data as recipes,
  type Ingredient,
  type Recipe,
} from "./recipes.data.ts";

import RecipeSelect from "./RecipeSelect.vue";

const weekData = ref<{ id: string; label: string; recipe: string | null }[]>([
  { id: "friday", label: "Friday", recipe: null },
  { id: "saturday", label: "Saturday", recipe: null },
  { id: "sunday", label: "Sunday", recipe: null },
  { id: "monday", label: "Monday", recipe: null },
  { id: "tuesday", label: "Tuesday", recipe: null },
  { id: "wednesday", label: "Wednesday", recipe: null },
  { id: "thursday", label: "Thursday", recipe: null },
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

        <IngredientsPopover
          v-if="day.recipe"
          :id="day.id"
          :recipe="recipesByName[day.recipe]"
        />
      </div>
    </div>

    <button class="btn btn-brand" @click="saveWeek">Save</button>

    <div v-if="ingredientsRequired">
      <h3>Ingredients Required</h3>
      <IngredientsList :ingredients="ingredientsRequired" />
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
</style>
