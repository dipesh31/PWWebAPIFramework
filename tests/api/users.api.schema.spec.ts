// ajv a node library will be used for schema validation

import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";
import Ajv from "ajv";

const TOKEN = process.env.API_TOKEN;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

// create an object if ajv
let ajv = new Ajv();

// from transform.tools
let userSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    status: {
      type: "string",
    },
  },
  required: ["id", "name", "email", "gender", "status"],
};

let userArraySchema = {
  type: "array",
  items: userSchema,
};

test("POST - create a single user", async ({ apiHelper }) => {
  let userData = {
    name: "schema",
    email: `auto_${Date.now()}@open.com`,
    gender: "male",
    status: "active",
  };
  //create user
  let postResponse = await apiHelper.post(
    "public/v2/users",
    userData,
    AUTH_HEADER,
  );
  let userId = postResponse.body.id;
  // get user
  let getResponse = await apiHelper.get(
    `public/v2/users/${userId}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);

  //schema validation

  // compile the userschema
  let validate = ajv.compile(userSchema);
  // validate the get response with the compiled expcted schema
  let isSchemaValid = validate(getResponse.body);
  if (!isSchemaValid) {
    console.log("Schema Errors: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});

test("GET - get all users schema", async ({ apiHelper }) => {
  // get user
  let getResponse = await apiHelper.get("public/v2/users", AUTH_HEADER);
  expect(getResponse.status).toBe(200);

  let validate = ajv.compile(userArraySchema);

  let isSchemaValid = validate(getResponse.body);

  if (!isSchemaValid) {
    console.log("Schema Errors: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});
