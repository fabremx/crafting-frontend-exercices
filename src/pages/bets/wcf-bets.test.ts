/**
 * @jest-environment jsdom
 */

import { dispatchMockedEventWith, findElementWith, isVisible } from "../../utils/testing";
import { BetsPage } from "./wcf-bets";
import * as betModule from "../../business/bets/getBetList";
import { BetInfo } from "../../models/bet";
import { BetList } from "../../components/vanilla/bet-list/wcf-vanilla-bet-list";
import { StartingBet } from "../../components/vanilla/starting-bet/wcf-vanilla-starting-bet";

let dispatchEvent: Function;
let betListTag: Element | null | undefined;
let startingBetTag: Element | null | undefined;
let betsSummaryTag: Element | null | undefined;

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

describe('Bets Pages Component', () => {
    const betsPage = new BetsPage();

    beforeEach(() => {
        betListTag = findElementWith(betsPage, 'wcf-vanilla-bet-list')
        startingBetTag = findElementWith(betsPage, 'wcf-vanilla-starting-bet')
        betsSummaryTag = findElementWith(betsPage, 'wcf-vanilla-bets-summary')
    })

    describe('When user did NOT select any bets', () => {
        it('should NOT render starting bet component', () => {
            expect(isVisible(startingBetTag)).toBe(false);
        });

        it('should NOT render bets summary component', () => {
            expect(isVisible(startingBetTag)).toBe(false);
        });
    });

    describe('When user select one or many bets', () => {
        beforeAll(async () => {
            const betListComponent = new BetList();
            await betListComponent.connectedCallback();
            selectOneBet(betListComponent)
        })

        describe('When user did NOT set starting bet', () => {
            it('should render starting bet component', async () => {
                expect(isVisible(startingBetTag)).toBe(true);
            });

            it('should NOT render bets list component', () => {
                expect(isVisible(betsSummaryTag)).toBe(false);
            });
        });

        describe('When user set starting bet', () => {
            beforeAll(() => {
                const startingBetComponent = new StartingBet()
                dispatchEvent = dispatchMockedEventWith(startingBetComponent)
            })

            it('should NOT render bets list component when user set starting bet to 0', () => {
                setStartingBet(0)
                expect(isVisible(betsSummaryTag)).toBe(false);
            });

            it('should NOT render bets list component when user set a non number starting bet', () => {
                setStartingBet('e')
                expect(isVisible(betsSummaryTag)).toBe(false);
            });

            it('should render bets list component when user set starting bet', () => {
                setStartingBet(100)
                expect(isVisible(betsSummaryTag)).toBe(true);
            });
        })
    });
});

function selectOneBet(element: Element) {
    const firstBetLine = element?.shadowRoot?.querySelectorAll('.bet')[0]
    const firstBetButton = firstBetLine?.querySelectorAll('button')[0]

    firstBetButton?.click();
}

function setStartingBet(value: number | string) {
    dispatchEvent('keyup', value.toString());
}
