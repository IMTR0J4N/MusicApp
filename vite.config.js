import { defineConfig } from 'vite';
import path from 'path';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias pour le dossier 'src'
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ComponentBuilder: resolve(__dirname, 'src/js/builder/ComponentBuilder.js'),
        mainJS: resolve(__dirname, 'src/js/components/main.js'),
        NavItemComponent: resolve(__dirname, 'src/js/components/NavItemComponent.js'),
        styles: resolve(__dirname, 'src/scss/main.scss'),
      },
      output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild', // Utilise esbuild pour la minification
    cssCodeSplit: true, // Sépare les CSS dans des fichiers distincts
  }
});
