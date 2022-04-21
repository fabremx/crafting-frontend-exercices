import puppeteer from 'puppeteer';

/**
 * WARNING: 
 * Don't forget to launch application on port 3000
 * before launching tests
 */

describe('Bets Page', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeEach(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage();

        await page.goto('http://localhost:3000');
        await page.waitForTimeout(2000);
    })

    afterEach(async () => {
        await browser.close();
    });

    /**
     * Test to check integration test health
     * Delete it and create your own tests
     */
    it('should success when application running on port 3000', async () => {
        const body = await page.$(`pierce/body`);
        expect(body).toBeTruthy();
    });
});