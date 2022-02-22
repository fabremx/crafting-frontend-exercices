import { selectSelectedBets } from '../../state/selectors';
import { reduxStore } from '../../state/store';
import { CustomHTMLElement } from '../../utils/customHTMLElement';
import css from './starting-bet.scss';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div class="starting-bet" hidden>
    <h3 class="starting-bet__title">Votre Mise</h3>
    <div class="starting-bet__input">
        <p>Choisir votre mise</p>
        <input type="number" value="" />
    </div>
</div>
`;

export class StartingBet extends CustomHTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
        this.shadowRoot?.querySelector('input')!.addEventListener('keyup', this.emitStartingBet.bind(this));
    }

    handleApplicationStateChange() {
        const selectedBets = selectSelectedBets();

        if (!selectedBets.length) return;
        this.displayElement('.starting-bet');
    }

    emitStartingBet() {
        const startingBet = Number(this.shadowRoot?.querySelector('input')?.value!) || 0;
        window.dispatchEvent(new CustomEvent('UPDATE_STARTING_BET', { detail: { startingBet } }))
    }
}

customElements.define('wcf-starting-bet', StartingBet);