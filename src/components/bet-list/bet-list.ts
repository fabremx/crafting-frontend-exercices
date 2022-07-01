const template = document.createElement('template');
template.innerHTML = `
<div class="bet-list">
    <h3>Liste des paris - Football</h3>
</div>
`;

export class BetList extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    displayBetList(betList: any[]) {
        const betListElement = this.shadowRoot!.querySelector('.bet-list')!;

        betList.forEach((bet: any) => {
            betListElement.insertAdjacentHTML('beforeend', `<arl-bet-item bet='${JSON.stringify(bet)}'></arl-bet-item>`);
        });
    }
}

customElements.define('arl-bet-list', BetList);