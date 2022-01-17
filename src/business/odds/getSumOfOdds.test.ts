import { Bet } from "../../models/bet";
import { getSumOfOdds } from "./getSumOfOdds";

const EMPTY_BETS: Bet[] = [];
const FILLED_BETS: Bet[] = [{
    gameId: 'id1',
    selectedChoice: '1',
    selectedOdd: 1.52,
},
{
    gameId: 'id2',
    selectedChoice: 'Draw',
    selectedOdd: 1.12,
}];

describe('getSumOfOdds', () => {
    it('should return 0 when user have not choose bets', () => {
        expect(getSumOfOdds(EMPTY_BETS)).toBe(0)
    });

    it('should return odds sum of 1.70 when user choose bets (odds 1.5 and 1.12)', () => {
        expect(getSumOfOdds(FILLED_BETS)).toBe(1.70)
    });
});