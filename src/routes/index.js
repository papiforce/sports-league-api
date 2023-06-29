const router = require("express").Router();
const authRouter = require("../auth/auth.route");
const usersRouter = require("../users/users.route");
const itemsRouter = require("../items/items.route");
const ordersRouter = require("../orders/orders.route");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/items", itemsRouter);
router.use("/orders", ordersRouter);

module.exports = router;
