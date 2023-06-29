const express = require("express");
const authRouter = express.Router();

const { authCtrl } = require("../../controllers");
const { authJoiSchemas } = require("../../models");
const { validateBody, authenticate } = require("../../middlewares");

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

authRouter.post("/logout", authenticate, authCtrl.logout);

authRouter.get("/current", authenticate, authCtrl.getUser);

authRouter.patch(
  "/",
  authenticate,
  validateBody(authJoiSchemas.updateSubscriptionSchema),
  authCtrl.updateUserSubscription
);

module.exports = authRouter;
