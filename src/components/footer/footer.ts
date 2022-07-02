const template = document.createElement('template');
template.innerHTML = `
<div id="footer">
    <h3>Need help ?</h3>
    <p></p>
</div>
`;

export class Footer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['is-user-connected']
    }

    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) {
        if (attributeName !== 'is-user-connected') return;

        this.appendText(newValue)
    }

    appendText(isUserConnected: string) {
        const footerText = this.shadowRoot?.querySelector('#footer p');

        isUserConnected === 'true'
            ? footerText!.textContent = 'Contact | Plan | Log out'
            : footerText!.textContent = 'Contact | Plan | Log in';
    }
}

customElements.define('arl-footer', Footer);