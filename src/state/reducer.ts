import { AnyAction } from "redux";
import { updateSelectedBets } from "../business/bets/updateSelectedBets";
import { UPDATE_SELECTED_BET, UPDATE_STARTING_BET, UPDATE_USER } from "./actions";
import { ApplicationState } from "./applicationState";

export const initialApplicationState: ApplicationState = {
    selectedBets: [],
    startingBet: 0,
    user: {
        firstname: 'Jack',
        lastname: 'Dupont',
        age: 47,
        isPremium: false
    }
};
export const reducer = (state: ApplicationState = initialApplicationState, action: AnyAction): ApplicationState => {
    switch (action.type) {
        case UPDATE_SELECTED_BET:
            const { betInfo, choice } = action.payload;
            return { ...state, selectedBets: updateSelectedBets(state.selectedBets, betInfo, choice) };
        case UPDATE_STARTING_BET:
            const { startingBet } = action.payload;
            return { ...state, startingBet };
        case UPDATE_USER:
            const { user } = action.payload;
            return { ...state, user };
    }
    return state;
}