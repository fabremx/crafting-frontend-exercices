import { render } from '../../utils'
import { Footer } from './footer'

it('should return footer when user is connected', async () => {
    const footer = await render(Footer)
    footer.setAttribute('is-user-connected', 'true')
    expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
})

it('should return footer when user is NOT connected', async () => {
    const footer = await render(Footer)
    footer.setAttribute('is-user-connected', 'false')
    expect(footer?.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
})