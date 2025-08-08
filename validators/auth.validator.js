exports.register = {
  username: {
    in: ["body"],
    isString: true,
    errorMessage: "Username is required",
  },
  password: {
    in: ["body"],
    isString: true,
    errorMessage: "Password is required",
  },
}

exports.login = {
  username: {
    in: ["body"],
    isString: true,
    errorMessage: "Username is required",
  },
  password: {
    in: ["body"],
    isString: true,
    errorMessage: "Password is required",
  },
};