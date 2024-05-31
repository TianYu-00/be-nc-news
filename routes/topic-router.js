const topicsRouter = require("express").Router();
const controller_topics = require("../mvc/controllers/topics.controller");

topicsRouter.get("/", controller_topics.getTopics);

module.exports = topicsRouter;
