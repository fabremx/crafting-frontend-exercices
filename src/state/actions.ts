import { BetChoice, BetInfo, User } from "../models";

export const UPDATE_BET_INFOS = 'UPDATE_BET_INFOS';
export const UPDATE_SELECTED_BET = 'UPDATE_SELECTED_BET';
export const UPDATE_STARTING_BET = 'UPDATE_STARTING_BET';
export const UPDATE_USER = 'UPDATE_USER';

export const doUpdateBetInfos = (betInfos: BetInfo[]) => ({
    type: UPDATE_BET_INFOS,
    payload: { betInfos }
})

export const doUpdateSelectedBet = (betInfo: BetInfo, choice: BetChoice) => ({
    type: UPDATE_SELECTED_BET,
    payload: { betInfo, choice }
})

export const doUpdateStartingBet = (startingBet: number) => ({
    type: UPDATE_STARTING_BET,
    payload: { startingBet }
})

export const doUpdateUser = (user: User) => ({
    type: UPDATE_USER,
    payload: { user }
})