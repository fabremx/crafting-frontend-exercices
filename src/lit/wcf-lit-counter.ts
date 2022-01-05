import { LitElement, html } from "lit";
import { customElement, property, state } from 'lit/decorators.js';

@customElement("wcf-lit-counter")
export class Counter extends LitElement {
    @property({ type: String }) label = "";
    @property({ type: Number }) clickCounter: number = 0;

    incrementCounter() {
        window.dispatchEvent(new CustomEvent('incrementCounter', {}));
    }

    render() {
        return html`
            <div id="counter">
                <h3>Counter Component</h3>
                <button @click="${this.incrementCounter}">${this.label}</button>
                <p>Counter: ${this.clickCounter}</p>
            </div>
        `
    }
}