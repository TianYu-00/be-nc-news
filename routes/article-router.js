const articleRouter = require("express").Router();
const controller_articles = require("../mvc/controllers/article.controller");

articleRouter.get("/", controller_articles.getArticles);
articleRouter
  .route("/:article_id/comments")
  .get(controller_articles.getArticleComments)
  .post(controller_articles.postArticleComment);

articleRouter.route("/:article_id").get(controller_articles.getArticleById).patch(controller_articles.patchArticleById);

module.exports = articleRouter;
