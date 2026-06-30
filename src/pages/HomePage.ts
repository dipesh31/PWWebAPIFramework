import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  //Locators

  private readonly logoutLink: Locator;
  private readonly headers: Locator;
  private readonly accountCreatedHeader: Locator;
  private readonly searchBox: Locator;
  private readonly searchIcon: Locator;
  // search icon

  //Constructor

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.headers = page.getByRole("heading", { level: 2 });
    this.accountCreatedHeader = page.getByRole("heading", {
      name: "Your Account Has Been Created!",
      exact: true,
      level: 1,
    });
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator("div#search button");
  }

  // Methods

  async getHomePageTitle(): Promise<string> {
    return await this.page.title();
  }

  async logoutLinkExist(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async getHomePageHeaders(): Promise<string[]> {
    return await this.headers.allInnerTexts();
  }

  async getAccountcreateHeader(): Promise<boolean> {
    return await this.accountCreatedHeader.isVisible();
  }

  async doLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  async doSearch(searchKey: string): Promise<void> {
    console.log(`Search Key: ${searchKey}`);
    await this.searchBox.fill(searchKey);
    await this.searchIcon.click();
  }
}
