import { mapBetList } from "../mappers/betList";
import { BetInfo } from "../models/bet";
import { GameInfo } from "../models/game";
import { OddsInfo } from "../models/odds";
import { mockFetch } from "../utils/mockFetch";

export const getBetList = async (): Promise<BetInfo[]> => {
    const gameList = await mockFetch('games') as GameInfo[];
    const oddList = await mockFetch('odds') as OddsInfo[];

    return mapBetList(gameList, oddList);
}