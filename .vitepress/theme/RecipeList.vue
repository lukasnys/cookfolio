<script setup>
  import { data as recipes } from './recipes.data.ts';
</script>

<template>
  <ul>
    <li v-for="recipe in recipes" :key="recipe.url">
      <a :href="recipe.url">{{ recipe.title }}</a>
    </li>
  </ul>
</template>