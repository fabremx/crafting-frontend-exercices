import { Browser, BrowserContext, Page, chromium } from 'playwright'
import { gamesMockRoute, oddsMockRoute } from '../_mocks_/apiMock'

import { BettingPage } from './Betting-page'

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

const STAKE_IDENTIFIER = 'arl-stake'
const SUMMARY_IDENTIFIER = 'arl-summary'

describe('Betting page', () => {
    let browser: Browser
    let context: BrowserContext
    let page: Page
    let bettingPage: BettingPage

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
        bettingPage = new BettingPage(page)

        await gamesMockRoute(page, MOCKED_GAMES_RESPONSE)
        await oddsMockRoute(page, MOCKED_ODDS_RESPONSE)

        await bettingPage.goto()
        await bettingPage.getStarted()

    })

    afterAll(async () => {
        await browser.close()
    })

    it('should render only the betting list when user loads page', async () => {
        const isBettingListDisplayed = await bettingPage.isBlockDisplayed('arl-betting-list')
        const isStakeDisplayed = await bettingPage.isBlockDisplayed('arl-stake')
        const isSummaryDisplayed = await bettingPage.isBlockDisplayed('arl-summary')

        expect(isBettingListDisplayed).toBeTruthy()
        expect(isStakeDisplayed).toBeFalsy()
        expect(isSummaryDisplayed).toBeFalsy()
    })

    it('should render stake when user selects at least one bet slip', async () => {
        const button = await bettingPage.getBettingItemButton({ line: 1, button: 1 })
        await button.click()

        const isStartingBetDisplayed = await bettingPage.isBlockDisplayed(STAKE_IDENTIFIER)
        expect(isStartingBetDisplayed).toBeTruthy()
    })

    it('should render summary when user selects at least one bet slip AND enter a valid stake', async () => {
        const button = await bettingPage.getBettingItemButton({ line: 1, button: 1 })
        await button.click()

        const input = await bettingPage.getStakeInput()
        await input?.type('100')

        const isSummaryDisplayed = await bettingPage.isBlockDisplayed(SUMMARY_IDENTIFIER)
        expect(isSummaryDisplayed).toBeTruthy()
    })

    it('should NOT render summary when user selects at least one bet slip AND enter a NOT valid stake', async () => {
        const button = await bettingPage.getBettingItemButton({ line: 1, button: 1 })
        await button?.click()

        const input = await bettingPage.getStakeInput()
        await input?.type('dioretgnb')

        const isSummaryDisplayed = await bettingPage.isBlockDisplayed(SUMMARY_IDENTIFIER)
        expect(isSummaryDisplayed).toBe(false)
    })

    it('should hide summary when user delete his existing stake', async () => {
        const button = await bettingPage.getBettingItemButton({ line: 1, button: 1 })
        await button?.click()

        const input = await bettingPage.getStakeInput()
        await input?.type('1')
        await input?.press('Backspace')

        const isSummaryDisplayed = await bettingPage.isBlockDisplayed(SUMMARY_IDENTIFIER)
        expect(isSummaryDisplayed).toBe(false)
    })

    it('should render correct bets information when user select 2 bets slip (odds 1.24 and 2.50) with 100 € as stake', async () => {
        const firstLineButton = await bettingPage.getBettingItemButton({ line: 1, button: 1 })
        const SecondLineButton = await bettingPage.getBettingItemButton({ line: 2, button: 1 })
        await firstLineButton?.click()
        await SecondLineButton?.click()

        const input = await bettingPage.getStakeInput()
        await input?.type('100')

        const summaryContent = await bettingPage.getSummaryContent()
        expect(summaryContent).toContain('Nombre de paris joués: 2')
        expect(summaryContent).toContain('Potentiel gain: 252 €')
    })
})
