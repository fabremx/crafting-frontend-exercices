import { LitElement, html, css } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement("wcf-lit-info")
export class Info extends LitElement {
    static styles = [
        css`
            .info__text--red {
                color: red;
            }
        `
    ];

    @property({ type: Number }) clickCounter = 0;

    render() {
        return html`
            <div id="info">
                <h3>Info Component</h3>
                ${this.clickCounter >= 5
                ? html`
                        <p class="info__text--red">You clicked more than 5 times.. Can you explain why ?</p>
                        <input type="text" placeholder="Explain the reason.." />
                        <button>Submit</button>
                    `
                : html`
                        <p>No info available</p>
                    `
            }
            </div>
        `
    }
}