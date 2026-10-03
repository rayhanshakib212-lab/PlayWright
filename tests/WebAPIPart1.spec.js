const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('./Utils/APIUtils');
const loginPayload = {userEmail: "smarthq@gmail.com", userPassword: "Imhere123!"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
let response;
test.beforeAll(async () => {

 const apiContext = await request.newContext();
 const apiutils = new APIUtils(apiContext,loginPayload);
 response = await apiutils.createOrder(orderPayLoad);

/* 
 const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
     {
 data: loginPayload

     })//200,201
     expect(loginResponse.ok()).toBeTruthy();


const loginResponseJson = await loginResponse.json();
token = loginResponseJson.token;
console.log(token);


const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
{
  data:  orderPayLoad ,
  headers: { Authorization: token,
  "Content-Type": "application/json" } 




            })
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
           orderId =  orderResponseJson.orders[0];
*/
});


/*
test.beforeEach(async () => {
  console.log("Before Each Test");
}); 
*/



test('Client App Login with API', async ({ page }) => {

await page.addInitScript(value => {
  window.localStorage.setItem('token', value);
}, response.token);

await page.goto('https://rahulshettyacademy.com/client');
await page.waitForLoadState('networkidle');
const titles= await page.locator('.card-body b').allTextContents();
page.pause();
console.log(titles);




});




test.only('Client App login and Order with API', async ({ page }) =>
 {



/*
const Apiutils = new apiUtils(apiContext,loginPayload);
const orderID = createOrder(orderPayLoad, token);
*/


await page.addInitScript(value => {
  window.localStorage.setItem('token', value);
}, response.token);



await page.goto('https://rahulshettyacademy.com/client');
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows = page.locator("tbody tr");


for(let i=0; i< await rows.count(); ++i)
{
  const rowOrderId = await rows.nth(i).locator("th").textContent();
  if(response.orderId.includes(rowOrderId))
  {
    await rows.nth(i).locator("button").first().click();
    break;
  }
}

const orderIdDetails = await page.locator(".col-text").textContent();
await page.waitForTimeout(2000);

expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


});