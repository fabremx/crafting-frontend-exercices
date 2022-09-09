import { BetSlip } from '../../models'
import { CustomHTMLElement } from '../../utils'

import '../betting-item/betting-item'

const template = document.createElement('template')

function createTemplate() {
  return `
    <div class="betting-list">
        <h3>Liste des paris - Football</h3>
        <arl-betting-item></arl-betting-item>
        <arl-betting-item></arl-betting-item>
    </div>
  `
}

export class BettingList extends CustomHTMLElement {
  betsSlip: BetSlip[] = []

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  async connectedCallback() {
    this.render()
  }

  render() {
    const newTemplate = createTemplate()
    this.renderComponent(newTemplate)
  }
}

customElements.define('arl-betting-list', BettingList)
