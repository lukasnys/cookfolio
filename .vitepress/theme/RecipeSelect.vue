<script setup>
import { data as recipes } from "./recipes.data.ts";

defineProps({
  selectedRecipe: String | null,
  dayId: String,
});

const emit = defineEmits(["update:recipe"]);
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
    <option v-for="recipe in recipes" :value="recipe.title">
      {{ recipe.title }}
    </option>
  </select>
</template>
