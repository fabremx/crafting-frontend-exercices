const template = document.createElement('template');

template.innerHTML = `
<style>
    #form {
        border: solid 1px green;
        padding: 10px;
    }
</style>
<div id="form">
    <h1>Vanilla Form</h1>
    <wcf-vanilla-counter id="counter-element">You can click here</wcf-vanilla-counter>
    <wcf-vanilla-info id="info-element" counter="0"></wcf-vanilla-info>
</div>
`;

export class Form extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        window.addEventListener('increment', () => this.updateCounter())
    }

    updateCounter() {
        const counter = this.shadowRoot?.querySelector('#counter-element')?.getAttribute('counter');
        const infoComponent = this.shadowRoot?.querySelector('#info-element');

        if (!counter) return;
        infoComponent?.setAttribute('counter', counter)
    }
}

customElements.define('wcf-vanilla-form', Form);