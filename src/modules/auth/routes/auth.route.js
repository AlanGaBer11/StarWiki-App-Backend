const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const authController = new AuthController();

router
  .post(
    "/register",
    registerValidator,
    authController.register.bind(authController)
  )
  .post("/login", loginValidator, authController.login.bind(authController))
  .post(
    "/send-verification-code",
    authController.sendVerificationCode.bind(authController)
  )
  .post("/verify-account", authController.verifyAccount.bind(authController))
  .post("/reset-password", authController.resetPassword.bind(authController));

module.exports = router;
