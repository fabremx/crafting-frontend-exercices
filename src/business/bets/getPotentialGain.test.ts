import { Bet } from "../../models/bet";
import { CHOICE_LEFT, CHOICE_DRAW } from "../../shared/constants/oddsChoice";
import { getPotentialGain } from "./getPotentialGain";

const EMPTY_BETS: Bet[] = [];
const FILLED_BETS: Bet[] = [{
    gameId: 'id1',
    selectedChoice: CHOICE_LEFT,
    selectedOdd: 1.52,
},
{
    gameId: 'id2',
    selectedChoice: CHOICE_DRAW,
    selectedOdd: 1.12,
}];

const EMPTY_STARTING_BET = 0;
const POSITIVE_STARTING_BET = 100;

describe('getPotentialGain', () => {
    it('should return 0 when user have not choose bets', () => {
        expect(getPotentialGain(EMPTY_STARTING_BET, EMPTY_BETS)).toBe(0)
    });

    it('should return 0 when user does not have made a starting bet', () => {
        expect(getPotentialGain(EMPTY_STARTING_BET, FILLED_BETS)).toBe(0)
    });

    it('should return a potential gain to 170 when user select bets and is NOT premium', () => {
        expect(getPotentialGain(POSITIVE_STARTING_BET, FILLED_BETS)).toBe(170)
    });

    it('should return a potential gain to 187 when user select bets and is premium', () => {
        const isUserPremium = true;

        expect(getPotentialGain(POSITIVE_STARTING_BET, FILLED_BETS, isUserPremium)).toBe(187)
    });
});