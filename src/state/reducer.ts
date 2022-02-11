import { AnyAction } from "redux";
import { updateSelectedBets } from "../business/bets/updateSelectedBets";
import { UPDATE_BET_INFOS, UPDATE_SELECTED_BET, UPDATE_STARTING_BET } from "./actions";
import { ApplicationState } from "./applicationState";

export const initialApplicationState: ApplicationState = {
    betInfos: [],
    selectedBets: [],
    startingBet: 0
};
export const reducer = (state: ApplicationState = initialApplicationState, action: AnyAction): ApplicationState => {
    switch (action.type) {
        case UPDATE_SELECTED_BET:
            const { betInfo, choice } = action.payload;
            return { ...state, selectedBets: updateSelectedBets(state.selectedBets, betInfo, choice) };
        case UPDATE_STARTING_BET:
            const { startingBet } = action.payload;
            return { ...state, startingBet };
        case UPDATE_BET_INFOS:
            const { betInfos } = action.payload;
            return { ...state, betInfos };
    }
    return state;
}