const template = document.createElement('template');
template.innerHTML = `
<div id="header">
    <h3 class="header__title">Web Components Bets Application</h3>
</div>
`;

export class Header extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }
}

customElements.define('arl-header', Header);