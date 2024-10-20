import { z } from "astro:content";
import fetch from "node-fetch";

// Define the schema for a joke
export const JokeSchema = z.object({
  id: z.number(),
  type: z.string(),
  setup: z.string(),
  punchline: z.string(),
});

// Create a type based on the schema
export type Joke = z.infer<typeof JokeSchema>;

// Implement the loader function
export function jokeLoader() {
  return JokeSchema.shape;
}

// Create a fetch function to retrieve jokes
export async function fetchJokes(): Promise<Joke[]> {
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_ten");
    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format");
    }

    return data.map((item: any): Joke => ({
      id: item.id,
      type: item.type,
      setup: item.setup,
      punchline: item.punchline,
    }));
  } catch (error) {
    console.error("Error loading jokes:", error);
    return [];
  }
}
