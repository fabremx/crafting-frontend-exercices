import { Bet, User } from '../models';

export type ApplicationState = {
    selectedBets: Bet[];
    startingBet: number;
    user: User;
}
