const ItemModel = require("./items.model");
const logger = require("../config/logger");
const { httpError } = require("../utils");

const add = async (req) => {
  const itemByName = await ItemModel.findOne({ name: req.body.name });

  if (itemByName) {
    throw new httpError(404, "Cet article existe déjà");
  }

  const itemDoc = ItemModel(req.body);

  await itemDoc.save();

  logger.info(`${req.originalUrl} : 200 (POST)`);

  return { isAdded: true };
};

const getAll = async (req) => {
  const { id, onlyAvailable, search, limit, page } = req.query;

  const items = await ItemModel.find({
    ...(id && { _id: id }),
    ...(onlyAvailable && { quantity: { $gt: 0 } }),
    ...(search && { name: { $regex: search, $options: "i" } }),
  })
    .limit(limit)
    .skip(limit * page);

  logger.info(`${req.originalUrl} : 200 (GET)`);

  return items;
};

const update = async (req) => {
  const { id } = req.params;

  const item = await ItemModel.findById(id);

  if (!item) {
    throw new httpError(403, "Cet article n'existe pas");
  }

  const updatedItem = Object.assign(item, req.body);

  await updatedItem.save();

  logger.info(`${req.originalUrl} : 200 (PUT)`);

  return updatedItem;
};

const remove = async (req) => {
  const { id } = req.params;

  const item = await ItemModel.findByIdAndRemove(id);

  if (!item) {
    throw new httpError(403, "Cet article n'existe pas");
  }

  logger.info(`${req.originalUrl} : 200 (DELETE)`);

  return { isDelete: true };
};

module.exports = {
  add,
  getAll,
  update,
  remove,
};
