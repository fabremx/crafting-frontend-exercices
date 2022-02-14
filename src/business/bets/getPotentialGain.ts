import { Bet } from "../../models/bet"

const BONUS_PREMIUM_PERCENTAGE = 10;

export const getPotentialGain = (startingBet: number, bets: Bet[], isUserPremium: boolean = false): number => {
    if (!bets.length) {
        return 0;
    }

    const potentialGain = Math.floor(startingBet * bets.reduce((acc, bet) => acc = acc * bet.selectedOdd, 1))

    return isUserPremium
        ? potentialGain + (potentialGain * (BONUS_PREMIUM_PERCENTAGE / 100))
        : potentialGain
}