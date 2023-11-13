const express = require('express');

const router = express.Router();

const controller = require("../controllers/forward.controller");

router.get("/:path", controller.forwardPath);

module.exports = router;