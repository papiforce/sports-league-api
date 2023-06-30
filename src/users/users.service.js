const UserModel = require("./users.model");
const logger = require("../config/logger");
const { httpError } = require("../utils");

const getAll = async (req) => {
  const { id, onlyActive, search, withoutFounder, limit, page } = req.query;

  const users = await UserModel.find({
    ...(id && { _id: id }),
    ...(onlyActive && { isDelete: false }),
    ...(withoutFounder && { roles: { $nin: ["FOUNDER"] } }),
    ...(search && {
      $or: [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }),
  })
    .limit(limit)
    .skip(limit * page);

  logger.info(`${req.originalUrl} : 200`);

  return users;
};

const updateUserProfile = async (req) => {
  const { userId } = req.params;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new httpError(403, "Cet utilisateur n'existe pas");
  }

  const checkEmail = await UserModel.findOne({ email: user.email });

  if (checkEmail.email !== user.email && checkEmail) {
    throw new httpError(403, "Cette email est déjà utilisée");
  }

  const updatedUser = Object.assign(user, req.body);

  await updatedUser.save();

  logger.info(`${req.originalUrl} : 200`);

  return updatedUser;
};

const removeMany = async (req) => {
  const { ids } = req.body;

  const users = await UserModel.deleteMany({
    _id: { $in: ids[0] },
  });

  if (!users) {
    throw new httpError(403, "L'un des utilisateurs selectionnés n'existe pas");
  }

  logger.info(`${req.originalUrl} : 200 (DELETE)`);

  return { isDelete: true };
};

module.exports = {
  getAll,
  updateUserProfile,
  removeMany,
};
