<script setup>
import { computed } from "vue";
import { data as recipes } from "../recipes.data.ts";

const { selectedRecipe, customRecipeTitle, dayId } = defineProps({
  selectedRecipe: String | null,
  customRecipeTitle: String | undefined,
  dayId: String,
});

const CUSTOM_RECIPE_ID = "-1";

const emit = defineEmits(["update:recipe", "update:custom"]);

const mainRecipes = computed(() => recipes.filter((recipe) => recipe.category === "main"));

const isCustomMode = computed(() => {
  return customRecipeTitle !== undefined && customRecipeTitle !== null;
});

const handleSelectChange = (value) => {
  if (value === CUSTOM_RECIPE_ID) {
    emit("update:recipe", null);
    emit("update:custom", "");
    return;
  }

  emit("update:recipe", value);
  emit("update:custom", undefined);
};
</script>

<template>
  <div v-if="!isCustomMode">
    <select
      :id="dayId"
      :name="dayId"
      :value="selectedRecipe"
      class="w-full"
      @change="handleSelectChange($event.target.value)"
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
      :id="dayId + '-custom'"
      :name="dayId + '-custom'"
      placeholder="Enter custom recipe name..."
      :value="customRecipeTitle"
      class="w-full"
      @input="emit('update:custom', $event.target.value)"
    />
    <button type="button" @click="emit('update:custom', undefined)" class="btn btn-alt">
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
