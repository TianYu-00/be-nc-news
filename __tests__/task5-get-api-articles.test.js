const { app, request, db, seed, data } = require("../testIndex");
require("jest-sorted"); // https://www.npmjs.com/package/jest-sorted

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/articles", () => {
  test("should return 404, with message indicating the route is not found", () => {
    return request(app)
      .get("/api/bad-route")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ROUTE NOT FOUND");
      });
  });

  test("should return a 200 status code, indicating the endpoint is accessible", () => {
    return request(app).get("/api/articles").expect(200);
  });

  test("should return back as an array", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  test("should return the correct key and data type for value", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        body.forEach((currentObj) => {
          currentObj.created_at = new Date(currentObj.created_at);
          expect(currentObj).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(Date),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });

  test("should return the correct length", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body).toHaveLength(13);
      });
  });

  test("should be sorted in descending order based on created_at", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });
});
