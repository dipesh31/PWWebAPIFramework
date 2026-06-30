import { test, expect } from "../src/fixtures/pagefixtures";
import { HomePage } from "../src/pages/HomePage";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

let productInfo = CsvHelper.readCsv("src/data/productinfodata.csv");
for (let row of productInfo) {
  test(`product images count test for product: ${row.product!}`, async ({
    homePage,
    searchResultsPage,
    productInfoPage,
    page,
  }) => {
    await homePage.doSearch(row.searchkey!);

    await searchResultsPage.selectProduct(row.product!);

    expect(await productInfoPage.getProductImagesCount()).toBe(
      Number(row.imagecount!),
    );
  });
}

for (let row of productInfo) {
  test(`product header displayed test for product: ${row.product!}`, async ({
    homePage,
    searchResultsPage,
    productInfoPage,
  }) => {
    await homePage.doSearch(row.searchkey!);
    await searchResultsPage.selectProduct(row.product!);
    expect(await productInfoPage.getProductHeader()).toBe(row.header!);
  });
}

for (let row of productInfo) {
  test(`verify product information for product: ${row.product!}`, async ({
    homePage,
    searchResultsPage,
    productInfoPage,
  }) => {
    await homePage.doSearch(row.searchkey!);
    await searchResultsPage.selectProduct(row.product!);
    let actualProductInfoMap = await productInfoPage.getProductInfo();

    expect.soft(actualProductInfoMap.get("Product Header")).toBe(row.header!);

    expect.soft(actualProductInfoMap.get("Brand")).toBe(row.brand!);
    expect
      .soft(actualProductInfoMap.get("Product Code"))
      .toBe(row.productcode!);
    expect
      .soft(actualProductInfoMap.get("Reward Points"))
      .toBe(row.rewardpoints!);
    expect
      .soft(actualProductInfoMap.get("Product Price"))
      .toBe(row.productprice);
    expect
      .soft(actualProductInfoMap.get("External Tax Price"))
      .toBe(row.taxprice!);
  });
}
