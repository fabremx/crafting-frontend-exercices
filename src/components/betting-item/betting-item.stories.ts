import './betting-item'

export default {
    title: 'Components/Betting Item',
}

export const EmptyBettingItem = () => '<arl-betting-item></arl-betting-item>'

export const FilledBettingItem = (argTypes: any) => `<arl-betting-item game-odds='${JSON.stringify(argTypes.gameOdds)}'></arl-betting-item>`
FilledBettingItem.argTypes = {
    gameOdds: {
        control: 'object',
            defaultValue: {
            gameId: '1',
                team1: 'Paris SG',
                team2: 'Lyon',
                oddsTeam1: 1.23,
                oddsDraw: 2.54,
                oddsTeam2: 3.88,
        },
    }
}