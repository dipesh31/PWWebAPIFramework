import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginpage: LoginPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {
  loginpage = new LoginPage(page);
  homepage = new HomePage(page);
  await loginpage.goToLoginPage();
  await loginpage.doLogin("dipesh.31mehta@gmail.com", "India1234");
});

test("home page title test", async () => {
  expect(await homepage.getHomePageTitle()).toBe("My Account");
});

test("logout link exist test", async () => {
  expect(await homepage.logoutLinkExist()).toBeTruthy();
});

test("home page headers exist test", async () => {
  let allHeaders = await homepage.getHomePageHeaders();
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
});
