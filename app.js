const express = require("express"); // https://www.npmjs.com/package/express
const apiRouter = require("./routes/api-router");
const app = express();
app.use(express.json());

app.use("/api", apiRouter);

////////////////////////////////////////////
// ERROR HANDLING
app.use((error, request, response, next) => {
  // console.log("Custom Message");
  if (error.msg) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  // PSQL Error
  // console.log("PSQL Error");
  if (error.code === "22P02") {
    response.status(400).send({ msg: "BAD REQUEST" });
  } else if (error.code === "23503") {
    response.status(404).send({ msg: "NOT FOUND" });
  } else {
    next(error);
  }
});

app.all("*", (request, response) => {
  // console.log("Wild card 404 Route Not Found");
  response.status(404).send({ msg: "ROUTE NOT FOUND" });
});

app.use((error, request, response, next) => {
  // console.log("500 Internal Server Error");
  console.log(error);
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

// TASK 6:
add tests for GET /api/articles/:article_id/comments
update app.js
add controller & model
add jest-sorted for tests
update endpoints.json
update tasks.md

// Refactor Task 5
add tests to make sure the returning objects do not contain the key-value pair of body
update article controller naming convention from result -> articles
remove 404 tests for this task

// TASK 7:
add tests for POST /api/articles/:article_id/comments
update app.js
add controller & model
update endpoints.json
update package.json

// Refactor Task 6:
add test error handle to check for no comment articles
removed status code 200 test and moved it below using .expect(200)

// TASK 8:
add tests for PATCH /api/articles/:article_id
update app.js
add controller & model
update endpoints.json

// TASK 9:
add tests for DELETE /api/comments/:comment_id
update app.js
add controller & model
update package.json
update endpoints.json

// TASK 10:
add tests for GET /api/users
update app.js
add controller & model
update endpoints.json

// TASK 11: 
add tests for GET /api/articles (topic query)
update app.js
update article controller & model

// TASK 12:
add tests for GET /api/articles/:article_id (comment_count)
update app.js
update article controller & model
update endpoints.json

// TASK 13:
update connection.js
update listen.js
update package.json

// TASK 15:
add tests for ADVANCED GET /api/articles (sorting queries)
update app.js
update model

// TASK 16:
update app.js
add route folder
add router files

// TASK 17:
add tests for ADVANCED GET /api/users/:username
update app.js
update controller and model
update endpoints.json
*/
