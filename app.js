const express = require("express"); // https://www.npmjs.com/package/express
const controller_topics = require("./mvc/controllers/topics.controller");
const app = express();
////////////////////////////////////////////
// GET
app.get("/api/topics", controller_topics.getTopics);
///////////////////////////////////////////

////////////////////////////////////////////
// ERROR HANDLING
app.use((error, request, response, next) => {
  response.status(error.status).send({ msg: "NOT FOUND" });
  next();
});

app.use((request, response, next) => {
  response.status(404).send({ msg: "NOT FOUND" });
  next();
});

app.use((error, request, response, next) => {
  response.status(500).send({ msg: "INTERNAL SERVER ERROR" });
});
///////////////////////////////////////////

module.exports = app;
