import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/cookfolio/",
  title: "Cookfolio",
  description: "A cookfolio for recipes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    socialLinks: [{ icon: "github", link: "https://github.com/lukasnys/cookfolio" }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
