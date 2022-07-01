/**
 * DO NOT TOUCH THIS FILE
 */

import { GameApiResponse } from "../models";
import { OddsApiResponse } from "../models";

/**
 * Allow you to simulate a fake API call
 * @param endpoint 'games' or 'odds'
 */
export function mockFetch(endpoint: string): Promise<GameApiResponse[] | OddsApiResponse[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint.includes('games')) {
                resolve(gameList);
            }

            if (endpoint.includes('odds')) {
                resolve(oddsList);
            }

            reject('Error: Unable to call endpoint..')
        }, 1000)
    })
}

const gameList: GameApiResponse[] = [
    {
        id: '1',
        team1: 'Nice',
        team2: 'FC Lorient'
    },
    {
        id: '2',
        team1: 'Paris SG',
        team2: 'Lyon'
    },
    {
        id: '3',
        team1: 'Marseille',
        team2: 'Montpellier'
    },
];

const oddsList: OddsApiResponse[] = [
    {
        id: 'e54rcds78',
        gameId: '1',
        oddsTeam1: 1.24,
        oddsDraw: 2.18,
        oddsTeam2: 2.57
    },
    {
        id: 'vc14sz85',
        gameId: '2',
        oddsTeam1: 1.12,
        oddsDraw: 2.50,
        oddsTeam2: 3.62
    },
    {
        id: 'eaws4dc36',
        gameId: '3',
        oddsTeam1: 1.77,
        oddsDraw: 2.51,
        oddsTeam2: 2.90
    },
];