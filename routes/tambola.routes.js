const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { ticket } = require("../controller/tambola.controller");

const router = express.Router();

router.route("/generate").get(validateToken, ticket.create);
router.route("/getTickets").get(validateToken, ticket.get);
module.exports = router;