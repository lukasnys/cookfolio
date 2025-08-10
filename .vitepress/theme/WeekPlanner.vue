<script setup>
import RecipeSelect from './RecipeSelect.vue';

const weekData = [
  { id: 'monday', label: 'Monday', recipe: null },
  { id: 'tuesday', label: 'Tuesday', recipe: null },
  { id: 'wednesday', label: 'Wednesday', recipe: null },
  { id: 'thursday', label: 'Thursday', recipe: null },
  { id: 'friday', label: 'Friday', recipe: null },
  { id: 'saturday', label: 'Saturday', recipe: null },
  { id: 'sunday', label: 'Sunday', recipe: null }
];

const saveWeek = () => {
  console.log(weekData);
}
</script>

<style scoped>
  .week-planner {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .day-field {
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
  }

  .btn {
    font-weight: 600;
    border-radius: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  }

  .btn-brand {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
  }
</style>

<template>
  <h2>Week Planner</h2>

  <div class="week-planner">
    <div v-for="(day, index) in weekData" :key="day.id" class="day-field">
      <label :for="day.id">{{ day.label }}</label>
      <RecipeSelect 
        :selectedRecipe="day.recipe"
        :dayId="day.id"
        @update:recipe="value => weekData[index].recipe = value"
      />
    </div>

    <button class="btn btn-brand" @click="saveWeek">Save</button>
  </div>
</template>
