<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData();
const ingredients = frontmatter.value.ingredients;
</script>

<template>
  <h1>{{ $frontmatter.title }}</h1>

  <h2>Ingredients</h2>
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.name">
      {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }} 
    </li>
  </ul>
</template>