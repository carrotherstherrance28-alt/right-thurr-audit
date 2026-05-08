import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import fs from 'node:fs';

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    rollupOptions: {
      input: (() => {
        const input = {
          main: resolve(__dirname, 'index.html'),
        };

        const lanesPath = resolve(__dirname, 'diagnostic/lanes.json');
        if (!fs.existsSync(lanesPath)) return input;

        const lanesConfig = JSON.parse(fs.readFileSync(lanesPath, 'utf8'));
        const lanes = Array.isArray(lanesConfig?.lanes) ? lanesConfig.lanes : [];

        const diagnosticIndexPath = resolve(__dirname, 'diagnostic/index.html');
        if (fs.existsSync(diagnosticIndexPath)) {
          input['diagnostic-index'] = diagnosticIndexPath;
        }

        for (const lane of lanes) {
          if (!lane?.slug) continue;
          const key = `diagnostic-${lane.slug}`;
          input[key] = resolve(__dirname, `diagnostic/${lane.slug}.html`);
        }

        return input;
      })(),
    },
  },
});
