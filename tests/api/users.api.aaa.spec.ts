import { rmSync } from "node:fs";
import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

// helper function - create a fresh user
async function createUser(apiHelper: any) {
  let userData = {
    name: "dipesh",
    email: `dipesh_${Date.now()}_${Math.random()}@open.com`,
    gender: "male",
    status: "active",
  };

  let response = await apiHelper.post(
    "/public/v2/users",
    userData,
    AUTH_HEADER,
  );
  expect(response.status).toBe(201);

  return { user: response.body, payload: userData };
}

//Test 1 - Create and verify - AAA
test("create user with POST method - AAA", async ({ apiHelper }) => {
  let { user, payload } = await createUser(apiHelper);
  let response = await apiHelper.get(
    `/public/v2/users/${user.id}`,
    AUTH_HEADER,
  );
  expect(response.body.name).toBe(payload.name);
  expect(response.body.email).toBe(payload.email);
});

//Test 2 - POST -> PUT -> GET

test("update user with PUT method - AAA", async ({ apiHelper }) => {
  // create the user
  let { user, payload } = await createUser(apiHelper);
  let userUpdateData = {
    name: "dipesh mehta",
    status: "inactive",
  };
  // update the user
  let response = await apiHelper.put(
    `/public/v2/users/${user.id}`,
    userUpdateData,
    AUTH_HEADER,
  );

  expect(response.status).toBe(200);
  expect(response.body.name).toBe(userUpdateData.name);
  // get the user

  let getResponse = await apiHelper.get(
    `/public/v2/users/${user.id}`,
    AUTH_HEADER,
  );

  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(userUpdateData.name);
});

// Ceate - Delete - Get
test("delete user with DELETE method - AAA", async ({ apiHelper }) => {
  // create the user
  let { user, payload } = await createUser(apiHelper);
  let userUpdateData = {
    name: "dipesh mehta",
    status: "inactive",
  };
  // delete the user
  let response = await apiHelper.delete(
    `/public/v2/users/${user.id}`,
    AUTH_HEADER,
  );

  expect(response.status).toBe(204);

  // get the user

  let getResponse = await apiHelper.get(
    `/public/v2/users/${user.id}`,
    AUTH_HEADER,
  );

  expect(getResponse.status).toBe(404);
  expect(getResponse.body.message).toBe("Resource not found");
});
