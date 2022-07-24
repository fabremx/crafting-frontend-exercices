import { CustomHTMLElement } from '../../utils'

const template = document.createElement('template')

function createTemplate(text: string): string {
    return `
        <div id="footer">
            <h3>Besoin d'aide ?</h3>
            <p>${text}</p>
        </div>
    `
}

export class Footer extends CustomHTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

        this.render()
    }

    static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        if (attributeName !== 'is-user-connected') {
            return
        }

        this.render(newValue)
    }

    render(isUserConnected?: string) {
        const footerText = (isUserConnected === 'true')
            ? 'Contact | Plan | Deconnexion'
            : 'Contact | Plan | Connexion'

        const newTemplate = createTemplate(footerText)
        this.renderComponent(newTemplate)
    }
}

customElements.define('arl-footer', Footer)