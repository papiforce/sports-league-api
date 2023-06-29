const { errorHandler } = require("../utils");
const userService = require("./users.service");

const getAllUsers = errorHandler(async (req, res) => {
  const data = await userService.getAll(req);

  if (!data) return res.status(404).json({ error: "Aucun utilisateur" });

  return res.status(200).json(data);
});

const updateUserProfile = errorHandler(async (req, res) => {
  const data = await userService.updateUserProfile(req);

  if (!data) return res.status(404).json({ error: "Aucun utilisateur" });

  return res.status(200).json(data);
});

module.exports = {
  getAllUsers,
  updateUserProfile,
};
