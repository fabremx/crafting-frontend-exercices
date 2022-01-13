import { BetInfo } from "../models/bet";
import { GameInfo } from "../models/gameInfo";
import { OddInfo } from "../models/oddInfo";
import { mockFetch } from "../utils/fetch";

export const getBetList = async (): Promise<BetInfo[]> => {
    const gameList = await mockFetch('games') as GameInfo[];
    const oddList = await mockFetch('odds') as OddInfo[];

    return gameList.map((game: GameInfo) => {
        const oddInfo = oddList.find((odd: OddInfo) => odd.gameId === game.id)!;

        return {
            gameId: game.id,
            type: game.type,
            adversary1: game.adversary1,
            adversary2: game.adversary2,
            odd1: oddInfo.odd1,
            oddDraw: oddInfo.oddDraw,
            odd2: oddInfo.odd2
        }
    })
}