<template>
  <h2>Ingredients</h2>
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.name">
      {{ ingredient.name }} {{ ingredient.quantity }} {{ ingredient.unit }}
    </li>
  </ul>
</template>

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData();
const ingredients = frontmatter.value.ingredients;
</script>