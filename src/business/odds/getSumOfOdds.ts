import { Bet } from "../../models/bet";

export const getSumOfOdds = (bets: Bet[]): number => {
    if (!bets.length) {
        return 0;
    }

    return Math.round(bets.reduce((acc, bet) => acc * bet.selectedOdd, 1) * 100) / 100
}