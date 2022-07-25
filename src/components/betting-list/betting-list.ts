import { GameOdds } from '../../models'
import { fetchGameOdds } from '../../services'
import { SELECT_BET_CHOICE } from '../../shared'
import { CustomHTMLElement, stringify } from '../../utils'

import '../betting-item/betting-item'

const template = document.createElement('template')

function createTemplate(gameOddsList: GameOdds[]) {
  return `
    <div class="betting-list">
        <h3>Liste des paris - Football</h3>
        ${gameOddsList
      .map((gameOdds: GameOdds) => `<arl-betting-item game-odds='${stringify(gameOdds)}'></arl-betting-item>`)
      .join('')
    }
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

    const gameOddsList: GameOdds[] = await fetchGameOdds()
    this.render(gameOddsList)
  }

  render(gameOddsList: GameOdds[]) {
    const newTemplate = createTemplate(gameOddsList)
    this.renderComponent(newTemplate)
  }

  onSelectBetChoice() {
    window.dispatchEvent(new CustomEvent('dummyEventName', { detail: 'dummyData' }))
  }
}

customElements.define('arl-betting-list', BettingList)
