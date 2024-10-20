import { z } from 'astro:content';
import fetch from 'node-fetch';

export const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
  }),
  capital: z.array(z.string()).optional(),
  population: z.number(),
  // Add other fields as needed
});

export type Country = z.infer<typeof CountrySchema>;

export async function countryLoader(): Promise<Country[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format');
    }

    return data.map((country: any): Country => ({
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      population: country.population
    }));
  } catch (error) {
    console.error('Error loading countries data:', error);
    return [];
  }
}
