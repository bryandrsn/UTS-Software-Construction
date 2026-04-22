const express = require("express");
const router = express.Router();
const usersHandler = require("./handler/refresh-tokens");

router.post("/", usersHandler.create);
router.get("/", usersHandler.getToken);

module.exports = router;
