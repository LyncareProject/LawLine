const express = require('express');

const router = express.Router();

const controller = require("../controllers/auth.controller");
const authJwt = require("../middlewares/authJwt")

router.get("/", authJwt.verifyToken, controller.getAuth);
router.post("/", controller.signIn);
router.post("/kakao", controller.Kakao);
router.post("/email", controller.verityMail);
router.post("/number", controller.verityAuthNumber);

module.exports = router;