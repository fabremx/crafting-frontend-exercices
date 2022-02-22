import { CHOICE_LEFT } from "../../shared/constants/oddsChoice";
import { BetsSummary } from "./bets-summary";
import { doUpdateSelectedBet, doUpdateUser } from "../../state/actions";
import { User, BetInfo } from "../../models";
import { reduxStore } from '../../state/store';
import { mockPropsTo } from "../../utils/testing";

const DUMMY_USER: Omit<User, 'isPremium'> = {
    firstname: 'Claude',
    lastname: 'Martin',
    age: 47,
}
const DUMMY_BET_INFO: BetInfo = {
    type: 'football',
    adversary1: 'PSG',
    adversary2: 'Lyon',
    gameId: 'gameId',
    odd1: 1.12,
    odddraw: 1.56,
    odd2: 2.69,
}

let betsSummary: BetsSummary;
let addProps: Function;

describe('Bets-Summary Component', () => {
    beforeEach(() => {
        // When
        betsSummary = new BetsSummary();

        addProps = mockPropsTo(betsSummary)
        addProps('startingbet', 100)

        reduxStore.dispatch(doUpdateSelectedBet(DUMMY_BET_INFO, CHOICE_LEFT))
    })

    it('should render correctly info when user is NOT premium', async () => {
        // When
        reduxStore.dispatch(doUpdateUser({
            ...DUMMY_USER,
            isPremium: false
        }))

        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('should render correctly info when user is premium', () => {
        // When
        reduxStore.dispatch(doUpdateUser({
            ...DUMMY_USER,
            isPremium: true
        }))
        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot();
    });
});
