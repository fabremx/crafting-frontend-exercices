import { GameInfo } from "./game";
import { OddsInfo } from "./odds";

export type BetInfo = Omit<GameInfo & OddsInfo, 'id'>;

export type BetChoice = '1' | 'Draw' | '2';
export type Bet = {
    gameId: string,
    selectedChoice: BetChoice,
    selectedOdd: number
}