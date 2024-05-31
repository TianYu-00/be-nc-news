const { removeCommentById, updateCommentById } = require("../models/comments.model");
exports.deleteCommentById = (request, response, next) => {
  const commentId = request.params.comment_id;
  removeCommentById(commentId)
    .then(() => {
      response.status(204).send();
    })
    .catch(next);
};

exports.patchCommentById = (request, response, next) => {
  const commentId = request.params.comment_id;
  const body = request.body;
  updateCommentById(commentId, body)
    .then((updatedComment) => {
      response.status(200).send(updatedComment);
    })
    .catch(next);
};
