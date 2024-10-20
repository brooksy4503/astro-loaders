# Astro Loader Examples

This repository contains examples of using loaders in Astro to fetch data from various APIs. It demonstrates how to create and use loaders for different types of data sources.

## Getting Started

Follow these steps to set up the project locally and start developing:

1. Clone the repository: `git clone https://github.com/brooksy4503/astro-loaders.git`

2. Navigate to the project directory: `cd astro-loaders`

3. Install dependencies: `npm install`

4. Start the development server: `npm run dev`

5. Open your browser and navigate to `http://localhost:4321` to see the application running.

## Project Structure

- `src/pages/`: Contains Astro pages for different examples
- `src/loaders/`: Contains loader functions for fetching data
- `public/`: Static assets

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the project for production
- `npm run preview`: Previews the built project locally

## Deploying to Production

To deploy this Astro site to production, you can use various hosting platforms that support static site hosting. Here are a few options:

1. **Netlify**:

   - Connect your GitHub repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`

2. **Vercel**:

   - Import your GitHub repository to Vercel
   - Vercel will automatically detect Astro and set up the build configuration

3. **GitHub Pages**:

   - Update your `astro.config.mjs` file to include your repository name as the base: ```javascript
     export default defineConfig({
     site: 'https://brooksy4503.github.io',
     base: '/astro-loaders',
     });

     ```

     ```

   - Run `npm run build`
   - Push the `dist` folder to a new branch called `gh-pages`
   - Enable GitHub Pages in your repository settings and select the `gh-pages` branch as the source

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
