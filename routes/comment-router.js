const commentsRouter = require("express").Router();
const controller_comments = require("../mvc/controllers/comments.controller");

commentsRouter.delete("/:comment_id", controller_comments.deleteCommentById);

module.exports = commentsRouter;
