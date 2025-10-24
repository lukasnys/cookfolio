<script setup lang="ts">
import { computed } from "vue";
import { data as recipes, type Recipe } from "../recipes.data";
import type { WeekPlannerEntry } from "@/types/week-planner-entry";

const CUSTOM_RECIPE_ID = "-1";

const { id, recipe, customRecipeTitle } = defineProps<WeekPlannerEntry>();
const emit = defineEmits<{
  (e: "update", value: { recipe?: Recipe; customRecipeTitle?: string }): void;
}>();

const mainRecipes = computed(() => recipes.filter((recipe) => recipe.category === "main"));

const selectValue = computed(() => {
  if (customRecipeTitle !== undefined) return CUSTOM_RECIPE_ID;

  return recipe ? recipe.title : "";
});

const handleCustomTitleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update", { customRecipeTitle: value });
};

const handleSelectChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;

  if (value === CUSTOM_RECIPE_ID) {
    emit("update", { customRecipeTitle: "" });
    return;
  }

  const recipe = mainRecipes.value.find((r) => r.title === value);
  emit("update", { recipe });
};
</script>

<template>
  <div v-if="customRecipeTitle === undefined">
    <select
      :id="id"
      :name="id"
      :value="selectValue"
      class="w-full"
      @change="handleSelectChange($event)"
    >
      <option value="">Select a recipe</option>
      <option :value="CUSTOM_RECIPE_ID">Other (Custom)</option>
      <option v-for="recipe in mainRecipes" :value="recipe.title">
        {{ recipe.title }}
      </option>
    </select>
  </div>
  <div v-else class="custom-recipe-input">
    <input
      type="text"
      :id="id + '-custom'"
      :name="id + '-custom'"
      placeholder="Enter custom recipe name..."
      :value="customRecipeTitle"
      class="w-full"
      @input="handleCustomTitleInput($event)"
    />
    <button
      type="button"
      @click="emit('update', { customRecipeTitle: undefined })"
      class="btn btn-alt"
    >
      Cancel
    </button>
  </div>
</template>

<style scoped>
.custom-recipe-input {
  display: flex;
  gap: calc(var(--spacing) * 2);
  align-items: center;
}
</style>
