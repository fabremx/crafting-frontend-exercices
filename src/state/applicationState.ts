import { Bet, BetInfo, User } from '../models';

export type ApplicationState = {
    selectedBets: Bet[];
    startingBet: number;
    user: User;
}
