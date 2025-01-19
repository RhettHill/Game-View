import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            buffer: 'buffer',
        },
    }, server: {
        proxy: {
            '/steamspy': {
                target: 'https://steamspy.com', // The target API endpoint
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/steamspy/, ''); },
            },
        },
    },
});
