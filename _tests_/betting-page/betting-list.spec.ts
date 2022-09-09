import { Browser, BrowserContext, chromium, Page } from 'playwright'
import { gamesMockRoute, oddsMockRoute } from '../../_mocks_/apiMock'

import { BettingPage } from './Betting-page'

const MOCKED_GAMES_RESPONSE = {
    games: [{
        id: 'gameId',
        team1: 'team1',
        team2: 'team2',
        date: 'date',
        country: 'country',
        city: 'city',
        stadium: 'stadium'
    }]
}

const MOCKED_ODDS_RESPONSE = {
    odds: [{
        id: 'id',
        gameId: 'gameId',
        oddsTeam1: 1.1,
        oddsDraw: 2.2,
        oddsTeam2: 0.5,
        bookmakerName: 'bookmakerName',
    }]
}

describe('Betting list', () => {
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

    it('should render 1 game odds lines when backend retrieves 1 game odds', async () => {
        const bettingListNumber = await bettingPage.getBettingListCount()
        expect(bettingListNumber).toBe(1)
    })
})