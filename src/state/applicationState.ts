import { GameInfo, OddsInfo, Bet } from '../models';

export type ApplicationState = {
    gameInfos: GameInfo[];
    oddsInfo: OddsInfo[];
    selectedBets: Bet[];
}
