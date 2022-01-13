import { GameInfo } from "./gameInfo";
import { OddInfo } from "./oddInfo";

export type BetInfo = Omit<GameInfo & OddInfo, 'id'>;

export type BetChoice = '1' | 'Draw' | '2';
export type Bet = {
    gameId: string,
    selectedChoice: BetChoice,
    selectedOdd: number
}