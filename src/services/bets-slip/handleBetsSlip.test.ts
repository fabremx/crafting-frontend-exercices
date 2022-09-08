import { BetSlip, GameOdds } from '../../models'
import { TEAM_1_WINS, TEAM_2_WINS } from '../../shared'
import { handleBetsSlip } from './handleBetsSlip'

const GAME_ODDS_1: GameOdds = {
    gameId: '1',
    team1: 'Nice',
    team2: 'FC Lorient',
    oddsTeam1: 1.24,
    oddsDraw: 2.18,
    oddsTeam2: 2.57
}
const GAME_ODDS_2: GameOdds = {
    gameId: '2',
    team1: 'Paris SG',
    team2: 'Lyon',
    oddsTeam1: 1.12,
    oddsDraw: 2.50,
    oddsTeam2: 3.62
}

const CURRENT_BETS_SLIP: BetSlip[] = [{
    gameId: '1',
    selectedChoice: TEAM_1_WINS,
    selectedOdds: 2.18,
}]

describe('handleBetsSlip', () => {
    it('should add a new bet slip when user choose a unexisting bet slip', () => {
        const gameOdds: GameOdds = GAME_ODDS_2

        const betsSlip: BetSlip[] = handleBetsSlip(CURRENT_BETS_SLIP, gameOdds, TEAM_2_WINS)

        expect(betsSlip).toEqual([
            {
                gameId: '1',
                selectedChoice: TEAM_1_WINS,
                selectedOdds: 2.18,
            },
            {
                gameId: '2',
                selectedChoice: TEAM_2_WINS,
                selectedOdds: 3.62,
            },
        ])
    })

    it('should update a bet choice (of a bet slip) when user select a new choice on existing bet slip', () => {
        const gameOdds: GameOdds = GAME_ODDS_1

        const betsSlip: BetSlip[] = handleBetsSlip(CURRENT_BETS_SLIP, gameOdds, TEAM_2_WINS)

        expect(betsSlip).toEqual([{
            gameId: '1',
            selectedChoice: TEAM_2_WINS,
            selectedOdds: 2.57,
        }])
    })
})