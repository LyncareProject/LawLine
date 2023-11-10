const express = require('express');

const router = express.Router();

const controller = require("../controllers/comment.controller.js");

router.get("/", controller.findAllComment);
router.post("/ai", controller.createAIComment);
router.post("/", controller.createComment);
router.get("/:comment_id", controller.readComment);
router.put("/:comment_id", controller.updateComment);
router.delete("/:comment_id", controller.deleteComment);

module.exports = router;