import fs from "fs";
import fg from "fast-glob";
import matter from "gray-matter";
import type { Recipe } from "./constants.js";

export function getRecipes(): Recipe[] {
  const recipeFiles = fg.sync("recipes/**/*.md", { absolute: true });

  return recipeFiles.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    return matter(content).data as Recipe;
  });
}
