import { test, expect } from "@playwright/test";
import { request } from "node:http";

let AUTH_TOKEN = {
  Authorization:
    "Bearer 663134d3086f216cdc8a58c45578e84689a64b144e26ae6e28af1d4a462b9759",
};
let userId: number;

test.skip("get user test", async ({ request }) => {
  let response = await request.get("https://gorest.co.in/public/v2/users", {
    headers: AUTH_TOKEN,
  });

  //console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);

  console.log(response.status());
  console.log(response.statusText());

  expect(response.status()).toBe(200);
});

test.skip("create a user test", async ({ request }) => {
  //JS Object
  let userData = {
    name: "uday",
    email: `automation_${Date.now()}@open.com`,
    gender: "male",
    status: "active",
  };

  //JS Object to JSON: Serialization
  let response = await request.post("https://gorest.co.in/public/v2/users", {
    headers: AUTH_TOKEN,
    data: userData,
  });

  //console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);

  console.log(response.status()); //201
  console.log(response.statusText()); //Created
});

test.skip("Update a user test", async ({ request }) => {
  //JS Object
  let userData = {
    name: "uday101",
    email: `automation_${Date.now()}@open.com`,
    gender: "male",
    status: "inactive",
  };

  //JS Object to JSON: Serialization
  let response = await request.put(
    "https://gorest.co.in/public/v2/users/8501947",
    {
      headers: AUTH_TOKEN,
      data: userData,
    },
  );

  //console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);

  console.log(response.status()); //200
  console.log(response.statusText()); //OK
});

test.skip("Delete a user test", async ({ request }) => {
  //JS Object to JSON: Serialization
  let response = await request.delete(
    "https://gorest.co.in/public/v2/users/8501947",
    {
      headers: AUTH_TOKEN,
    },
  );

  console.log(response.status()); //204
  console.log(response.statusText()); //No Content
});
