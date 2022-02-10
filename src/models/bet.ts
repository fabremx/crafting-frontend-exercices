import { GameInfo } from "./game";
import { OddsInfo } from "./odds";

export type BetInfo = Omit<GameInfo & OddsInfo, 'id'> & {
    [key: string]: number;
};

export type BetChoice = '1' | 'draw' | '2';
export type Bet = {
    gameId: string;
    selectedChoice: BetChoice;
    selectedOdd: number;
}