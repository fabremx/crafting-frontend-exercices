import { GameInfo } from "../models/game";
import { OddsInfo } from "../models/odds";

export function mockFetch(endpoint: string): Promise<GameInfo[] | OddsInfo[]> {
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

const gameList: GameInfo[] = [
    {
        id: '1',
        type: 'football',
        adversary1: 'Nice',
        adversary2: 'FC Lorient'
    },
    {
        id: '2',
        type: 'football',
        adversary1: 'Paris SG',
        adversary2: 'Lyon'
    },
    {
        id: '3',
        type: 'football',
        adversary1: 'Marseille',
        adversary2: 'Montpellier'
    },
];

const oddsList: OddsInfo[] = [
    {
        id: 'e54rcds78',
        gameId: '1',
        odd1: 1.24,
        oddDraw: 2.18,
        odd2: 2.57
    },
    {
        id: 'vc14sz85',
        gameId: '2',
        odd1: 1.12,
        oddDraw: 2.50,
        odd2: 3.62
    },
    {
        id: 'eaws4dc36',
        gameId: '3',
        odd1: 1.77,
        oddDraw: 2.51,
        odd2: 2.90
    },
];