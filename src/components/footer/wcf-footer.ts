import css from './wcf-footer.scss';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div id="footer">
    <h3>Besoin d'aide ?</h3>
    <p>Contact | Plan</p>
</div>
`;

export class Footer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    static get tag() {
        return 'wcf-footer'
    }

    static get observedAttributes() {
        return ['isuserconnected']
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (name !== 'isuserconnected') return;

        this.appendText((newValue === 'true'));
    }

    appendText(isUserConnected: boolean) {
        const footerText = this.shadowRoot?.querySelector('#footer p');

        isUserConnected
            ? footerText?.append(' | Déconnexion')
            : footerText?.append(' | Connexion')
    }
}