<script setup>
import { data as recipes } from "../../recipes.data.ts";
</script>

<template>
  <h2>Recipes</h2>

  <div class="recipe-list">
    <div v-for="recipe in recipes" :key="recipe.url" class="recipe">
      <a :href="recipe.url">{{ recipe.title }}</a>
    </div>
  </div>
</template>

<style scoped>
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing) * 4);
}

.recipe {
  margin: 0;
  padding: calc(var(--spacing) * 6);
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;
}
</style>
