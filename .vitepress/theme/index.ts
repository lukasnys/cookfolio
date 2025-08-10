import DefaultTheme from 'vitepress/theme';
import RecipeList from './RecipeList.vue';
import IngredientsList from './IngredientsList.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('RecipeList', RecipeList);
    app.component('IngredientsList', IngredientsList);
  }
}