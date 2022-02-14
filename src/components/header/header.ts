import css from './header.scss';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>
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

customElements.define('wcf-header', Header);