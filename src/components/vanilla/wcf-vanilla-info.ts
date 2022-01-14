const template = document.createElement('template');
template.innerHTML = `
<style>
    .info__text--red {
        color: red;
    }
</style>

<div id="info">
    <h3>Info Component</h3>
</div>
`;

const templateInput = document.createElement('template');
templateInput.innerHTML = `
    <input type="text" placeholder="Explain the reason.." />
    <button>Submit</button>
`

export class Info extends HTMLElement {
    private paragraph: HTMLElement;
    private input: HTMLElement;
    private button: HTMLElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        this.paragraph = document.createElement('p');

        const titleElement = this.shadowRoot?.querySelector('h3');

        titleElement?.after(templateInput.content.cloneNode(true))
        this.input = this.shadowRoot?.querySelector('input')!;
        this.button = this.shadowRoot?.querySelector('button')!;
        this.input.hidden = true;
        this.button.hidden = true;

        titleElement?.after(this.paragraph)
    }

    static get observedAttributes() {
        return ['counter']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name !== 'counter') return;
        this.appendText(newValue);
    }

    appendText(value: string) {
        const counter = parseInt(value, 10);

        this.paragraph.classList.remove('info__text--red');
        this.input.hidden = true;
        this.button.hidden = true;

        if (counter >= 5 && counter < 10) {
            this.input.hidden = false;
            this.button.hidden = false;

            this.paragraph.textContent = 'You clicked more than 5 times.. Can you explain why ?'
            this.paragraph.classList.add('info__text--red');
        } else if (counter >= 10) {
            this.paragraph.textContent = 'Ok ok I understand ...'
        } else {
            this.paragraph.textContent = 'No info available'
        }
    }
}

customElements.define('wcf-vanilla-info', Info);