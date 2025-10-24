import DefaultTheme from "vitepress/theme";
import Recipe from "../../src/components/Recipe.vue";
import RecipeList from "../../src/components/RecipeList.vue";
import WeekPlanner from "../../src/components/WeekPlanner.vue";
import IngredientsPopover from "../../src/components/IngredientsPopover.vue";
import IngredientsList from "../../src/components/IngredientsList.vue";

import "./index.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("IngredientsList", IngredientsList);
    app.component("Recipe", Recipe);
    app.component("WeekPlanner", WeekPlanner);
    app.component("RecipeList", RecipeList);
    app.component("IngredientsPopover", IngredientsPopover);
  },
};
