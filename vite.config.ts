import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'production',
      filename: 'remoteEntry.js',
      exposes: {
        './production-app': './src/App/index.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3005,
  },
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@usecases': path.resolve(__dirname, 'src/usecases'),
      '@App': path.resolve(__dirname, 'src/App'),
      '@fb': path.resolve(__dirname, 'src/firebase'),
      '@generalTypes': path.resolve(__dirname, 'src/types'),
    },
  },
})
