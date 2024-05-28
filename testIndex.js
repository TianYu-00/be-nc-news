exports.app = require("./app");
exports.request = require("supertest"); // https://www.npmjs.com/package/supertest
exports.db = require("./db/connection");
exports.seed = require("./db/seeds/seed");
exports.data = require("./db/data/test-data/index"); // test database
