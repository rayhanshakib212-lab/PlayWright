import { test, expect} from "@playwright/test";
 






test('playwright test', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

  
});




test('playwright test level time out', async ({ page }) => {


  const slowExpect = expect.configure({ timeout: 10000 });  // setting the custome timeout for the expect function to wait for the element to be visible
 page.setDefaultTimeout(10000);  // setting the default timeout for the page to wait for the element to be visible
 // timeout hierarchy : global timeout > test level timeout > action level timeout > expect level timeout
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

  //  await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 5000});

    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

  
});