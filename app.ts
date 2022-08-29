import './src/components/header/header'
import './src/components/footer/footer'
import './src/pages/betting-page'

import css from './app.scss'

const template = document.createElement('template')
template.innerHTML = `
<style>${css}</style>

<div class="app">
    <arl-header></arl-header>
    <arl-betting-page></arl-betting-page>
    <arl-footer is-user-connected="true"></arl-footer>
</div>
`

export class App extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }
}

customElements.define('arl-app', App)