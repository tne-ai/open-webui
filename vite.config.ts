import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// /** @type {import('vite').Plugin} */
// const viteServerConfig = {
// 	name: 'log-request-middleware',
// 	configureServer(server) {
// 		server.middlewares.use((req, res, next) => {
// 			res.setHeader('Access-Control-Allow-Origin', '*');
// 			res.setHeader('Access-Control-Allow-Methods', 'GET');
// 			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
// 			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
// 			next();
// 		});
// 	}
// };

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
		APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build'),
	    'process.env': {
		  BUCKET: process.env.BUCKET,
		  DISPATCHER_ENDPOINT: process.env.DISPATCHER_ENDPOINT,
		  AWS_REGION: 'us-west-2',
		  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
		  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
		  EBP_QA_API_KEY: process.env.EBP_QA_API_KEY,
		  VITE_GRAPHAI_DEV: process.env.VITE_GRAPHAI_DEV,
		},
	},
	build: {
		sourcemap: true
	},
	worker: {
		format: 'es'
	},
	server: {
		port: 5174,
	},
	optimizeDeps: {
		include: ['@tne/tne-agent-v2']
	},
});
