import { BetChoice, BetInfo } from "../models";

export const UPDATE_SELECTED_BET = 'UPDATE_SELECTED_BET';

export const doUpdateSelectedBet = (betInfo: BetInfo, choice: BetChoice) => ({
    type: UPDATE_SELECTED_BET, 
    payload: { betInfo, choice }
})