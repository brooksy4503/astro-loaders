import { z } from 'astro:content';
import fetch from 'node-fetch';

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
});

export type Post = z.infer<typeof PostSchema>;

export function jsonPlaceholderLoader() {
  return PostSchema.shape;
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format');
    }

    return data.map((post: any): Post => ({
      userId: post.userId,
      id: post.id,
      title: post.title,
      body: post.body
    }));
  } catch (error) {
    console.error('Error loading posts data:', error);
    return [];
  }
}
