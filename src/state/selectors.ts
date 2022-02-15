import { Bet, BetInfo, User } from "../models";
import { reduxStore } from "./store";

export const selectSelectedBets = (): Bet[] => {
    const { selectedBets } = reduxStore.getState();
    return selectedBets;
}

export const selectStartingBet = (): number => {
    const { startingBet } = reduxStore.getState();
    return startingBet;
}

export const selectBetInfos = (): BetInfo[] => {
    const { betInfos } = reduxStore.getState();
    return betInfos;
}

export const selectUser = (): User => {
    const { user } = reduxStore.getState();
    return user;
}