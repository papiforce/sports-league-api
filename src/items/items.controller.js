const { errorHandler } = require("../utils");
const service = require("./items.service");

const addItem = errorHandler(async (req, res) => {
  const data = await service.add(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const updateItem = errorHandler(async (req, res) => {
  const data = await service.update(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const getAllItems = errorHandler(async (req, res) => {
  const data = await service.getAll(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const removeItem = errorHandler(async (req, res) => {
  const data = await service.remove(req, res);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

module.exports = {
  addItem,
  updateItem,
  getAllItems,
  removeItem,
};
