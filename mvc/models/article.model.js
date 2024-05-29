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

exports.selectArticleComments = (articleId) => {
  const query = `SELECT comment_id, votes, created_at, author, body, article_id FROM comments 
  WHERE article_id = $1
  ORDER BY created_at DESC;`;
  const errorMsg = "NOT FOUND";
  return errorHandleDBQuery(query, [articleId], errorMsg).then((rows) => rows);
};

exports.insertCommentByArticleId = (articleId, commentData) => {
  if (!commentData.username || !commentData.body) {
    return Promise.reject({ status: 400, msg: "BAD REQUEST" });
  }

  const query = `INSERT INTO comments (body, article_id, author)
  VALUES ($1, $2, $3) RETURNING *;`;
  const errorMsg = "NOT FOUND";
  return errorHandleDBQuery(query, [commentData.body, articleId, commentData.username], errorMsg).then((rows) => {
    return rows[0];
  });
};

exports.updateArticleById = async (articleId, body) => {
  // console.log((await db.query(`SELECT * FROM articles`)).rows);
  const article = await db.query(`SELECT votes FROM articles WHERE article_id = $1`, [articleId]);

  const query = `UPDATE articles
    SET votes = $1
    WHERE article_id = $2 RETURNING *;`;
  const errorMsg = "article does not exist";

  if (article.rows.length === 0) {
    return Promise.reject({ status: 404, msg: errorMsg });
  }
  const newVoteValue = article.rows[0].votes + body.inc_votes;
  return errorHandleDBQuery(query, [newVoteValue, articleId], errorMsg).then((rows) => rows[0]);
};

/////////////////////////////////////////////////////////////////////////////////
// Error handle DB reusable functions
////////////////////////////////////////////////////////////////////////////////
const errorHandleDBQuery = (query, queryParams, msg) => {
  return db.query(query, queryParams).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: msg });
    }
    return result.rows;
  });
};
