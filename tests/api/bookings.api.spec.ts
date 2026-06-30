// "token": "d8f4028128afaa9"

import { test, expect } from "@playwright/test";
import { request } from "node:http";

let AUTH_TOKEN = {};

test.beforeAll(async ({ request }) => {
  // Define this either in a beforeAll hook or at the top of your test
  const authResponse = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: {
        username: "admin",
        password: "password123",
      },
    },
  );
  const authBody = await authResponse.json();
  AUTH_TOKEN = authBody.token; // Save this token
  console.log(AUTH_TOKEN);
});
test("get booking details test", async ({ request }) => {
  let response = await request.get(
    "https://restful-booker.herokuapp.com/booking",
  );

  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log((await response.body()).length);

  console.log(response.status());
  console.log(response.statusText());
});

test("create new booking test", async ({ request }) => {
  let bookingData = {
    firstname: "dipesh",
    lastname: "mehta",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2022-01-01",
      checkout: "2022-01-10",
    },
    additionalneeds: "Breakfast",
  };
  let postResponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      data: bookingData,
    },
  );
  console.log(await postResponse.json());
  console.log(postResponse.status());
  console.log(postResponse.statusText());
});

test("update booking test", async ({ request }) => {
  let updatedBookingData = {
    firstname: "Dipesh",
    lastname: "Mehta",
    totalprice: 222,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2022-01-11",
    },
    additionalneeds: "Breakfast",
  };

  let updateResponse = await request.put(
    "https://restful-booker.herokuapp.com/booking/2464",
    {
      headers: {
        Cookie: `token=${AUTH_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: updatedBookingData,
    },
  );

  console.log(await updateResponse.text());
  console.log(updateResponse.status());
  console.log(updateResponse.statusText());
});

test("delete booking test", async ({ request }) => {
  let updateResponse = await request.delete(
    "https://restful-booker.herokuapp.com/booking/2464",
    {
      headers: {
        Cookie: `token=${AUTH_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  console.log(updateResponse.status());
  console.log(updateResponse.statusText());
});
