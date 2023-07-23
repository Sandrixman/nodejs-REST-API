const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../app");

mongoose.set("strictQuery", false);

const { DB_TEST_HOST } = process.env;

describe("test login route", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
  });

  const loginUser = async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "login@test.com",
      password: "qwertonity",
    });
    return response;
  };

  test("should return status code 200", async () => {
    const { statusCode } = await loginUser();

    expect(statusCode).toBe(200);
  });

  test("should return token", async () => {
    const { body } = await loginUser();

    expect(body).toHaveProperty("token");
  });

  test("should return object with fields email & subscription & type String", async () => {
    const { body } = await loginUser();

    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
