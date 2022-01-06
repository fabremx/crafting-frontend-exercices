import { LitElement, html } from "lit";
import { customElement, property, state } from 'lit/decorators.js';

@customElement("wcf-lit-counter")
export class Counter extends LitElement {
    @state() _counter = 0;

    incrementCounter() {
        this._counter = this._counter + 1;
        window.dispatchEvent(new CustomEvent('incrementCounter', {
            detail: { value: this._counter }
        }));
    }

    render() {
        return html`
            <div id="counter">
                <h3>Counter Component</h3>
                <button @click="${this.incrementCounter}"><slot />></button>
                <p>Counter: ${this._counter}</p>
            </div>
        `
    }
}