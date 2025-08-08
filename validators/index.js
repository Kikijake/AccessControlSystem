// mport { validationResult, matchedData, checkSchema } from "express-validator";
const { validationResult, matchedData, checkSchema } = require("express-validator");
const { responseError } = require("../utils/response");

const validate = (schema) => {
  return async (req, res, next) => {
    await Promise.all(
      checkSchema(schema).map((validation) => validation.run(req))
    );
    const result = validationResult(req);
    if (!result.isEmpty()) {
      let errorMessage = {};

      result.errors.forEach((error) => {
        errorMessage[error.path] = error.msg;
      });

      return responseError(res, errorMessage, "Validation Error");
    }
    req.validated = matchedData(req);
    next();
  };
};

module.exports = validate;