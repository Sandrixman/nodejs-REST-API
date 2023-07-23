require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("login", () => {
  beforeAll(async () => {
    mongoose
      .connect(DB_TEST_HOST)
      .then(() => {
        app.listen(PORT);
        console.log("Database connection successful");
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
  });

  test("has return status code 200", async () => {
    const response = await supertest(app).post("auth/login").send({
      email: "test@gmail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(200);
  });
});
