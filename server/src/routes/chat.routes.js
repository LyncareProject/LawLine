const express = require('express');

const router = express.Router();

const controller = require("../controllers/chat.controllers.js");

router.get("/:room_id", controller.readChat);
router.post("/", controller.createChat);
router.put("/:chat_id", controller.updateChat);
router.delete("/:chat_id", controller.deleteChat);

module.exports = router;