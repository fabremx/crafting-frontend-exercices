import { TEAM_1_WINS } from '../../shared'
import './summary'

export default {
    title: 'Components/Summary',
}

const mockedBetsSlip = [{
    gameId: 'gameId',
    selectedChoice: TEAM_1_WINS,
    selectedOdds: 2.31
}]
export const Default = () => `<arl-summary stake="100" bets-slip='${JSON.stringify(mockedBetsSlip)}'></arl-summary>`