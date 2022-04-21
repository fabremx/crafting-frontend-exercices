import css from './bets-summary.scss';
import { getPotentialGain } from "../../business/bets/getPotentialGain";
import { reduxStore } from '../../state/store';
import { Bet } from "../../models/bet";
import { selectSelectedBets, selectStartingBet, selectUser } from '../../state/selectors';
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
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
    }

    handleApplicationStateChange() {
        const startingBet = selectStartingBet();
        const selectedBets = selectSelectedBets();
        const user = selectUser();

        const shouldDisplay = startingBet > 0 && selectedBets.length > 0;
        this.toggleDisplay('.bets-summary', shouldDisplay);
        this.updateSummaryInfo(selectedBets, startingBet, user.isPremium);
    }

    updateSummaryInfo(selectedBets: Bet[], startingBet: number, isPremium: boolean) {
        this.shadowRoot!.querySelector('.bets-summary__info--bets-number')!.textContent = `Nombre de paris joués: ${selectedBets.length}`
        this.shadowRoot!.querySelector('.bets-summary__info--potential-gain')!.textContent = `Potentiel gain: ${getPotentialGain(startingBet, selectedBets, isPremium)}`
    }
}

customElements.define('wcf-bets-summary', BetsSummary);