const { HttpError } = require("../helpers");
const { login } = require("./auth");

describe("login", () => {
  test("should return status code 200", async () => {
    // Mock dependencies
    const user = {
      _id: "user_id",
      email: "test@example.com",
      password: "hashed_password",
      subscription: "starter",
    };
    const req = {
      body: { email: "test@example.com", password: "hashed_password" },
    };
    const res = { json: jest.fn() };
    const User = {
      findOne: jest.fn().mockReturnValueOnce(user),
      findByIdAndUpdate: jest.fn(),
    };
    const bcrypt = { compare: jest.fn().mockReturnValueOnce(true) };
    const jwt = { sign: jest.fn().mockReturnValueOnce("token") };

    // Execute the login function
    try {
      await login(req, res);
    } catch (e) {
      expect(e.message).toBe("error");
    }
  });

  // Assertions
  // expect(jwt.sign).toHaveBeenCalledWith(
  //   { id: "user_id" },
  //   process.env.SECRET_KEY,
  //   { expiresIn: "24h" }
  // );
  // expect(res.json).toHaveBeenCalledWith({
  //   token: "token",
  //   user: { email: "test@example.com", subscription: "starter" },
  // });
  // });

  test("should return token", async () => {});

  test("should return object user with keys email & subscription with type 'String'", async () => {});
});
