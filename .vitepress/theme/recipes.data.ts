import { createContentLoader } from 'vitepress'

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  title: string;
  url: string;
  ingredients: Ingredient[];
}

declare const data: Recipe[];
export { data };

export default createContentLoader('recipes/*.md', {
  transform: (content) => {
    return content.map((page) => ({
      title: page.frontmatter.title,
      url: page.url.replace('/', ''),
      ingredients: page.frontmatter.ingredients,
    }));
  }
})