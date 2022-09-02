import { TEAM_1_WINS } from '../../shared'
import './summary'

export default {
    title: 'Components/Summary',
    argTypes: {
        stake: {
            control: 'number',
            defaultValue: 100,
        },
        betsSlip: {
            control: 'array',
            defaultValue: [
                {
                    'gameId': 'gameId',
                    'selectedChoice': 'TEAM_1_WINS',
                    'selectedOdds': 2.98
                }
            ],
        }
    }
}

export const Default = (argTypes: any) => `<arl-summary stake="${argTypes.stake}" bets-slip='${JSON.stringify(argTypes.betsSlip)}'></arl-summary>`