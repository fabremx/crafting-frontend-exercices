import { UPDATE_STAKE } from '../../shared'

const template = document.createElement('template')
template.innerHTML = `
<div class="stake">
    <h3 class="stake__title">Votre Mise</h3>
    <div class="stake__input">
        <p>Choisir votre mise</p>
        <input type="number" value="" />
    </div>
</div>
`

export class Stake extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

        this.shadowRoot?.querySelector('input')?.addEventListener('keyup', this.emitStake.bind(this))
    }

    emitStake() {
        const stake = this.shadowRoot?.querySelector('input')?.value
        window.dispatchEvent(new CustomEvent(UPDATE_STAKE, { detail: { stake } }))
    }
}

customElements.define('arl-stake', Stake)