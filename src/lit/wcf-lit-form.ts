import { LitElement, html, css } from "lit";
import { customElement, state } from 'lit/decorators.js';

@customElement("wcf-lit-form")
export class Form extends LitElement {
    static styles = [
        css`
            #form {
                border: solid 1px red;
                padding: 10px;
                margin-bottom: 10px;
            }
        `
    ];

    constructor() {
        super();
        window.addEventListener('incrementCounter', () => { this.incrementCounter() });
    }

    @state() protected counter = 0;

    incrementCounter() {
        this.counter++;
    }

    render() {
        return html`
            <div id="form">
                <h1>Lit Form</h1>
                <wcf-lit-counter label="Click Me" clickCounter="${this.counter}"></wcf-lit-counter>
                <wcf-lit-info clickCounter="${this.counter}"></wcf-lit-info>
            </div>
        `
    }
}