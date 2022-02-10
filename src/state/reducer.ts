import { ApplicationState } from "../models/applicationState";

export const initialApplicationState: ApplicationState = {
    gameInfos: [
        {
            id: '1',
            type: 'football',
            adversary1: 'Nice',
            adversary2: 'FC Lorient'
        },
        {
            id: '2',
            type: 'football',
            adversary1: 'Paris SG',
            adversary2: 'Lyon'
        },
        {
            id: '3',
            type: 'football',
            adversary1: 'Marseille',
            adversary2: 'Montpellier'
        },
    ],
    oddsInfo: [
        {
            id: 'e54rcds78',
            gameId: '1',
            odd1: 1.24,
            odddraw: 2.18,
            odd2: 2.57
        },
        {
            id: 'vc14sz85',
            gameId: '2',
            odd1: 1.12,
            odddraw: 2.50,
            odd2: 3.62
        },
        {
            id: 'eaws4dc36',
            gameId: '3',
            odd1: 1.77,
            odddraw: 2.51,
            odd2: 2.90
        },
    ],
    selectedBets: [
        {
            "gameId": "1",
            "selectedChoice": "1",
            "selectedOdd": 1.24
        },
        {
            "gameId": "2",
            "selectedChoice": "2",
            "selectedOdd": 3.62
        }
    ]
};
export const reducer = (state: ApplicationState = initialApplicationState) => {

    return state;
}