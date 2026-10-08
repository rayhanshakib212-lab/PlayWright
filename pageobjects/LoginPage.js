class LoginPage {

    constructor(page) {


        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#username");
        this.password = page.locator("#password");

    }











}

module.exports = { LoginPage };