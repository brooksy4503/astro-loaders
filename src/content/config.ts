import { defineCollection } from 'astro:content';
import { randomUserLoader } from '../loaders/randomUserLoader';
import { jsonPlaceholderLoader } from '../loaders/jsonPlaceholderLoader';
import { jokeLoader } from '../loaders/jokeLoader';
import { countryLoader } from '../loaders/countryLoader';

const randomUsers = defineCollection({
  type: 'data',
  schema: randomUserLoader(),
});

const countries = defineCollection({
  type: 'data',
  schema: countryLoader(),
});

const posts = defineCollection({
  type: 'data',
  schema: jsonPlaceholderLoader(),
});

const jokes = defineCollection({
  type: 'data',
  schema: jokeLoader(),
});

export const collections = {
  randomUsers,
  countries,
  posts,
  jokes,
};
