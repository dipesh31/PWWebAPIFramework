import { rmSync } from "node:fs";
import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userId: number;

// GET

test.describe.serial("running e2e gorest api test", () => {
  test("GET test - get all the users", async ({ apiHelper }) => {
    let getResObject = await apiHelper.get("/public/v2/users", AUTH_HEADER);
    expect(getResObject.status).toBe(200);
    expect(getResObject.body.length).toBeGreaterThan(0);
  });

  test("POST test - create a user", async ({ apiHelper }) => {
    //JS Object
    let userData = {
      name: "dipesh",
      email: `dipesh_${Date.now()}@open.com`,
      gender: "male",
      status: "active",
    };

    let postResObject = await apiHelper.post(
      "/public/v2/users",
      userData,
      AUTH_HEADER,
    );

    expect(postResObject.status).toBe(201);
    expect(postResObject.body.name).toBe(userData.name);
    userId = postResObject.body.id;
    console.log("User create with Id: " + userId);
  });

  test("PUT test - update a user", async ({ apiHelper }) => {
    let userData = {
      name: "dipesh mehta",
      status: "inactive",
    };

    let response = await apiHelper.put(
      `/public/v2/users/${userId}`,
      userData,
      AUTH_HEADER,
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userData.name);
    expect(response.body.status).toBe(userData.status);
  });

  test("Delete test - delete a user", async ({ apiHelper }) => {
    let response = await apiHelper.delete(
      `/public/v2/users/${userId}`,
      AUTH_HEADER,
    );
    expect(response.status).toBe(204);
  });
});
