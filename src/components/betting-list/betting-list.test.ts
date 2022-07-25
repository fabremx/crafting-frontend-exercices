import { SELECT_BET_CHOICE } from '../../shared'
import { render } from '../../utils'
import { BettingList } from './betting-list'

jest.mock('../../services', () => ({
  fetchGameOdds: jest.fn().mockResolvedValue([
    {
      gameId: 'gameId1',
      team1: 'team1',
      team2: 'team2',
      oddsTeam1: 1,
      oddsDraw: 2,
      oddsTeam2: 3,
    },
    {
      gameId: 'gameId2',
      team1: 'team3',
      team2: 'team4',
      oddsTeam1: 4,
      oddsDraw: 5,
      oddsTeam2: 6,
    }
  ])
}))

const spyDispatchEvent = jest.spyOn(window, 'dispatchEvent')

describe('Betting list', () => {
  let bettingList: HTMLElement

  beforeEach(async () => {
    bettingList = await render(BettingList)
  })

  it('should render 2 items when component loads 2 gameOdds', () => {
    const items = bettingList.shadowRoot?.querySelectorAll('.betting-list arl-betting-item')

    expect(items?.length).toBe(2)
  })

  it('should emit event with "dummyData" when component recieved "UPDATE_BET_CHOICE" event', () => {
    window.dispatchEvent(new Event(SELECT_BET_CHOICE))

    const expectedParam = (spyDispatchEvent.mock.calls[1][0] as CustomEvent).detail
    expect(expectedParam).toBe('dummyData')
  })
})