import { Bet } from "../../models/bet"

const BONUS_PRENIUM_PERCENTAGE = 10;

export const getPotentialGain = (startingBet: number, bets: Bet[], isUserPrenium: boolean = false): number => {
    if (!bets.length) {
        return 0;
    }

    const potentialGain = Math.floor(startingBet * bets.reduce((acc, bet) => acc = acc * bet.selectedOdd, 1))

    return isUserPrenium
        ? potentialGain + (potentialGain * (BONUS_PRENIUM_PERCENTAGE / 100))
        : potentialGain
}