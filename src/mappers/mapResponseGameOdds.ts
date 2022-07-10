/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GameApiResponse, GameOdds, OddsApiResponse } from '../models'

export function mapResponseToGameOdds(games: GameApiResponse[], odds: OddsApiResponse[]): GameOdds[] {
    return games.map((game: GameApiResponse) => {
        const oddInfo = odds.find((odd: OddsApiResponse) => odd.gameId === game.id)!

        return {
            gameId: game.id,
            team1: game.team1,
            team2: game.team2,
            oddsTeam1: oddInfo.oddsTeam1,
            oddsDraw: oddInfo.oddsDraw,
            oddsTeam2: oddInfo.oddsTeam2
        }
    })
}