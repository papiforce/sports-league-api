const OrderModel = require("./orders.model");
const ItemModel = require("../items/items.model");
const UserModel = require("../users/users.model");
const logger = require("../config/logger");
const { httpError } = require("../utils");

const add = async (req) => {
  const { itemId, userId, quantity, address, duration } = req.body;

  if (!Number.isInteger(parseInt(duration)) || duration > 7 || duration < 0) {
    throw new httpError(404, "La durée de location n'est pas correcte'");
  }

  const itemById = await ItemModel.findById(itemId);

  if (!itemById) {
    throw new httpError(404, "Cet article n'existe pas");
  }

  if (
    !Number.isInteger(quantity) ||
    quantity < 0 ||
    quantity > itemById.quantity
  ) {
    throw new httpError(404, "La quantité saisie n'est pas correcte");
  }

  const userById = await UserModel.findById(userId);

  if (!userById) {
    throw new httpError(404, "Cet utilisateur n'existe pas");
  }

  const date = new Date();
  date.setDate(date.getDate() + duration);

  const orderDoc = OrderModel({
    ...req.body,
    address: req.user.address ?? address,
    sendBackDate: date,
  });

  await orderDoc.save();

  const updatedItem = Object.assign(itemById, {
    quantity: itemById.quantity - quantity,
  });

  await updatedItem.save();

  logger.info(`${req.originalUrl} : 200 (POST)`);

  return { isAdded: true };
};

const update = async (req) => {
  const { id } = req.params;
  const { address, status, date } = req.body;

  const order = await OrderModel.findById(id);

  if (!order) {
    throw new httpError(403, "Cette commande n'existe pas");
  }

  const updatedOrder = Object.assign(order, {
    ...order,
    address,
    status: status ?? order.status,
  });

  await updatedOrder.save();

  logger.info(`${req.originalUrl} : 200 (PUT)`);

  return updatedOrder;
};

const getUserOrders = async (req) => {
  const { id } = req.params;

  const itemByUserId = await OrderModel.find({ userId: id });

  return itemByUserId;
};

module.exports = {
  add,
  update,
  getUserOrders,
};
