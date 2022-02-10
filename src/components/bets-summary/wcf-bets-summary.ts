import css from './wcf-bets-summary.scss';
import { getPotentialGain } from "../../business/bets/getPotentialGain";
import { getSumOfOdds } from "../../business/odds/getSumOfOdds";
import { Bet } from "../../models/bet";

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>
<div class="bets-summary">
    <h3 class="bets-summary__title">Récapitulatif de vos paris</h3>
    <div class="bets-summary__info">
        <p class="bets-summary__info--bets-number"></p>
        <p class="bets-summary__info--sum-odds"></p>
        <p class="bets-summary__info--potential-gain"></p>
    </div>
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
        this.shadowRoot!.querySelector('.bets-summary__info--bets-number')!.textContent = `Nombre de paris joués: ${this.bets.length}`
        this.shadowRoot!.querySelector('.bets-summary__info--sum-odds')!.textContent = `Côte(s) cummulée(s): ${getSumOfOdds(this.bets)}`
        this.shadowRoot!.querySelector('.bets-summary__info--potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(this.startingBet, this.bets, this.isUserPrenium)}`
    }
}