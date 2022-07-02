import { Header } from "./header";

it('should render "Web Components Bets Application"', () => {
    const header = new Header();
    expect(header.shadowRoot?.querySelector('.header__title')?.textContent).toBe("Web Components Bets Application")
});