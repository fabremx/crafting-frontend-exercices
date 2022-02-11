import css from './wcf-bets.scss'
import { Bet } from "../../models/bet";
import { User } from "../../models/user";
import { reduxStore } from '../../state/store';
import { selectSelectedBets, selectStartingBet } from '../../state/selectors';
import { CustomHTMLElement } from '../../utils/customHTMLElement';

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
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
    }

    handleApplicationStateChange() {
        const startingBet = selectStartingBet();
        const selectedBets = selectSelectedBets();

        const shouldDisplay = startingBet > 0 && selectedBets.length > 0;
        this.toggleDisplay('button', shouldDisplay);
    }
}

