import { Bet, BetInfo, User } from '../models';

export type ApplicationState = {
    betInfos: BetInfo[];
    selectedBets: Bet[];
    startingBet: number;
    user: User;
}
