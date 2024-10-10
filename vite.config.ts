import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint({
    failOnError: false,  // Do not fail build on lint errors
    failOnWarning: false, // Do not fail on warnings
  })]
})
