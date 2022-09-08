import { Locator, Page } from 'playwright'


const BETTING_ITEM_IDENTIFIER = '.betting-item'
const STAKE_CONTENT_IDENTIFIER = '.stake'
const SUMMARY_CONTENT_IDENTIFIER = '.summary'

export class BettingPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:3000')
  }

  async getStarted() {
    await this.page.waitForSelector('.betting-item', { timeout: 10000 })
  }

  async isBlockDisplayed(blockIdentifier: string): Promise<boolean> {
    return await this.page.locator(blockIdentifier).getAttribute('hidden') === null
  }

  async getBettingItemButton({ line, button }: { line: number; button: number }): Promise<Locator> {
    const gameOdds = await this.page.locator(BETTING_ITEM_IDENTIFIER).nth(line - 1)
    return await gameOdds.locator('button').nth(button - 1)
  }

  async getStakeInput(): Promise<Locator> {
    return await this.page.locator(`${STAKE_CONTENT_IDENTIFIER} input`)
  }

  async getSummaryContent(): Promise<string | null> {
    return await this.page.locator(SUMMARY_CONTENT_IDENTIFIER).textContent()
  }

  async getBettingListCount(): Promise<number | null> {
    return await this.page.locator('.betting-item').count()
  }
}