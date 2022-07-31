import { SELECT_BET_CHOICE, UPDATE_BETS_SLIP } from '../../shared'
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
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  async connectedCallback() {
    window.addEventListener(SELECT_BET_CHOICE, this.onSelectBetChoice.bind(this))
    this.render()
  }

  render() {
    const newTemplate = createTemplate()
    this.renderComponent(newTemplate)
  }

  onSelectBetChoice() {
    window.dispatchEvent(new CustomEvent(UPDATE_BETS_SLIP, { detail: 'dummyData' }))
  }
}

customElements.define('arl-betting-list', BettingList)
