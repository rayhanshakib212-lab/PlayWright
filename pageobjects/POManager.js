const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashBoardPage');

class POManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);

    }
}


module.exports = { POManager };