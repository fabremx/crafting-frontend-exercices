import { mapResponseToGameOdds } from './mapResponseGameOdds'

describe('map Response To GameOdds', () => {
    it('return correct mapping', () => {
        const GAMES_API_RESPONSE = [
            {
                id: '1',
                type: 'football',
                team1: 'PSG',
                team2: 'Lyon',
                date: '12/05/2022',
                country: 'France',
                city: 'Paris',
                stadium: 'Stade 1'
            }
        ]

        const ODDS_API_RESPONSE = [
            {
                id: 'dhyg2et',
                gameId: '1',
                oddsTeam1: 1.20,
                oddsDraw: 2.32,
                oddsTeam2: 4.89,
                bookmakerName: 'Jean'
            }
        ]

        expect(mapResponseToGameOdds(GAMES_API_RESPONSE, ODDS_API_RESPONSE)).toEqual([
            {
                gameId: '1',
                team1: 'PSG',
                team2: 'Lyon',
                oddsTeam1: 1.20,
                oddsDraw: 2.32,
                oddsTeam2: 4.89,
            }
        ])
    })
})