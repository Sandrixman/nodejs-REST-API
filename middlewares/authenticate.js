const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Authorization error"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, "Authorization error"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Authorization error"));
  }
};

module.exports = authenticate;
