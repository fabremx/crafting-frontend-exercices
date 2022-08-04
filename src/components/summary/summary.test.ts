import {Summary} from './summary'
import {render} from '../../utils'

describe('Summary', () => {
    it('should render the number of bets slip', async () => {
        const summary = await render(Summary)

        const expected = [
            {
                gameId: 'LYON_PARIS',
                selectedChoice: 'TEAM_1_WINS',
                selectedOdds: 1.3
            }
        ]

        summary.setAttribute('bets-slip', JSON.stringify(expected))

        //expects
        //todo mettre un expect
    })
})
