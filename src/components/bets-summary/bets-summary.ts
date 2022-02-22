import css from './bets-summary.scss';
import { getPotentialGain } from "../../business/bets/getPotentialGain";
import { reduxStore } from '../../state/store';
import { Bet } from "../../models/bet";
import { selectSelectedBets, selectUser } from '../../state/selectors';
import { CustomHTMLElement } from '../../utils/customHTMLElement';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>
<div class="bets-summary" hidden>
    <h3 class="bets-summary__title">Récapitulatif de vos paris</h3>
    <div class="bets-summary__info">
        <p class="bets-summary__info--bets-number"></p>
        <p class="bets-summary__info--potential-gain"></p>
    </div>
</div>
`;

export class BetsSummary extends CustomHTMLElement {
    private selectedBets: Bet[] = [];
    private startingBet: number = 0;
    private isUserPremium: boolean = false;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
    }

    static get observedAttributes() {
        return ['startingbet']
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'startingbet':
                this.startingBet = Number(newValue);
                break;
        }

        this.handleDisplay();
    }

    handleApplicationStateChange() {
        this.selectedBets = selectSelectedBets();
        this.isUserPremium = selectUser().isPremium;

        this.handleDisplay();
    }

    handleDisplay() {
        const shouldDisplay = this.startingBet > 0 && this.selectedBets.length > 0;
        this.toggleDisplay('.bets-summary', shouldDisplay);
        this.updateSummaryInfo();
    }

    updateSummaryInfo() {
        this.shadowRoot!.querySelector('.bets-summary__info--bets-number')!.textContent = `Nombre de paris joués: ${this.selectedBets.length}`
        this.shadowRoot!.querySelector('.bets-summary__info--potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(this.startingBet, this.selectedBets, this.isUserPremium)}`
    }
}

customElements.define('wcf-bets-summary', BetsSummary);