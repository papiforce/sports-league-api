const { errorHandler } = require("../utils");
const authService = require("./auth.service");

const createUser = errorHandler(async (req, res) => {
  const data = await authService.signUp(req);

  if (!data) return res.status(404).json({ isSignUp: false });

  return res.status(200).json(data);
});

const logUser = errorHandler(async (req, res) => {
  const data = await authService.signIn(req);

  if (!data) return res.status(404).json({ isLogged: false });

  return res.status(200).json(data);
});

const currentUser = errorHandler(async (req, res) => {
  const data = await authService.me(req);

  if (!data) return res.status(404).json({ isLogged: false });

  return res.status(200).json(data);
});

module.exports = {
  createUser,
  logUser,
  currentUser,
};
