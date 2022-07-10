import './footer'

export default {
    title: 'Components/Footer',
}

export const Default = () => '<arl-footer></arl-footer>'
export const FooterWithConnectedUser = () => '<arl-footer is-user-connected="true"></arl-footer>'
export const FooterWithDisconnectedUser = () => '<arl-footer is-user-connected="false"></arl-footer>'