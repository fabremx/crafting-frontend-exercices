import { BetChoice, BetInfo, User } from "../models";

export const UPDATE_SELECTED_BET = 'UPDATE_SELECTED_BET';
export const UPDATE_STARTING_BET = 'UPDATE_STARTING_BET';
export const UPDATE_USER = 'UPDATE_USER';

export const doUpdateSelectedBet = (betInfo: BetInfo, choice: BetChoice) => ({
    type: UPDATE_SELECTED_BET,
    payload: { betInfo, choice }
})

export const doUpdateUser = (user: User) => ({
    type: UPDATE_USER,
    payload: { user }
})