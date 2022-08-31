export default {
    title: 'Components/Footer',
    argTypes: {
        isUserConnected: {
            control: 'boolean',
        },
    }
}

const Template = (argTypes: any) => `<arl-footer is-user-connected="${argTypes.isUserConnected}"></arl-footer>`

export const Default = () => '<arl-footer></arl-footer>'
export const FooterWithConnectedUser = () => '<arl-footer is-user-connected="true"></arl-footer>'
export const FooterWithDisconnectedUser = () => '<arl-footer is-user-connected="false"></arl-footer>'
export const Default = Template.bind({});
