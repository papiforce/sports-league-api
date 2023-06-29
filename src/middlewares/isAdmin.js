const { errorHandler, httpError } = require("../utils");

const isAdmin = errorHandler(async (req, res, next) => {
  if (!req.user.roles.includes("ADMIN")) {
    throw new httpError(403, "Vous n'êtes pas administrateur");
  }

  next();
});

module.exports = isAdmin;
