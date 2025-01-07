import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
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
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        port: 8881
    }
});
