const express = require('express');

const router = express.Router();

const controller = require("../controllers/user.controller");

// Create User Route
router.post("/", controller.createUser);

// Read(Find) User Route
router.get("/:id", controller.findUser);

// Update User Route
router.put("/:id", controller.updateUser);

// Delete User Route
router.delete("/:id", controller.deleteUser);

module.exports = router;