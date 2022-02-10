import { GameInfo, OddsInfo, Bet } from '.';

export type ApplicationState = {
    gameInfos: GameInfo[];
    oddsInfo: OddsInfo[];
    selectedBets: Bet[];
}
