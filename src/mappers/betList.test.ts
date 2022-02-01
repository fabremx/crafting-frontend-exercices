import { mapBetList } from "./betList";

describe('bet list mapper', () => {
    it('return correct mapping', () => {
        const GAME_INFO = [
            {
                id: '1',
                type: 'football',
                adversary1: 'PSG',
                adversary2: 'Lyon',
            }
        ];

        const ODDS_INFO = [
            {
                id: 'dhyg2et',
                gameId: '1',
                odd1: 1.20,
                odddraw: 2.32,
                odd2: 4.89,
            }
        ]

        expect(mapBetList(GAME_INFO, ODDS_INFO)).toEqual([
            {
                gameId: '1',
                type: 'football',
                adversary1: 'PSG',
                adversary2: 'Lyon',
                odd1: 1.20,
                odddraw: 2.32,
                odd2: 4.89,
            }
        ])
    });
});