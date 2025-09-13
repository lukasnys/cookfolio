<script setup lang="ts">
import { ref } from "vue";
import { data as recipes, type Ingredient, type Recipe } from "../recipes.data.ts";
import * as ics from "ics";
import dayjs from "dayjs";

import RecipeSelect from "./RecipeSelect.vue";
import { Dayjs } from "dayjs";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

const NUMBER_OF_DAYS = 7;
const DINNER_HOUR = 19;
const EVENT_DURATION_HOURS = 1;

interface WeekDataEntry {
  id: string;
  label: string;
  recipe: string | null;
  customRecipeTitle?: string;
}

const startDate = ref<Dayjs>(dayjs());

const weekData = ref<WeekDataEntry[]>([]);
const generateWeekData = () => {
  weekData.value = Array.from({ length: NUMBER_OF_DAYS }).reduce<WeekDataEntry[]>(
    (acc, _, index) => {
      const current = startDate.value.add(index, "day");

      acc.push({
        id: current.format("YYYY-MM-DD"),
        label: current.format("dddd DD/MM/YYYY"),
        recipe: null,
      });

      return acc;
    },
    [],
  );
};
generateWeekData();

interface WeekResult {
  ingredients: Ingredient[];
  customRecipes: string[];
}
const weekResult = ref<WeekResult | undefined>(undefined);

const recipesByName = recipes.reduce<Record<string, Recipe>>((acc, recipe) => {
  acc[recipe.title] = recipe;
  return acc;
}, {});

const saveWeek = () => {
  const customRecipes = weekData.value
    .map((day) => day.customRecipeTitle)
    .filter((customTitle): customTitle is string => !!customTitle);

  const recipes = weekData.value
    .filter((day) => day.recipe !== null)
    .map((day) => recipesByName[day.recipe!]);
  const ingredients = recipes.reduce<Ingredient[]>((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const existing = acc.find((i) => i.name === ingredient.name && i.unit === ingredient.unit);
      if (existing) {
        existing.quantity += ingredient.quantity;
      } else {
        acc.push({ ...ingredient });
      }
    });

    return acc;
  }, []);

  weekResult.value = {
    ingredients,
    customRecipes,
  };
};

const downloadIcsFile = () => {
  type Start = ReturnType<typeof ics.convertTimestampToArray>;

  const events = weekData.value
    .filter((entry) => entry.recipe || entry.customRecipeTitle)
    .map((entry) => {
      const date = dayjs(entry.id).hour(DINNER_HOUR);
      const start = [
        date.year(),
        date.month() + 1,
        date.date(),
        date.hour(),
        date.minute(),
      ] satisfies Start;

      if (entry.customRecipeTitle) {
        return {
          title: entry.customRecipeTitle,
          start,
          duration: { hours: EVENT_DURATION_HOURS },
        };
      }

      const recipe = recipesByName[entry.recipe!];
      return {
        title: recipe.title,
        description: `https://lukasnys.github.io/cookfolio/${recipe.url}`,
        start,
        duration: { hours: 1 },
      };
    })
    .filter((event) => !!event);

  const icsEvents = ics.createEvents(events);

  const blob = new Blob([icsEvents.value!], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "week-planner.ics";
  a.click();
  URL.revokeObjectURL(url);
};

const onStartDateChange = (event: Event) => {
  if (!event.target) return;
  startDate.value = dayjs((event.target as HTMLInputElement).value);

  weekResult.value = undefined;
  generateWeekData();
};

const updateRecipe = (index: number, recipe: string | null) => {
  weekData.value[index].recipe = recipe;
};

const updateCustom = (index: number, customRecipeTitle: string | undefined) => {
  weekData.value[index] = {
    ...weekData.value[index],
    customRecipeTitle: customRecipeTitle,
  };
};
</script>

<template>
  <h2>Week Planner</h2>

  <div class="week-planner">
    <input type="date" :value="startDate.format('YYYY-MM-DD')" @change="onStartDateChange" />

    <div class="week-planner__days">
      <div v-for="(day, index) in weekData" :key="day.id" class="day-field">
        <label class="day-field__label" :for="day.id">{{ day.label }}</label>
        <div class="flex justify-end flex-wrap items-center gap-2">
          <RecipeSelect
            :selectedRecipe="day.recipe"
            :customRecipeTitle="day.customRecipeTitle"
            :dayId="day.id"
            @update:recipe="(recipe: string | null) => updateRecipe(index, recipe)"
            @update:custom="(customTitle: string | undefined) => updateCustom(index, customTitle)"
            class="flex-1"
          />

          <IngredientsPopover v-if="day.recipe" :id="day.id" :recipe="recipesByName[day.recipe]" />
        </div>
      </div>
    </div>

    <button class="btn btn-brand" @click="saveWeek">Save</button>

    <div v-if="weekResult" class="flex flex-col gap-4">
      <div class="flex justify-between items-center gap-2">
        <h3>Ingredients Required</h3>
        <button class="btn btn-alt btn-icon" @click="downloadIcsFile">
          <ArrowDownTrayIcon class="size-5" />
        </button>
      </div>

      <IngredientsList :ingredients="weekResult.ingredients" />

      <div
        v-if="weekResult.customRecipes && weekResult.customRecipes.length > 0"
        class="custom-recipes-reminder"
      >
        <h4>Custom Recipes Reminder</h4>
        <p>Don't forget to add the ingredients of these recipe(s) to your shopping list:</p>
        <ul>
          <li v-for="customRecipe in weekResult.customRecipes" :key="customRecipe">
            <strong>{{ customRecipe }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.week-planner {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
}

.week-planner__days {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  background-color: var(--vp-c-bg-alt);
  padding: calc(var(--spacing) * 6);
  padding-top: calc(var(--spacing) * 5);
  border-radius: calc(var(--spacing) * 2);
}

.day-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);

  & .day-field__label {
    font-weight: 600;
  }
}

.custom-recipes-reminder {
  background-color: var(--vp-custom-block-warning-bg);
  border: 1px solid var(--vp-custom-block-warning-border);
  border-radius: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 4);

  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);

  & p,
  ul,
  li {
    margin: 0;
  }
}
</style>
