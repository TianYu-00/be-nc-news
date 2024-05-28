const { selectTopics } = require("../models/topics.models");
exports.getTopics = (request, response, next) => {
  selectTopics()
    .then((result) => {
      response.status(200).send(result.rows);
    })
    .catch(next);
};
