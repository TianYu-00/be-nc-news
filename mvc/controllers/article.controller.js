const { selectArticleById, selectArticles, selectArticleComments } = require("../models/article.model");
exports.getArticleById = (request, response, next) => {
  const id = request.params.article_id;
  selectArticleById(id)
    .then((article) => {
      response.status(200).send(article);
    })
    .catch(next);
};

exports.getArticles = (request, response, next) => {
  selectArticles()
    .then((articles) => {
      response.status(200).send(articles);
    })
    .catch(next);
};

exports.getArticleComments = (request, response, next) => {
  const articleId = request.params.article_id;
  selectArticleComments(articleId)
    .then((articleComments) => {
      response.status(200).send(articleComments);
    })
    .catch(next);
};
