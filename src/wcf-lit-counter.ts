import { LitElement, html, css } from "lit";
import { customElement, property, state } from 'lit/decorators.js';

@customElement("wcf-lit-counter")
export class Counter extends LitElement {
    static styles = [
        css`
            #counter {
                border: solid 1px red;
                padding: 10px;
                margin-bottom: 10px;
            }
        `
    ];

    @property({ type: String }) label = "";
    @state() protected counter = 0;

    incrementCounter() {
        this.counter++;
    }

    render() {
        return html`
            <div id="counter">
                <h1>Lit Button Component</h1>
                <button @click="${() => this.incrementCounter()}">${this.label}</button>
                <p>Counter: ${this.counter}</p>
            </div>
        `
    }
}