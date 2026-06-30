import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // Locators: Private
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgottenPasswordLink: Locator;
  private readonly logo: Locator;
  private readonly validationError: Locator;
  private readonly registerLink: Locator;

  // constructor : initialize the locators

  constructor(page: Page) {
    super(page);
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.forgottenPasswordLink = page
      .getByRole("link", {
        name: "Forgotten Password",
      })
      .first();

    this.logo = page.getByAltText("naveenopencart");
    this.validationError = page.locator(
      ".alert.alert-danger.alert-dismissible",
    );
    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  // public methods

  async goToLoginPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/login");
  }

  async getLoginPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isForgotPwdLinkExist(): Promise<boolean> {
    return await this.forgottenPasswordLink.isVisible();
  }

  async isLogoExist(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async doLogin(username: string, password: string): Promise<void> {
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async getValidationError(): Promise<boolean> {
    return await this.validationError.isVisible();
  }

  async goTORegistrationPage(): Promise<void> {
    await this.registerLink.click();
  }
}
