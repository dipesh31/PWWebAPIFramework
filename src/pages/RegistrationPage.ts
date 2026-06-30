import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  //locators

  private readonly registerPageHeader;
  private readonly firstName;
  private readonly lastName;
  private readonly email;
  private readonly telephone;
  private readonly password;
  private readonly passwordConfirm;
  private readonly subscribeYes;
  private readonly subscribeNo;
  private readonly privacyPolicy;
  private readonly continueBtn;

  //constructor

  constructor(page: Page) {
    super(page);

    this.registerPageHeader = page.getByRole("heading", {
      name: "Register Account",
      exact: true,
      level: 1,
    });

    this.firstName = page.getByRole("textbox", {
      name: "* First Name",
      exact: true,
    });

    this.lastName = page.getByRole("textbox", {
      name: "* Last Name",
    });

    this.email = page.getByRole("textbox", { name: "* E-Mail" });

    this.telephone = page.getByRole("textbox", {
      name: "* Telephone",
    });
    this.password = page.getByRole("textbox", {
      name: "* Password",
      exact: true,
    });

    this.passwordConfirm = page.getByRole("textbox", {
      name: "* Password Confirm",
      exact: true,
    });

    this.subscribeYes = page.getByRole("radio", {
      name: "Yes",
    });

    this.subscribeNo = page.getByRole("radio", {
      name: "No",
    });

    this.privacyPolicy = page.locator(`[name="agree"]`);

    this.continueBtn = page.getByRole("button", {
      name: "Continue",
    });
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async isHeaderVisible(): Promise<boolean> {
    return await this.registerPageHeader.isVisible();
  }

  async fillDetails(
    firstName: string,
    lastName: string,
    email: string,
    telphone: string,
    password: string,
    subscribeOption: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.telephone.fill(telphone);
    await this.password.fill(password);
    await this.passwordConfirm.fill(password);
    if (subscribeOption === "Yes") {
      await this.subscribeYes.check();
    } else {
      await this.subscribeNo.check();
    }
    await this.privacyPolicy.check();

    await this.continueBtn.click();
  }
}
