import css from './app.scss'

const template = document.createElement('template')
template.innerHTML = `
<style>${css}</style>

<div class="app">
    it works !! :)
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