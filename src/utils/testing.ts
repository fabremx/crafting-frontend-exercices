export function dispatchMockedEventWith(element: Element) {
    return function (key: string, value: number | string) {
        const inputElement = element.shadowRoot?.querySelector('input')!;
        inputElement.value = value.toString();

        const fakeEvent = new Event(key)
        inputElement.dispatchEvent(fakeEvent);
    }
}

export function findElementWith(element: Element, key: string): Element | null | undefined {
    return element.shadowRoot?.querySelector(key);
}
export function findElementsWith(element: Element, key: string): NodeListOf<Element> | undefined {
    return element.shadowRoot?.querySelectorAll(key);
}

export function isVisible(element: Element | null | undefined): boolean {
    if (!element) return false;

    return (
        !element.hasAttribute('hidden') &&
        (element as HTMLElement).style.display !== 'none'
    );
}

export const getElementsNumber = (lineNumber: number) => {
    return function (element: Element, key: string): Element {
        return element.shadowRoot?.querySelectorAll(key)[lineNumber - 1]!
    }
}