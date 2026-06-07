import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Enables global test functions like 'describe', 'it', 'expect'
    // so you don't have to import them in every single file
    globals: true,

    // Limits test environment to node since stores are pure TS logic
    environment: "node",

    // Tells Vitest where to look for tests
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
