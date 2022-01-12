/**
 * @jest-environment jsdom
 */

import { Footer } from "./wcf-vanilla-footer";

it('should return footer when user is connected', () => {
    const footer = new Footer();
    footer.setAttribute('isuserconnected', "true")
    expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
});

it('should return footer when user is NOT connected', async () => {
    const footer = new Footer();
    footer.setAttribute('isuserconnected', "false")
    expect(footer?.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
});