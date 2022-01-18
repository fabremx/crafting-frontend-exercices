import { getBetList } from "../../business/bets/getBetList";
import { Bet, BetChoice, BetInfo } from "../../models/bet";

const template = document.createElement('template');
template.innerHTML = `
<style>
    #header {
        border: 1px solid black;
        padding: 10px;
        margin-bottom: 20px;
    }
</style>

<div id="betList">
    <div class="loader">Loading...</div>
</div>
`;

export class BetList extends HTMLElement {
    private bets: Bet[] = [];

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        const betList: BetInfo[] = await getBetList();

        this.hideLoader();
        this.displayBetList(betList);
    }

    hideLoader() {
        this.shadowRoot?.querySelector('.loader')?.setAttribute('hidden', 'true')
    }

    displayBetList(betList: BetInfo[]) {
        const list = document.createElement('div');
        list.classList.add('betList')

        betList.forEach((bet: BetInfo) => {
            const betElement = document.createElement('div');
            betElement.classList.add('bet')
            betElement.innerHTML = `
                <img src="null" />
                <div class="adversaries">
                    <p>${bet.adversary1} VS ${bet.adversary2}</p>
                </div>
                <div class="odds">
                    <button>${bet.adversary1} - ${bet.odd1.toFixed(2)}</button>
                    ${bet.oddDraw ? `<button>Draw - ${bet.oddDraw.toFixed(2)}</button>` : ''}
                    <button>${bet.adversary2} - ${bet.odd2.toFixed(2)}</button>
                </div>
            `

            list.appendChild(betElement)

            const buttons = betElement.querySelectorAll('.odds button');
            buttons[0].addEventListener('click', () => this.selectBet(bet, '1'));

            if (buttons.length === 3) {
                buttons[1].addEventListener('click', () => this.selectBet(bet, 'Draw'));
                buttons[2].addEventListener('click', () => this.selectBet(bet, '2'));
            } else {
                buttons[1].addEventListener('click', () => this.selectBet(bet, '2'));
            }

            this.shadowRoot?.querySelector('#betList')?.appendChild(list)
        }, this)
    }

    get selectedBets(): Bet[] {
        return this.bets;
    }

    selectBet(betInfo: BetInfo, choice: BetChoice) {
        const existingBetIndex = this.bets.findIndex((bet: Bet) => bet.gameId === betInfo.gameId);

        const bet = {
            gameId: betInfo.gameId,
            selectedChoice: choice,
            selectedOdd: betInfo[`odd${choice}`]!
        }

        existingBetIndex >= 0
            ? this.bets[existingBetIndex] = bet
            : this.bets.push(bet);

        window.dispatchEvent(new CustomEvent('UPDATE_BETS', { detail: { bets: this.bets } }))
    }
}

customElements.define('wcf-bet-list', BetList);