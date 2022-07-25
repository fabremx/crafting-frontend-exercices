import './betting-item'

export default {
  title: 'Components/Betting Item',
}

export const EmptyBettingItem = () => '<arl-betting-item></arl-betting-item>'

const mockGameOdds = {
  gameId: '1',
  team1: 'Paris SG',
  team2: 'Lyon',
  oddsTeam1: 1.23,
  oddsDraw: 2.54,
  oddsTeam2: 3.88,
}

export const FilledBettingItem = () => `<arl-betting-item game-odds='${JSON.stringify(mockGameOdds)}'></arl-betting-item>`