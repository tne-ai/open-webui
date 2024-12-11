import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
	plugins: [
		sveltekit(),
		wasm(),
		topLevelAwait(),
		commonjs({
			include: [/node_modules/, "@graphai/llm_agents"], // Process specific dependencies
		}),
	],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version || '1.0.0'), // Default to '1.0.0' if not provided
		APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build'),
		'process.env': {
			BUCKET: process.env.BUCKET || '',
			DISPATCHER_ENDPOINT: process.env.DISPATCHER_ENDPOINT || '',
			AWS_REGION: 'us-west-2',
			AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
			AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
			AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
			EBP_QA_API_KEY: process.env.EBP_QA_API_KEY || '',
			VITE_GRAPHAI_DEV: process.env.VITE_GRAPHAI_DEV || '',
		},
		__dirname: JSON.stringify(dirname(fileURLToPath(import.meta.url)))
	},
	build: {
		target: 'esnext', // Ensure support for modern JS features
		rollupOptions: {
			plugins: [
				commonjs(), // Use Rollup plugin for CommonJS compatibility
			],
		},
	},
	worker: {
		format: 'es', // Ensure workers use ES format
	},
	server: {
		port: 5174,
		fs: {
			allow: [
				"/Users/lhahn1/ws/git/orion/extern/open-webui/tne-agent-v2/src/utils",
				"/Users/lhahn1/ws/git/orion/extern/open-webui/tne-agent-v2/tests/data/graphai_flows",
			],
		},
	},
	optimizeDeps: {
		include: ["@tne/tne-agent-v2", "@graphai/llm_agents"],
		exclude: ["tiktoken"],
		esbuildOptions: {
		  plugins: [
			NodeGlobalsPolyfillPlugin({
			  buffer: true,
			}),
			NodeModulesPolyfillPlugin(),
		  ],
		},
	},
});
