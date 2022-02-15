import { BetInfo } from "../../models/bet";
import { CHOICE_DRAW } from "../../shared/constants/oddsChoice";
import { doUpdateSelectedBet } from "../../state/actions";
import { reduxStore } from "../../state/store";
import { findElementWith } from "../../utils/testing";
import { BetItem } from "./bet-item";

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
betItem.setAttribute('bet', JSON.stringify(BET))

reduxStore.dispatch = jest.fn()

describe('BetItem Component', () => {
    it('should correctly render bet line', () => {
        expect(betItem?.shadowRoot?.querySelector('.bet-item')).toMatchSnapshot()
    });

    it('should send user choice when user click on a bet', () => {
        // Click on Draw
        clickOnButtonNumber(2);

        expect(reduxStore.dispatch).toHaveBeenCalledWith(doUpdateSelectedBet(BET, CHOICE_DRAW))
    });
});

function clickOnButtonNumber(nb: number) {
    const itemElement = findElementWith(betItem, '.bet-item')!
    const buttonElement = itemElement.querySelectorAll('button')[nb - 1]

    buttonElement.click();
}