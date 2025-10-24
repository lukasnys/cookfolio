import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  base: "/cookfolio/",
  title: "Cookfolio",
  description: "A cookfolio for recipes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Weekly Planner", link: "/weekly-planner" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lukasnys/cookfolio" }],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { "@": resolve(__dirname, "../src") },
    },
  },
});
