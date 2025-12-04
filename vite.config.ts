import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  // Priority for base resolution:
  // 1. VITE_BASE environment variable (explicit override)
  // 2. If running on Vercel, use root `/` so paths match Vercel deployment
  // 3. If running for GitHub Pages, use the repository name `/icygames2/`
  // 4. Fallback to `./` (relative) which works for many static hosts
  const isVercel = Boolean(process.env.VERCEL);
  const defaultGithubBase = '/icygames2/';
  const base = env.VITE_BASE || (isVercel ? '/' : defaultGithubBase) || './';

  return {
    base,
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});