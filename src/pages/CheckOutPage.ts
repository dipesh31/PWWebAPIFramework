import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoadFnOutput } from "node:module";

export class CheckoutPage extends BasePage {
  private readonly checkoutHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutHeader = page.getByRole("heading", {
      name: "Checkout",
      level: 1,
    });
  }

  async isHeaderDisplayed(): Promise<boolean> {
    return this.checkoutHeader.isVisible();
  }
}
