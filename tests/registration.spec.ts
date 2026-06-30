import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";
import { JsonHelper } from "../src/utils/JsonHelper";
import { generateRandomEmail } from "../src/utils/randomusername";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.goTORegistrationPage();
});

test("get registration page title test", async ({ registrationPage }) => {
  expect(await registrationPage.getTitle()).toBe("Register Account");
});

let registrationData = CsvHelper.readCsv("src/data/registrationData.csv");
for (let row of registrationData) {
  test(`csv data-driven registration of user with firstname ${row.firstname}`, async ({
    registrationPage,
    homePage,
  }) => {
    await registrationPage.fillDetails(
      row.firstname!,
      row.lastname!,
      generateRandomEmail(),
      row.telephone!,
      row.password!,
      row.subscribe!,
    );

    expect(await homePage.getAccountcreateHeader()).toBeTruthy();

    await homePage.doLogout();
  });
}

let jsonRegistrationData = JsonHelper.readJson(
  "src/data/registrationData.json",
);
for (let row of jsonRegistrationData) {
  test(`json data-driven registration of user with firstname ${row.firstname}`, async ({
    registrationPage,
    homePage,
  }) => {
    await registrationPage.fillDetails(
      row.firstname!,
      row.lastname!,
      generateRandomEmail(),
      row.telephone!,
      row.password!,
      row.subscribe!,
    );

    expect(await homePage.getAccountcreateHeader()).toBeTruthy();

    await homePage.doLogout();
  });
}
