/**
 * DO NOT TOUCH THIS FILE
 */

import { GameApiResponse } from '../models'
import { OddsApiResponse } from '../models'

/**
 * Allow you to simulate a fake API call
 * @param endpoint 'games' or 'odds'
 */

export function mockFetch(endpoint: string): Promise<GameApiResponse[] | OddsApiResponse[]> {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if (endpoint.includes('games')) {
                const data = await retrieveDataFrom('http://localhost:3000/api/games.json')
                return resolve(data.games as GameApiResponse[])
            }

            if (endpoint.includes('odds')) {
                const data = await retrieveDataFrom('http://localhost:3000/api/odds.json')
                return resolve(data.odds as OddsApiResponse[])
            }

            reject('Error: Unable to call endpoint..')
        }, 300)
    })
}

async function retrieveDataFrom(url: string): Promise<Record<string, unknown>> {
    const response = await fetch(url)
    return await response.json()
}