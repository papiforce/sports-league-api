const router = require("express").Router();
const { isLogged } = require("../middlewares");
const controller = require("./orders.controller");

router.post("/", isLogged, controller.addOrder);
router.put("/:id", isLogged, controller.updateOrder);
router.get("/user-orders/:id", isLogged, controller.getUserOrders);

module.exports = router;
