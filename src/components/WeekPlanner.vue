<script setup lang="ts">
import { ref } from "vue";
import { type Recipe } from "../recipes.data";
import dayjs from "dayjs";

import RecipeSelect from "./RecipeSelect.vue";
import { Dayjs } from "dayjs";
import type { WeekPlannerEntry } from "@/types/week-planner-entry";

const NUMBER_OF_DAYS = 7;

const startDate = ref<Dayjs>(dayjs());
const weekData = ref<WeekPlannerEntryWithLabel[]>([]);
const isResultShown = ref(false);

interface WeekPlannerEntryWithLabel extends WeekPlannerEntry {
  label: string;
}

const generateWeekData = () => {
  weekData.value = Array.from({ length: NUMBER_OF_DAYS }).reduce<WeekPlannerEntryWithLabel[]>(
    (acc, _, index) => {
      const current = startDate.value.add(index, "day");

      acc.push({ id: current.format("YYYY-MM-DD"), label: current.format("dddd, MMM D") });

      return acc;
    },
    [],
  );
};
generateWeekData();

const onSaveClick = () => {
  isResultShown.value = true;
};

const onStartDateChange = (event: Event) => {
  if (!event.target) return;
  startDate.value = dayjs((event.target as HTMLInputElement).value);

  isResultShown.value = false;
  generateWeekData();
};

const onUpdateWeekEntry = (
  index: number,
  value: { recipe?: Recipe; customRecipeTitle?: string },
) => {
  isResultShown.value = false;

  const entry = weekData.value[index];
  if (!entry) return;

  entry.recipe = value.recipe;
  entry.customRecipeTitle = value.customRecipeTitle;
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
            :id="day.id"
            :recipe="day.recipe"
            :customRecipeTitle="day.customRecipeTitle"
            @update="(value) => onUpdateWeekEntry(index, value)"
            class="flex-1"
          />

          <IngredientsPopover v-if="day.recipe" :id="day.id" :recipe="day.recipe" />
        </div>
      </div>
    </div>

    <button class="btn btn-brand" @click="onSaveClick">Save</button>

    <WeekResult v-if="isResultShown" :weekData="weekData" />
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
