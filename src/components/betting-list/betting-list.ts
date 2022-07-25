import { GameOdds } from '../../models'
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
    this.render()
  }

  render() {
    const dummyGameOddsList: GameOdds[] = [
      {
        gameId: 'gameId1',
        team1: 'team1',
        team2: 'team2',
        oddsTeam1: 1,
        oddsDraw: 2,
        oddsTeam2: 3,
      },
      {
        gameId: 'gameId2',
        team1: 'team3',
        team2: 'team4',
        oddsTeam1: 4,
        oddsDraw: 5,
        oddsTeam2: 6,
      }
    ]
    const newTemplate = createTemplate(dummyGameOddsList)
    this.renderComponent(newTemplate)
  }

  onSelectBetChoice() {
    // Called when component recieves SELECT_BET_CHOICE event
  }
}

customElements.define('arl-betting-list', BettingList)
