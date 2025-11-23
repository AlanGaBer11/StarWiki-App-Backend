const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createPostValidator = [
  check("nombre_categoria")
    .notEmpty()
    .withMessage("El nombre de categoría es obligatorio"),
  check("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 255 })
    .withMessage("El título no puede tener más de 255 caracteres"),
  check("contenido").notEmpty().withMessage("El contenido es obligatorio"),
  check("url_imagen")
    .notEmpty()
    .withMessage("La URL de la imagen es obligatoria")
    .isURL()
    .withMessage("La URL de la imagen no es válida"),
  check("estado")
    .optional()
    .isIn(["BORRADOR", "PUBLICADO", "ARCHIVADO"])
    .withMessage("El estado debe ser BORRADOR, PUBLICADO o ARCHIVADO"),
  validateResult,
];

const updatePostValidator = [
  check("nombre_categoria")
    .optional()
    .notEmpty()
    .withMessage("El nombre de categoría no puede estar vacío"),
  check("titulo")
    .optional()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ max: 255 })
    .withMessage("El título no puede tener más de 255 caracteres"),
  check("contenido")
    .optional()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío"),
  check("url_imagen")
    .optional()
    .notEmpty()
    .withMessage("La URL de la imagen no puede estar vacía")
    .isURL()
    .withMessage("La URL de la imagen no es válida"),
  check("estado")
    .optional()
    .isIn(["BORRADOR", "PUBLICADO", "ARCHIVADO"])
    .withMessage("El estado debe ser BORRADOR, PUBLICADO o ARCHIVADO"),
  validateResult,
];

module.exports = { createPostValidator, updatePostValidator };
