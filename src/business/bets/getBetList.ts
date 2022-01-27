import { BetInfo } from "../../models/bet";
import { GameInfo } from "../../models/game";
import { OddsInfo } from "../../models/odds";
import { mockFetch } from "../../utils/mockFetch";

export const getBetList = async (): Promise<BetInfo[]> => {
    const gameList = await mockFetch('games') as GameInfo[];
    const oddList = await mockFetch('odds') as OddsInfo[];

    return gameList.map((game: GameInfo) => {
        const oddInfo = oddList.find((odd: OddsInfo) => odd.gameId === game.id)!;

        return {
            gameId: game.id,
            type: game.type,
            adversary1: game.adversary1,
            adversary2: game.adversary2,
            odd1: oddInfo.odd1,
            odddraw: oddInfo.odddraw,
            odd2: oddInfo.odd2
        }
    })
}