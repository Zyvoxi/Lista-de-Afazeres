import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react({ plugins: [['@swc/plugin-styled-components', {}]] })],
  base: '/lista-de-afazeres',
  build: {
    target: 'es2022',
  },
});
