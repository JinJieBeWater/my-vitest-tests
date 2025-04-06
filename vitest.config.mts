import { defineConfig } from "vitest/config";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

export default defineConfig({
	test: {
		setupFiles: ["./src/test/setup.ts"],
		server: {
			deps: {
				inline: ["next"],
			},
		},
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
