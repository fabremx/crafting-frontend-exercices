import { BetSlip, StorybookControls } from '../../models'
import { Stake } from '../stake/stake'
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

type ArgTypes = {
    stake: StorybookControls<Stake>,
    betsSlip: StorybookControls<BetSlip[]>,
}

export const Default = (argTypes: ArgTypes) => `<arl-summary stake="${argTypes.stake}" bets-slip='${JSON.stringify(argTypes.betsSlip)}'></arl-summary>`