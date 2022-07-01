import { Stake } from "./stake";

let dispatchEvent: Function;
let stake: Stake;

const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent')

describe('Stake Component', () => {
    beforeEach(() => {
        stake = new Stake();
        dispatchEvent = dispatchMockedEventWith(stake);
    });

    it('should render correctly the component', () => {
        expect(stake?.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('should emit new stake event when user choose a stake', () => {
        // Given
        const userInput = "2"

        // When
        dispatchEvent('keyup', userInput);

        // Then
        const expectedStake = (spyDispatchEvent.mock.calls[0][0] as CustomEvent).detail.stake;
        expect(expectedStake).toBe(userInput)
    });
});

function dispatchMockedEventWith(element: Element): Function {
    return function (key: string, value: number | string) {
        const inputElement = element.shadowRoot?.querySelector('input')!;
        inputElement.value = value.toString();

        const fakeEvent = new Event(key)
        inputElement.dispatchEvent(fakeEvent);
    }
}