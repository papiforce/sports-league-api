const OrderModel = require("./orders.model");
const ItemModel = require("../items/items.model");
const UserModel = require("../users/users.model");
const logger = require("../config/logger");
const { httpError } = require("../utils");

const add = async (req) => {
  const { itemsIds, userId, address, duration } = req.body;

  if (!Number.isInteger(parseInt(duration)) || duration > 7 || duration < 0) {
    throw new httpError(404, "La durée de location n'est pas correcte'");
  }

  const itemsById = await ItemModel.find({
    _id: { $in: itemsIds.map((item) => item.itemId) },
  });

  if (!itemsById) {
    throw new httpError(404, "L'un des articles sélectionnés n'existe pas");
  }

  if (
    itemsIds.some(
      (item, idx) =>
        item.quantity <= 0 || item.quantity > itemsById[idx].quantity
    )
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
    address: req.user && req.user.address ? req.user.address : address,
    sendBackDate: date,
    price: itemsIds.map((item) => item.price).reduce((a, b) => a + b, 0),
  });

  await orderDoc.save();

  const updatedItems = itemsById.map((item, idx) =>
    Object.assign(item, {
      quantity: item.quantity - itemsIds[idx].quantity,
    })
  );

  const docs = await Promise.all(updatedItems.map((item) => item.save()));

  if (!docs) {
    throw new httpError(
      403,
      "Une erreur est survenue lors de la mise à jour des articles"
    );
  }

  logger.info(`${req.originalUrl} : 200 (POST)`);

  return { isAdded: true };
};

const update = async (req) => {
  const { id } = req.params;
  const { address, status } = req.body;

  const order = await OrderModel.findById(id);

  if (!order) {
    throw new httpError(403, "Cette commande n'existe pas");
  }

  const updatedOrder = Object.assign(order, {
    ...order,
    address: req.user.address ?? address,
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
