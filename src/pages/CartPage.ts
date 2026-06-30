import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoadFnOutput } from "node:module";

export class CartPage extends BasePage {
  private readonly checkout: Locator;

  constructor(page: Page) {
    super(page);
    this.checkout = page.getByRole("link", { name: "Checkout", exact: true });
  }

  async getProductDetails(productName: string) {
    const cartRow = this.page
      .locator("div.table-responsive .table-bordered tbody tr")
      .filter({ hasText: productName });

    return {
      AltText: await cartRow.locator("td a img").getAttribute("alt"),
      ProductName: await cartRow.locator("td").nth(1).locator("a").innerText(),
      Model: await cartRow.locator("td").nth(2).innerText(),
      Quantity: await cartRow
        .locator("td")
        .nth(3)
        .locator("div input")
        .inputValue(),
      UnitPrice: await cartRow.locator("td").nth(4).innerText(),
      TotalPrice: await cartRow.locator("td").nth(5).innerText(),
    };
  }

  async doCheckout(): Promise<void> {
    await this.checkout.click();
  }
}
