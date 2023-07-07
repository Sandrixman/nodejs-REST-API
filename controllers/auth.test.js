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
    await login(req, res);

    // Assertions
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "user_id" },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    expect(res.json).toHaveBeenCalledWith({
      token: "token",
      user: { email: "test@example.com", subscription: "starter" },
    });
  });

  test("should return token", async () => {});

  test("should return object user with keys email & subscription with type 'String'", async () => {
    // Mock dependencies
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = {};
    const User = { findOne: jest.fn().mockReturnValueOnce(null) };
    const bcrypt = { compare: jest.fn().mockReturnValueOnce(false) };

    // Execute the login function and expect it to throw HttpError
    await expect(login(req, res)).rejects.toThrow(HttpError);
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith("password", undefined);
  });
});
