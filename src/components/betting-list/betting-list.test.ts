import { render } from "../../utils";
import { BettingList } from "./betting-list";

describe('Betting list', () => {
  it('should render 2 items when component loads 2 gameOdds', async () => {
    const bettingList = await render(BettingList);

    const items = bettingList.shadowRoot?.querySelectorAll('.betting-list arl-betting-item')

    expect(items?.length).toBe(2)
  });
});