const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const createCategoryValidator = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 4 })
    .withMessage("El nombre debe tener al menos 4 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios")
    .trim(),
  check("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres")
    .trim(),
  validateResult,
];

const updateCategoryValidator = [
  check("nombre")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 4 })
    .withMessage("El nombre debe tener al menos 4 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios")
    .trim(),
  check("descripcion")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres")
    .trim(),
  validateResult,
];

module.exports = { createCategoryValidator, updateCategoryValidator };
