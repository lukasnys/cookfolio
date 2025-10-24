<script setup lang="ts">
import type { Ingredient } from "../recipes.data";

defineProps<{ ingredients: Ingredient[] }>();
</script>

<template>
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.name">
      {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
    </li>
  </ul>
</template>
