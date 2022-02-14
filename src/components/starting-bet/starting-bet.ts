import css from './starting-bet.scss';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div class="starting-bet">
    <h3 class="starting-bet__title">Votre Mise</h3>
    <div class="starting-bet__input">
        <p>Choisir votre mise</p>
        <input type="number" value="" />
    </div>
</div>
`;

export class StartingBet extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        this.shadowRoot?.querySelector('input')!.addEventListener('keyup', this.emitStartingBet.bind(this));
    }

    emitStartingBet() {
        const startingBet = this.shadowRoot?.querySelector('input')?.value!
        window.dispatchEvent(new CustomEvent('UPDATE_STARTING_BET', { detail: { startingBet } }))
    }
}

customElements.define('wcf-starting-bet', StartingBet);