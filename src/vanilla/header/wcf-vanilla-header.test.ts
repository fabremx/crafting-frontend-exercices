/**
 * @jest-environment jsdom
 */

import { Header } from "./wcf-vanilla-header";

it('should return title header', () => {
    const header = new Header();
    expect(header.shadowRoot?.querySelector('#header')).toMatchSnapshot()
});