const template = document.createElement('template');
template.innerHTML = `
<style>
    #header {
        border: 1px solid black;
        padding: 10px;
        margin-bottom: 20px;
    }
</style>

<div id="header">
    <h3>Header Title</h3>
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