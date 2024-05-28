const { selectApis } = require("../models/api.model");
exports.getApis = (request, response, next) => {
  selectApis()
    .then((result) => {
      response.status(200).send(result);
    })
    .catch(next);
};
