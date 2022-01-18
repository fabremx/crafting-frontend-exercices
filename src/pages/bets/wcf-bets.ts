import { getPotentialGain } from "../../business/bets/getPotentialGain";
import { getSumOfOdds } from "../../business/odds/getSumOfOdds";
import { Bet } from "../../models/bet";

const template = document.createElement('template');
template.innerHTML = `
<div id="summary">
    <div class="summary__starting-bet" hidden>
        <h2>Summary</h2>
        <p>Choisir votre mise</p>
        <input type="number" value="" />
    </div>

    <div class="summary__info" hidden>
        <h3>Récapitulatif</h3>
        <p class="summary__info__bets-number"></p>
        <p class="summary__info__sum-odds"></p>
        <p class="summary__info__potential-gain"></p>
    </div>
</div>
`;

export class BetsSummary extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        this.shadowRoot?.querySelector('input')!.addEventListener('keyup', this.updateStartingBetAttribute.bind(this));
    }

    connectedCallback() {
        this.toggleStartingBetDisplay();
    }

    static get observedAttributes() {
        return ['bets', 'isuserprenium']
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (name !== 'bets') return

        this.toggleStartingBetDisplay();
    }

    updateStartingBetAttribute() {
        const startingBet = this.shadowRoot?.querySelector('input')?.value!
        this.startingBet = Number(startingBet);

        this.toggleSummaryDisplay();
    }

    toggleStartingBetDisplay() {
        const elementClass = '.summary__starting-bet';

        this.bets.length
            ? this.displayElement(elementClass)
            : this.hideElement(elementClass)
    }

    toggleSummaryDisplay() {
        const elementClass = '.summary__info';

        this.startingBet && this.bets.length
            ? this.displayElement(elementClass)
            : this.hideElement(elementClass)
    }

    hideElement(className: string) {
        const summaryElement = this.shadowRoot?.querySelector(className)!;
        summaryElement.setAttribute('hidden', '')
    }

    displayElement(className: string) {
        const summaryElement = this.shadowRoot?.querySelector(className)!;

        summaryElement.removeAttribute('hidden')

        this.shadowRoot!.querySelector('.summary__info__bets-number')!.textContent = `Nombre de paris joués: ${this.bets.length}`
        this.shadowRoot!.querySelector('.summary__info__sum-odds')!.textContent = `Côte(s) cummulée(s): ${getSumOfOdds(this.bets)}`
        this.shadowRoot!.querySelector('.summary__info__potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(this.startingBet, this.bets, this.isUserPrenium)}`
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
    set startingBet(value: number) {
        this.setAttribute('startingbet', value.toString());
    }

    get isUserPrenium(): boolean {
        const isUsrePrenium = this.getAttribute('isuserprenium');
        return isUsrePrenium ? JSON.parse(isUsrePrenium) : false;
    }
}

customElements.define('wcf-vanilla-bets-summary', BetsSummary);