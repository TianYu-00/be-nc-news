const db = require("../../db/connection");

exports.removeCommentById = async (commentId) => {
  const commentCount = await db.query(`SELECT comment_id FROM comments WHERE comment_id = $1;`, [commentId]);
  const errorMsg = "comment does not exist";

  if (commentCount.rows.length === 0) {
    return Promise.reject({ status: 404, msg: errorMsg });
  }

  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [commentId]).then((result) => {
    // console.log(result.rows);
  });
};
