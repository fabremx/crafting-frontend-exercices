import { BetChoice, BetSlip, GameOdds } from '../../models'

export function updateBetsSlip(betsSlip: BetSlip[], gameOdds: GameOdds, betChoice: BetChoice): BetSlip[] {
    const newBetsSlip = betsSlip.map((betSlip: BetSlip) => ({ ...betSlip }))

    const existingBetSlipIndex = betsSlip.findIndex((betSlip: BetSlip) => betSlip.gameId === gameOdds.gameId)

    const betSlip: BetSlip = {
        gameId: gameOdds.gameId,
        selectedChoice: betChoice,
        selectedOdds: getOddsFrom(gameOdds, betChoice)
    }

    existingBetSlipIndex >= 0
        ? newBetsSlip[existingBetSlipIndex] = betSlip
        : newBetsSlip.push(betSlip)

    return newBetsSlip
}

function getOddsFrom(gameOdds: GameOdds, betChoice: BetChoice): number {
    switch (betChoice) {
        case 'TEAM_1_WINS':
            return gameOdds.oddsTeam1
        case 'DRAW':
            return gameOdds.oddsDraw
        case 'TEAM_2_WINS':
            return gameOdds.oddsTeam2
    }
}