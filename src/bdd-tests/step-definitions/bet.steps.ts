import {Given} from "@cucumber/cucumber";
import {WebDriver} from "selenium-webdriver";
import { customDriver } from '../world';

let driver: WebDriver;

Given('User visits {homepage}', async function(homepage) {
    driver = customDriver.driver
    await driver.get(homepage)
});
