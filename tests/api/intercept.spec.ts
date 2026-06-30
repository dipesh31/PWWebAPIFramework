// web app --> intercept the network calls and log them.
// we will use ** - wildcard which means all the urls.

import { test, expect } from "@playwright/test";
import { allowedNodeEnvironmentFlags } from "node:process";
import { json } from "node:stream/consumers";

// intercept the network calls
test("intercept and log request", async ({ page }) => {
  await page.route("**/*", async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.continue();
  });

  await page.goto("https://www.google.com/");
});

// intercept with mocking
test("mock seach data api", async ({ page }) => {
  let fakeProducts = [
    { name: "Fake MacBook Pro", price: "$600" },
    { name: "Fake Iphone", price: "$400" },
  ];

  await page.route(
    "**/index.php?route=product/search&search=macbook",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeProducts),
      });
    },
  );

  await page.goto(
    "https://abc.com/index.php?route=product/search&search=macbook",
  );

  let fakeJSON = await page.evaluate(async () => {
    let fakeRes = await fetch(
      "https://abc.com/index.php?route=product/search&search=macbook",
    );

    return await fakeRes.json();
  });

  console.log("Fake JSON:", fakeJSON);
});
