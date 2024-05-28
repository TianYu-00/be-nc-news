const { selectArticleById } = require("../models/article.model");
exports.getArticleById = (request, response, next) => {
  const id = request.params.article_id;
  selectArticleById(id)
    .then((article) => {
      response.status(200).send(article);
    })
    .catch(next);
};
