const db = require("../../db/connection");
const fs = require("fs/promises");

exports.selectApis = () => {
  return fs.readFile("endpoints.json", "utf-8").then((result) => {
    return result;
  });
};
