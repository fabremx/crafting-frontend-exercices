import css from './bet-list.scss';
import { getBetList } from "../../api/getBetList";
import { BetInfo } from "../../models/bet";
import loaderIcon from '../../assets/loader.gif'

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div class="loader">
    <img src="${loaderIcon}" alt="loader" />
</div>

<div class="bet-list" hidden>
    <h3>Liste des paris - Football</h3>
    <div class="bet-list-element"></div>
</div>
`;

export class BetList extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        const betInfos: BetInfo[] = await getBetList();

        this.hideLoader();
        this.displayBetList(betInfos);
    }

    hideLoader() {
        this.shadowRoot!.querySelector<HTMLElement>('.loader')!.style.display = 'none';
    }

    displayBetList(betInfos: BetInfo[]) {
        const betListElement = this.shadowRoot!.querySelector('.bet-list')!;

        betListElement.removeAttribute('hidden');
        const betItems = betInfos.reduce(
            (acc: string, bet: BetInfo) => `${acc}<wcf-bet-item bet='${JSON.stringify(bet)}'></wcf-bet-item>`,
            '');
        betListElement.innerHTML = betItems;
    }
}

customElements.define('wcf-bet-list', BetList);