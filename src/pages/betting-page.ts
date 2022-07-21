import { CustomHTMLElement } from '../utils'

const template = document.createElement('template')
template.innerHTML = `<div class="betting-page">

</div>`

export class BettingPage extends CustomHTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }
}

customElements.define('arl-betting-page', BettingPage)