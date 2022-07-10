import { BetSlip } from '../models'

export function getPotentialGains(stake: number, betsSlip: BetSlip[]): number {
    if (!betsSlip.length) {
        return 0
    }

    return Math.floor(stake * betsSlip.reduce((acc, betSlip) => acc = acc * betSlip.selectedOdds, 1))
}