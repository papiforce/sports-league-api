const { errorHandler } = require("../utils");
const service = require("./orders.service");

const addOrder = errorHandler(async (req, res) => {
  const data = await service.add(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const updateOrder = errorHandler(async (req, res) => {
  const data = await service.update(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const getUserOrders = errorHandler(async (req, res) => {
  const data = await service.getUserOrders(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

module.exports = {
  addOrder,
  updateOrder,
  getUserOrders,
};
