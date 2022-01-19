/**
 * @jest-environment jsdom
 */

import { BetList } from "./wcf-bet-list";
import * as betModule from "../../business/bets/getBetList";
import { BetInfo } from "../../models/bet";
import { findElementsWith, findElementWith, isVisible } from "../../utils/testing";

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

let betList: BetList;

describe('BetList Component', () => {
    beforeAll(() => {
        betList = new BetList();
    });

    it('should render loader when bet list is loading', () => {
        const loaderElement = getLoaderElement();
        expect(isVisible(loaderElement)).toBe(true);
    });

    it('should hide loader when bet list is loaded', async () => {
        await betList.connectedCallback();
        const loaderElement = getLoaderElement();
        expect(isVisible(loaderElement)).toBe(false);
    });

    describe('Render correctly bet row', () => {
        beforeAll(async () => {
            betList = new BetList();
            await betList.connectedCallback();
        });

        it('should render three odds button on a game when draw is possible', async () => {
            const firstBetLine = getBetLine(1)
            const betOddsButtons = getBetOddsButtons(firstBetLine)

            expect(betOddsButtons?.length).toBe(3);
            expect(betOddsButtons[0].innerHTML).toBe('Rouen - 1.52');
            expect(betOddsButtons[1].innerHTML).toBe('Draw - 3.20');
            expect(betOddsButtons[2].innerHTML).toBe('Amiens - 2.57');
        });

        it('should render two odds on a game when draw is NOT possible', async () => {
            const secondBetLine = getBetLine(2)
            const betOddsButtons = getBetOddsButtons(secondBetLine)

            expect(betOddsButtons?.length).toBe(2);
            expect(betOddsButtons[0].innerHTML).toBe('Roger Federer - 1.77');
            expect(betOddsButtons[1].innerHTML).toBe('Raphael Nadal - 1.61');
        });
    });

    describe('Update bet on click', () => {
        beforeAll(() => {
            window.dispatchEvent = jest.fn();
        });

        beforeEach(async () => {
            betList = new BetList();
            await betList.connectedCallback();
        });

        it('should return updated bets when user bets on a new game', async () => {
            clickOn({ line: 1, button: 1 });
            clickOn({ line: 2, button: 2 });

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
            clickOn({ line: 1, button: 1 });
            expect(betList.selectedBets).toEqual([{
                gameId: '1',
                selectedChoice: '1',
                selectedOdd: 1.52,
            }])

            clickOn({ line: 1, button: 2 });
            expect(betList.selectedBets).toEqual([{
                gameId: '1',
                selectedChoice: 'Draw',
                selectedOdd: 3.20,
            }])
        });
    });
});

/** 
 * Utilities
 */

const getBetLine = (lineNumber: number) => {
    return findElementsWith(betList, '.bet')![lineNumber - 1]!
}

function getBetOddsButtons(betLine: Element): NodeListOf<HTMLButtonElement> {
    return betLine.querySelectorAll('button')!
}

function getLoaderElement() {
    return findElementWith(betList, '.loader')
}

function clickOn({ line, button }: { line: number, button: number }) {
    const lineElement = getBetLine(line);
    const buttonElement = lineElement.querySelectorAll('button')[button - 1]

    buttonElement.click()
}