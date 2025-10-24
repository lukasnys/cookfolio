import DefaultTheme from "vitepress/theme";
import Recipe from "@/components/docs/Recipe.vue";
import RecipeList from "@/components/docs/RecipeList.vue";
import WeekPlanner from "@/components/WeekPlanner.vue";
import IngredientsPopover from "@/components/IngredientsPopover.vue";
import IngredientsList from "@/components/IngredientsList.vue";

import "@/styles/index.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component("IngredientsList", IngredientsList);
    app.component("Recipe", Recipe);
    app.component("WeekPlanner", WeekPlanner);
    app.component("RecipeList", RecipeList);
    app.component("IngredientsPopover", IngredientsPopover);
  },
};
