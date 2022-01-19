import css from './wcf-bet-list.scss';
import { getBetList } from "../../business/bets/getBetList";
import { Bet, BetChoice, BetInfo } from "../../models/bet";
import loaderIcon from '../../assets/loader.gif'
import betIcon from '../../assets/bet.png'

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div class="loader">
    <img src="${loaderIcon}" alt="loader" />
</div>

<div class="bet-list" hidden>
    <h3>Liste des paris - Football</h3>
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
        this.shadowRoot!.querySelector<HTMLElement>('.loader')!.style.display = 'none';
    }

    displayBetList(betList: BetInfo[]) {
        const list = this.shadowRoot!.querySelector('.bet-list')!;
        list.removeAttribute('hidden')

        betList.forEach((bet: BetInfo) => {
            const betElement = document.createElement('div');
            betElement.classList.add('bet-list__item', 'bet')
            betElement.innerHTML = `
                <div class="bet__teams">
                    <img src="${betIcon}" alt="Sport icon" />
                    <p>
                        <span class="bet__teams--name">${bet.adversary1}</span> - 
                        <span class="bet__teams--name">${bet.adversary2}</span>
                    </p>
                </div>
                <div class="bet__odds">
                    <button>
                        <span class="bet__odds--name">${bet.adversary1}</span>
                        <span class="bet__odds--number">${bet.odd1.toFixed(2)}</span>
                    </button>
                    ${bet.oddDraw ? `
                    <button>
                        <span class="bet__odds--name">Draw</span>
                        <span class="bet__odds--number">${bet.oddDraw.toFixed(2)}</span>
                   </button>` : ''}
                    <button>
                        <span class="bet__odds--name">${bet.adversary2}</span>
                        <span class="bet__odds--number">${bet.odd2.toFixed(2)}</span>
                    </button>
                </div>
            `

            list.appendChild(betElement)

            const buttons = betElement.querySelectorAll('.bet__odds button');
            buttons[0].addEventListener('click', () => this.selectBet(bet, '1'));

            if (buttons.length === 3) {
                buttons[1].addEventListener('click', () => this.selectBet(bet, 'Draw'));
                buttons[2].addEventListener('click', () => this.selectBet(bet, '2'));
            } else {
                buttons[1].addEventListener('click', () => this.selectBet(bet, '2'));
            }

            this.shadowRoot?.appendChild(list)
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