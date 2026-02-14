import { useState, useCallback } from "react";
import dayjs from "dayjs";

import type { Recipe } from "@/types/recipe.js";
import type { WeekPlannerEntry } from "@/types/week-planner-entry.js";
import { RecipeSelect } from "./RecipeSelect.js";
import { IngredientsPopover } from "./IngredientsPopover.js";
import { WeekResult } from "./WeekResult.js";

const NUMBER_OF_DAYS = 7;

interface WeekPlannerEntryWithLabel extends WeekPlannerEntry {
  readonly label: string;
}

interface WeekPlannerProps {
  readonly recipes: readonly Recipe[];
}

function generateWeekData(startDate: dayjs.Dayjs): WeekPlannerEntryWithLabel[] {
  return Array.from({ length: NUMBER_OF_DAYS }, (_, index) => {
    const current = startDate.add(index, "day");
    return { id: current.format("YYYY-MM-DD"), label: current.format("dddd, MMM D") };
  });
}

export function WeekPlanner({ recipes }: WeekPlannerProps): React.ReactElement {
  const [startDate, setStartDate] = useState(() => dayjs());
  const [weekData, setWeekData] = useState<WeekPlannerEntryWithLabel[]>(() =>
    generateWeekData(dayjs()),
  );
  const onStartDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const newDate = dayjs(event.target.value);
    setStartDate(newDate);
    setWeekData(generateWeekData(newDate));
  }, []);

  const onUpdateWeekEntry = useCallback(
    (index: number, value: { recipe?: Recipe; customRecipeTitle?: string }): void => {
      setWeekData((prev) =>
        prev.map((entry, i) =>
          i === index
            ? { ...entry, recipe: value.recipe, customRecipeTitle: value.customRecipeTitle }
            : entry,
        ),
      );
    },
    [],
  );

  const hasEntries = weekData.some((day) => day.recipe ?? day.customRecipeTitle);

  return (
    <div className="week-planner">
      <input
        type="date"
        aria-label="Start date"
        value={startDate.format("YYYY-MM-DD")}
        onChange={onStartDateChange}
      />

      <div className="week-planner__days">
        {weekData.map((day, index) => (
          <div
            key={day.id}
            className={`day-field ${(day.recipe ?? day.customRecipeTitle) ? "day-field--active" : ""}`}
          >
            <label className="day-field__label" htmlFor={day.id}>
              {day.label}
            </label>
            <div className="flex justify-end flex-wrap items-center gap-2">
              <RecipeSelect
                id={day.id}
                recipe={day.recipe}
                customRecipeTitle={day.customRecipeTitle}
                recipes={recipes}
                onUpdate={(value) => onUpdateWeekEntry(index, value)}
              />

              {day.recipe && <IngredientsPopover id={day.id} recipe={day.recipe} />}
            </div>
          </div>
        ))}
      </div>

      {hasEntries && <WeekResult weekData={weekData} />}
    </div>
  );
}
