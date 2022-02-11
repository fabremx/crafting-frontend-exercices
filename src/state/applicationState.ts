import { Bet, BetInfo } from '../models';

export type ApplicationState = {
    betInfos: BetInfo[];
    selectedBets: Bet[];
    startingBet: number;
}
