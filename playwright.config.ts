import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  expect: {
    timeout: 5_000,
  },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: false,
  outputDir: "test-results",
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
  ],
  reporter: "line",
  retries: process.env.CI ? 2 : 0,
  testDir: "tests",
  testMatch: "**/*.e2e.ts",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "off",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1",
    reuseExistingServer: false,
    url: "http://127.0.0.1:4173",
  },
  workers: 1,
});
