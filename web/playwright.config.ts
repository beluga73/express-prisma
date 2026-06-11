import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, ".env.e2e") });

const REQUIRED_ENVS = ["FRONTEND_URL", "TEST_USER_EMAIL", "TEST_USER_PASSWORD"];

for (const env of REQUIRED_ENVS) {
  if (!process.env[env]) {
    console.error(
      `\n❌ Missing required environment variable: ${env} in .env.e2e\n`,
    );
    process.exit(1);
  }
}

export default defineConfig({
  testDir: "./e2e",
  retries: 1,
  fullyParallel: true,
  timeout: 10 * 1000,
  expect: {
    timeout: 4000,
  },
  webServer: {
    command: "npm run dev",
    url: process.env.FRONTEND_URL,
    reuseExistingServer: true,
  },

  use: {
    actionTimeout: 4000,
    // The critical baseURL for your test files
    baseURL: process.env.FRONTEND_URL,

    // Debugging artifacts
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // launchOptions: {
    //   slowMo: 1000,
    // },
  },

  // Browser Matrix
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // You can uncomment these later if you want to test other browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
