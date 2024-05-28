const express = require("express"); // https://www.npmjs.com/package/express
const controller_topics = require("./mvc/controllers/topics.controller");
const controller_apis = require("./mvc/controllers/api.controller");
const app = express();
////////////////////////////////////////////
// GET
app.get("/api", controller_apis.getApis);
app.get("/api/topics", controller_topics.getTopics);
///////////////////////////////////////////

////////////////////////////////////////////
// ERROR HANDLING
app.all("*", (request, response) => {
  response.status(404).send({ msg: "ROUTE NOT FOUND" });
});

app.use((error, request, response, next) => {
  response.status(error.status).send({ msg: error.msg });
  next();
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
*/
