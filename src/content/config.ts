import { defineCollection, z } from 'astro:content';
import { countryLoader } from '../loaders/countryLoader.js';

const countries = defineCollection({
  type: 'data',
  schema: z.object(countryLoader())
});

export const collections = { countries };
