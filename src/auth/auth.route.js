const router = require("express").Router();
const controller = require("./auth.controller");
const { isLogged } = require("../middlewares");

router.post("/signup", controller.createUser);
router.post("/signin", controller.logUser);
router.get("/current", isLogged, controller.currentUser);

module.exports = router;
