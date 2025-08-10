<script setup>
import RecipeSelect from './RecipeSelect.vue';
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
    <div class="day-field">
      <label for="monday">Monday</label>
      <RecipeSelect />
    </div>
    
    <div class="day-field">
      <label for="tuesday">Tuesday</label>
      <RecipeSelect />
    </div>
    
    <div class="day-field">
      <label for="wednesday">Wednesday</label>
      <RecipeSelect />
    </div>
    
    <div class="day-field">
      <label for="thursday">Thursday</label>
      <RecipeSelect />
    </div>
    
    <div class="day-field">
      <label for="friday">Friday</label>
      <RecipeSelect />
    </div>
    
    <div class="day-field">
      <label for="saturday">Saturday</label>
      <RecipeSelect />
    </div>
    
    <div class="day-field">
      <label for="sunday">Sunday</label>
      <RecipeSelect />
    </div>

    <button class="btn btn-brand">Save</button>
  </div>
</template>
