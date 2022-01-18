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
    private bets: Bet[] = [];
    private startingBet: number = 0;
    private isUserPrenium: boolean = false;

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

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'bets':
                this.bets = JSON.parse(newValue);
                break;
            case 'startingbet':
                this.startingBet = Number(newValue);
                break;
            case 'isuserprenium':
                this.isUserPrenium = Boolean(newValue);
                break;
            default:
                break;
        }

        if (this.startingBet && this.bets.length) {
            this.displaySummaryInfo();
        }
    }

    displaySummaryInfo() {
        this.shadowRoot!.querySelector('.bets-summary__bets-number')!.textContent = `Nombre de paris joués: ${this.bets.length}`
        this.shadowRoot!.querySelector('.bets-summary__sum-odds')!.textContent = `Côte(s) cummulée(s): ${getSumOfOdds(this.bets)}`
        this.shadowRoot!.querySelector('.bets-summary__potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(this.startingBet, this.bets, this.isUserPrenium)}`
    }
}

customElements.define('wcf-vanilla-bets-summary', BetsSummary);