import { defineCollection, z } from "astro:content";

const ALLOWED_UNITS = ["g", "ml", "el", "tl", "kl", "teen", "stuk", "beetje"] as const;

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.enum(["main", "dessert", "side"]).default("main"),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.enum(ALLOWED_UNITS),
      }),
    ),
  }),
});

export const collections = { recipes };
