import { mapResponseToGameOdds } from "../mappers"
import { GameApiResponse, GameOdds, OddsApiResponse } from "../models"
import { mockFetch } from "../utils"

export const fetchGameOdds = async (): Promise<GameOdds[]> => {
    const gameList = await mockFetch('games') as GameApiResponse[]
    const oddsList = await mockFetch('odds') as OddsApiResponse[]

    return mapResponseToGameOdds(gameList, oddsList)
}