const db = require("../../db/connection");

exports.selectArticleById = (articleId, query) => {
  const acceptedQuery = ["comment_count"];
  if (Object.keys(query).length > 0) {
    for (const key in query) {
      if (!acceptedQuery.includes(key)) {
        return Promise.reject({ status: 400, msg: "BAD REQUEST" });
      }
    }
  }

  let sqlQuery = "";
  let hasComment_Count = false;
  for (const key in query) {
    if (key === "comment_count") {
      sqlQuery = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`;
      hasComment_Count = true;
    }
  }

  if (!hasComment_Count) {
    sqlQuery = `SELECT articles.* FROM articles WHERE article_id = $1;`;
  }

  const errorMsg = "article does not exist";
  return errorHandleDBQuery(sqlQuery, [articleId], errorMsg).then((rows) => rows[0]);
};

exports.selectArticles = (query) => {
  const acceptedQuery = ["topic", "author", "sort_by", "order"];
  const allowSortBy = ["", "created_at", "title", "votes", "author", "comment_count"];
  const allowOrder = ["ASC", "DESC"];

  const arrayOfKeyValue = Object.entries(query);
  if (Object.keys(query).some((key) => !acceptedQuery.includes(key))) {
    return Promise.reject({ status: 400, msg: "BAD REQUEST" });
  }

  let sqlQuery = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id 
  `;

  const queryValueArray = [];
  const whereClauses = arrayOfKeyValue
    .filter(([key]) => key === "topic" || key === "author")
    .map(([key, value]) => {
      queryValueArray.push(value);
      return key === "topic" ? `topic = $${queryValueArray.length}` : `articles.author = $${queryValueArray.length}`;
    });

  if (whereClauses.length > 0) {
    sqlQuery += `WHERE ${whereClauses.join(" AND ")} `;
  }

  sqlQuery += `GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url `;

  const { sort_by, order } = query;
  const normalizedSortByQueryValue = sort_by ? sort_by.trim() : null;
  const normalizedOrderQueryValue = order ? order.trim().toUpperCase() : null;

  if (normalizedSortByQueryValue && !allowSortBy.includes(normalizedSortByQueryValue)) {
    return Promise.reject({ status: 400, msg: "BAD REQUEST" });
  }

  if (normalizedOrderQueryValue && !allowOrder.includes(normalizedOrderQueryValue)) {
    return Promise.reject({ status: 400, msg: "BAD REQUEST" });
  }

  sqlQuery += `ORDER BY ${normalizedSortByQueryValue || "created_at"} ${normalizedOrderQueryValue || "DESC"};`;

  sqlQuery += ";";

  const errorMsg = "NOT FOUND";
  return errorHandleDBQuery(sqlQuery, queryValueArray, errorMsg).then((rows) => rows);
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
