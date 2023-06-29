const { errorHandler, httpError } = require("../utils");
const jwt = require("jsonwebtoken");
const UserModel = require("../users/users.model");

const isLogged = errorHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new httpError(401, "Vous n'êtes pas connecté");

  try {
    const sign = jwt.verify(token, process.env.TOKEN_KEY);

    const currentUser = await UserModel.findById(sign.userId);

    if (!currentUser) {
      throw new httpError(404, "Utilisateur inconnu");
    }

    req.user = currentUser;

    next();
  } catch (err) {
    throw new httpError(401, "Vous n'êtes pas connecté");
  }
});

module.exports = isLogged;
