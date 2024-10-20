import { defineConfig } from "astro/config";
import tailwind from "tailwind-astro";

// ... existing configuration ...

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
