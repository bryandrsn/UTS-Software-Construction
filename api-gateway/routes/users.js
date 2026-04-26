const express = require("express");
const router = express.Router();
const userHandler = require("./handler/user");

router.get("/", userHandler.getUsers);
router.get("/:id", userHandler.getUser);
router.post("/login", userHandler.login);
router.post("/register", userHandler.register);
router.put("/:id", userHandler.update);
router.post("/logout", userHandler.logout);

module.exports = router;
