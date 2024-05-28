const app = require("../app");
const request = require("supertest"); // https://www.npmjs.com/package/supertest
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index"); // test database

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET api/topics", () => {
  test("should return 404, with message indicating the route is not found", () => {
    return request(app)
      .get("/api/bad-route")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("NOT FOUND");
      });
  });

  test("should return a 200 status code, indicating the endpoint is accessible", () => {
    return request(app).get("/api/topics").expect(200);
  });

  test("should return a list of topics, each containing a description and a slug", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.forEach((currentObj) => {
          expect(currentObj).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});
