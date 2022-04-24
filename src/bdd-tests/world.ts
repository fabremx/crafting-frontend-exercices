import {After, Before, setDefaultTimeout} from "@cucumber/cucumber";
require('dotenv').config();
require('chromedriver');
let webdriver = require('selenium-webdriver');

const DEFAULT_TIMEOUT = 1000 * 60;

let customDriver = new webdriver.Builder().forBrowser('chrome');
const driver = customDriver.build();

setDefaultTimeout(DEFAULT_TIMEOUT);

async function openBrowser() {
    await driver.manage().setTimeouts({
        pageLoad: 440000,
        implicit: 5000,
    })
    return driver;
}

After(async function () {
    await quitBrowser()
});

async function quitBrowser() {
    if (customDriver && customDriver.driver) {
        await customDriver.driver.quit();
    }

}

Before(async function () {
    customDriver.driver = await openBrowser();
});

module.exports = {
    'customDriver' : customDriver
}