// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  workers: 1,  // setting the number of workers to 1 for running the tests in a single thread
  timeout: 40 * 1000,     // setting the test level timeout for each test case to 40 seconds

  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  use: {
    actionTimeout: 10 * 1000,  // setting the action level timeout for each action to 10 seconds
    browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure',  // setting the trace level to retain on failure
    screenshot: 'retain-on-failure',  // setting the screenshot level to retain on failure for each test case
    video: 'retain-on-failure',  // setting the video level to retain on failure   for each test case

  },
});
module.exports = config
