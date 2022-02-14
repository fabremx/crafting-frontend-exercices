import css from './bets-page.scss'
import { Bet } from "../../models/bet";
import { User } from "../../models/user";

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div class="bets-page">
    <wcf-bet-list></wcf-bet-list>
    <wcf-starting-bet hidden></wcf-starting-bet>
    <wcf-bets-summary hidden></wcf-bets-summary>

    <div class="bet-page__validation">
        <button hidden>Valider le(s) paris</button>
    <div>
</div>
`;

export class BetsPage extends HTMLElement {
    private bets: Bet[] = [];
    private startingBet: number | undefined;
    private user: User = {
        firstname: 'Jack',
        lastname: 'Dupont',
        age: 47,
        isPremium: false
    };

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        window.addEventListener('UPDATE_BETS', ((event: Event) => this.updateBets(event as CustomEvent)).bind(this));
        window.addEventListener('UPDATE_STARTING_BET', ((event: Event) => this.updateStartingBet(event as CustomEvent)).bind(this));
    }

    connectedCallback() {
        this.updateIsUserPremium()
        this.toggleStartingBetDisplay();
        this.toggleSummaryDisplay();
    }

    updateBets(event: CustomEvent) {
        this.bets = event.detail.bets

        this.setBetsSummaryAttribute('bets', this.bets);
        this.toggleStartingBetDisplay();
    }

    updateStartingBet(event: CustomEvent) {
        this.startingBet = event.detail.startingBet;

        this.setBetsSummaryAttribute('startingbet', this.startingBet);
        this.toggleSummaryDisplay();
    }

    updateIsUserPremium() {
        this.setBetsSummaryAttribute('isuserpremium', this.user!.isPremium);
    }

    setBetsSummaryAttribute(key: string, value: unknown) {
        const betsSummaryElement = this.shadowRoot?.querySelector('wcf-bets-summary');

        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value)
        betsSummaryElement?.setAttribute(key, stringifiedValue);
    }

    toggleStartingBetDisplay() {
        const startingBetElement = 'wcf-starting-bet';

        this.bets.length
            ? this.displayElement(startingBetElement)
            : this.hideElement(startingBetElement)
    }

    toggleSummaryDisplay() {
        const summaryElement = 'wcf-bets-summary';
        const buttonElement = 'button';

        if (this.startingBet && this.startingBet > 0 && this.bets.length) {
            this.displayElement(summaryElement)
            this.displayElement(buttonElement)
        } else {
            this.hideElement(summaryElement)
            this.hideElement(buttonElement)
        }
    }

    hideElement(elementName: string) {
        const element = this.shadowRoot?.querySelector(elementName)!;
        element.setAttribute('hidden', '')
    }

    displayElement(elementName: string) {
        const element = this.shadowRoot?.querySelector(elementName)!;
        element.removeAttribute('hidden')
    }
}

customElements.define('wcf-bets-page', BetsPage);