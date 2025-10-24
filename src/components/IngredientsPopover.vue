<script setup lang="ts">
import IngredientsList from "./IngredientsList.vue";
import type { Recipe } from "../recipes.data";

defineProps<{ id: string; recipe: Recipe }>();
</script>

<template>
  <button
    class="btn btn-alt whitespace-nowrap"
    :id="'popover-toggle-' + id"
    :popovertarget="'popover-' + id"
  >
    Check ingredients
  </button>

  <div popover class="ingredients-popover" :id="'popover-' + id" :anchor="'popover-toggle-' + id">
    <IngredientsList :ingredients="recipe.ingredients" />
  </div>
</template>

<style scoped>
[popover] {
  position: absolute;
  inset: auto;
  margin: 0;
  padding: 0;
}

.ingredients-popover {
  position-try-fallbacks: --top;
  top: anchor(bottom);
  right: anchor(right);
  margin-block-start: 8px;

  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  padding: calc(var(--spacing) * 2);
  padding-right: calc(var(--spacing) * 4);
  border: 1px solid var(--vp-c-border);
  border-radius: calc(var(--spacing) * 2);
}

@position-try --top {
  inset: auto;
  margin: 0;

  bottom: anchor(top);
  right: anchor(right);
  margin-block-end: 8px;
}
</style>
