const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { user } = require("../controller/user.controller");

const router = express.Router();

router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/current").get(validateToken, user.info);
module.exports = router;