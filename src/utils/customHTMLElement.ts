export class CustomHTMLElement extends HTMLElement {
    toggleDisplay(elementSelector: string, shouldDisplay: boolean) {
        if (shouldDisplay) {
            this.displayElement(elementSelector)
        } else {
            this.hideElement(elementSelector)
        }
    }

    displayElement(elementName: string) {
        const element = this.shadowRoot?.querySelector(elementName)
        element?.removeAttribute('hidden')
    }

    hideElement(elementName: string) {
        const element = this.shadowRoot?.querySelector(elementName)
        element?.setAttribute('hidden', '')
    }

    renderComponent(callback: unknown): void {
        if (!this.shadowRoot) {
            return
        }

        this.shadowRoot.innerHTML = callback as string
    }
}