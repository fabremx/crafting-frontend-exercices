import css from './betting-page.scss'
import { BetSlip } from '../models'
import { UPDATE_BETS_SLIP, UPDATE_STAKE } from '../shared'
import { CustomHTMLElement, stringify } from '../utils'

import '../components/betting-list/betting-list'
import '../components/stake/stake'
import '../components/summary/summary'

const template = document.createElement('template')
template.innerHTML = `
<style>${css}</style>

<div class="betting-page">
    <arl-betting-list></arl-betting-list>
    <arl-stake hidden data-test="test"></arl-stake>
    <arl-summary hidden></arl-summary>

    <div class="betting-page__validation">
        <button hidden>Valider le(s) paris</button>
    <div>
</div>
`

export class BettingPage extends CustomHTMLElement {
    private betsSlip: BetSlip[] = []
    private stake = 0

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

        window.addEventListener(UPDATE_BETS_SLIP, ((event: Event) => this.updateBetsSlip(event as CustomEvent)).bind(this))
        window.addEventListener(UPDATE_STAKE, ((event: Event) => this.updateStake(event as CustomEvent)).bind(this))
    }

    connectedCallback() {
        this.toggleStakeRender()
        this.toggleSummaryRender()
    }

    updateBetsSlip(event: CustomEvent) {
        this.betsSlip = event.detail.betsSlip

        this.setSummaryAttribute('bets-slip', stringify(this.betsSlip))
        this.toggleStakeRender()
    }

    updateStake(event: CustomEvent) {
        this.stake = event.detail.stake

        this.setSummaryAttribute('stake', stringify(this.stake))
        this.toggleSummaryRender()
    }

    toggleStakeRender() {
        const shouldDisplay = Boolean(this.betsSlip.length)
        this.toggleDisplay('arl-stake', shouldDisplay)
    }

    toggleSummaryRender() {
        const shouldDisplay = Boolean(this.stake && this.stake > 0 && this.betsSlip.length)

        this.toggleDisplay('arl-summary', shouldDisplay)
        this.toggleDisplay('button', shouldDisplay)
    }

    setSummaryAttribute(key: string, value: unknown) {
        const betsSummaryElement = this.shadowRoot?.querySelector('arl-summary') as HTMLElement
        betsSummaryElement.setAttribute(key, stringify(value))
    }
}

customElements.define('arl-betting-page', BettingPage)