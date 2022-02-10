import { BetItem } from "./src/components/bet-item/wcf-bet-item";
import { BetList } from "./src/components/bet-list/wcf-bet-list";
import { BetsSummary } from "./src/components/bets-summary/wcf-bets-summary";
import { Footer } from "./src/components/footer/wcf-footer";
import { Header } from "./src/components/header/wcf-header";
import { StartingBet } from "./src/components/starting-bet/wcf-starting-bet";
import { BetsPage } from "./src/pages/bets/wcf-bets";

customElements.define('wcf-bets', BetsPage);
customElements.define('wcf-bet-item', BetItem);
customElements.define('wcf-bet-list', BetList);
customElements.define('wcf-bets-summary', BetsSummary);
customElements.define('wcf-footer', Footer);
customElements.define('wcf-header', Header);
customElements.define('wcf-starting-bet', StartingBet);