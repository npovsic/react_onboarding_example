import { defineConfig, loadEnv } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASEPATH ?? '/',
    plugins: [
      devtools(),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
    ],
  };
});
