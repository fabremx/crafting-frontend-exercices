/**
 * @jest-environment jsdom
 */

import { dispatchMockedEventWith } from "../../../utils/testing";
import { StartingBet } from "./wcf-vanilla-starting-bet";

let dispatchEvent: Function;
let startingBet: StartingBet;

describe('Starting-Bet Component', () => {
    beforeEach(() => {
        // When
        startingBet = new StartingBet();

        dispatchEvent = dispatchMockedEventWith(startingBet);
    });

    it('should render the component', () => {
        expect(startingBet?.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('should emit new starting bet when user update starting bet', () => {
        // Given
        const userInput = 2
        dispatchEvent('keyup', userInput.toString());

        // Then
        window.addEventListener('UPDATE_STARTING_BET', (event: Event) => {
            const customEvent = event as CustomEvent
            expect(customEvent.detail.startingBet).toBe(userInput)
        })
    });
});
