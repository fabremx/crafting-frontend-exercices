import './src/components/header/header'
import './src/components/footer/footer'

const template = document.createElement('template')
template.innerHTML = `
<div class="app">
    <arl-header></arl-header>
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