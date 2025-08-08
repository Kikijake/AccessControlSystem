exports.responseSuccess = (res, data, message = "Success") => {
  return res.status(200).send({
    code: 200,
    status: "success",
    message,
    data,
  });
};

exports.responseError = (res, errors = null, message = "Error", code = 400) => {
  return res.status(code).send({
    code,
    status: "failed",
    message,
    errors,
  });
};
