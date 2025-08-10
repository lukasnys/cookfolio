<script setup>
  import { data as recipes } from './recipes.data.ts';
</script>

<template>
  <select id="monday" name="monday" class="recipe-select">
    <option value="">Select a recipe</option>
    <option v-for="recipe in recipes" :value="recipe.title">{{ recipe.title }}</option>
  </select>
</template>

<style scoped>
  /* -500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 */
  .recipe-select {
    font-size: .875rem;
    font-weight: 400;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-border);
    border-radius: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 2);
  }


  select:focus-visible {
    outline: 2px solid var(--vp-c-tip-1);
    outline-offset: 2px;
  }

</style>