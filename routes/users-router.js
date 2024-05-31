const usersRouter = require("express").Router();
const controller_users = require("../mvc/controllers/user.controllers");

usersRouter.get("/", controller_users.getUsers);

module.exports = usersRouter;
