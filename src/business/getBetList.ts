import { Bet } from "../models/bet";
import { GameInfo } from "../models/gameInfo";
import { OddInfo } from "../models/oddInfo";
import { mockFetch } from "../utils/fetch";

export const getBetList = async (): Promise<Bet[]> => {
    const gameList = await mockFetch('games') as GameInfo[];
    const oddList = await mockFetch('odds') as OddInfo[];

    return gameList.map((game: GameInfo) => ({
        ...game,
        ...oddList.find((odd: OddInfo) => odd.id === game.id)!
    }))
}