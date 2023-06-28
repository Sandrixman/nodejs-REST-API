const express = require("express");
const authRouter = express.Router();

const { authCtrl } = require("../../controllers");
const { authJoiSchemas } = require("../../models");
const { validateBody } = require("../../middlewares");

authRouter.post(
  "/register",
  validateBody(authJoiSchemas.registerSchema),
  authCtrl.register
);

authRouter.post(
  "/login",
  validateBody(authJoiSchemas.loginSchema),
  authCtrl.login
);

module.exports = authRouter;
