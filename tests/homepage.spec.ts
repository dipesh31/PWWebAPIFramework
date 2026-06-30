import { test, expect } from "../src/fixtures/pagefixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin("dipesh.31mehta@gmail.com", "India1234");
});

test("@smoke home page title test", async ({ homePage }) => {
  expect(await homePage.getHomePageTitle()).toBe("My Account");
});

test("@smoke logout link exist test", async ({ homePage }) => {
  expect(await homePage.logoutLinkExist()).toBeTruthy();
});

test("@regression home page headers exist test", async ({ homePage }) => {
  let allHeaders = await homePage.getHomePageHeaders();
  expect.soft(allHeaders).toHaveLength(4);
  expect
    .soft(allHeaders)
    .toEqual(["My Account", "My Orders", "My Affiliate Account", "Newsletter"]);
});
