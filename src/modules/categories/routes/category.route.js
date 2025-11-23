const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/category.validator");
const authMiddleware = require("../../../shared/middlewares/auth.middleware");
const { checkRole } = require("../../../shared/middlewares/rol.middleware");

const categoryController = new CategoryController();

router
  .get(
    "/getCategories",
    categoryController.findAllCategories.bind(categoryController)
  )
  .get(
    "/getCategoryById/:id",
    categoryController.findCategoryById.bind(categoryController)
  )
  .get(
    "/getCategoryByName/:nombre",
    categoryController.findCategoryByName.bind(categoryController)
  )
  .post(
    "/createCategory",
    authMiddleware,
    checkRole(["ADMIN"]),
    createCategoryValidator,
    categoryController.createCategory.bind(categoryController)
  )
  .patch(
    "/updateCategory/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    updateCategoryValidator,
    categoryController.updateCategory.bind(categoryController)
  )
  .delete(
    "/deleteCategory/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    categoryController.deleteCategory.bind(categoryController)
  );

module.exports = router;
