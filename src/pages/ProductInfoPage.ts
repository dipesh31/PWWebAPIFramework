import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
  // private locators

  private readonly header: Locator;
  private readonly productImages: Locator;
  private readonly productMetaData: Locator;
  private readonly productPricing: Locator;
  private readonly productQuantity: Locator;
  private readonly addToCartButtton: Locator;
  private readonly successToCart: Locator;
  private readonly carButton: Locator;
  private readonly removeButton: Locator;
  private readonly shoppingCartLink: Locator;
  private map: Map<string, string | number>;

  // constructor

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div ul.thumbnails a img");
    this.productMetaData = page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPricing = page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li:not(:has(span))",
    );
    this.productQuantity = page.getByRole("textbox", { name: "Qty" });
    this.addToCartButtton = page.getByRole("button", { name: "Add to Cart" });
    this.successToCart = page.locator(
      "//div[contains(@class, 'alert-success')][a[contains(text(),'MacBook Pro')] and a[contains(text(),'shopping cart')]]",
    );
    this.carButton = page.locator("div#cart>button");
    this.removeButton = page.locator('button[title="Remove"]');
    this.map = new Map<string, string>();
    this.shoppingCartLink = page.getByRole("link", { name: "shopping cart" });
  }

  // methods

  async getProductHeader(): Promise<string> {
    return this.header.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    //await this.page.waitForTimeout(3000);
    await this.productImages.first().waitFor({ state: "visible" });
    return this.productImages.count();
  }

  /**
   *
   * @returns this method is returning the actual product data: Header, Images count, Metadata, Pricing Data.
   */
  async getProductInfo(): Promise<Map<string, string | number>> {
    this.map.set("Product Header", await this.getProductHeader());
    this.map.set("Product Images", await this.getProductImagesCount());
    await this.getproductMetaData();
    await this.getProductPricing();
    return this.map;
  }

  /* Brand: Apple
    Product Code: Product 18
    Reward Points: 800
    Availability: Out Of Stock */
  private async getproductMetaData(): Promise<void> {
    let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
      let meta = data.split(":");
      let metaKey = meta[0].trim();
      let metaValue = meta[1].trim();
      this.map.set(metaKey, metaValue);
    }
  }
  /* $2,000.00
    Ex Tax: $2,000.00 */
  private async getProductPricing(): Promise<void> {
    let priceData = await this.productPricing.allInnerTexts();
    let productPrice = priceData[0].trim();
    let exTaxPrice = priceData[1].split(":")[1].trim();
    this.map.set("Product Price", productPrice);
    this.map.set("External Tax Price", exTaxPrice);
  }

  async addToCart(quantity: string): Promise<void> {
    await this.productQuantity.fill(quantity);
    await this.addToCartButtton.click();
  }

  async successIsDiaplyed(productName: string): Promise<boolean> {
    const message = this.page.locator(
      `//div[contains(@class, 'alert-success')][a[contains(text(),'${productName}')] and a[contains(text(),'shopping cart')]]`,
    );
    await message.waitFor({ state: "visible" });

    return await message.isVisible();
  }

  async navigateToShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async clearCart(): Promise<void> {
    const removeButtons = this.page.locator('.btn-danger[title="Remove"]');

    while (true) {
      // 1. If the cart dropdown is closed, open it
      // (Adjust the selector '.dropdown-menu' if your theme uses a different class for the open cart)
      const isCartOpen = await this.page
        .locator("#cart .dropdown-menu")
        .isVisible();
      if (!isCartOpen) {
        await this.carButton.click();
      }

      // 2. Get the current count of items
      const count = await removeButtons.count();

      // 3. If no buttons are left, we are done!
      if (count === 0) {
        break;
      }

      // 4. Ensure the first button is fully visible and ready before clicking
      await removeButtons.first().waitFor({ state: "visible" });
      await removeButtons.first().click();

      // 5. Wait until the DOM reflects that the item was deleted from the count
      await this.page.waitForFunction(
        (expectedCount) =>
          document.querySelectorAll('.btn-danger[title="Remove"]').length <
          expectedCount,
        count,
      );

      // 6. Give the UI a brief moment to settle/animate close before the next loop
      await this.page.waitForTimeout(500);
    }
  }
}
