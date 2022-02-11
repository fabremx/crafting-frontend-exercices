import css from './wcf-bet-item.scss';
import { BetChoice, BetInfo } from "../../models/bet";
import betIcon from '../../assets/bet.png'
import { CHOICE_1, CHOICE_2, CHOICE_DRAW } from '../../shared/constants/oddsChoice';
import { reduxStore } from '../../state/store';
import { doUpdateSelectedBet, UPDATE_SELECTED_BET } from '../../state/actions';

const template = document.createElement('template');
template.innerHTML = `
<style>${css}</style>

<div class="bet-item">
    <div class="bet-item__teams">
        <img src="${betIcon}" alt="Sport icon" />
        <p>
            <span class="bet-item__teams--name"></span> - 
            <span class="bet-item__teams--name"></span>
        </p>
    </div>

    <div class="bet-item__odds">
        <button>
            <span class="bet-item__odds--name"></span>
            <span class="bet-item__odds--number"></span>
        </button>
        <button>
            <span class="bet-item__odds--name">Draw</span>
            <span class="bet-item__odds--number"></span>
        </button>
        <button>
            <span class="bet-item__odds--name"></span>
            <span class="bet-item__odds--number"></span>
        </button>
    </div>
</div>
`;

export class BetItem extends HTMLElement {
    private _bet: BetInfo | undefined;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));

        const buttons = this.shadowRoot!.querySelectorAll('.bet-item__odds button');
        buttons[0].addEventListener('click', () => this.handleSelectBet(buttons[0], CHOICE_1));
        buttons[1].addEventListener('click', () => this.handleSelectBet(buttons[1], CHOICE_DRAW));
        buttons[2].addEventListener('click', () => this.handleSelectBet(buttons[2], CHOICE_2));
    }

    static get observedAttributes() {
        return ['bet']
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (name !== 'bet') return;

        this.bet = JSON.parse(newValue);
        this.fillBetHTML();
    }

    get bet(): BetInfo {
        return this._bet!;
    }
    set bet(value: BetInfo) {
        this._bet = value
    }

    fillBetHTML() {
        const teamNames = this.shadowRoot!.querySelectorAll('.bet-item__teams--name')
        teamNames[0].textContent = this.bet.adversary1;
        teamNames[1].textContent = this.bet.adversary2;

        const oddsName = this.shadowRoot!.querySelectorAll('.bet-item__odds--name')
        oddsName[0].textContent = this.bet.adversary1;
        oddsName[2].textContent = this.bet.adversary2;

        const oddsNumber = this.shadowRoot!.querySelectorAll('.bet-item__odds--number')
        oddsNumber[0].textContent = this.bet.odd1.toFixed(2);
        oddsNumber[1].textContent = this.bet.odddraw.toFixed(2);
        oddsNumber[2].textContent = this.bet.odd2.toFixed(2);
    }

    selectClickedButton(clickedButton: Element) {
        const buttons = this.shadowRoot!.querySelectorAll('.bet-item__odds button');

        buttons.forEach((button: Element) => {
            if (button === clickedButton) {
                button.classList.add('selected')
            } else {
                button.classList.remove('selected')
            }
        })
    }

    handleSelectBet(buttonElement: Element, choice: BetChoice) {
        this.selectClickedButton(buttonElement);
        this.sentSelectedBet(this.bet, choice)
    }

    sentSelectedBet(betInfo: BetInfo, choice: BetChoice) {
        reduxStore.dispatch(doUpdateSelectedBet(betInfo, choice));
    }
}