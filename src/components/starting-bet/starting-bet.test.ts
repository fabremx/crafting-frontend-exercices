import { StartingBet } from "./starting-bet";

let dispatchEvent: Function;
let startingBet: StartingBet;

const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent')

describe('Starting-Bet Component', () => {
    beforeEach(() => {
        startingBet = new StartingBet();
        dispatchEvent = dispatchMockedEventWith(startingBet);
    });

    it('should render correctly the component', () => {
        expect(startingBet?.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('should emit new starting bet event when user choose a starting bet', () => {
        // Given
        const userInput = "2"

        // When
        dispatchEvent('keyup', userInput);

        // Then
        const expectedStartingBet = (spyDispatchEvent.mock.calls[0][0] as CustomEvent).detail.startingBet;
        expect(expectedStartingBet).toBe(userInput)
    });
});

function dispatchMockedEventWith(element: Element) {
    return function (key: string, value: number | string) {
        const inputElement = element.shadowRoot?.querySelector('input')!;
        inputElement.value = value.toString();

        const fakeEvent = new Event(key)
        inputElement.dispatchEvent(fakeEvent);
    }
}