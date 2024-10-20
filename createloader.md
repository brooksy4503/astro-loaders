# Creating a Loader in Astro

This guide provides step-by-step instructions on how to create a loader in Astro for fetching and processing external data.

## Steps to Create a Loader

1. Create a new TypeScript file in the `src/loaders` directory (e.g., `myDataLoader.ts`).

2. Import necessary dependencies:

   ```typescript
   import { z } from "astro:content";
   import fetch from "node-fetch";
   ```

3. Define a schema for your data using Zod:

   ```typescript
   export const MyDataSchema = z.object({
     id: z.number(),
     title: z.string(),
     // Add other fields as needed
   });
   ```

4. Create a type based on the schema:

   ```typescript
   export type MyData = z.infer<typeof MyDataSchema>;
   ```

5. Implement the loader function:

   ```typescript
   export function myDataLoader() {
     return MyDataSchema.shape;
   }
   ```

6. Create a fetch function to retrieve the data:

   ```typescript
   export async function fetchMyData(): Promise<MyData[]> {
     try {
       const response = await fetch("https://api.example.com/data");
       const data: unknown = await response.json();

       if (!Array.isArray(data)) {
         throw new Error("Unexpected data format");
       }

       return data.map(
         (item: any): MyData => ({
           id: item.id,
           title: item.title,
           // Map other fields as needed
         })
       );
     } catch (error) {
       console.error("Error loading data:", error);
       return [];
     }
   }
   ```

7. Update `src/content/config.ts` to use the new loader:

   ```typescript
   import { defineCollection } from "astro:content";
   import { myDataLoader } from "../loaders/myDataLoader";

   const myData = defineCollection({
     type: "data",
     schema: myDataLoader(),
   });

   export const collections = { myData };
   ```

8. Create a new Astro page to display the data (e.g., `src/pages/mydata.astro`):

   ```astro
   ---
   import { fetchMyData, type MyData } from "../loaders/myDataLoader";

   const myDataItems = await fetchMyData();
   ---

   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>My Data</title>
     </head>
     <body>
       <h1>My Data</h1>
       <ul>
         {myDataItems.map((item: MyData) => (
           <li>
             <h2>{item.title}</h2>
             <p>ID: {item.id}</p>
             <!-- Display other fields as needed -->
           </li>
         ))}
       </ul>
     </body>
   </html>
   ```

9. Ensure all necessary dependencies are installed:

   ```
   npm install node-fetch @types/node-fetch
   ```

10. Update `tsconfig.json` to include:

    ```json
    {
      "compilerOptions": {
        "strictNullChecks": true,
        "allowJs": true
      }
    }
    ```

11. Make sure `src/env.d.ts` includes:
    ```typescript
    /// <reference types="astro/client" />
    /// <reference types="astro/content-collections" />
    ```

By following these steps, you can create a loader for fetching and displaying external data in your Astro project.
