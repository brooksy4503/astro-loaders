import { z } from "astro:content";
import fetch from "node-fetch";

export const RandomUserSchema = z.object({
  gender: z.string(),
  name: z.object({
    title: z.string(),
    first: z.string(),
    last: z.string(),
  }),
  location: z.object({
    street: z.object({
      number: z.number(),
      name: z.string(),
    }),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postcode: z.union([z.string(), z.number()]),
  }),
  email: z.string(),
  phone: z.string(),
  cell: z.string(),
  picture: z.object({
    large: z.string(),
    medium: z.string(),
    thumbnail: z.string(),
  }),
});

export type RandomUser = z.infer<typeof RandomUserSchema>;

export function randomUserLoader() {
  return RandomUserSchema.shape;
}

export async function fetchRandomUsers(count: number = 10): Promise<RandomUser[]> {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data: unknown = await response.json();

    if (typeof data !== 'object' || data === null || !('results' in data) || !Array.isArray(data.results)) {
      throw new Error("Unexpected data format");
    }

    return data.results.map((item: unknown) => RandomUserSchema.parse(item));
  } catch (error) {
    console.error("Error loading random users:", error);
    return [];
  }
}
