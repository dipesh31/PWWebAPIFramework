import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {
  //Locators

  private readonly searchResults: Locator;

  //Constructor

  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator("div.product-layout");
  }

  // Methods

  async getProductSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async selectProduct(productName: string) {
    await this.page.getByRole("link", { name: productName }).first().click();
  }
}
