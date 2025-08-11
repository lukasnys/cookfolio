<script setup lang="ts">
import { ref } from "vue";
import {
  data as recipes,
  type Ingredient,
  type Recipe,
} from "./recipes.data.ts";
import { google } from "calendar-link";
import * as ics from "ics";
import dayjs from "dayjs";

import RecipeSelect from "./RecipeSelect.vue";
import { Dayjs } from "dayjs";
import { ArrowDownTrayIcon, CalendarIcon } from "@heroicons/vue/24/solid";

const NUMBER_OF_DAYS = 7;

interface WeekDataEntry {
  id: string;
  label: string;
  recipe: string | null;
}

const startDate = ref<Dayjs>(dayjs());

const weekData = ref<WeekDataEntry[]>([]);
const generateWeekData = () => {
  weekData.value = Array.from({ length: NUMBER_OF_DAYS }).reduce<
    WeekDataEntry[]
  >((acc, _, index) => {
    const current = startDate.value.add(index, "day");

    acc.push({
      id: current.format("YYYY-MM-DD"),
      label: current.format("dddd DD/MM/YYYY"),
      recipe: null,
    });

    return acc;
  }, []);
};
generateWeekData();

const ingredientsRequired = ref<Ingredient[] | undefined>(undefined);

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

const getLinkToAddToGcal = (weekDataEntry: WeekDataEntry) => {
  if (!weekDataEntry.recipe) return;

  type Duration = Parameters<typeof google>[0]["duration"];

  const event = {
    title: weekDataEntry.recipe,
    start: dayjs(weekDataEntry.id).hour(19),
    duration: [1, "hour"] satisfies Duration,
    url: "https://github.com/lukasnys/cookfolio",
  };

  return google(event);
};

const downloadIcsFile = () => {
  type Start = ReturnType<typeof ics.convertTimestampToArray>;

  const events = weekData.value
    .map((entry) => {
      if (!entry.recipe) return;

      const recipe = recipesByName[entry.recipe];

      const date = dayjs(entry.id).hour(19);
      const start = [
        date.year(),
        date.month() + 1,
        date.date(),
        date.hour(),
        date.minute(),
      ] satisfies Start;

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

  ingredientsRequired.value = undefined;
  generateWeekData();
};
</script>

<template>
  <h2>Week Planner</h2>

  <div class="week-planner">
    <input
      type="date"
      :value="startDate.format('YYYY-MM-DD')"
      @change="onStartDateChange"
    />

    <div class="week-planner__days">
      <div v-for="(day, index) in weekData" :key="day.id" class="day-field">
        <label class="day-field__label" :for="day.id">{{ day.label }}</label>
        <div class="flex justify-end flex-wrap items-center gap-2">
          <RecipeSelect
            :selectedRecipe="day.recipe"
            :dayId="day.id"
            @update:recipe="(value) => (weekData[index].recipe = value)"
            class="flex-1"
          />

          <div v-if="day.recipe" class="flex items-center gap-2">
            <IngredientsPopover
              :id="day.id"
              :recipe="recipesByName[day.recipe]"
            />

            <a
              class="btn btn-alt btn-icon"
              target="_blank"
              :href="getLinkToAddToGcal(day)"
            >
              <CalendarIcon class="size-5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-brand" @click="saveWeek">Save</button>

    <div v-if="ingredientsRequired">
      <div class="flex justify-between items-center gap-2">
        <h3>Ingredients Required</h3>
        <button class="btn btn-alt btn-icon" @click="downloadIcsFile">
          <ArrowDownTrayIcon class="size-5" />
        </button>
      </div>
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
</style>
