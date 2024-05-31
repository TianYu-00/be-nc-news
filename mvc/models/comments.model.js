const db = require("../../db/connection");

exports.removeCommentById = async (commentId) => {
  const commentCount = await db.query(`SELECT comment_id FROM comments WHERE comment_id = $1;`, [commentId]);
  const errorMsg = "comment does not exist";

  if (commentCount.rows.length === 0) {
    return Promise.reject({ status: 404, msg: errorMsg });
  }
  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [commentId]);
};

exports.updateCommentById = async (commentId, body) => {
  const comment = await db.query(`SELECT votes FROM comments WHERE comment_id = $1`, [commentId]);
  const query = `UPDATE comments
    SET votes = $1
    WHERE comment_id = $2 RETURNING *;`;
  const errorMsg = "comment does not exist";

  if (comment.rows.length === 0) {
    return Promise.reject({ status: 404, msg: errorMsg });
  }
  const newVoteValue = comment.rows[0].votes + body.inc_votes;
  return db.query(query, [newVoteValue, commentId]).then(({ rows }) => rows[0]);
};
