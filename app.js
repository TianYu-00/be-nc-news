const express = require("express"); // https://www.npmjs.com/package/express
const controller_topics = require("./mvc/controllers/topics.controller");
const controller_apis = require("./mvc/controllers/api.controller");
const controller_articles = require("./mvc/controllers/article.controller");
const app = express();
////////////////////////////////////////////
// GET
app.get("/api", controller_apis.getApis);
app.get("/api/topics", controller_topics.getTopics);
app.get("/api/articles", controller_articles.getArticles);
app.get("/api/articles/:article_id", controller_articles.getArticleById);
///////////////////////////////////////////

////////////////////////////////////////////
// ERROR HANDLING
app.use((error, request, response, next) => {
  if (error.msg) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  // PSQL Error
  if (error.code === "22P02") {
    response.status(400).send({ msg: "BAD REQUEST" });
  } else {
    next(error);
  }
});

app.all("*", (request, response) => {
  response.status(404).send({ msg: "ROUTE NOT FOUND" });
});

app.use((error, request, response, next) => {
  response.status(500).send({ msg: "INTERNAL SERVER ERROR" });
});
///////////////////////////////////////////

module.exports = app;

/*
// TASK 2:
add tests for GET /api/topics
add app.js (has error handling)
add listen.js
add controller & model
update package.json

// TASK 3:
add tests for GET /api
update app.js - get api, error handling
add controller & model
add test index to link all tests requires to 1 file, keep the code DRY.
update endpoints.json
update to task2 test - changed body.msg to "ROUTE NOT FOUND"

// Refactor TASK2:
add new test to check length of body with expected length
update require to use test index
update model to send the rows directly
update controller naming convention result -> topics

// TASK 4:
add tests for GET /api/articles/:article_id
update app.js - get article by id,  error handling
add controller & model
update endpoints.json

// Refactor TASK 3
update test to require in endpoints instead of fs.readfile

// TASK 5:
add tests for GET /api/articles
update app.js - get articles
add controller & model
add jest-sorted for tests
update package.json
*/
