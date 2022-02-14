import { Bet, BetInfo } from "../../models/bet";
import { CHOICE_RIGHT, CHOICE_DRAW } from "../../shared/constants/oddsChoice";
import { updateSelectedBets } from "./updateSelectedBets";

const BET_INFO_1 = {
    gameId: '1',
    type: 'football',
    adversary1: 'Nice',
    adversary2: 'FC Lorient',
    odd1: 1.24,
    odddraw: 2.18,
    odd2: 2.57
}
const BET_INFO_2 = {
    gameId: '2',
    type: 'football',
    adversary1: 'Paris SG',
    adversary2: 'Lyon',
    odd1: 1.12,
    odddraw: 2.50,
    odd2: 3.62
}
const CURRENT_BETS: Bet[] = [{
    gameId: '1',
    selectedChoice: CHOICE_DRAW,
    selectedOdd: 2.18,
}];

describe('updateSelectedBets', () => {
    it('should add a new bet when user choose a unexisting bet', () => {
        const selectedBetInfo: BetInfo = BET_INFO_2;

        const bets = updateSelectedBets(CURRENT_BETS, selectedBetInfo, CHOICE_RIGHT);

        expect(bets).toEqual([
            {
                gameId: '1',
                selectedChoice: CHOICE_DRAW,
                selectedOdd: 2.18,
            },
            {
                gameId: '2',
                selectedChoice: CHOICE_RIGHT,
                selectedOdd: 3.62,
            },
        ])
    });

    it('should update a bet choice when user select a new choice on existing bet', () => {
        const selectedBetInfo: BetInfo = BET_INFO_1;

        const bets = updateSelectedBets(CURRENT_BETS, selectedBetInfo, CHOICE_RIGHT);

        expect(bets).toEqual([{
            gameId: '1',
            selectedChoice: CHOICE_RIGHT,
            selectedOdd: 2.57,
        }])
    });
});