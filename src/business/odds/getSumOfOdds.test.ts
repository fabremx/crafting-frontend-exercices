import { Bet } from "../../models/bet";
import { CHOICE_1, CHOICE_DRAW } from "../../shared/constants/oddsChoice";
import { getSumOfOdds } from "./getSumOfOdds";

const EMPTY_BETS: Bet[] = [];
const FILLED_BETS: Bet[] = [{
    gameId: 'id1',
    selectedChoice: CHOICE_1,
    selectedOdd: 1.52,
},
{
    gameId: 'id2',
    selectedChoice: CHOICE_DRAW,
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