const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {
  createUserValidator,
  updateUserValidator,
} = require("../validators/user.validator");
const authMiddleware = require("../../../shared/middlewares/auth.middleware");
const { checkRole } = require("../../../shared/middlewares/rol.middleware");

const userController = new UserController();

router
  .get(
    "/getUsers",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.findAllUsers.bind(userController)
  )
  .get(
    "/getUserById/:id",
    authMiddleware,
    checkRole(["ADMIN", "USER", "EDITOR"]),
    userController.findUserById.bind(userController)
  )
  .post(
    "/createUser",
    authMiddleware,
    checkRole(["ADMIN"]),
    createUserValidator,
    userController.createUser.bind(userController)
  )
  .patch(
    "/updateUser/:id",
    authMiddleware,
    checkRole(["ADMIN", "USER", "EDITOR"]),
    updateUserValidator,
    userController.updateUser.bind(userController)
  )
  .delete(
    "/deleteUser/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.deleteUser.bind(userController)
  )
  .patch(
    "/deactivateUser/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.deactivateUser.bind(userController)
  )
  .patch(
    "/reactivateUser/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.reactivateUser.bind(userController)
  );

module.exports = router;
