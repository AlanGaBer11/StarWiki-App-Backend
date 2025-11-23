const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createCommentValidator = [
  check("titulo_post")
    .notEmpty()
    .withMessage("El titulo del post es obligatorio"),
  check("contenido").notEmpty().withMessage("El contenido es obligatorio"),
  validateResult,
];

const updateCommentValidator = [
  check("titulo_post")
    .optional()
    .notEmpty()
    .withMessage("El titulo del post no puede estar vacío"),
  check("contenido")
    .optional()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío"),
  validateResult,
];

module.exports = { createCommentValidator, updateCommentValidator };
