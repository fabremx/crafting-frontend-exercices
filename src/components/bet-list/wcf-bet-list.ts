import css from './wcf-bet-list.scss';
import { getBetList } from "../../api/getBetList";
import { BetInfo } from "../../models/bet";
import loaderIcon from '../../assets/loader.gif'
import { reduxStore } from '../../state/store';
import { doUpdateBetInfos } from '../../state/actions';
import { selectBetInfos } from '../../state/selectors';

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
    private betInfos: BetInfo[] = [];

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        reduxStore.subscribe(this.handleApplicationStateChange.bind(this));
    }

    async connectedCallback() {
        reduxStore.dispatch(doUpdateBetInfos(await getBetList()));
    }

    handleApplicationStateChange() {
        const betInfos = selectBetInfos()

        if (betInfos !== this.betInfos) {
            this.betInfos = betInfos;
            this.displayBetList();
        };

        this.hideLoader();
    }

    hideLoader() {
        this.shadowRoot!.querySelector<HTMLElement>('.loader')!.style.display = 'none';
    }

    displayBetList() {
        const betListElement = this.shadowRoot!.querySelector('.bet-list')!;

        betListElement.removeAttribute('hidden');
        const betItems = this.betInfos.reduce(
            (acc: string, bet: BetInfo) => `${acc}<wcf-bet-item bet='${JSON.stringify(bet)}'></wcf-bet-item>`,
        '');
        betListElement.innerHTML = betItems;
    }
}