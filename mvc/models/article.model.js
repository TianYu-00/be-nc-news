const db = require("../../db/connection");

exports.selectArticleById = (articleId) => {
  const query = "SELECT * from articles WHERE article_id = $1";
  const errorMsg = "article does not exist";
  return errorHandleDBQuery(query, [articleId], errorMsg).then((rows) => rows[0]);
};

/////////////////////////////////////////////////////////////////////////////////
// Error handle DB reusable functions
////////////////////////////////////////////////////////////////////////////////
const errorHandleDBQuery = (query, articleId, msg) => {
  return db.query(query, articleId).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: msg });
    }
    return result.rows;
  });
};
