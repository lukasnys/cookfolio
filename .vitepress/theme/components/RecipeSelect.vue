<script setup>
import { computed } from "vue";
import { data as recipes } from "../recipes.data.ts";

defineProps({
  selectedRecipe: String | null,
  dayId: String,
});

const emit = defineEmits(["update:recipe"]);

const mainRecipes = computed(() =>
  recipes.filter((recipe) => recipe.category === "main"),
);
</script>

<template>
  <select
    :id="dayId"
    :name="dayId"
    class="recipe-select"
    :value="selectedRecipe"
    @change="emit('update:recipe', $event.target.value)"
  >
    <option value="">Select a recipe</option>
    <option v-for="recipe in mainRecipes" :value="recipe.title">
      {{ recipe.title }}
    </option>
  </select>
</template>
