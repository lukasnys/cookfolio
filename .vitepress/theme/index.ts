import DefaultTheme from 'vitepress/theme';
import Recipe from './Recipe.vue';
import RecipeList from './RecipeList.vue';
import WeekPlanner from './WeekPlanner.vue';

import "./tailwind.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Recipe', Recipe);
    app.component('WeekPlanner', WeekPlanner);
    app.component('RecipeList', RecipeList);
  }
}