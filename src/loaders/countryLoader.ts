import { z } from 'astro:content';
import fetch from 'node-fetch';

export const CountrySchema = z.object({
  id: z.string(),
  name: z.string(),
  capital: z.string(),
  population: z.number()
});

export type Country = z.infer<typeof CountrySchema>;

export function countryLoader() {
  return CountrySchema.shape;
}

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format');
    }

    return data.map((country: any): Country => ({
      id: country.cca3,
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      population: country.population
    }));
  } catch (error) {
    console.error('Error loading countries data:', error);
    return [];
  }
}
