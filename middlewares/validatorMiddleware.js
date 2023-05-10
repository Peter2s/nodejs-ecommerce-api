const { validationResult } = require("express-validator");
/*
 * @description  Finds the validation errors in this request and wraps them in an object with handy functions
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};
