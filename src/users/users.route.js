const router = require("express").Router();
const { isLogged } = require("../middlewares");
const controller = require("./users.controller");

router.get("/", isLogged, controller.getAllUsers);
router.put("/update/:userId", isLogged, controller.updateUserProfile);
router.delete("/", isLogged, controller.removeUsers);

module.exports = router;
