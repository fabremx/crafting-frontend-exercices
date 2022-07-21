import { CustomHTMLElement } from './customHTMLElement'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function render(element: any): Promise<HTMLElement | CustomHTMLElement> {
    const instance = new element()

    if (typeof instance.connectedCallback == 'function') {
        await instance.connectedCallback()
        return instance
    }

    return instance
}

export function stringify(value: unknown): string {
    return typeof value === 'string' ? value : JSON.stringify(value)
}

export function parse(value: string): unknown {
    try {
        return JSON.parse(value)
    } catch (e) {
        return !isNaN(Number(value)) ? Number(value) : value
    }
}