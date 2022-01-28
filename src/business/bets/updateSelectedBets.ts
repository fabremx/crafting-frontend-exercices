import { Bet, BetChoice, BetInfo } from "../../models/bet";

export const updateSelectedBets = (currentBets: Bet[], selectedBetInfo: BetInfo, selectedChoice: BetChoice): Bet[] => {
    const newBets = currentBets.map((bet: Bet) => ({ ...bet }));

    const existingBetIndex = currentBets.findIndex((bet: Bet) => bet.gameId === selectedBetInfo.gameId);

    const bet = {
        gameId: selectedBetInfo.gameId,
        selectedChoice: selectedChoice,
        selectedOdd: selectedBetInfo[`odd${selectedChoice}`]!
    }

    existingBetIndex >= 0
        ? newBets[existingBetIndex] = bet
        : newBets.push(bet);

    return newBets;
}