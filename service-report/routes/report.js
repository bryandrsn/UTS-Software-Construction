const express = require("express");
const router = express.Router();
const { Report } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const validStatuses = ["reported", "repaired"];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status",
      });
    }

    const condition = status ? { status: status } : {};

    const reports = await Report.findAll({
      where: condition,
    });
    return res.json({
      status: "success",
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve reports",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({
      status: "success",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve report",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { street_name, description, reporter_id, media_id } = req.body;

    const schema = {
      street_name: "string|empty:false",
      description: "string|optional",
      reporter_id: "number|positive|integer|empty:false",
      media_id: "number|positive|integer|empty:false",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const newReport = await Report.create({
      street_name,
      description,
      reporter_id,
      media_id,
    });

    res.status(201).json({
      status: "success",
      message: "Report created successfully",
      data: newReport,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create report",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { street_name, description, status, media_id } = req.body;

    const schema = {
      street_name: "string|optional",
      description: "string|optional",
      status: {
        type: "enum",
        values: ["reported", "repaired"],
        optional: true,
      },
      media_id: "number|positive|integer|optional",
    };
    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }

    await report.update({
      street_name,
      description,
      status,
      media_id,
    });

    res.json({
      status: "success",
      message: "Report updated successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update report",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }

    await report.destroy();

    res.json({ status: "success", message: "Report deleted" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete report",
      error: error.message,
    });
  }
});

module.exports = router;
