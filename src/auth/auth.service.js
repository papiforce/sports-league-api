const { httpError } = require("../utils");
const bcrypt = require("bcryptjs");
const UserModel = require("../users/users.model");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");

const signUp = async (req) => {
  const { firstname, lastname, email, password } = req.body;

  const userByEmail = await UserModel.findOne({ email });

  if (userByEmail) {
    throw new httpError(404, "Ce compte existe déjà");
  }

  const salt = await bcrypt.genSalt(10);
  encryptedPassword = await bcrypt.hash(password, salt);

  const userDoc = UserModel({
    ...req.body,
    password: encryptedPassword,
  });

  await userDoc.save();

  logger.info(`${req.originalUrl} : 200`);

  return { isSignUp: true };
};

const signIn = async (req) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email: email })
    .select("+password")
    .exec();

  if (!user) {
    throw new httpError(404, "Identifiants incorrects");
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    throw new httpError(404, "Identifiant ou mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);

  const { password, ...userData } = user;

  delete userData._doc.password;

  logger.info(`${req.originalUrl} : 200`);

  return {
    token,
    userId: user._id,
    isLogged: true,
  };
};

const me = async (req) => {
  const userUpToDate = await UserModel.findById(req.userId);

  const { password, ...userInfos } = userUpToDate;

  delete userInfos._doc.password;

  logger.info(`${req.originalUrl} : 200`);

  return {
    user: userInfos._doc,
    isLogged: true,
  };
};

module.exports = {
  signUp,
  signIn,
  me,
};
