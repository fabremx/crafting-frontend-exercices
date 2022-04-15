import puppeteer from 'puppeteer';

const BET_LIST_IDENTIFIER = '.bet-list';
const BET_ITEM_IDENTIFIER = '.bet-item';
const STARTING_BET_IDENTIFIER = '.starting-bet';
const BETS_SUMMARY_IDENTIFIER = '.bets-summary';

describe('Bets Page', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeEach(async () => {
        browser = await puppeteer.launch()

        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.waitForTimeout(2000)
    })

    afterEach(async () => {
        await browser.close();
    });

    it('should render only the bets list block when user load bets page', async () => {
        const isBetListDisplayed = await isBlockDisplayed(page, BET_LIST_IDENTIFIER);
        const isStartingBetDisplayed = await isBlockDisplayed(page, STARTING_BET_IDENTIFIER);
        const isBetsSummaryDisplayed = await isBlockDisplayed(page, BETS_SUMMARY_IDENTIFIER);

        expect(isBetListDisplayed).toBe(true)
        expect(isStartingBetDisplayed).toBe(false)
        expect(isBetsSummaryDisplayed).toBe(false)
    });

    it('should render the starting bet block when user select at least one bet', async () => {
        const button = await selectBetButton(page, { line: 1, button: 1 });
        await button?.click();

        const isStartingBetDisplayed = await isBlockDisplayed(page, STARTING_BET_IDENTIFIER);
        expect(isStartingBetDisplayed).toBe(true)
    });

    it('should render the bets summary block when user select at least one bet AND enter a valid starting bet', async () => {
        const button = await selectBetButton(page, { line: 1, button: 1 });
        await button?.click();

        const input = await selectStartingBetInput(page)
        await input?.type('100');

        const isBetsSummaryDisplayed = await isBlockDisplayed(page, BETS_SUMMARY_IDENTIFIER);
        expect(isBetsSummaryDisplayed).toBe(true)
    });

    it('should NOT render the bets summary block when user select at least one bet AND enter a NOT valid starting bet', async () => {
        const button = await selectBetButton(page, { line: 1, button: 1 });
        await button?.click();

        const input = await selectStartingBetInput(page)
        await input?.type('dioretgnb');

        const isBetsSummaryDisplayed = await isBlockDisplayed(page, BETS_SUMMARY_IDENTIFIER);
        expect(isBetsSummaryDisplayed).toBe(false)
    });

    it('should hide the bets summary block when user delete his existing starting bet', async () => {
        const button = await selectBetButton(page, { line: 1, button: 1 });
        await button?.click();

        const input = await selectStartingBetInput(page)
        await input?.type('1');
        await input?.press('Backspace')

        const isBetsSummaryDisplayed = await await isBlockDisplayed(page, BETS_SUMMARY_IDENTIFIER);
        expect(isBetsSummaryDisplayed).toBe(false)
    });

    it('should display correct bets information when user select 2 bets (odds 1.24 and 2.50) with 100 € as starting bet', async () => {
        const firstLineButton = await selectBetButton(page, { line: 1, button: 1 });
        const SecondLineButton = await selectBetButton(page, { line: 2, button: 1 });
        await firstLineButton?.click();
        await SecondLineButton?.click();

        const input = await selectStartingBetInput(page)
        await input?.type('100');

        const summaryContent = await page.$eval(`pierce/${BETS_SUMMARY_IDENTIFIER}`, (e) => e.textContent);
        expect(summaryContent).toContain('Nombre de paris joués: 2');
        expect(summaryContent).toContain('Potentiel gain: 138');
    });
});

function isBlockDisplayed(page: puppeteer.Page, blockIdentifier: string) {
    return page.$eval(`pierce/${blockIdentifier}`, (e) => !e.hasAttribute('hidden'));
}

async function selectBetButton(page: puppeteer.Page, { line, button }: { line: number; button: number }) {
    const betItems = await page.$$(`pierce/${BET_ITEM_IDENTIFIER}`);
    const buttons = await betItems[line - 1].$$('button');
    return buttons[button - 1];
}

function selectStartingBetInput(page: puppeteer.Page) {
    return page.$(`pierce/${STARTING_BET_IDENTIFIER} input`);
}