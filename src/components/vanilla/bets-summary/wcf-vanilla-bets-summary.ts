import { getPotentialGain } from "../../../business/bets/getPotentialGain";
import { getSumOfOdds } from "../../../business/odds/getSumOfOdds";
import { Bet } from "../../../models/bet";

const template = document.createElement('template');
template.innerHTML = `
<div id="bets-summary">
    <h3>Récapitulatif des Paris</h3>
    <p class="bets-summary__bets-number"></p>
    <p class="bets-summary__sum-odds"></p>
    <p class="bets-summary__potential-gain"></p>
</div>
`;

export class BetsSummary extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

    }

    connectedCallback() {
        this.displaySummaryInfo()
    }

    static get observedAttributes() {
        return ['bets', 'startingbet', 'isuserprenium']
    }

    displaySummaryInfo() {
        this.shadowRoot!.querySelector('.bets-summary__bets-number')!.textContent = `Nombre de paris joués: ${this.bets.length}`
        this.shadowRoot!.querySelector('.bets-summary__sum-odds')!.textContent = `Côte(s) cummulée(s): ${getSumOfOdds(this.bets)}`
        this.shadowRoot!.querySelector('.bets-summary__potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(this.startingBet, this.bets, this.isUserPrenium)}`
    }

    get bets(): Bet[] {
        const bets = this.getAttribute('bets');
        return bets ? JSON.parse(bets) : []
    }

    get startingBet(): number {
        const startingBet = this.getAttribute('startingbet');

        return startingBet && !isNaN(Number(startingBet))
            ? Number(startingBet)
            : 0
    }

    get isUserPrenium(): boolean {
        const isUsrePrenium = this.getAttribute('isuserprenium');
        return isUsrePrenium ? JSON.parse(isUsrePrenium) : false;
    }
}

customElements.define('wcf-vanilla-bets-summary', BetsSummary);