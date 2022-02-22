import { Bet, BetInfo, User } from '../models';

export type ApplicationState = {
    selectedBets: Bet[];
    user: User;
}
