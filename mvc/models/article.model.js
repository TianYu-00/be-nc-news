const db = require("../../db/connection");

exports.selectArticleById = (articleId) => {
  const query = "SELECT * FROM articles WHERE article_id = $1";
  const errorMsg = "article does not exist";
  return errorHandleDBQuery(query, [articleId], errorMsg).then((rows) => rows[0]);
};

exports.selectArticles = () => {
  const query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count 
  FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id
  GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
  ORDER BY articles.created_at DESC;`;
  const errorMsg = "";
  return errorHandleDBQuery(query, null, errorMsg).then((rows) => rows);
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
