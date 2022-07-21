import css from './betting-item.scss'
import betIcon from '../../../assets/bet.png'
import { BetChoice } from '../../models'
import {
  DRAW, TEAM_1_WINS, TEAM_2_WINS,
} from '../../shared'
import { CustomHTMLElement } from '../../utils'

const template = document.createElement('template')

function createTemplate() {
  return `
    <style>${css}</style>

    <div class="betting-item">
        <div class="betting-item__teams">
            <img src="${betIcon}" alt="Sport icon" />
            <p>
                <span class="betting-item__teams--name">team 1</span> - 
                <span class="betting-item__teams--name">team 2</span>
            </p>
        </div>
    
        <div class="betting-item__odds">
            <button>
                <span class="betting-item__odds--name">team 1</span>
                <span class="betting-item__odds--number">1.20</span>
            </button>
            <button>
                <span class="betting-item__odds--name">Draw</span>
                <span class="betting-item__odds--number">2.42</span>
            </button>
            <button>
                <span class="betting-item__odds--name">team 2</span>
                <span class="betting-item__odds--number">1.78</span>
            </button>
        </div>
    </div>
    `
}

export class BettingItem extends CustomHTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const newTemplate = createTemplate()
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

  handleSelectBet(buttonElement: Element, _betChoice: BetChoice) {
    this.selectClickedButton(buttonElement)
    window.dispatchEvent(new CustomEvent('dummyEventName', { detail: 'dummyData' }));
  }
}

customElements.define('arl-betting-item', BettingItem)
