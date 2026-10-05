import { test, expect } from "@playwright/test";


test('playwright iFrame', async ({ page }) => {



    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goBack();
    //await page.goForward();
    //await page.reload();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept()); // handling the javascript alert pop up
    await page.locator("#confirmbtn").click();    // handling the javascript alert pop up
    await page.locator("#mousehover").scrollIntoViewIfNeeded();
    await page.locator("#mousehover").hover();  // handling the mouse hover action

    const framePage = page.frameLocator("#courses-iframe");
    page.pause();

    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    page.pause();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);



});
