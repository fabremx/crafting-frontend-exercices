/**
 * @jest-environment jsdom
 */

import { BetList } from "./wcf-bet-list";
import * as betModule from "../../business/bets/getBetList";
import { BetInfo } from "../../models/bet";
import { getFirstBetLine, getFirstOddsButton, getLoaderElement, getOddsButtons, getSecondBetLine, getSecondOddsButton } from "./wcf-bet-list.testing.util";

const dummyBets: BetInfo[] = [
    {
        gameId: '1',
        type: 'Ice hockey',
        adversary1: 'Rouen',
        adversary2: 'Amiens',
        odd1: 1.52,
        oddDraw: 3.20,
        odd2: 2.57
    },
    {
        gameId: '2',
        type: 'Tennis',
        adversary1: 'Roger Federer',
        adversary2: 'Raphael Nadal',
        odd1: 1.77,
        odd2: 1.61
    }
]
jest.spyOn(betModule, 'getBetList').mockResolvedValue(dummyBets);

describe('BetList Component', () => {
    describe('Loading bet list', () => {
        it('should render loader when loading bet list', () => {
            const betList = new BetList();

            const loaderElement = getLoaderElement(betList);
            expect(loaderElement.getAttribute('hidden')).toBeFalsy();
        });

        it('should hide loader when bets are loaded', async () => {
            const betList = new BetList();
            await betList.connectedCallback();

            const loaderElement = getLoaderElement(betList);
            expect(loaderElement.getAttribute('hidden')).toBeTruthy();
        });
    });

    describe('Render correctly bet row', () => {
        it('should render three odds on a game when draw is possible', async () => {
            const betList = new BetList();
            await betList.connectedCallback();

            const firstBetLine = getFirstBetLine(betList)
            const oddsButtons = getOddsButtons(firstBetLine);
            const firstOddsButton = oddsButtons[0];
            const secondOddsButton = oddsButtons[1]
            const thirdOddsButton = oddsButtons[2]

            expect(oddsButtons?.length).toBe(3);
            expect(firstOddsButton.innerHTML).toBe('Rouen - 1.52');
            expect(secondOddsButton.innerHTML).toBe('Draw - 3.20');
            expect(thirdOddsButton.innerHTML).toBe('Amiens - 2.57');
        });

        it('should render two odds on a game when draw is NOT possible', async () => {
            const betList = new BetList();
            await betList.connectedCallback();

            const secondBetLine = getSecondBetLine(betList)
            const oddsButtons = getOddsButtons(secondBetLine);
            const firstOddsButton = oddsButtons[0];
            const secondOddsButton = oddsButtons[1]

            expect(oddsButtons?.length).toBe(2);
            expect(firstOddsButton.innerHTML).toBe('Roger Federer - 1.77');
            expect(secondOddsButton.innerHTML).toBe('Raphael Nadal - 1.61');
        });
    });

    describe('Update bet on click', () => {
        it('should return updated bets when user bets on a new game', async () => {
            window.dispatchEvent = jest.fn();

            const betList = new BetList();
            await betList.connectedCallback();

            // Select odd 1 on first bet
            const firstBetLine = getFirstBetLine(betList)
            const odd1Button = getFirstOddsButton(firstBetLine);
            odd1Button?.click();

            // Select odd 2 on second bet
            const secondBetLine = getSecondBetLine(betList)
            const odd2Button = getSecondOddsButton(secondBetLine);
            odd2Button?.click();

            expect(betList.selectedBets).toEqual([{
                gameId: '1',
                selectedChoice: '1',
                selectedOdd: 1.52,
            },
            {
                gameId: '2',
                selectedChoice: '2',
                selectedOdd: 1.61,
            }])
        });

        it('should update bet when user bets a different odd on a game already bet', async () => {
            window.dispatchEvent = jest.fn();

            const betList = new BetList();
            await betList.connectedCallback();

            const firstBetLine = getFirstBetLine(betList)
            const odd1Button = getFirstOddsButton(firstBetLine);
            const drawButton = getSecondOddsButton(firstBetLine);

            odd1Button?.click();
            expect(betList.selectedBets).toEqual([{
                gameId: '1',
                selectedChoice: '1',
                selectedOdd: 1.52,
            }])

            drawButton?.click();
            expect(betList.selectedBets).toEqual([{
                gameId: '1',
                selectedChoice: 'Draw',
                selectedOdd: 3.20,
            }])
        });
    });
});
