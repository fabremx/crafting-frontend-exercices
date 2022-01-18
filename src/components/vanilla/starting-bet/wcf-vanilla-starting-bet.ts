const template = document.createElement('template');
template.innerHTML = `
<div id="starting-bet">
    <h3>Votre Mise</h3>
    <p>Choisir votre mise</p>
    <input type="number" value="" />
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
        this.dispatchEvent(new CustomEvent('UPDATE_STARTING_BET', { detail: { startingBet } }))
    }
}

customElements.define('wcf-vanilla-starting-bet', StartingBet);