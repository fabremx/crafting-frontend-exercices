import { LitElement, html, css } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement("wcf-element")
export class Element extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    @property() name = "Name";

    render() {
        return html`
            <h1>Hello, ${this.name}</h1>
        `
    }
}