import { test, expect } from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

const productData = CsvHelper.readCsv("src/data/product.csv");
for (let row of productData) {
  test(`@regression search product results count test for ${row.productname}`, async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.doSearch(row.searchkey!);
    expect(await searchResultsPage.getProductSearchResultsCount()).toBe(
      Number(row.resultcount),
    );
  });
}

for (let row of productData) {
  test(`@smoke user is able to land on the product page test for ${row.productname}`, async ({
    homePage,
    searchResultsPage,
    page,
  }) => {
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
  });
}

//common tests:
test("@smoke comp logo exists on product page", async ({ basePage }) => {
  expect(await basePage.isLogoVisible()).toBeTruthy();
});

test("@smoke footers exist on product page", async ({ basePage }) => {
  expect(await basePage.getPageFootersCount()).toBe(16);
});
