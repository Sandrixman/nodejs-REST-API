const express = require("express");
const authRouter = express.Router();

const { authCtrl } = require("../../controllers");
const { authJoiSchemas } = require("../../models");
const { validateBody, authenticate, upload } = require("../../middlewares");

authRouter.post(
  "/register",
  validateBody(authJoiSchemas.registerSchema),
  authCtrl.register
);

authRouter.get("/verify/:verificationCode", authCtrl.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(authJoiSchemas.emailSchema),
  authCtrl.resendVerifyEmail
);

authRouter.post(
  "/login",
  validateBody(authJoiSchemas.loginSchema),
  authCtrl.login
);

authRouter.post("/logout", authenticate, authCtrl.logout);

authRouter.get("/current", authenticate, authCtrl.getUser);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(authJoiSchemas.updateSubscriptionSchema),
  authCtrl.updateUserSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  // validateBody(authJoiSchemas.updateAvatarSchema),
  upload.single("avatar"),
  authCtrl.updateUserAvatar
);

module.exports = authRouter;
