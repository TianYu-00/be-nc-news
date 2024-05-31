const apisRouter = require("express").Router();
const controller_apis = require("../mvc/controllers/api.controller");
const articlesRouter = require("./article-router");
const topicsRouter = require("./topic-router");
const usersRouter = require("./users-router");
const commentsRouter = require("./comment-router");

apisRouter.get("/", controller_apis.getApis);

apisRouter.use("/articles", articlesRouter);

apisRouter.use("/topics", topicsRouter);

apisRouter.use("/users", usersRouter);

apisRouter.use("/comments", commentsRouter);

module.exports = apisRouter;
