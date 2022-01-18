/**
 * @jest-environment jsdom
 */

import { Bet } from "../../models/bet";
import { dispatchMockedEventWith, findElementWith, isVisible, mockPropsTo } from "../../utils/testing";
import { BetsSummary } from "./wcf-bets";

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

let addProps: Function, dispatchEvent: Function;
let startingBetElement: Element | null | undefined;
let betsSummaryElement: Element | null | undefined;

describe('Bets-Summary Component', () => {
    beforeEach(() => {
        // When
        const betsSummary = new BetsSummary();

        addProps = mockPropsTo(betsSummary)
        dispatchEvent = dispatchMockedEventWith(betsSummary)
        startingBetElement = findElementWith(betsSummary, '.summary__starting-bet')
        betsSummaryElement = findElementWith(betsSummary, '.summary__info')
    })

    describe('Starting Bet Displaying Rules', () => {
        it('should NOT render starting bet input when user chose no bets', () => {
            // Given
            addProps('bets', [])

            // Then
            expect(isVisible(startingBetElement)).toBe(false);
        });

        it('should render starting bet input when user chose at least one bet', () => {
            // Given
            addProps('bets', DUMMY_BETS)

            // Then
            expect(isVisible(startingBetElement)).toBe(true);
        });
    });

    describe('Bets Summary Displaying Rules', () => {
        it('should NOT render summary info when user chose no bets', () => {
            // Given
            addProps('bets', [])

            // Then
            expect(isVisible(betsSummaryElement)).toBe(false);
        });

        it('should NOT render summary info when user gave a non number starting bet', () => {
            // Given
            addProps('bets', DUMMY_BETS)
            dispatchEvent('keyup', 'e')

            // Then
            expect(isVisible(betsSummaryElement)).toBe(false);
        });

        it('should NOT render summary info when user delete his starting bet', () => {
            // Given
            addProps('bets', DUMMY_BETS)
            dispatchEvent('keyup', '2')
            dispatchEvent('keyup', '')

            // Then
            expect(isVisible(betsSummaryElement)).toBe(false);
        });

        it('should render summary info when user gave a starting bet superior to 0', () => {
            // Given
            addProps('bets', DUMMY_BETS)
            dispatchEvent('keyup', '2')

            // Then
            expect(isVisible(betsSummaryElement)).toBe(true);
        });
    });

    describe('Bets Summary Information', () => {
        it('should render correctly info when bets summary is displayed and user is NOT prenium', () => {
            addProps('bets', DUMMY_BETS)
            dispatchEvent('keyup', 100)

            expect(betsSummaryElement?.innerHTML).toMatchSnapshot();
        });

        it('should render correctly info when bets summary is displayed and user is prenium', () => {
            addProps('bets', DUMMY_BETS)
            addProps('isuserprenium', true)
            dispatchEvent('keyup', 100)

            expect(betsSummaryElement?.innerHTML).toMatchSnapshot();
        });
    });
});
