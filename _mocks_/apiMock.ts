import { Page, Route } from 'playwright'

export const gamesMockRoute = (page: Page, mock: unknown): Promise<void> => page.route('http://localhost:3000/api/games.json', (route: Route) => {
    route.fulfill({
        status: 301,
        body: JSON.stringify(mock)
    })
})

export const oddsMockRoute = (page: Page, mock: unknown): Promise<void> => page.route('http://localhost:3000/api/odds.json', (route: Route) => {
    route.fulfill({
        status: 301,
        body: JSON.stringify(mock)
    })
})