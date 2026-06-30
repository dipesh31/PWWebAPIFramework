import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

import { generateRandomUsername } from "../src/utils/randomusername";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test("login page title test", async ({ loginPage }) => {
  expect(await loginPage.getLoginPageTitle()).toBe("Account Login");
});

test("forgot password link exist test", async ({ loginPage }) => {
  expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test("login page logo test", async ({ loginPage }) => {
  await loginPage.isLogoExist();
});

test("valid login test", async ({ loginPage, homePage }) => {
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  // expect pending
  expect(await homePage.logoutLinkExist()).toBeTruthy();
});

test("invalid login test", async ({ loginPage, homePage }) => {
  await loginPage.doLogin(generateRandomUsername(), "password");
  expect.soft(await loginPage.getValidationError()).toBeTruthy();
});
//DD_1_Using fixture
test("data driven invalid login using fixtures test", async ({
  loginPage,
  testData,
}) => {
  for (let row of testData) {
    await loginPage.doLogin(row.username, row.password);
    expect.soft(await loginPage.getValidationError()).toBeTruthy();
  }
});

//DD_2_Not Using fixture CSV
let testData = CsvHelper.readCsv("src/data/loginData.csv");
for (let row of testData) {
  test(`data driven invalid login using non fixure test for ${row.username}`, async ({
    loginPage,
    testData,
  }) => {
    await loginPage.doLogin(row.username, row.password);
    expect.soft(await loginPage.getValidationError()).toBeTruthy();
  });
}

//DD_3_Not Using fixture json
let JsonTestData = JsonHelper.readJson("src/data/loginData.json");
for (let row of JsonTestData) {
  test(`json data driven invalid login using non fixure test for ${row.username}`, async ({
    loginPage,
    testData,
  }) => {
    await loginPage.doLogin(row.username, row.password);
    expect.soft(await loginPage.getValidationError()).toBeTruthy();
  });
}
