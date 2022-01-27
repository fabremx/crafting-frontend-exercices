import { BetList } from "./wcf-bet-list";
import * as betModule from "../../business/bets/getBetList";
import { BetInfo } from "../../models/bet";
import { findElementWith, isVisible } from "../../utils/testing";
import { CHOICE_1, CHOICE_2, CHOICE_DRAW } from "../../shared/constants/oddsChoice";

const dummyBets: BetInfo[] = [
    {
        gameId: '1',
        type: 'football',
        adversary1: 'Paris SG',
        adversary2: 'Lyon',
        odd1: 1.12,
        odddraw: 2.50,
        odd2: 3.62
    },
    {
        gameId: '2',
        type: 'football',
        adversary1: 'Marseille',
        adversary2: 'Montpellier',
        odd1: 1.77,
        odddraw: 2.51,
        odd2: 1.90
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

    describe('Update bet', () => {
        beforeAll(() => {
            window.dispatchEvent = jest.fn();
        });

        beforeEach(async () => {
            betList = new BetList();
            await betList.connectedCallback();
        });

        it('should return updated bets when user bets on a new game', async () => {
            window.dispatchEvent(new CustomEvent('CLICK_BET', { detail: { betInfo: dummyBets[0], choice: CHOICE_1 } }));
            window.dispatchEvent(new CustomEvent('CLICK_BET', { detail: { betInfo: dummyBets[1], choice: CHOICE_2 } }))

            window.addEventListener('UPDATE_BETS', (event: Event) => {
                const { bets } = (event as CustomEvent).detail;
                expect(bets).toEqual([{
                    gameId: '1',
                    selectedChoice: CHOICE_1,
                    selectedOdd: 1.52,
                },
                {
                    gameId: '2',
                    selectedChoice: CHOICE_2,
                    selectedOdd: 1.61,
                }])
            });

        });

        it('should update bet when user bets a different odd on a game already bet', async () => {
            window.dispatchEvent(new CustomEvent('CLICK_BET', { detail: { betInfo: dummyBets[0], choice: CHOICE_1 } }));
            window.addEventListener('UPDATE_BETS', (event: Event) => {
                const { bets } = (event as CustomEvent).detail
                expect(bets).toEqual([{
                    gameId: '1',
                    selectedChoice: CHOICE_1,
                    selectedOdd: 1.52,
                }])
            });

            window.dispatchEvent(new CustomEvent('CLICK_BET', { detail: { betInfo: dummyBets[0], choice: CHOICE_DRAW } }));
            window.addEventListener('UPDATE_BETS', (event: Event) => {
                const { bets } = (event as CustomEvent).detail
                expect(bets).toEqual([{
                    gameId: '1',
                    selectedChoice: CHOICE_DRAW,
                    selectedOdd: 3.20,
                }])
            });
        });
    });
});

function getLoaderElement() {
    return findElementWith(betList, '.loader')
}
