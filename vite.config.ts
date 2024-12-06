import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

/** @type {import('vite').Plugin} */
const viteServerConfig = {
    name: 'log-request-middleware',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
            next();
        });
    },
};

export default defineConfig({
    plugins: [
        sveltekit(), // SvelteKit integration
        wasm(),      // WebAssembly support
        viteServerConfig, // Middleware for headers
    ],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build'),
    },
    build: {
        sourcemap: true,
        target: 'esnext', // Ensure compatibility with modern JavaScript features
        polyfillDynamicImport: false, // Avoid unnecessary polyfills
    },
    worker: {
        format: 'es', // Workers in ES module format
    },
    server: {
        port: 5174,
        cors: true, // Enable CORS for development
    },
    optimizeDeps: {
        exclude: ['tiktoken'], // Avoid pre-bundling tiktoken
    },
});

