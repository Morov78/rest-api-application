const express = require("express");
const supertest = require("supertest");

const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.SECRET;

const User = require("../service/schemas/user");
const { login } = require("../controller/users");
const { connectionDb, disconnectDb } = require("../db");

const app = express();

app.use(express.json());

app.post("/api/users/login", login);

describe("test login controller", () => {
  beforeAll(async () => await connectionDb(process.env.DB_HOST));
  afterAll(() => disconnectDb());

  test("email and password not correct - return statuscode 401, message 'Email or password is wrong'", async () => {
    const mUser = { email: "wefwegi@ukr.net", password: "password" };

    const response = await supertest(app)
      .post("/api/users/login")
      .send({ ...mUser });

    const {
      status,
      _body: { message },
    } = response;

    expect(status).toBe(401);
    expect(message).toMatch("Email or password is wrong");
  });

  test("email correct and password not correct  - return statuscode 401, message 'Email or password is wrong'", async () => {
    const mUser = { email: "wefwegi@ukr.net", password: "password" };

    const response = await supertest(app)
      .post("/api/users/login")
      .send({ ...mUser });

    const {
      status,
      _body: { message },
    } = response;

    expect(status).toBe(401);
    expect(message).toMatch("Email or password is wrong");
  });

  test("email and password correct - return statuscode 200, token and object user with 2 fields email, subscription, which are of type string", async () => {
    const mUser = { email: "morov78@ukr.net", password: "10101010" };

    const response = await supertest(app)
      .post("/api/users/login")
      .send({ ...mUser });

    const {
      status,
      _body: { token, user },
    } = response;

    expect(status).toBe(200);

    expect(() => jwt.verify(token, secret)).not.toThrow();

    expect(user).toHaveProperty(("email", "subscription"));

    const isString = (arg) => typeof arg === "string";

    expect(isString(user.email)).toBe(true);
    expect(isString(user.subscription)).toBe(true);
  });
});
