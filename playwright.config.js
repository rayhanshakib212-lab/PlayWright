// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,     // setting the test level timeout for each test case to 40 seconds
  "Scripts": {
    "regression": "npx playwright test",
    "webTests": "npx playwright test --grep@Web",
    "apiTests": "npx playwright test --grep@API",

  },
  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  use: {
    actionTimeout: 10 * 1000,  // setting the action level timeout for each action to 10 seconds
    browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure',  // setting the trace level to retain on failure
    screenshot: 'on',

  },
});
module.exports = config
