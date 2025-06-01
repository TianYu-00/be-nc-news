const express = require("express");
const db = require("../db/connection");
const healthCheckRouter = express.Router();

healthCheckRouter.get("/", async (req, res) => {
  try {
    await db.query(`SELECT 1;`);
    res.status(200).json({ success: true, message: "Database is awake and healthy.", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Database unreachable.", data: null });
  }
});

module.exports = healthCheckRouter;
