/**
 * @jest-environment jsdom
 */

import { BetList } from "./wcf-vanilla-bet-list";
import * as betModule from "../../business/getBetList";
import { BetInfo } from "../../models/bet";

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

it('should render loader when loading bet list', () => {
    const betList = new BetList();
    expect(betList.shadowRoot?.querySelector('.loader')?.getAttribute('hidden')).toBeFalsy();
});

it('should hide loader when bets are loaded', async () => {
    const betList = new BetList();
    await betList.connectedCallback();
    expect(betList.shadowRoot?.querySelector('.loader')?.getAttribute('hidden')).toBeTruthy();
});

it('should render three odds on a game when draw is possible', async () => {
    const betList = new BetList();
    await betList.connectedCallback();

    const oddsButtons = betList.shadowRoot?.querySelectorAll('.bet')[0]?.querySelectorAll('button')
    expect(oddsButtons?.length).toBe(3);
    expect(oddsButtons![0].innerHTML).toBe('Rouen - 1.52');
    expect(oddsButtons![1].innerHTML).toBe('Draw - 3.20');
    expect(oddsButtons![2].innerHTML).toBe('Amiens - 2.57');
});

it('should render two odds on a game when draw is NOT possible', async () => {
    const betList = new BetList();
    await betList.connectedCallback();

    const oddsButtons = betList.shadowRoot?.querySelectorAll('.bet')[1]?.querySelectorAll('button')
    expect(oddsButtons?.length).toBe(2);
    expect(oddsButtons![0].innerHTML).toBe('Roger Federer - 1.77');
    expect(oddsButtons![1].innerHTML).toBe('Raphael Nadal - 1.61');
});

it('should return updated bets when user bets on a new game', async () => {
    window.dispatchEvent = jest.fn();

    const betList = new BetList();
    await betList.connectedCallback();

    // Select odd 1 on first bet
    const firstBet = betList.shadowRoot?.querySelectorAll('.bet')[0]!
    const odd1Button = firstBet.querySelectorAll('button')[0]
    odd1Button?.click();

    // Select odd 2 on second bet
    const secondBet = betList.shadowRoot?.querySelectorAll('.bet')[1]!
    const odd2Button = secondBet.querySelectorAll('button')[1]
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

    const firstBet = betList.shadowRoot?.querySelectorAll('.bet')[0]!
    const odd1Button = firstBet.querySelectorAll('button')[0]
    const drawButton = firstBet.querySelectorAll('button')[1]

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

