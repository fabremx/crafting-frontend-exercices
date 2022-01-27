import { BetInfo } from "../../models/bet";
import { CHOICE_DRAW } from "../../shared/constants/oddsChoice";
import { findElementWith } from "../../utils/testing";
import { BetItem } from "./wcf-bet-item";

const BET: BetInfo = {
    type: 'football',
    adversary1: 'Paris SG',
    adversary2: 'Lyon',
    gameId: '2',
    odd1: 1.12,
    odddraw: 2.50,
    odd2: 3.62
};

let betItem: BetItem = new BetItem();

describe('BetItem Component', () => {
    it('should correctly render bet line', () => {
        betItem.setAttribute('bet', JSON.stringify(BET))
        expect(betItem?.shadowRoot?.querySelector('.bet-item')).toMatchSnapshot()
    });

    it('should send user choice when user click on a bet', () => {
        // Click on Draw
        clickOnButtonNumber(2);

        window.addEventListener('CLICK_BET', ((event: any) => {
            const { betInfo, choice } = event.detail;
            expect(betInfo).toEqual({})
            expect(choice).toBe(CHOICE_DRAW)
        }));
    });
});

function clickOnButtonNumber(nb: number) {
    const itemElement = findElementWith(betItem, '.bet-item')!
    const buttonElement = itemElement.querySelectorAll('button')[nb - 1]

    buttonElement.click();
}