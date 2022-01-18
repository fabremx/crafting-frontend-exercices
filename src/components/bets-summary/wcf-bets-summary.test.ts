/**
 * @jest-environment jsdom
 */

import { Bet } from "../../models/bet";
import { mockPropsTo } from "../../utils/testing";
import { BetsSummary } from "./wcf-bets-summary";

const DUMMY_BETS: Bet[] = [
    {
        gameId: 'id1',
        selectedChoice: '1',
        selectedOdd: 1.52,
    },
    {
        gameId: 'id2',
        selectedChoice: 'Draw',
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

    it('should render correctly info when user is NOT prenium', () => {
        // Given
        addProps('bets', DUMMY_BETS)
        addProps('startingbet', 100)

        // When
        betsSummary.connectedCallback();

        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('should render correctly info when user is prenium', () => {
        // Given
        addProps('bets', DUMMY_BETS)
        addProps('startingbet', 100)
        addProps('isuserprenium', true)

        // When
        betsSummary.connectedCallback();

        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot();
    });
});
