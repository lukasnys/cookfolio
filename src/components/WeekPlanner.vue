<script setup lang="ts">
import { computed, ref } from "vue";
import { data as recipes, type Recipe } from "../recipes.data";
import dayjs from "dayjs";

import RecipeSelect from "./RecipeSelect.vue";
import { Dayjs } from "dayjs";
import type { WeekPlannerEntry } from "@/types/week-planner-entry";

const NUMBER_OF_DAYS = 7;

export interface WeekDataEntry {
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

function getRecipeByTitle(title: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.title === title);
}

const weekDataWithRecipes = computed(() => {
  return weekData.value.map((day) => {
    const recipe = day.recipe ? getRecipeByTitle(day.recipe) : undefined;

    return {
      ...day,
      recipe,
    };
  });
});

const isResultShown = ref(false);

const onSaveClick = () => {
  isResultShown.value = true;
};

const onStartDateChange = (event: Event) => {
  if (!event.target) return;
  startDate.value = dayjs((event.target as HTMLInputElement).value);

  isResultShown.value = false;
  generateWeekData();
};

const updateRecipe = (index: number, recipe: string | null) => {
  isResultShown.value = false;

  weekData.value[index].recipe = recipe;
};

const updateCustom = (index: number, customRecipeTitle: string | undefined) => {
  isResultShown.value = false;

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

          <IngredientsPopover
            v-if="day.recipe"
            :id="day.id"
            :recipe="getRecipeByTitle(day.recipe)"
          />
        </div>
      </div>
    </div>

    <button class="btn btn-brand" @click="onSaveClick">Save</button>

    <WeekResult v-if="isResultShown" :weekData="weekDataWithRecipes" />
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
