import { Browser, BrowserContext, chromium, Page } from 'playwright'
import { gamesMockRoute, oddsMockRoute } from '../../_mocks_/apiMock'

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

    it('should display betting page', async () => {
        const isBettingPageDisplayed = await bettingPage.isBlockDisplayed('arl-betting-page')
        expect(isBettingPageDisplayed).toBeTruthy()
    })
})
