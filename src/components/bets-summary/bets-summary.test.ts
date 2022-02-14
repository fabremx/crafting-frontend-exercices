import { Bet } from "../../models/bet";
import { CHOICE_LEFT, CHOICE_DRAW } from "../../shared/constants/oddsChoice";
import { mockPropsTo } from "../../utils/testing";
import { BetsSummary } from "./bets-summary";

const DUMMY_BETS: Bet[] = [
    {
        gameId: 'id1',
        selectedChoice: CHOICE_LEFT,
        selectedOdd: 1.52,
    },
    {
        gameId: 'id2',
        selectedChoice: CHOICE_DRAW,
        selectedOdd: 1.12,
    }
];

let betsSummary: BetsSummary;
let addProps: Function;

describe('Bets-Summary Component', () => {
    beforeEach(() => {
        // When
        betsSummary = new BetsSummary();

        addProps = mockPropsTo(betsSummary)
    })

    it('should render correctly info when user is NOT premium', () => {
        // Given
        addProps('bets', DUMMY_BETS)
        addProps('startingbet', 100)

        // When
        betsSummary.connectedCallback();

        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('should render correctly info when user is premium', () => {
        // Given
        addProps('bets', DUMMY_BETS)
        addProps('startingbet', 100)
        addProps('isuserpremium', true)

        // When
        betsSummary.connectedCallback();

        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot();
    });
});
