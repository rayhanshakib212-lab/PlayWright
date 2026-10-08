const playwright = require('@playwright/test');

const { Before, After } = require('@cucumber/cucumber');

before(async function () {
  this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

after(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});