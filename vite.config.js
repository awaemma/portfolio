import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Ensures relative paths for assets, good for static hosting
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'products.html',
        projects: 'projects.html',
        academy: 'academy.html',
        blogs: 'blogs.html',
        about: 'about.html',
      }
    }
  }
})
