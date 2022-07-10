import { BetSlip } from './betSlip'

export type BetsReceipt = {
    betsSlip: BetSlip[];
    stake: number
}