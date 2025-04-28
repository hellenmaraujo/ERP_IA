import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Carrega apenas variáveis começando com VITE_
export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, '..'); // vai um nível acima do frontend
  const env = loadEnv(mode, envDir);

  return {
    plugins: [react()],
    server: {
      port: 5173,
      historyApiFallback: true,
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
  };
});