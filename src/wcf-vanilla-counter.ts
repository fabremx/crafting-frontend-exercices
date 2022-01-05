const template = document.createElement('template');

template.innerHTML = `
<style>
    #counter {
        border: solid 1px green;
        padding: 10px;
    }
</style>
<div id="counter">
    <h1>Vanilla Button Component</h1>
    <button class="counter__btn"></button>
    <p>Counter: <span class="counter__text"></span></p>
</div>
`;

export class Counter extends HTMLElement {
    private counter: number;
    private buttonElement: HTMLElement;
    private counterTextElement: HTMLElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        this.buttonElement = this.shadowRoot!.querySelector('.counter__btn') as HTMLElement;
        this.buttonElement.innerText = this.label;
        this.buttonElement.addEventListener('click', () => this.incrementCounter());

        this.counter = 0;
        this.counterTextElement = this.shadowRoot?.querySelector('.counter__text')!;
        this.counterTextElement.innerText = this.counter.toString();
    }

    static get observedAttributes() {
        return ['label'];
    }

    private get label() {
        return this.getAttribute("label") || "Click";
    }

    incrementCounter() {
        this.counter = this.counter + 1;
        this.counterTextElement.innerText = this.counter.toString();
    }
}

customElements.define('wcf-vanilla-counter', Counter);