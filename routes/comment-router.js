const commentsRouter = require("express").Router();
const controller_comments = require("../mvc/controllers/comments.controller");

commentsRouter.delete("/:comment_id", controller_comments.deleteCommentById);
commentsRouter.patch("/:comment_id", controller_comments.patchCommentById);

module.exports = commentsRouter;
