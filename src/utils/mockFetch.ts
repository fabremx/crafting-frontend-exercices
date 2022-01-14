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
        type: 'Ice hockey',
        adversary1: 'Rouen',
        adversary2: 'Amiens'
    },
    {
        id: '2',
        type: 'Football',
        adversary1: 'PSG',
        adversary2: 'Lyon'
    },
    {
        id: '3',
        type: 'Tennis',
        adversary1: 'Roger Federer',
        adversary2: 'Raphael Nadal'
    },
];

const oddsList: OddsInfo[] = [
    {
        id: 'e54rcds78',
        gameId: '1',
        odd1: 1.52,
        oddDraw: 3.20,
        odd2: 2.57
    },
    {
        id: 'vc14sz85',
        gameId: '2',
        odd1: 1.12,
        oddDraw: 4.50,
        odd2: 3.62
    },
    {
        id: 'eaws4dc36',
        gameId: '3',
        odd1: 1.77,
        odd2: 1.61
    },
];