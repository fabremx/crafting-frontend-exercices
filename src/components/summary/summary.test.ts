import { BetSlip } from '../../models'
import { DRAW, TEAM_1_WINS } from '../../shared'
import { formatAttributeValue, render } from '../../utils'
import { Summary } from './summary'

const DUMMY_BETS_SLIP: BetSlip[] = [
    {
        gameId: 'id1',
        selectedChoice: TEAM_1_WINS,
        selectedOdds: 1.52,
    },
    {
        gameId: 'id2',
        selectedChoice: DRAW,
        selectedOdds: 1.12,
    }
]
const DUMMY_STAKE = 100

describe('Bets-Summary Component', () => {
    it('should render correctly summary when user made bets slip with 100€ stake', () => {
        // Given
        const betsSummary = render(Summary)

        // When
        betsSummary.setAttribute('bets-slip', formatAttributeValue(DUMMY_BETS_SLIP))
        betsSummary.setAttribute('stake', formatAttributeValue(DUMMY_STAKE))

        // Then
        expect(betsSummary?.shadowRoot?.innerHTML).toMatchSnapshot()
    })
})