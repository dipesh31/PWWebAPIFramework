// fixtures: supply objects, data, to the test using 'use' - a inbult callback function
// There are two types of fixures:
// 1. inbuilt fixtures - page, browser, request, expect
// 2. custom fixtures - page objects: loginpage, homepage, ... other page objects
// so that no need initialize page objects in the mutliple methods or in before each
// also, testdata repository

import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";

import { CsvHelper } from "../utils/CsvHelper";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckOutPage";

// define the type for page fixtures

type pageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  registrationPage: RegistrationPage;
  searchResultsPage: SearchResultsPage;
  productInfoPage: ProductInfoPage;
  cartPage: CartPage;
  checkOutPage: CheckoutPage;
  testData: Record<string, string>[];
};

// extend playwright baseTest

export let test = baseTest.extend<pageFixtures>({
  loginPage: async ({ page }, use) => {
    let loginPage = new LoginPage(page);
    use(loginPage);
  },
  homePage: async ({ page }, use) => {
    let homePage = new HomePage(page);
    use(homePage);
  },

  registrationPage: async ({ page }, use) => {
    let registrationPage = new RegistrationPage(page);
    use(registrationPage);
  },

  searchResultsPage: async ({ page }, use) => {
    let searchResultsPage = new SearchResultsPage(page);
    use(searchResultsPage);
  },

  productInfoPage: async ({ page }, use) => {
    let productInfoPage = new ProductInfoPage(page);
    use(productInfoPage);
  },

  cartPage: async ({ page }, use) => {
    let cartPage = new CartPage(page);
    use(cartPage);
  },

  checkOutPage: async ({ page }, use) => {
    let checkOutPage = new CheckoutPage(page);
    use(checkOutPage);
  },

  testData: async ({}, use) => {
    let testData = CsvHelper.readCsv("src/data/loginData.csv");
    await use(testData);
  },
});

export { expect } from "@playwright/test";
