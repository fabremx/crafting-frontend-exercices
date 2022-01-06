const template = document.createElement('template');

template.innerHTML = `
<div id="counter">
    <h3>Vanilla Button Component</h3>
    <button class="counter__btn">
        <slot />
    </button>
    <p>Counter: <span class="counter__text"></span></p>
</div>
`;

export class Counter extends HTMLElement {
    private buttonElement: HTMLElement;
    private counterTextElement: HTMLElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        this.buttonElement = this.shadowRoot!.querySelector('.counter__btn') as HTMLElement;
        this.counterTextElement = this.shadowRoot?.querySelector('.counter__text')!;
    }

    connectedCallback() {
        this.buttonElement.addEventListener('click', () => this.incrementCounter());
        this.counterTextElement.innerText = this.counter!.toString();
        this.counter = 0;
    }

    disconnectedCallback() {
        this.buttonElement.removeEventListener('click', () => this.incrementCounter());
    }

    attributeChangedCallback(name: string) {
        if (name !== 'counter') return;
        this.counterTextElement.innerText = this.counter.toString();
    }

    incrementCounter() {
        this.counter = this.counter + 1;
        window.dispatchEvent(new CustomEvent('increment'))
    }

    get counter(): number {
        const counter = this.getAttribute('counter')
        if (counter === null) return 0;

        return parseInt(counter, 10);
    }

    set counter(newValue: number) {
        this.setAttribute('counter', newValue.toString());
    }

    static get observedAttributes() {
        return ['counter']
    }
}

customElements.define('wcf-vanilla-counter', Counter);