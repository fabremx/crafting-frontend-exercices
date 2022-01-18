import { BetList } from "./wcf-bet-list"

const getBetLine = (lineNumber: number) => {
    return function (betList: BetList): Element {
        return betList.shadowRoot?.querySelectorAll('.bet')[lineNumber - 1]!
    }
}

export const getFirstBetLine = getBetLine(1);
export const getSecondBetLine = getBetLine(2);

const getOddsButton = (buttonNumber: number) => {
    return function (betLine: Element) {
        return betLine.querySelectorAll('button')[buttonNumber - 1]
    }
}

export const getOddsButtons = (betLine: Element) => {
    return betLine.querySelectorAll('button')!
}
export const getFirstOddsButton = getOddsButton(1);
export const getSecondOddsButton = getOddsButton(2);

export const getLoaderElement = (betList: BetList): Element => {
    return betList.shadowRoot?.querySelector('.loader')!;
}