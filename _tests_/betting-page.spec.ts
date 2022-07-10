import { Browser, BrowserContext, chromium, Locator, Page } from 'playwright'
import { gamesMockRoute, oddsMockRoute } from '../_mocks_/apiMock'

const MOCKED_GAMES_RESPONSE = {
    games: [{
        id: 'gameId1',
        team1: 'team1',
        team2: 'team2',
        date: 'date',
        country: 'country',
        city: 'city',
        stadium: 'stadium'
    },
    {
        id: 'gameId2',
        team1: 'team3',
        team2: 'team4',
        date: 'date',
        country: 'country',
        city: 'city',
        stadium: 'stadium'
    }]
}

const MOCKED_ODDS_RESPONSE = {
    odds: [{
        id: 'id1',
        gameId: 'gameId1',
        oddsTeam1: 1.1,
        oddsDraw: 2.2,
        oddsTeam2: 0.5,
        bookmakerName: 'bookmakerName',
    },
    {
        id: 'id2',
        gameId: 'gameId2',
        oddsTeam1: 2.3,
        oddsDraw: 4.1,
        oddsTeam2: 2.1,
        bookmakerName: 'bookmakerName',
    }]
}

const BETTING_ITEM_IDENTIFIER = '.betting-item'
const STAKE_IDENTIFIER = 'arl-stake'
const STAKE_CONTENT_IDENTIFIER = '.stake'
const SUMMARY_IDENTIFIER = 'arl-summary'
const SUMMARY_CONTENT_IDENTIFIER = '.summary'

describe('Betting page', () => {
    let browser: Browser
    let context: BrowserContext
    let page: Page

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: true,
            slowMo: 0,
            devtools: false
        })
    })

    beforeEach(async () => {
        context = await browser.newContext()
        page = await context.newPage()

        await gamesMockRoute(page, MOCKED_GAMES_RESPONSE)
        await oddsMockRoute(page, MOCKED_ODDS_RESPONSE)

        await page.goto('http://localhost:3000')
        await page.waitForSelector('.betting-item', { timeout: 10000 })
    })

    afterAll(async () => {
        await browser.close()
    })

    it('should render only the betting list when user loads page', async () => {
        const isBettingListDisplayed = await isBlockDisplayed(page, 'arl-betting-list')
        const isStakeDisplayed = await isBlockDisplayed(page, 'arl-stake')
        const isSummaryDisplayed = await isBlockDisplayed(page, 'arl-summary')

        expect(isBettingListDisplayed).toBeTruthy()
        expect(isStakeDisplayed).toBeFalsy()
        expect(isSummaryDisplayed).toBeFalsy()
    })

    it('should render stake when user selects at least one bet slip', async () => {
        const button = await getBettingItemButton(page, { line: 1, button: 1 })
        await button.click()

        const isStartingBetDisplayed = await isBlockDisplayed(page, STAKE_IDENTIFIER)
        expect(isStartingBetDisplayed).toBeTruthy()
    })

    it('should render summary when user selects at least one bet slip AND enter a valid stake', async () => {
        const button = await getBettingItemButton(page, { line: 1, button: 1 })
        await button.click()

        const input = await getStakeInput(page)
        await input?.type('100')

        const isSummaryDisplayed = await isBlockDisplayed(page, SUMMARY_IDENTIFIER)
        expect(isSummaryDisplayed).toBeTruthy()
    })

    it('should NOT render summary when user selects at least one bet slip AND enter a NOT valid stake', async () => {
        const button = await getBettingItemButton(page, { line: 1, button: 1 })
        await button?.click()

        const input = await getStakeInput(page)
        await input?.type('dioretgnb')

        const isSummaryDisplayed = await isBlockDisplayed(page, SUMMARY_IDENTIFIER)
        expect(isSummaryDisplayed).toBe(false)
    })

    it('should hide summary when user delete his existing stake', async () => {
        const button = await getBettingItemButton(page, { line: 1, button: 1 })
        await button?.click()

        const input = await getStakeInput(page)
        await input?.type('1')
        await input?.press('Backspace')

        const isSummaryDisplayed = await isBlockDisplayed(page, SUMMARY_IDENTIFIER)
        expect(isSummaryDisplayed).toBe(false)
    })

    it('should render correct bets information when user select 2 bets slip (odds 1.24 and 2.50) with 100 € as stake', async () => {
        const firstLineButton = await getBettingItemButton(page, { line: 1, button: 1 })
        const SecondLineButton = await getBettingItemButton(page, { line: 2, button: 1 })
        await firstLineButton?.click()
        await SecondLineButton?.click()

        const input = await getStakeInput(page)
        await input?.type('100')

        const summaryContent = await page.locator(SUMMARY_CONTENT_IDENTIFIER).textContent()
        expect(summaryContent).toContain('Nombre de paris joués: 2')
        expect(summaryContent).toContain('Potentiel gain: 252 €')
    })
})

async function isBlockDisplayed(page: Page, blockIdentifier: string): Promise<boolean> {
    return await page.locator(blockIdentifier).getAttribute('hidden') === null
}

async function getBettingItemButton(page: Page, { line, button }: { line: number; button: number }): Promise<Locator> {
    const gameOdds = await page.locator(BETTING_ITEM_IDENTIFIER).nth(line - 1)
    return await gameOdds.locator('button').nth(button - 1)
}

async function getStakeInput(page: Page): Promise<Locator> {
    return await page.locator(`${STAKE_CONTENT_IDENTIFIER} input`)
}
