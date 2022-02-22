import { Bet, User } from "../models";
import { reduxStore } from "./store";

export const selectSelectedBets = (): Bet[] => {
    const { selectedBets } = reduxStore.getState();
    return selectedBets;
}

export const selectUser = (): User => {
    const { user } = reduxStore.getState();
    return user;
}