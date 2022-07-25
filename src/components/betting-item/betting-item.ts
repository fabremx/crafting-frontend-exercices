import css from './betting-item.scss'
import betIcon from '../../../assets/bet.png'
import { BetChoice, GameOdds } from '../../models'
import {
  DRAW, SELECT_BET_CHOICE, TEAM_1_WINS, TEAM_2_WINS,
} from '../../shared'
import { CustomHTMLElement, parse } from '../../utils'

const template = document.createElement('template')

function createTemplate(gameOdds: GameOdds | undefined) {
  return `
    <style>${css}</style>

    <div class="betting-item">
        <div class="betting-item__teams">
            <img src="${betIcon}" alt="Sport icon" />
            <p>
                <span class="betting-item__teams--name">${gameOdds?.team1}</span> - 
                <span class="betting-item__teams--name">${gameOdds?.team2}</span>
            </p>
        </div>
    
        <div class="betting-item__odds">
            <button>
                <span class="betting-item__odds--name">${gameOdds?.team1}</span>
                <span class="betting-item__odds--number">${gameOdds?.oddsTeam1}</span>
            </button>
            <button>
                <span class="betting-item__odds--name">Draw</span>
                <span class="betting-item__odds--number">${gameOdds?.oddsDraw}</span>
            </button>
            <button>
                <span class="betting-item__odds--name">${gameOdds?.team2}</span>
                <span class="betting-item__odds--number">${gameOdds?.oddsTeam2}</span>
            </button>
        </div>
    </div>
    `
}

export class BettingItem extends CustomHTMLElement {
  gameOdds: GameOdds | undefined;

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.render()
  }

  static get observedAttributes() {
    return ['game-odds']
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name !== 'game-odds') { return }

    this.gameOdds = parse(newValue) as GameOdds
    this.render()
  }

  render() {
    const newTemplate = createTemplate(this.gameOdds)
    this.renderComponent(newTemplate)
    this.addEventToButtons()
  }

  addEventToButtons() {
    const buttons = this.shadowRoot?.querySelectorAll('.betting-item__odds button')

    buttons?.forEach((button: Element, index: number) => {
      this.addClickEvent(button, index)
    })
  }

  addClickEvent(button: Element, index: number) {
    const betChoices: BetChoice[] = [TEAM_1_WINS, DRAW, TEAM_2_WINS]
    button.addEventListener('click', () => this.handleSelectBet(button, betChoices[index]))
  }

  selectClickedButton(clickedButton: Element) {
    const buttons = this.shadowRoot?.querySelectorAll('.betting-item__odds button')

    buttons?.forEach((button: Element) => (button === clickedButton
      ? button.classList.add('selected')
      : button.classList.remove('selected')))
  }

  handleSelectBet(buttonElement: Element, betChoice: BetChoice) {
    this.selectClickedButton(buttonElement)
    window.dispatchEvent(new CustomEvent(SELECT_BET_CHOICE, { detail: { gameOdds: this.gameOdds, betChoice } }))
  }
}

customElements.define('arl-betting-item', BettingItem)
