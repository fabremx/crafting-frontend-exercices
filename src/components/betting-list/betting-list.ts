import { mapResponseToGameOdds } from '../../mappers/mapResponseGameOdds'
import { BetChoice, BetSlip, GameOdds } from '../../models'
import { GameApiResponse, OddsApiResponse } from '../../models/api'
import { updateBetsSlip } from '../../services'
import { SELECT_BET_CHOICE, UPDATE_BETS_SLIP } from '../../shared'
import { CustomHTMLElement, mockFetch } from '../../utils'

import '../betting-item/betting-item'

const template = document.createElement('template')

function createTemplate(gameOddsList: GameOdds[]) {
  return `
    <div class="betting-list">
      <h3>Liste des paris - Football</h3>
      ${gameOddsList
      .map((gameOdds: GameOdds) => `<arl-betting-item game-odds='${JSON.stringify(gameOdds)}'></arl-betting-item>`)
      .join('')}
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
    window.addEventListener(SELECT_BET_CHOICE, this.onSelectBetChoice.bind(this))
    this.render()
  }

  render() {
    const stubGameOddsList: GameOdds[] = [
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

    const newTemplate = createTemplate(stubGameOddsList)
    this.renderComponent(newTemplate)
  }

  onSelectBetChoice(event: Event) {
    const { gameOdds, betChoice } = (event as CustomEvent).detail
    this.selectBetSlip(gameOdds, betChoice)
  }

  selectBetSlip(gameOdds: GameOdds, betChoice: BetChoice) {
    this.betsSlip = updateBetsSlip(this.betsSlip, gameOdds, betChoice)
    window.dispatchEvent(new CustomEvent(UPDATE_BETS_SLIP, { detail: { betsSlip: this.betsSlip } }))
  }
}

customElements.define('arl-betting-list', BettingList)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchGameOdds(): Promise<GameOdds[]> {
  const gameList = await mockFetch('games') as GameApiResponse[]
  const oddsList = await mockFetch('odds') as OddsApiResponse[]

  return mapResponseToGameOdds(gameList, oddsList)
}