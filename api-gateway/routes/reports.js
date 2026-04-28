const express = require("express");
const router = express.Router();
const reportHandler = require("./handler/report");

router.get("/", reportHandler.getReports);
router.get("/:id", reportHandler.getReport);
router.post("/", reportHandler.addReport);
router.put("/:id", reportHandler.updateReport);
router.delete("/:id", reportHandler.deleteReport);

module.exports = router;
