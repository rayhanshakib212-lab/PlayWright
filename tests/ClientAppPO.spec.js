const { test, expect } = require('@playwright/test');

test('Browser Context-Vlidating Error login', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    //console.log(await page.title());
    await page.locator("#userEmail").fill("smarthq@gmail.com");
    await page.locator("#userPassword").fill("Imhere123!");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body b').allTextContents();

    console.log(titles);


});























test('UI Contorls', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click(); //clicking the 2nd radio button option
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked()); // showing the current state of the radio button
    await expect(page.locator('.radiotextsty').last()).toBeChecked(); // validating is it checked or not
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();  // checking the terms checkbox is checked or not
    await page.locator('#terms').uncheck(); // clicking on the trerms checkbox to check it
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");



});





test('Child windows handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listen for any new page pending to open
            documentLink.click(),

        ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

});




test.only('Client App login', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("#userEmail").fill("smarthq@gmail.com");
    await page.locator("#userPassword").fill("Imhere123!");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }



    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count(); //Total ammount of options in the dropdown
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText("smarthq@gmail.com");
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.waitForTimeout(2000);

    expect(orderId.includes(orderIdDetails)).toBeTruthy();


});