const express = require('express');

const router = express.Router();

const controller = require("../controllers/counsel.controller.js");

router.get("/", controller.findAllCounsel);
router.post("/", controller.createCounsel);
router.get("/:counsel_id", controller.readCounsel);
router.put("/:counsel_id", controller.updateCounsel);
router.delete("/:counsel_id", controller.deleteCounsel);

module.exports = router;