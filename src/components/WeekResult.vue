<script setup lang="ts">
import { computed } from "vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

import { type Ingredient, type Recipe } from "@/recipes.data";
import { getIcsBlob } from "@/utils/calendar-events";
import type { WeekPlannerEntry } from "@/types/week-planner-entry";

const { weekData } = defineProps<{
  weekData: WeekPlannerEntry[];
}>();

const downloadIcsFile = () => {
  const icsBlob = getIcsBlob(weekData);

  const url = URL.createObjectURL(icsBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "week-planner.ics";
  a.click();
  URL.revokeObjectURL(url);
};

const customRecipes = computed(() => {
  return weekData.map((day) => day.customRecipeTitle).filter((title): title is string => !!title);
});

const ingredients = computed(() => {
  const recipes = weekData.map((day) => day.recipe).filter((recipe): recipe is Recipe => !!recipe);
  const ingredients = recipes.flatMap((recipe) => recipe.ingredients);

  return ingredients.reduce<Ingredient[]>((acc, ingredient) => {
    const existing = acc.find((i) => i.name === ingredient.name && i.unit === ingredient.unit);
    if (existing) {
      existing.quantity += ingredient.quantity;
    } else {
      acc.push({ ...ingredient });
    }

    return acc;
  }, []);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center gap-2">
      <h3>Ingredients Required</h3>
      <button class="btn btn-alt btn-icon" @click="downloadIcsFile">
        <ArrowDownTrayIcon class="size-5" />
      </button>
    </div>

    <IngredientsList :ingredients="ingredients" />

    <div v-if="customRecipes && customRecipes.length > 0" class="custom-recipes-reminder">
      <h4>Custom Recipes Reminder</h4>
      <p>Don't forget to add the ingredients of these recipe(s) to your shopping list:</p>
      <ul>
        <li v-for="customRecipe in customRecipes" :key="customRecipe">
          <strong>{{ customRecipe }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>
