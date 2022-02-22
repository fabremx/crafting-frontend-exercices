import css from './bets-page.scss'
import { reduxStore } from '../../state/store';
import { selectSelectedBets } from '../../state/selectors';
import { CustomHTMLElement } from '../../utils/customHTMLElement';
import { Bet } from '../../models';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div id="bets-page">
    <wcf-bet-list></wcf-bet-list>
    <wcf-starting-bet></wcf-starting-bet>
    <wcf-bets-summary></wcf-bets-summary>

    <div class="bet-page__validation">
        <button hidden>Valider le(s) paris</button>
    <div>
</div>
`;

export class BetsPage extends CustomHTMLElement {
    private selectedBets: Bet[] = [];
    private startingBet: number | undefined;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
        window.addEventListener('UPDATE_STARTING_BET', ((event: Event) => this.updateStartingBet(event as CustomEvent)).bind(this));
    }

    handleApplicationStateChange() {
        this.selectedBets = selectSelectedBets();

        this.handleDisplay();
    }

    updateStartingBet(event: CustomEvent) {
        this.startingBet = event.detail.startingBet;

        this.setBetsSummaryAttribute('startingbet', this.startingBet);
        this.handleDisplay();
    }

    handleDisplay() {
        const shouldDisplay = Boolean(this.startingBet && this.selectedBets.length);
        this.toggleDisplay('button', shouldDisplay);
    }

    setBetsSummaryAttribute(key: string, value: unknown) {
        const betsSummaryElement = this.shadowRoot?.querySelector('wcf-bets-summary');

        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value)
        betsSummaryElement?.setAttribute(key, stringifiedValue);
    }
}

customElements.define('wcf-bets', BetsPage);