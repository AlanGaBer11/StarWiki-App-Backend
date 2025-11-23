const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      status: 400,
      errors: errors.array(),
    });
  }
  next();
};

const registerValidator = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 4 })
    .withMessage("El nombre debe tener al menos 4 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios")
    .trim(),

  check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El apellido debe tener al menos 5 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El apellido debe contener solo letras y espacios")
    .trim(),

  check("nombre_usuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres")
    .isLength({ max: 100 })
    .withMessage("El nombre de usuario debe tener menos de 100 caracteres")
    .trim(),

  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    )
    .trim(),

  check("contrasena")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe de tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe de tener al menos una mayuscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe de tener al menos una minuscula")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("La contraseña debe de tener al menos un caracter especial")
    .custom((value) => {
      // Verificar numeros consecutivos
      for (let i = 0; i < value.length - 1; i++) {
        const current = parseInt(value[i]);
        const next = parseInt(value[i + 1]);

        if (!isNaN(current) && !isNaN(next) && next === current + 1) {
          throw new Error(
            "La contraseña no debe de contener números consecutivos"
          );
        }
      }

      // Verificar letras consecutivas
      const lowerValue = value.toLowerCase();
      for (let i = 0; i < lowerValue.length - 1; i++) {
        const current = lowerValue.charCodeAt(i);
        const next = lowerValue.charCodeAt(i + 1);

        if (
          current >= 97 &&
          current <= 122 &&
          next >= 97 &&
          next <= 122 &&
          next === current + 1
        ) {
          throw new Error(
            "La contraseña no debe contener letras consecutivas del abecedario"
          );
        }
      }
      return true;
    }),
  validateResult,
];

const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe de ser valido")
    .trim(),
  check("contrasena").notEmpty().withMessage("La contraseña es obligatoria"),
  validateResult,
];

module.exports = { registerValidator, loginValidator };
