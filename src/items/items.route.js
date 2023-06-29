const router = require("express").Router();
const controller = require("./items.controller");
const { isAdmin, isLogged } = require("../middlewares");

router.get("/", controller.getAllItems);
router.post("/", isLogged, isAdmin, controller.addItem);
router.put("/:id", isLogged, isAdmin, controller.updateItem);
router.delete("/:id", isLogged, isAdmin, controller.removeItem);

module.exports = router;
