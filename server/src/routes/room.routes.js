const express = require('express');

const router = express.Router();

const controller = require("../controllers/room.controllers.js");

router.get("/:user_id", controller.findRoom);
router.post("/", controller.createRoom);

module.exports = router;