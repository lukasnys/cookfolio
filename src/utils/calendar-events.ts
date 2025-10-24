import assert from "assert";
import * as ics from "ics";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

import type { Recipe } from "@/recipes.data.js";
import { recipeHasIngredient } from "./recipe-has-ingredient.js";

const EVENT_DINNER_TIME_HOUR = 19;
const EVENT_DINNER_TIME_DURATION_MINUTES = 60;

const EVENT_CHICKEN_REMINDER_HOUR = 21;
const EVENT_CHICKEN_REMINDER_DURATION_MINUTES = 15;

const EVENT_MINCED_MEAT_REMINDER_HOUR = 10;
const EVENT_MINCED_MEAT_REMINDER_DURATION_MINUTES = 15;

interface WeekPlannerEntry {
  /**
   * YYYY-MM-DD
   */
  id: string;
  /**
   * The recipe assigned to this day, or null if none.
   * Can be null if no recipe is assigned or if a custom entry title is used.
   */
  recipe: Recipe | null;
  /**
   * Custom title for the entry.
   * Null if no custom title is set.
   */
  customEntryTitle?: string;
}

type getIcsDateArray = ReturnType<typeof ics.convertTimestampToArray>;
const getIcsDateArray = (date: Dayjs): getIcsDateArray => {
  return [date.year(), date.month() + 1, date.date(), date.hour(), date.minute()];
};

/**
 * Generates a Blob representing the ICS calendar file for the selected recipes.
 */
export function getIcsBlob(weekPlannerEntries: WeekPlannerEntry[]): Blob {
  const recipeEvents = getIcsEvents(weekPlannerEntries);
  const icsEvents = ics.createEvents(recipeEvents);
  return new Blob([icsEvents.value!], { type: "text/calendar" });
}

function getIcsEvents(weekPlannerEntries: WeekPlannerEntry[]): ics.EventAttributes[] {
  return weekPlannerEntries.reduce<ics.EventAttributes[]>((acc, entry) => {
    const date = dayjs(entry.id);

    if (entry.customEntryTitle) {
      acc.push(getIcsEventForCustomEntry(date, entry.customEntryTitle));
      return acc;
    }

    if (!entry.recipe) return acc;

    acc.push(getIcsEventForRecipe(date, entry.recipe));

    const hasChicken = recipeHasIngredient(entry.recipe, "kipfilet");
    if (hasChicken) acc.push(getIcsEventForChickenReminder(date));

    const hasMincedMeat = recipeHasIngredient(entry.recipe, "gemengd gehakt");
    if (hasMincedMeat) acc.push(getIcsEventForMincedMeatReminder(date));

    return acc;
  }, []);
}

function getIcsEventForCustomEntry(entryDate: Dayjs, customTitle: string): ics.EventAttributes {
  return {
    title: customTitle,
    start: getIcsDateArray(entryDate.hour(EVENT_DINNER_TIME_HOUR)),
    duration: { minutes: EVENT_DINNER_TIME_DURATION_MINUTES },
  };
}

function getIcsEventForRecipe(entryDate: Dayjs, recipe: Recipe): ics.EventAttributes {
  return {
    title: recipe.title,
    description: `https://lukasnys.github.io/cookfolio/${recipe.url}`,
    start: getIcsDateArray(entryDate.hour(EVENT_DINNER_TIME_HOUR)),
    duration: { minutes: EVENT_DINNER_TIME_DURATION_MINUTES },
  };
}

function getIcsEventForChickenReminder(date: Dayjs): ics.EventAttributes {
  const reminderDateStart = date.subtract(1, "day").hour(EVENT_CHICKEN_REMINDER_HOUR);

  return {
    title: "Defrost Chicken",
    description: "Reminder: Defrost the chicken for tomorrow's recipe.",
    start: getIcsDateArray(reminderDateStart),
    duration: { minutes: EVENT_CHICKEN_REMINDER_DURATION_MINUTES },
  };
}

function getIcsEventForMincedMeatReminder(date: Dayjs): ics.EventAttributes {
  const reminderDateStart = date.subtract(1, "day").hour(EVENT_MINCED_MEAT_REMINDER_HOUR);

  return {
    title: "Fetch Minced Meat",
    description: "Reminder: Fetch the minced meat for tomorrow's recipe.",
    start: getIcsDateArray(reminderDateStart),
    duration: { minutes: EVENT_MINCED_MEAT_REMINDER_DURATION_MINUTES },
  };
}
