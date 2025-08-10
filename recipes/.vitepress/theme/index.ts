import DefaultTheme from 'vitepress/theme';
import IngredientsList from './components/IngredientsList.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('IngredientsList', IngredientsList);
  }
}