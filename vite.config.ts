import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    drop: ['debugger'],
    legalComments: 'none',
  },
  build: {
    outDir: 'dist',
    target: 'es2021',
    minify: 'esbuild',
    cssMinify: true,
    lib: {
      entry: 'src/antigravity-card.ts',
      name: 'AntigravityWithIconCard',
      formats: ['es'],
      fileName: () => 'antigravity-with-icon-card.js',
    },
    rollupOptions: {
      output: {
        compact: true,
      },
    },
  },
});
