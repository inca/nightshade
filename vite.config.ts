import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'lib/index.ts',
            name: 'nightshade',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
        },
    },
    plugins: [
        vue()
    ],
    esbuild: {
        legalComments: 'none',
        keepNames: true,
    },
    server: {
        port: 8881
    }
});
