import { BetList } from "./wcf-bet-list";
import * as apiModule from "../../api/getBetList";
import { BetInfo } from "../../models/bet";
import { findElementWith, isVisible } from "../../utils/testing";

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

jest.spyOn(apiModule, 'getBetList').mockResolvedValue(dummyBets);

describe('BetList Component', () => {
    it('should render loader when bet list is loading', () => {
        const betList = new BetList();
        const loaderElement = getLoaderElement(betList);
        expect(isVisible(loaderElement)).toBe(true);
    });

    it('should hide loader when bet list is loaded', async () => {
        const betList = new BetList();
        await betList.connectedCallback();
        const loaderElement = getLoaderElement(betList);
        expect(isVisible(loaderElement)).toBe(false);
    });
});

function getLoaderElement(element: Element) {
    return findElementWith(element, '.loader')
}
