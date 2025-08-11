import DefaultTheme from "vitepress/theme";
import Recipe from "./Recipe.vue";
import RecipeList from "./RecipeList.vue";
import WeekPlanner from "./WeekPlanner.vue";
import IngredientsPopover from "./IngredientsPopover.vue";

import "./index.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Recipe", Recipe);
    app.component("WeekPlanner", WeekPlanner);
    app.component("RecipeList", RecipeList);
    app.component("IngredientsPopover", IngredientsPopover);
  },
};
