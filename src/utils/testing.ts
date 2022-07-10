export function dispatchMockedEventWith(element: Element): (key: string, value: string | number) => void {
    return function (key: string, value: number | string): void {
        const inputElement = element.shadowRoot?.querySelector('input')

        if (!inputElement) {
            return
        }

        inputElement.value = value.toString()
        const fakeEvent = new Event(key)
        inputElement.dispatchEvent(fakeEvent)
    }
}
