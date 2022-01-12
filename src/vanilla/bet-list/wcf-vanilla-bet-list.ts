import { getBetList } from "../../business/getBetList";
import { Bet } from "../../models/bet";

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
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        const betList: Bet[] = await getBetList();

        this.hideLoader();
        this.displayBetList(betList);
    }

    hideLoader() {
        this.shadowRoot?.querySelector('.loader')?.setAttribute('hidden', 'true')
    }

    displayBetList(betList: Bet[]) {
        const list = document.createElement('div');
        list.classList.add('betList')

        betList.forEach((bet: Bet) => {
            const betElement = document.createElement('div');
            betElement.classList.add('bet')
            betElement.innerHTML = `
                <img src="null" />
                <div class="adversaries">
                    <p>${bet.adversary1} VS ${bet.adversary2}</p>
                </div>
                <div class="odds">
                    <button>${bet.adversary1} - ${bet.odds1}</button>
                    ${bet.draw ? `<button>Draw- ${bet.draw}</button>` : ''}
                    <button>${bet.adversary2} - ${bet.odds2}</button>
                </div>
            `
            list.appendChild(betElement)
            this.shadowRoot?.querySelector('#betList')?.appendChild(list)
        })
    }
}

customElements.define('wcf-vanilla-bet-list', BetList);