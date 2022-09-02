import './footer'

export default {
    title: 'Components/Footer',
    argTypes: {
        isUserConnected: {
            control: 'boolean',
        },
    }
}

const Template = (argTypes: any) => `<arl-footer is-user-connected="${argTypes.isUserConnected}"></arl-footer>`
export const Default = Template.bind({})

