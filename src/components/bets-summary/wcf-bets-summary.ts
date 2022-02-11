import css from './wcf-bets-summary.scss';
import { getPotentialGain } from "../../business/bets/getPotentialGain";
import { getSumOfOdds } from "../../business/odds/getSumOfOdds";
import { reduxStore } from '../../state/store';
import { Bet } from "../../models/bet";

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>
<div class="bets-summary" hidden>
    <h3 class="bets-summary__title">Récapitulatif de vos paris</h3>
    <div class="bets-summary__info">
        <p class="bets-summary__info--bets-number"></p>
        <p class="bets-summary__info--sum-odds"></p>
        <p class="bets-summary__info--potential-gain"></p>
    </div>
</div>
`;

export class BetsSummary extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
    }

    handleApplicationStateChange() {
        const { startingBet, selectedBets } = reduxStore.getState();

        const isDisplay = startingBet > 0 && selectedBets.length > 0;

        this.toggleSummaryDisplay(isDisplay);
        this.updateSummaryInfo(selectedBets, startingBet);
    }

    toggleSummaryDisplay(isDisplay: boolean) {
        const summaryElement = '.bets-summary';

        if (isDisplay) {
            this.displayElement(summaryElement);
        } else {
            this.hideElement(summaryElement);
        }
    }
    
    updateSummaryInfo(selectedBets: Bet[], startingBet: number) {
        this.shadowRoot!.querySelector('.bets-summary__info--bets-number')!.textContent = `Nombre de paris joués: ${selectedBets.length}`
        this.shadowRoot!.querySelector('.bets-summary__info--sum-odds')!.textContent = `Côte(s) cummulée(s): ${getSumOfOdds(selectedBets)}`
        this.shadowRoot!.querySelector('.bets-summary__info--potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(startingBet, selectedBets)}`
    }

    hideElement(summaryElement: string) {
        const element = this.shadowRoot?.querySelector(summaryElement)!;
        element.setAttribute('hidden', '')
    }

    displayElement(summaryElement: string) {
        const element = this.shadowRoot?.querySelector(summaryElement)!;
        element.removeAttribute('hidden')
    }
}