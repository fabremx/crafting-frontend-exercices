
import { BetSlip } from '../models'
import { DRAW, TEAM_1_WINS } from '../shared'
import { getPotentialGains } from './getPotentialGains'

const EMPTY_BETS_SLIP: BetSlip[] = []
const FILLED_BETS_SLIP: BetSlip[] = [{
    gameId: 'id1',
    selectedChoice: TEAM_1_WINS,
    selectedOdds: 1.52,
},
{
    gameId: 'id2',
    selectedChoice: DRAW,
    selectedOdds: 1.12,
}]

const EMPTY_STARTING_BET = 0
const POSITIVE_STARTING_BET = 100

describe('getPotentialGains', () => {
    it('should return 0 when user have not choose bets', () => {
        expect(getPotentialGains(EMPTY_STARTING_BET, EMPTY_BETS_SLIP)).toBe(0)
    })

    it('should return 0 when user does not have made a stake', () => {
        expect(getPotentialGains(EMPTY_STARTING_BET, FILLED_BETS_SLIP)).toBe(0)
    })

    it('should return a potential gain to 170 when user select bets slip with a stake of 100€', () => {
        expect(getPotentialGains(POSITIVE_STARTING_BET, FILLED_BETS_SLIP)).toBe(170)
    })
})