import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { generateRandomUsername } from "../src/utils/randomusername";
import { HomePage } from "../src/pages/HomePage";

let loginpage: LoginPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  loginpage.goToLoginPage();
  homepage = new HomePage(page);
});

test("login page title test", async () => {
  expect(await loginpage.getLoginPageTitle()).toBe("Account Login");
});

test("forgot password link exist test", async () => {
  expect(await loginpage.isForgotPwdLinkExist()).toBeTruthy();
});

test("login page logo test", async () => {
  await loginpage.isLogoExist();
});

test("valid login test", async () => {
  await loginpage.doLogin("dipesh.31mehta@gmail.com", "India1234");
  // expect pending
  expect(await homepage.logoutLinkExist()).toBeTruthy();
});

test("invalid login test", async () => {
  await loginpage.doLogin(generateRandomUsername(), "password");
  expect.soft(await loginpage.getValidationError()).toBeTruthy();
  expect.soft(await homepage.getHomePageTitle()).toBe("My Account");
});
