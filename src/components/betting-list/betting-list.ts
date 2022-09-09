import { CustomHTMLElement } from '../../utils'

const template = document.createElement('template')

function createTemplate() {
  return `
    <div class="betting-list">
        <h3>Liste des paris - Football</h3>
    </div>
  `
}

export class BettingList extends CustomHTMLElement {
  betsSlip: unknown[] = []

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
