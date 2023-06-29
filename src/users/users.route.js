const router = require("express").Router();
const { isLogged } = require("../middlewares");
const controller = require("./users.controller");

router.get("/", controller.getAllUsers);
router.put("/update/:userId", isLogged, controller.updateUserProfile);

module.exports = router;
