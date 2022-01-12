import { GameInfo } from "../models/gameInfo";
import { OddInfo } from "../models/oddInfo";

export function mockFetch(endpoint: string): Promise<GameInfo[] | OddInfo[]> {
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

const oddsList: OddInfo[] = [
    {
        id: '1',
        odds1: 1.52,
        draw: 3.20,
        odds2: 2.57
    },
    {
        id: '2',
        odds1: 1.12,
        draw: 4.50,
        odds2: 3.62
    },
    {
        id: '3',
        odds1: 1.77,
        odds2: 1.61
    },
];