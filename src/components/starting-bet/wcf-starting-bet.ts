import { doUpdateStartingBet } from '../../state/actions';
import { reduxStore } from '../../state/store';
import css from './wcf-starting-bet.scss';

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

export class StartingBet extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
        
        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
        this.shadowRoot?.querySelector('input')!.addEventListener('keyup', this.emitStartingBet.bind(this));
    }

    handleApplicationStateChange() {
        const { selectedBets } = reduxStore.getState();

        if (!selectedBets.length) return;
        this.displayElement();
    }

    emitStartingBet() {
        const startingBet = Number(this.shadowRoot?.querySelector('input')?.value!) || 0;
        reduxStore.dispatch(doUpdateStartingBet(startingBet));
    }

    displayElement() {
        const summaryElement = '.starting-bet';
        const element = this.shadowRoot?.querySelector(summaryElement)!;
        element.removeAttribute('hidden')
    }
}