import css from './wcf-bets.scss'
import { Bet } from "../../models/bet";
import { User } from "../../models/user";
import { reduxStore } from '../../state/store';

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

export class BetsPage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
    }

    handleApplicationStateChange() {
        const { startingBet, selectedBets } = reduxStore.getState();
        const isDisplay = startingBet > 0 && selectedBets.length > 0;
        this.toggleDisplay(isDisplay);
    }

    toggleDisplay(isDisplay: boolean) {
        const buttonElement = 'button';
        
        if (isDisplay) {
            this.displayElement(buttonElement)
        } else {
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

