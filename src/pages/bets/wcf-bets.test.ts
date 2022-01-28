
import { dispatchMockedEventWith, findElementWith, isVisible } from "../../utils/testing";
import { BetsPage } from "./wcf-bets";
import * as betModule from "../../business/bets/getBetList";
import { BetInfo } from "../../models/bet";
import { BetList } from "../../components/bet-list/wcf-bet-list";
import { StartingBet } from "../../components/starting-bet/wcf-starting-bet";

let dispatchEvent: Function;
let betListTag: Element | null | undefined;
let startingBetTag: Element | null | undefined;
let betsSummaryTag: Element | null | undefined;
let validationButton: Element | null | undefined;

const dummyBets: BetInfo[] = [
    {
        gameId: '1',
        type: 'football',
        adversary1: 'Paris SG',
        adversary2: 'Lyon',
        odd1: 1.52,
        odddraw: 2.20,
        odd2: 2.57
    },
    {
        gameId: '2',
        type: 'football',
        adversary1: 'Marseille',
        adversary2: 'Montpellier',
        odd1: 1.77,
        odddraw: 2.20,
        odd2: 2.61
    }
]
jest.spyOn(betModule, 'getBetList').mockResolvedValue(dummyBets);

describe.skip('Bets Pages Component', () => {
    const betsPage = new BetsPage();

    beforeEach(() => {
        betListTag = findElementWith(betsPage, 'wcf-bet-list')
        startingBetTag = findElementWith(betsPage, 'wcf-starting-bet')
        betsSummaryTag = findElementWith(betsPage, 'wcf-bets-summary')
        validationButton = findElementWith(betsPage, '.bet-page__validation')
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

        it('should render corrects component when user did NOT set starting bet', async () => {
            expect(isVisible(startingBetTag)).toBe(true);
            expect(isVisible(betsSummaryTag)).toBe(false);
        });

        describe('When user set starting bet', () => {
            beforeAll(() => {
                const startingBetComponent = new StartingBet()
                dispatchEvent = dispatchMockedEventWith(startingBetComponent)
            })

            it('should NOT render bets list component when user set starting bet to 0', () => {
                setStartingBet(0)
                expect(isVisible(betsSummaryTag)).toBe(false);
                expect(isVisible(validationButton)).toBe(false);
            });

            it('should NOT render bets list component when user set a non number starting bet', () => {
                setStartingBet('e')
                expect(isVisible(betsSummaryTag)).toBe(false);
                expect(isVisible(validationButton)).toBe(false);
            });

            it('should render bets list component when user set starting bet', () => {
                setStartingBet(100)
                expect(isVisible(betsSummaryTag)).toBe(true);
                expect(isVisible(validationButton)).toBe(true);
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
