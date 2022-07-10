import { CustomHTMLElement } from './customHTMLElement'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(element: any): HTMLElement | CustomHTMLElement {
    const instance = new element()

    if (typeof instance.connectedCallback == 'function') {
        instance.connectedCallback()
        return instance
    }

    return instance
}

export function formatAttributeValue(value: unknown): string {
    return typeof value === 'string' ? value : JSON.stringify(value)
}