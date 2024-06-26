const express = require("express")
const authRouter = express.Router()

const { authCtrl } = require("../../controllers")
const { authJoiSchemas } = require("../../models")
const { validateBody, authenticate, upload } = require("../../middlewares")

authRouter.post("/register", validateBody(authJoiSchemas.registerSchema), authCtrl.register)

authRouter.get("/verify/:verificationToken", authCtrl.verifyEmail)

authRouter.post("/verify", validateBody(authJoiSchemas.emailSchema), authCtrl.resendVerifyEmail)

authRouter.post("/login", validateBody(authJoiSchemas.loginSchema), authCtrl.login)

authRouter.get("/logout", authenticate, authCtrl.logout)

authRouter.get("/current", authenticate, authCtrl.getUser)

authRouter.patch(
    "/subscription",
    authenticate,
    validateBody(authJoiSchemas.updateSubscriptionSchema),
    authCtrl.updateUserSubscription
)

authRouter.patch("/avatar", authenticate, upload.single("avatar"), authCtrl.updateUserAvatar)

module.exports = authRouter
