const db = require("../../db/connection");

exports.selectTopics = () => {
  return db.query(`SELECT * from topics`).then((result) => {
    return result;
  });
};
