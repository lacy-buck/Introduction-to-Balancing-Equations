import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Compute the base URL automatically for GitHub Pages or local environments.
// - In GitHub Actions, GITHUB_REPOSITORY is automatically provided as "owner/repository-name".
// - For project sites (e.g. "owner/chem-balance"), base path is "/chem-balance/".
// - For user/organization root sites ("owner/owner.github.io"), base path is "/".
// - Can also be overridden with BASE_PATH environment variable.
// - Defaults to './' for local builds and standalone previews.
function getBasePath(): string {
  if (process.env.BASE_PATH) {
    const raw = process.env.BASE_PATH.trim();
    return raw.endsWith('/') ? raw : `${raw}/`;
  }
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length === 2 && parts[1]) {
      const [owner, repo] = parts;
      if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
        return '/';
      }
      return `/${repo}/`;
    }
  }
  return './';
}

export default defineConfig(() => {
  return {
    base: getBasePath(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname ?? '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
